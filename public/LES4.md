Les 4: Vector lagen
==== 
Sommige gisdata kan worden binnen gehaald als gestructureerde tekst in plaats van een afbeelding.

Er bestaan enkele standaard formaten die openlayers onmiddellijk van url kan openen.  Het gaat onder meer om [Geojson](http://geojson.org/), Topojson, GML, GPX en KML.  Vooral Geojson is een veel gebruikt formaat in WebGIS. 
Je moet ook steeds de gewenste coördinaatsysteem voor de vectorlaag opgeven, normaal gezien is dit  de kaartprojectie. 
```javascript
var geojsonBron = new ol.source.GeoJSON({
    projection: map.getView().getProjection(),
    url: 'data/gemeenten.geojson'
  });
```
Dit soort data kan je ook, zelf stylen. Afhankelijk van de het datatype moet je andere types van stijlen gebruiken.
Het object new *ol.style.Style* is een collectie van stijlen. 

**Een punt** wordt meestal gevisualiseerd met een icon of marker, een kleine afbeelding.

```javascript
var marker =  new ol.style.Icon({ 
	src: 'data/icon.png'
  });
var stijl = new ol.style.Style({
    image: marker 
  });
```
**Een lijn** heeft een breedte en kleur.
```javascript
var stijl = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    })
  })
```
**Een polygoon** kan ook een opvulling hebben.
```javascript
 var stijl = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  });
```
Met de databron en een stijl kan je de Vectorlaag samenstellen.
```javascript
var vectorLaag = new ol.layer.Vector({
  source: geojsonBron,
  style: stijl    
});
```
Je kun een stijl ook toewijzen als callback functie op de feature, dan kan je op basis van de eigenschappen van de feature de inkleuring doen of zelf een label toewijzen. In het onderstaande voorbeeld zie hoe je vanaf resolutie 5000 de  gemeenten worden gelabeld.
```javascript
var vectorLaag = new ol.layer.Vector({
  source: geojsonBron,
  style: function(feature, resolutie) {
    stijl.getText()
	 .setText(resolutie < 5000 ? feature.get('naam'):'');
    return stijl;
  }
 });

``` 
Je kunt ook op vectorlagen  ook een identificeren via een muis klik.
Hier zien hoe je een div met id="info" kunt bevolken met de waarde 'naam' na een muisklik op de  kaart:
```javascript
var displayFeatureInfo = function(pixel) {
  var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    return feature;
  });
  var info = $('#info');
  if (feature) {
    info.html( feature.get('naam'));
  } else {
    info.html('');
  }
};
map.on('click', function(evt) {
  displayFeatureInfo(evt.pixel);
});
```