Les 8:  Een backend opzetten of zelf programmeren
===== 

Om je eigen dat te server heb je een backend nodig die je data kan filteren en omzetten naar een webservice die leesbaar is voor web-applicatie's. Zoals WMS en Tiles voor raster data en gerendeerde vectorkaarten en text-formaten zoals geojson voor vectordata.

Een backend in de cloud
----

Er zijn tegenwoordig heel bedrijven die je data opslaan op hun server-infrastructuur en je toelaten om dit via een gebruiksvriendelijke webinterface te beheren. Daarnaast zijn ook al de data in deze webtoepassingen ook toegankelijk via een web-api om eigen toepassingen mee te ontwikkelen.

- [Cartodb](http://cartodb.com/) is een platform dat erg gericht is op de visualisatie van vectordata. 
Via Spatial SQL kan je allerlei analyses en bewerkingen op je data doen. 
- [MapBox](https://www.mapbox.com/) is ook erg gericht op visualisatie van gegevens, maar werkt meer op basis van tiles. Ideaal om een basiskaart op maat van je bedrijf te maken.
- [Arcgis](http://www.arcgis.com/) gebruikers kunnen tegenwoordig ook via Arcgis-online hun data beschikbaar maken in de cloud, zonder dat nog een eigen Arcgis server nodig hebt. Zonder Arcgis desktop is deze toepassing echter maar beperkt bruikbaar.

Een backend op eigen infrastructuur
----

Als een eigen server infrastructuur hebt kan je ook je services zelf hosten. Daarvoor zijn heel wat *out of the box* server applicaties beschikbaar. Rendering van ruwe data en gestandaardiseerde OGC-services zijn erg complex, daarom implementeer je dit best niet zelf.

- [geoserver](http://geoserver.org/) is een gebruiksvriendelijke Java server applicatie die alle belangrijke OGC-standaarden (WMS, WMTS, WFS, WPS, ...)  ondersteund. Alle configuratie van  kan verlopen via een web interface, Rest-api of via een QGIS plugin. Scripting is mogelijk via plugin.
- [mapserver](http://mapserver.org/) mapserver is een geografische data server applicatie geprogrammeerd in C. Configuratie doe je via text-bestanden (Map-files) of via scripting-talen, meestal is dit python hoewel ook andere talen ondersteund zijn. Output is WMS, Tiles of WFS of afbeeldingen in vele formaten.
- [arcgis server](http://www.esri.com/software/arcgis/arcgisserver) ESRI heeft voor arcgis-gebruikers arcgis-server. Deze ondersteunt vele OGC-standaarden naast de eigen Rest-api. 

Een eigen service programmeren 
----

Vectoriëele data is relatief eenvoudig te serven in een json-formaat zoals geojson, het is dus niet perse nodig om hiervoor een zeer uitgebreide *out the box*, met hoge systeem vereisten, applicatie server te voorzien zoals de bovenstaande,   

Als je data uit een databank komt zoals postgis kan je deze meestal via de standaard database api aanspreken. Voor bestandsformaten heb je aan library nodig. Voor geometrische operaties zoals het dichtste punt bij en lijn bepalen, alle gegevens op een bepaalde afstand tot een punt bepalen en zo voort, gebruik je ook best een library. 


- [gdal](http://www.gdal.org/) is een data-toegang library voor zowel vector als rasterdata, met bindingen voor vele talen. 

 

