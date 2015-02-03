$( document ).ready(function() {
    var dlg = $( "#info" ).dialog({ autoOpen: false });
    
    var vectorSource = new ol.source.Vector({projection: 'EPSG:3857'});
    
    var clusterSource = new ol.source.Cluster({
        distance: 40, source: vectorSource
    });
    
    var vectorLayer = new ol.layer.Vector(
        {style: function(feature, resolution) {
            var size = feature.getProperties().features.length;
            var stl = new ol.style.Style({
            image: new ol.style.Circle({
                        radius: 3 + (size * 0.7), 
                        fill: new ol.style.Fill({ color: 'rgba(255, 255, 0, 0.5)'}),
                        stroke: new ol.style.Stroke({color: 'yellow', width: 1})
                    })
                });
            console.log(stl);
            return [stl];
            },
         source: clusterSource});  
     
    $.ajax({ 
    url: "http://gipod.api.agiv.be/ws/v1/workassignment",
    dataType : "json",
    data: { 
        province: "Antwerpen",
        crs: 3857, 
        limit: 500 } })
    .done(gipodParser)
    .fail(function(){alert("er liep iets fout")} );
     
    function gipodParser(data){
        var geojsonReader = new ol.format.GeoJSON();        
        var features = [];
        $.each(data, function(index, row){
            var geom = geojsonReader.readGeometry(row.coordinate);
            delete row.coordinate; //niet meer nodig
            row.geometry = geom; //voeg ol geometrie toe
            var feature = new ol.Feature( row );
            features.push( feature );
        });
        vectorSource.addFeatures(features);
    }    
              
    var basis = new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'osm'})
          })    
    
    var map = new ol.Map({
        target: 'map',
        layers: [ basis , vectorLayer ],
        view: new ol.View({
          center: [510630.95, 6653458.35],
          zoom: 10
        })
      });
      /*event handlers*/
     var displayFeatureInfo = function(pixel, map) {
        var vfeature, vlayer; 
        map.forEachFeatureAtPixel(pixel, function(feature, layer) {
            vfeature = feature;
            vlayer = layer;
            return;
        });
        if (vfeature && vlayer == vectorLayer ) {
            var msg = "";
            var props = vfeature.getProperties();
            if(  props.features.length > 1 ){
                msg = "Cluster met "+ props.features.length +" lagen";
            }
            else {
                var singleProp =  props.features[0].getProperties();
                for(var key in singleProp) {
                        if( key == "geometry" ){continue;}
                        msg += "<strong>"+ key + ":</strong> "+ singleProp[ key ] +"<br/>";
                    }
            }
            dlg.html(msg);
            dlg.dialog( "open" );   
            } 
    }
    
    /*events*/
    map.on('click', function(evt) {
            displayFeatureInfo(evt.pixel, map);
        });
})