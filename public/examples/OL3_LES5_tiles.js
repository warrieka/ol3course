$( document ).ready(function() {
  
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

var map = new ol.Map({
        target: 'map',
        layers: [ grb  ],
        view: new ol.View({
            projection: 'EPSG:31370',
            center: ol.proj.transform([4,51], 'EPSG:4326', 'EPSG:31370'),
            zoom: 3,
            maxZoom: 17
        })
    });

});