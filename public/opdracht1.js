$( document ).ready(function() {
    $( "#toolbar" ).tooltip();
    $( "#legendeBtn" ).button();
    $( "#basemapSwitch").buttonset();  
    
   var dlg = $( "#info" ).dialog({ autoOpen: false });
   var legende = $( "#legende" ).dialog({ autoOpen: false });
   $( "#legendeBtn" ).click( function(){ legende.dialog( "open" ) });
    
   /*vanaf hier kan je code toevoegen*/
   
   var tegellaag = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
     
   var map = new ol.Map({
        target: 'map',
        layers: [ tegellaag ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [0, 0],
            zoom: 1
        })
    });   
   

});


