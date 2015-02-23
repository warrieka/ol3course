$( document ).ready(function() {

var vectorSource  = new ol.source.GeoJSON({
    projection: 'EPSG:3857',
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

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
});

var grb = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://grb.agiv.be/geodiensten/raadpleegdiensten/geocache/tms/1.0.0/grb_bsk@GoogleMapsVL/{z}/{x}/{-y}.png'
    })    
}); 

var map = new ol.Map({
        target: 'map',
        layers: [ grb , vectorLayer],
        view: new ol.View({
            projection: 'EPSG:3857',
            center: ol.proj.transform([4,51], 'EPSG:4326', 'EPSG:3857'),
            zoom: 12,
            maxZoom: 21
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