$( document ).ready(function() {
    $( "#info" ).dialog({autoOpen: false});
    
    /*geocoder*/
    var marker;
    $( "#geocoder" ).autocomplete({
    source: function( request, response ) {
        $.ajax({
        url: "http://loc.api.geopunt.be/geolocation/Suggestion",
        dataType: "jsonp",
        data: {
            q: request.term + ", Antwerpen",
            c: 10
        },
        success: function( data ) {
        var straten = [];
        $.each( data.SuggestionResult, function( index, value ){
                var straat = value.substring( 0, value.lastIndexOf(",")).trim() ;
                if( straat != "" ){
                    straten.push( straat );
                }
            });
        
        response( straten );
        }
      });
    },
    minLength: 2,
    select: function( event, ui ) {
        var adres = ui.item.label;
        
        $.ajax({
            url: "http://loc.api.geopunt.be/geolocation/Location",
            dataType: "jsonp",
            data: {
            q: adres + ", Antwerpen",
            c: 1
        },
        success: function( data ) {
        var locs = data.LocationResult;
        if( locs.length ){
            var loc = locs[0];
            var coordinates = [loc.Location.X_Lambert72, loc.Location.Y_Lambert72];
            
            if(marker){ featureOverlay.getSource().removeFeature(marker); }
            marker = new ol.Feature({
                geometry: new ol.geom.Point(coordinates), 
                name: loc.FormattedAddress
             });

            featureOverlay.getSource().addFeature(marker);       
            
            var view= map.getView();
            view.fitExtent([loc.BoundingBox.LowerLeft.X_Lambert72, 
                            loc.BoundingBox.LowerLeft.Y_Lambert72, 
                            loc.BoundingBox.UpperRight.X_Lambert72,
                            loc.BoundingBox.UpperRight.Y_Lambert72],  map.getSize()) 
            }
          }
        })
      },
    });  
    
    /*reverse*/
    var displayFeatureInfo = function(coordinate) {
        $("#info").html("resulten aan het ophalen ...").dialog( "open" );
        
        $.ajax({
        url: "http://loc.api.geopunt.be/geolocation/Location",
        dataType: "jsonp",
        data: {
            xy: coordinate[0] +","+ coordinate[1] ,
            c: 1
        },
        success: function( data ) {
            var straten = data.LocationResult;
            if( straten ){
                var straat = straten[0].FormattedAddress;
                var coordinates = [straten[0].Location.X_Lambert72, straten[0].Location.Y_Lambert72];
                $("#info").html(straat);
                
                if(marker){ featureOverlay.getSource().removeFeature(marker); }
                marker = new ol.Feature({
                    geometry: new ol.geom.Point(coordinates), 
                });

                featureOverlay.getSource().addFeature(marker);      
            }
            else {
              $("#info").html("Niets gevonden"); 
            }
        },
        error: function( ) {
            $("#info").html("Er trad een fout") 
        }
      });
    } 
    
    /*kaart*/    
    var projectionExtent = [9928.0, 66928.0, 272072.0, 329072.0];
    var projection = ol.proj.get('EPSG:31370');
    projection.setExtent(projectionExtent);
    var size = ol.extent.getWidth(projectionExtent) / 256;
    var resolutions = new Array(16);
    var matrixIds = new Array(16);
    for (var z = 0; z < 16; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    var grbBron = new ol.source.WMTS({
        url: 'http://grb.agiv.be/geodiensten/raadpleegdiensten/geocache/wmts/',
        layer: 'grb_bsk',
        matrixSet: 'BPL72VL',
        format: 'image/png',
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds
            }),
        });
    
    var grb =  new ol.layer.Tile({
        extent: projectionExtent,
        source: grbBron  
        });
    
    var iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.9,
            src: '/images/marker-icon.png'
            })
        });
    
    var featureOverlay = new ol.layer.Vector({
            style: iconStyle, source: new ol.source.Vector(),       
        });
    
    var map = new ol.Map({
            target: 'map',
            layers: [ grb , featureOverlay ],
            view: new ol.View({
                projection: 'EPSG:31370',
                center: ol.proj.transform([4,51], 'EPSG:4326', 'EPSG:31370'),
                zoom: 3,
                maxZoom: 17
            })
        });
   
    map.on('click', function(evt) {
        displayFeatureInfo(evt.coordinate);
    });
});