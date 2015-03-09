title: Werken met coördinaat-systemen 
example: examples/OL3_LES3_coordnaatsystemen.html
opdracht: Voeg de coördinaten in WGS84 / Pseudomercator aan de popup
---

Les 3: Werken met coördinaat-systemen 
====

In openlayers worden de coördinaatsystemen steeds bij hun ESPG-code benoemd. 
Als je van een coördinaatsysteem de ESPG-code niet kent kan je die opzoeken op  http://epsg.io/.
Openlayers heeft out-of-the-box 2 coördinaatsystemen ingebouwd aanwezig: het geprojecteerde systeem webmercator met code *ESPG:3857* en het ongeprojecteerde systeem WGS84 met code *ESPG:4326*. Dit zijn de meeste gebruikte coördinaatsysteem bij webtoepassingen ondermeer OpenStreetMap, Bing en Google gebruiken dit.

Je kunt echter ook andere coördinaatsystemen toevoegen aan je toepassing. Hiervoor heb je een een extra javascript-library nodig: [proj4js](http://proj4js.org/), die de benodigde wiskundige formules bevat om zowat alle types van coördinaatsystemen om te rekenen.
Daarnaast heb natuurlijk ook de parameters nodig van je specifieke coördinaat systeem. 
De makkelijkste manier om dit te doen is via een extra script tag die verwijst naar:

	http://epsg.io/<nummer>.js
 
Zo kan je het Belgische lambert 72 systeem (ESPG:31370) op de volgende manier registeren:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.3/proj4.js" type="text/javascript"></script>
<script src="http://epsg.io/31370.js" type="text/javascript"></script>
```
Vanaf dan je kan je steeds je Lambert-coördinaten aanduiden door de string "ESPG:31370".

Met de functie *ol.proj.transform* kan dan een punt transformeren van een coördinaatsysteem naar een  ander. In onderstaand voorbeeld zie bijvoorbeeld hoe je Lambert 72 coördinaten omzet naar webmercator.
```javascript
var lambert72Punt = [151600,211900];
var mercatorPunt = ol.proj.transform(lambert72Punt, 'EPSG:31370', 'EPSG:3857');
```
Bij vectorlagen zal automatisch een transformatie van de coördinaten naar de kaartprojectie  gebeuren indien  deze  niet overeenstemmen en het coördinaatsysteem toegevoegd is.

