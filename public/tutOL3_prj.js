$( document ).ready(function() {

$( "#adres" ).autocomplete({
    source: function( request, response ) {
    $.ajax({
        url: "http://loc.api.geopunt.be/geolocation/Suggestion",
        dataType: "jsonp",
        data: {
        q: request.term + ", Antwerpen",
        c: 20
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
            
            marker = new ol.Feature({
                geometry: new ol.geom.Point(coordinates), 
                name: loc.FormattedAddress
                });

            vectorSource.clear(1)
            vectorSource.addFeature(marker);       
            
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

$( ".dlg" ).dialog({
    autoOpen: false,
    height: 400
});

$( "#legendeBtn" ).click(function() {
    $( "#legendeDlg" ).dialog( "open" );
});

$( "#dhmChk" ).click(function() {
    hoogte.setVisible( !hoogte.getVisible() );
});

var vectorSource  = new ol.source.Vector();

var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: '/images/marker-icon.png'
    })
 });
    
var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
    }) ;

var grb = new ol.layer.Image({
        title: "GRB",
        source: new ol.source.ImageWMS({
            url: 'http://grb.agiv.be/geodiensten/raadpleegdiensten/GRB-basiskaart/wms',
            params: {LAYERS: 'GRB_BASISKAART', VERSION: '1.3.0'}
        })
    });

var dhm = new ol.source.TileWMS({
            url: 'http://geo.agiv.be/inspire/wms/hoogte',
            params: {'LAYERS': 'DHM'}
        });  
        
var hoogte = new ol.layer.Tile({
        title: "Hoogte",
        opacity: 0.7,
        source: dhm
        });   
        
var map = new ol.Map({
        target: 'map',
        layers: [ grb, hoogte, vectorLayer ],
        view: new ol.View({
            projection: 'EPSG:31370',
            center: ol.proj.transform([4,51], 'EPSG:4326', 'EPSG:31370'),
            zoom: 9
        })
    });

map.on('singleclick', function(evt) {
    $( "#infoDlg" ).html('');
    var viewResolution = /** @type {number} */ (map.getView().getResolution());
    var url = dhm.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:31370',
        {'INFO_FORMAT': 'text/html'});
    if (url) {
        $( "#infoDlg" ).html(
            '<iframe style="border-style: none" width=200 height=130 src="' + url + '"></iframe>');
    }
    $( "#infoDlg" ).dialog( "open" );
    });

});
    
