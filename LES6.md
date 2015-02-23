Les 6: Geolocaliseren op basis van adres
====
Adressen geolocaliseren  op een kaart, ook wel geocoding genoemd is een veel voorkomende functie op een webmap. Op basis van een  adres wordt een coördinaat op de kaart bepaald. 
Het omgekeerde van geocoding is reverse geocoding, waarbij op basis van coördinaat een adres wordt bepaald.
De officiële adresdatabank van de Vlaamse overheid is CRAB. 
In CRAB zitten huisnummers meestal nauwkeurig tot op de locatie van het gebouw. Bij vele andere geocoding oplossingen is wordt het adres meestal gesitueerd langs een straatas. 

Bovenop CRAB bestaan verschillende [beheer- en raadpleegdiesten](https://www.agiv.be/producten/crab/meer-info-over-crab/beheer-van-het-crab/crab-beheerdiensten) zoals WS-CRAB die toegang biedt tot het hele datamodel. 
Deze diensten op basis het SOAP-protocol zijn echter wat te complex om eenvoudig in een webapplicatie in te bouwen. 
![enter image description here](https://www.agiv.be/~/media/agiv/producten/crab/beelden/fullcrabmodel.png)
Hiervoor is de eenvoudiger geolocation service beschikbaar.  Deze service zoekt zowel op gemeenten, straten en huisnummers en het kan ook op zogeheten interesse punten zoeken.

Deze service heeft 2 eindpunten:

 - Het [suggenstion](http://loc.api.geopunt.be/Help/Api/GET-Geolocation-Suggestion_q_capakey_poi_c) eindpunt geeft een array van adressen terug op basis van een deel van een adres. Er zijn slechts 3 parameters: 
	 - **q** -> de query op adres in de volgende vorm voor een volledig adres: 
		 *straat* *huisnummer*, *postcode* *gemeente*
	 - **poi** -> Point of intrest, interesse punten, meestal de locatie van een Vlaamse instelling of voorziening.
	 - **c** -> count, het maximaal aantal resultaten dat wordt terug gegeven.

Zo geeft:
> http://loc.api.geopunt.be/geolocation/Suggestion?q=molenstraat&nbsp;18&c=3

De volgende  response: 
```javascript
{
	SuggestionResult: ["Molenstraat 18, Aalst",
			"Molenstraat 18, Aalter",
			"Molenstraat 18, Aarschot"]
}
```
- Het [Location](http://loc.api.geopunt.be/Help/Api/GET-Geolocation-Location_q_latlon_xy_capakey_poi_c) endpoint geeft naast het adres ook de locatie in de vorm van een labelpunt en begrenzing terug. Deze service heeft de zelfde input parameters als *suggestion* en kan ook naast geocoderen ook reverse geocoderen. 
	- **q**  -> idem
	- **poi**-> idem
	- **c** -> idem
	- **xy** -> een coördinaat in Belgische Lambert coördinaten, de dichtstbijzijnde adressen worden terug geven.
	- **latlon** een coördinaat in geografische coördinaten (EPSG:4326).

Zo geeft:
> http://loc.api.geopunt.be/geolocation/Location?q=molenstraat&nbsp;18&c=1

De volgende response:
```javascript
{
  LocationResult: [
	{  FormattedAddress: "Molenstraat 18, Aalst",
	   Location: { Lat_WGS84: 50.93897,
				Lon_WGS84: 4.040259,
				X_Lambert72: 126911,
				Y_Lambert72: 181015
			},
	LocationType: "crab_huisnummer_manueleAanduidingVanGebouw",
	BoundingBox: {
		LowerLeft: {
			Lat_WGS84: 50.93897234505604,
			Lon_WGS84: 4.040259259206834,
			X_Lambert72: 126911,
			Y_Lambert72: 181015
		},
		UpperRight: {
			Lat_WGS84: 50.93897234505604,
			Lon_WGS84: 4.040259259206834,
			X_Lambert72: 126911,
			Y_Lambert72: 181015
		}
	}
  }]
}
```
Deze service gebruikt *jsonp* for cross platform request. In jqeury kan deze service dus op deze manier bevragen.
```javascript
$.ajax({ 
	url: "http://loc.api.geopunt.be/geolocation/Suggestion",
    dataType: "jsonp",
    data: {
            q: "Francis Wellesplein 1, Antwerpen",
            c: 10
        },
    success: function( data ) {
		   /*doe iets met de data*/
        }
 });
```
Deze *Suggestion* kan bijvoorbeeld gebruikt worden een autocomplete functie zoals je die bijvoorbeeld terug vindt in [jqeuryUI](http://jqueryui.com/autocomplete/). Als er resultaat geselecteerd werd kun je de *Location* service aanroepen om de kaart in te zoomen om die locatie.
```javascript   
var marker;
$( "#geocoder" ).autocomplete({
    source: function( request, response ) {
        $.ajax({
        url: "http://loc.api.geopunt.be/geolocation/Suggestion",
        dataType: "jsonp",
        data: {
            q: request.term,
            c: 10
        },
        success: function( data ) {
	        response( data.SuggestionResult );
        }
      });
    },
    minLength: 2,
    select: function( event, ui ) {
        var adres = ui.item.label;      
        $.ajax({
            url: "http://loc.api.geopunt.be/geolocation/Location",
            dataType: "jsonp",
            data: {
            q: adres,
            c: 1
        },
        success: function( data ) {
        var locs = data.LocationResult;
        if( locs.length ){
            var loc = locs[0];
            var coordinates = [
            loc.Location.X_Lambert72, loc.Location.Y_Lambert72];
            
            if(marker){ featureOverlay.getSource().removeFeature(marker); }
            marker = new ol.Feature({
                geometry: new ol.geom.Point(coordinates), 
                name: loc.FormattedAddress
             });

            featureOverlay.getSource().addFeature(marker);       
            
            var view= map.getView();
            view.fitExtent([loc.BoundingBox.LowerLeft.X_Lambert72, 
                            loc.BoundingBox.LowerLeft.Y_Lambert72, 
                            loc.BoundingBox.UpperRight.X_Lambert72,
                            loc.BoundingBox.UpperRight.Y_Lambert72], 
                             map.getSize()) 
            }
          }
        })
      },
});  
```

> [Voorbeeld](examples/OL3_LES6_geocoding.js)

> [Opdrachten](Opdracht_LES6.md)