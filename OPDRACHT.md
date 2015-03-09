title: Opdrachten
example: opdracht1.html
---
Opdrachten
====

Voor deze opdracht gaan we de tryid editor niet gebruiken maar gaan de bron bestanden zelf bewerken.
Er is een template om te starten is voorzien in de folder public: 

- **opdracht1.html:** normaal gezien moet je hier niets aan toevoegen, maar het mag. 
- **opdracht1.js:** de javascript code, voeg de functies beschreven in onderstaande stappen aan toe. 

Stappen:
-----

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
    
 
