title: Opdrachten
---
Opdrachten
====
Via de "probeer het zelf" - tryit editor
----
VIa deze browser toepassing kan je op een veilige, niet persistente manier experimenteren met de code.

 - Opdracht 1, Hallo wereld: [Zoek de coördinaten van PXL op in QGIS in WGS 84 / Pseudo Mercator en centreer en zoom hierop in](tryit?file=examples/OL3_LES1_hallo_wereld.html&msg=Zoek%20de%20co%C3%B6rdinaten%20van%20PXL%20op%20in%20QGIS%20in%20WGS%2084%20/%20Pseudo%20Mercator%20en%20centreer%20en%20zoom%20hierop%20in)
 - Opdracht 2, WMS-lagen: [Onderzoek via de GetCapabilities of in QGIS wat de laagnamen van de WMS van INBO zijn en voeg hiervan de met title=BWK 1 - Zones, toe aan de kaart]( tryit?file=examples/OL3_LES2_WMS.html&msg=Onderzoek%20via%20de%20GetCapabilities%20of%20in%20QGIS%20wat%20de%20laagnamen%20van%20de%20WMS%20van%20INBO%20zijn%20en%20voeg%20hiervan%20de%20met%20title=BWK%201%20-%20Zones,%20toe%20aan%20de%20kaart%3A%20%20http://geo.agiv.be/ogc/wms/product/INBO%3Frequest=GetCapabilities%26version=1.3.0%26service=wms)
 - Opdracht 3, Werken met coördinaat-systemen: [Voeg de coördinaten in WGS84 / Pseudomercator aan de popup](tryit?file=examples/OL3_LES3_coordnaatsystemen.html&msg=Voeg%20de%20co%C3%B6rdinaten%20in%20WGS84%20/%20Pseudomercator%20aan%20de%20popup)
 - Opdracht 4, Vectorlagen: [Vervang de laagbron met de file /resource/zendmast.geojson, gebruik de iconen selection-icon.png en marker-icon.png. Voeg ook de attributen voor GEMEENTE en ADRES toe aan statusbalk](tryit?file=examples/OL3_LES4_vector.html&msg=Vervang%20de%20laagbron%20met%20de%20file%20/resource/zendmast.geojson,%20gebruik%20de%20iconen%20selection-icon.png%20en%20marker-icon.png.%20Voeg%20ook%20de%20attributen%20voor%20GEMEENTE%20en%20ADRES%20toe%20aan%20statusbalk)
 - Opdracht 5, Tegellagen: [Vervang de grb-laag door de WMTS luchtfoto van 2012 in Lambert 72](tryit?file=examples/OL3_LES5_tiles.html&msg=Vevang%20de%20grb-laag%20door%20de%20WMTS%20luchtfoto%20van%202012%20in%20Lambert%2072)
 - Opdracht 6, Geolocaliseren op basis van adres: [Zoek op poi in plaats van op adres, geef de locatie in lambert coordinaten mee in popup](tryit?file=examples/OL3_LES6_geocoding.html&msg=Zoek%20poi%20in%20plaats%20van%20op%20adres,%20geef%20de%20locatie%20in%20lambert%20coordinaten%20mee%20in%20popup.)
 - Opdracht 7, Vectorlagen op maat: [Maak een tweede laag met de manifestaties, gebruik andere kleuren en symbolen](tryit?file=examples/OL3_LES7_custom_layerSource.html&msg=Maak%20een%20tweede%20laag%20met%20de%20manifestaties,%20gebruik%20andere%20kleuren%20en%20symbolen)

Geïntegreerde opdracht:
-----

Voor deze opdracht gaan we de tryit editor niet gebruiken maar gaan de bron bestanden zelf bewerken.
Er is een template om te starten is voorzien in de folder public: 

- **opdracht1.html:** normaal gezien moet je hier niets aan toevoegen, maar het mag. 
- **opdracht1.js:** de javascript code, voeg de functies beschreven in onderstaande stappen aan toe. 

###Stappen:

1. Maak een kaart gecentreerd op locatie 488708, 6657857 (WebMercator) en met zoom schaal 11
2. Maak de achtergrondkaart de luchtfoto van AGIV.
3. Maak een functie die de achtergrondkaart wisselt tussen GRB en luchtfoto, gebruik hiervoor de radio-button in de span met id=basemapSwitch.
4. Maak een kaart met de WMS van het Vlaamse [Digitale Hoogte Model (DHM)](http://geo.agiv.be/inspire/wms/hoogte?service=wms&request=getcapabilities&version=1.3.0) inclusief legende en identificeren op muisklik, gebruik hiervoor de elementen met id=legende en id=info. 
5. Maak een zoeken naar adres met autocomplete met jqueryUI.
6. Voeg de GIPOD-punten punten voor de volgende maand toe, visualiseer deze met een [GIPOD icoon](http://gipod.api.agiv.be/#!docs/icon-workassignment.md). 
7. Toon de *description* in GIPOD bij muisbeweging over de kaart in het toolbalk in de span met id=mapTip. Eventueel cluster de Gipod-laag met methode naar keuze.
8. Wijzig de code van de legende:  
    - Voeg de GIPOD laag toe. 
    - Voeg vinkjes toe aan de legende waarmee je de lagen kan uitvinken
9. Als je op de een gipod-punt klikt, haal de details op en toon de polygoon van de werken.
    
 
