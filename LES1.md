title: Hallo Wereld 
example: examples/OL3_LES1_hallo_wereld.html
---

Les 1: Hallo Wereld 
====
Om kaart te maken in webpagina moet aan de html-code zelf maar een paar dingen toevoegen.
Eerst en vooral moet je de benodigde javascript en css library's in de header van je html toevoegen. 
Deze zijn voor deze oefeningen klaar gezet onder de *public/src* en *public/css* folder. 
Je kunt steeds de laatste versie van openlayers downloaden via hun repository op [github](https://github.com/openlayers/ol3/releases).

```html
<link rel="stylesheet" href="css/ol.css" type="text/css">
<script src="src/ol-debug.js" type="text/javascript"></script>
```
In de body van de html hoef je slecht 1 element toevoegen, een div met een specifieke id waarin de kaart zal worden weergegeven. Traditioneel is deze id **map**. In een css file of style tag geef je deze best ook een grote mee. 

```html
<div id="map"></div>
```
Verder voeg je nog een script tag toe waarin je kaart gaat maken. In alle volgende oefeningen zullen we in een aparte file onze code schrijven, maar als inleiding doen we het nog rechtstreeks in de html.

In dit script gaan we alle elementen van onze kaart configureren: 

Elke kaart heeft minstens 1 **laag**, er zijn meerdere soorten lagen, zoals vectorlagen en getegelde en niet-getegelde rasterlagen. Een laag heeft altijd een **databron** in dit voorbeeld gebruiken we een voorgedefinieerde bron, de Open Street Map laag. 

```javascript
var tegellaag = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
```

Ook moet je aan de kaart een **view** meegeven: de plaats waarnaar je kijkt en met welk coördinaatsysteem dit wordt weergegeven. Ook kan je op de view de maximale en minimale zoom en het bereik van de kaart aangeven.
Tilelayers kunnen geherprojecteerd worden in browser, dus we zijn verplicht EPSG:3857 (webmercator) het coördinaatsysteem van Open Ŝtreet Map te gebruiken.

```javascript
var view = new ol.View({
         projection: 'EPSG:3857',
         center: [0, 0],
         zoom: 1
     });
```

Al deze objecten voegen we toe aan het **map** object die we ook verwijzen naar de *target*-id op de html-pagina. De lagen komen in een array terecht want kunnen er meer dan 1 zijn.

```javascript
var map = new ol.Map({
        target: 'map',
        layers: [ tegellaag ],
        view: view
    });
```
Je kunt ook nog knoppen: *controls* en andere gebruikersinterface elementen toevoegen: *interactions* aan de kaart. 
De volledige openlayers API kun je ook steeds online raadplegen via deze [link](http://openlayers.org/en/v3.1.1/apidoc/)

Alles te samen:

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="css/ol.css" type="text/css">
    <script src="src/ol-debug.js" type="text/javascript"></script>
    <style>
      #map {
        height: 256px;
        width: 512px;
      }
    </style>
    <title>Hallo Wereld</title>
  </head>
  <body>
    <h1>Hallo Wereld</h1>
    <div id="map"></div>
    <script type="text/javascript">
   var tegellaag = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        
   var view = new ol.View({
         projection: 'EPSG:3857',
         center: [0, 0],
         zoom: 1
     });
     
   var map = new ol.Map({
        target: 'map',
        layers: [ tegellaag ], //is een array
        view: view  
    }); 
      
    </script>
  </body>
</html>
```

> [Probeer het zelf](tryit?file=examples/OL3_LES1_hallo_wereld.html)
