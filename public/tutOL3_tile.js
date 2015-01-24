$( document ).ready(function() {
  
var projectionExtent = [9928.00, 66928.00, 272072.00, 329072.00];
var projection = ol.proj.get('EPSG:31370');
projection.setExtent(projectionExtent);
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(16);
var matrixIds = new Array(16);
for (var z = 0; z < 16; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
}

var grb = new ol.layer.Tile({
    extent: projectionExtent,
    source: new ol.source.WMTS({
    url: 'http://grb.agiv.be/geodiensten/raadpleegdiensten/geocache/wmts/',
    layer: 'orthoklm',
    matrixSet: 'BPL72VL',
    format: 'image/png',
    projection: projection,
    tileGrid: new ol.tilegrid.WMTS({
        origin: ol.extent.getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
        }),
    style: 'default'
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
        layers: [ grb , hoogte  ],
        view: new ol.View({
            projection: 'EPSG:31370',
            center: ol.proj.transform([4,51], 'EPSG:4326', 'EPSG:31370'),
            zoom: 3,
            maxZoom: 17
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
    $( "#infoDlg" ).dialog({autoOpen: false,});

});