$( document ).ready(function() {
/*jqeury gebruike om dialogen eknoppen te maken*/
$( ".dlg" ).dialog({
    autoOpen: false,
    height: 400
});

$( "#legendeBtn" ).click(function() {
    $( "#legendeDlg" ).dialog( "open" );
});

$( "#dhmChk" ).click(function() {
    hoogte.setVisible( !hoogte.getVisible() );
    $( "#dhmlegende").toggle()
});
/*openlayers  gebruiken om de kaart te maken*/
var basis =  new ol.layer.Tile({
      source: new ol.source.MapQuest({
        layer: 'osm'
      })
    })

var dhm = new ol.source.ImageWMS({
            url: 'http://geo.agiv.be/inspire/wms/hoogte',
            params: {'LAYERS': 'DHM'}
        });  
        
var hoogte = new ol.layer.Image({
        title: "Hoogte",
        opacity: 0.7,
        source: dhm
        });   
        
var map = new ol.Map({
        target: 'map',
        layers: [basis, hoogte ],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: ol.proj.transform([4,51], 'EPSG:4326', 'EPSG:3857'),
            zoom: 9
        })
    });

map.on('singleclick', function(evt) {
    $( "#infoDlg" ).html('');
    var viewResolution = /** @type {number} */ (map.getView().getResolution());
    var url = dhm.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': 'text/html'});
    if (url) {
        $( "#infoDlg" ).html(
            '<iframe style="border-style: none" width=200 height=130 src="' + url + '"></iframe>');
    }
    $( "#infoDlg" ).dialog( "open" );
    });

});
    
