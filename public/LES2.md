LES 2:  WMS Lagen 
====

> **Opmerking:** Vanaf nu zullen we ook de [JQuery](http://jquery.com/) javascript-library gebruiken voor het manipuleren van html en het openhalen van extern bronnen. 

WMS-lagen toevoegen aan de kaart
------
Veel geodata van allerlei bronnen, zoals van het  GDI wordt aangeboden als WMS. 
Dit soort service genereert dynamisch een afbeelding  van de data binnen een bepaald opgegeven geografisch gebied.  Je kunt vaak van een WMS ook een legende opvragen en 

In openlayers wordt een onderscheid gemaakt tussen kaartlagen en de achterliggende databron.  Van afbeeldings-databron op basis van WMS moet je minstens de *url* en de laagnamen van de gewenste kennen. 
De laagnamen (*LAYERS*) worden opgeven als een comma-gescheiden lijst in de *param* parameter. Andere optionele parameters zijn *STYLE*, *VERSION* en *FORMAT*.

> **Opdracht:** Onderzoek via de GetCapabilities xlm of in QGIS wat de laagnamen van de WMS van INBO zijn:  [http://geo.agiv.be/ogc/wms/product/INBO](http://geo.agiv.be/ogc/wms/product/INBO?request=GetCapabilities&version=1.3.0&service=wms)

De databron van een WMS ziet er dan zo uit:

```javascript
var inboBron = new ol.source.ImageWMS({
            url: 'http://geo.agiv.be/ogc/wms/product/INBO',
            params: {LAYERS: 'BWK2Zone,B1775', VERSION: '1.3.0'}
        });
```
Een WMS is een afbeeldingslaag (*ol.layer.Image*)  de enige verplichte parameters is de bron (*source*) en een titel voor de laagnaam. 
Andere parameters die je kan opgeven zijn onder meer transparantie (*opacity*) en eventueel ook de maximale of maximale resolutie waarbij de laag wordt getoond en een begrenzing  van het extent waarbinnen deze wordt getoond. 

```javascript
var inboLaag = new ol.layer.Image({
            title: "INBO",
            source: inboBron 
        });
```
WMS-Legende 
----
De meeste WMS-en laten ook toe om een afbeelding van de  legende van een laag op te halen. Deze kan je  eenvoudig aan html toevoegen via een img-tag.
De getLegendeGraphic url heeft dit deze vorm:  

**&lt;WMS-url&gt;?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=&lt;laagnaam&gt;**

Je kunt de legende meestal als png, jpeg of svg ophalen.
Om de INBO-laag *BWK2Zone* op  te halen als png deze er zo uit:
```html
<img id="legende" 
 src="http://geo.agiv.be/ogc/wms/product/INBO?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=BWK2Zone">
</img>
```
WMS features identificeren
----
Vele wms-en  hebben ook identificeer functie, waarmee je meer info over een geklikt punt kunt ophalen.
Het wms-bron object heeft een functie om de juiste GetFeatureInfo-url  samen te stellen uit het geklikte coördinaat, de resolutie en projectie van de kaart en een param-object dat verplicht het gewenste output formaat bevat. Het info-formaat ondersteund altijd xml, html en platte text. Sommige leveranciers ondersteunen ook json, maar dat is niet standaard. 
De eenvoudigste manier om dit in te voegen aan html is de html-output in een *iframe* weer te geven.
Hieronder wordt  getoond hoe je na een *singleclick* event een iframe met de *getGetFeatureInfo* van de INBO wms toevoegt aan  een div met id="info".  
```javascript
map.on('singleclick', function(evt) {
    $( "#info" ).html(''); //maak eerst leeg
    var viewResolution = map.getView().getResolution();
    var viewProjection = map.getView().getProjection();
    var url = inboBron.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, viewProjection ,
        {'INFO_FORMAT': 'text/html'});
    if (url) {
        $( "#info" ).html(
         '<iframe style="border-style: none" width=200 height=200 src="' + url + '"></iframe>');
    }
    });
```


  