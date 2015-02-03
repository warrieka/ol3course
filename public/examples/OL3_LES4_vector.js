var vectorLayer;
$( document ).ready(function() {

var vectorSource  = new ol.source.GeoJSON({
    projection:'EPSG:31370',
    defaultProjection: 'EPSG:4326',
    url: "/resource/zendmast.geojson"
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

vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
});

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
        
var map = new ol.Map({
        target: 'map',
        layers: [ grb , vectorLayer],
        view: new ol.View({
            projection: 'EPSG:31370',
            center: ol.proj.transform([4,51], 'EPSG:4326', 'EPSG:31370'),
            zoom: 3,
            maxZoom: 17
        })
    });

$(map.getViewport()).on('mousemove', function(evt) {
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

var displayFeatureInfo = function(pixel) {

  var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    return feature;
  });

  if (feature) {
    $('#info').html( feature.get('OPERATOR'));
  } else {
    $('#info').html( '' );
  }
};


});