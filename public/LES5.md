
Les 5: Tegel lagen
==== 

Een probleem met dynamisch genereerde Afbeeldingsdiensten zoals WMS is het dat even duurt om deze te generen. Zeker bij bij complexe of veel bevraagde services.

De oplossing hiervoor is de afbeeldingen op voorhand aan te maken. Dit is wat googlemaps - openstreetmaps ed. zo snel maakt ten opzichte van WMS-services. 
Deze tegel-caches volgens een specifieke structuur waarbij binnen een bepaald extent 4 tiles gemaakt worden voor zoomschaal 1, 16 voor zoomschaal 2, 64 voor zoomschaal 3 etc. 
![](https://i-msdn.sec.s-msft.com/dynimg/IC96238.jpg)

De OGC-standaard voor dit soort services is WMTS, Web Map Tile Service. 1 WMTS kan verschillende kaarten definiëren.  
AGIV heeft 1 WMTS-service met een aantal getegelde kaarten zoals de luchtfoto en GRB: http://grb.agiv.be/geodiensten/raadpleegdiensten/geocache/wmts/?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities

Om te weten wat de *MatrixSet* configuratie parameters van deze service zijn moet je de GetCapabilities XML doorzoeken de *&lt;TileMatrixSet>*-tag van je gewenste coördinaatsysteem vindt. Hierin vind je de begrenzing, de grootte van een tegel en het aantal niveaus van de tiles terug. 
```xml
...
<TileMatrixSet>
<ows:Identifier>BPL72VL</ows:Identifier>
<ows:BoundingBox crs="urn:ogc:def:crs:EPSG:6.3:31370">
<ows:LowerCorner>9928.0 66928.0</ows:LowerCorner>
<ows:UpperCorner>272072.0 329072.0</ows:UpperCorner>
</ows:BoundingBox>
...
```
De resoluties van elk niveua, die je nodig hebt deze lagen toe te voegen kan hiermee berekenen. 

```javascript
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
```
Hiermee kan je de WMTS-bron hiermee aanmaken, je hoeft enkel nog de identifier van de laag te kennen.
Zo kunnen we bijvoorbeeld een laag voor het GRB aanmaken.
```javascript
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
    style: 'default'
    });
var grbLaag =  new ol.layer.Tile({
    extent: projectionExtent,
    source: grbBron 
    });
```


> [Volledig Voorbeeld](examples/OL3_LES5_tiles.js)
