Cursus Openlayers 3 aan de hand van GDI-webdiensten
====
Auteur: Kay Warrie

Over 
----
In deze oefeningen wordt het maken van geografische web-toepassingen toegelicht aan de hand van de [openlayers](http://openlayers.org/) javascript bibliotheek. 
De meeste gebruikte kaart diensten zijn afkomstig uit de Vlaamse Geografische Data-Infrastructuur (GDI-Vlaanderen).

De cursus is opgebouwd als een nodeJS webapplicatie, die zowel dient als ontwikkel-server en als toegang tot cursus materiaal.

Installatie 
-----
**nodeJS:** download, via: *http://nodejs.org > install* <br/>
Download cursus materiaal via: https://github.com/warrieka/ol3course/archive/master.zip <br/>
Extraheer de contents naar een geschikte locatie: &lt;path>

Open het Node.js commando prompt:
menu start > Node.js > Node.js command prompt 

Ga naar &lt;path>\ol3course-master

```batchfile
 $ cd <path>\ol3course-master 
```

Installeer dependencies van de toepassing lokaal:
```batchfile
 $ npm install
```

Start de webserver:
```batchfile	
 $ npm start
```
Browse naar [http://localhost:3000](http://localhost:3000)

Inhoudsopgave 
-----

&nbsp;&nbsp;&nbsp;&nbsp;[Voorwoord](index.md)
 
 1. [Les 1: Hallo Wereld](LES1.md)
 2. [Les 2: WMS lagen](LES2.md)
 3. [Les 3: Werken met coordinaat-systemen](LES3.md)
 4. [Les 4: Vector lagen](LES4.md) 
 5. [Les 5: Tegel lagen](LES5.md) 
 6. [Les 6: Geolocatie op basis van adres](LES6.md) 
 7. [Les 7: Vectorlagen op maat](LES7.md) 
 8. [Opdrachten](OPDRACHT1.md)
