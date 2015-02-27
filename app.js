#!/usr/bin/env node
var express = require('express');
var path = require('path');
var mds = require('markdown-serve')
var fs = require('fs')
var bodyParser = require('body-parser');

/*create the app*/
var app = express();

app.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname , 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/*tryit editor*/
app.get('/tryit', function (req, res) {
    var code = "probeer het";

    if(req.query.file){
        var examplePath = path.join( __dirname , 'public', req.query.file )
        var stats = fs.lstatSync(examplePath)
        
        if( stats.isFile() ){
            fs.readFile(examplePath, 'utf8', function (err,data) {
                if (err)  { return res.sendStatus(400); }
                if (data) { 
                    return res.render('tryit', { code: data }); 
                }
            });
        }
    }
    else return res.render('tryit', { code: "Geef hier HTML in" });
});

app.get('/result', function (req, res) {
    res.send( "<em>Klik op Probeer het</em>" );
})
app.post('/result', function (req, res) {
   if (!req.body.code) {return res.sendStatus(400);}
   
   res.set('X-XSS-Protection', 0); 
   res.send( req.body.code );
})

/*render markdown*/

app.use(
    mds.middleware({ 
    rootDirectory: __dirname,
    view: 'markdown',
    preParse: true  
    })  
);

/*Error handling*/
app.use(function(req, res, next){
  res.status(404);
  res.send({ error: 'Bron niet gevonden' });
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Er liep iets fout!');
});

var server = app.listen(process.env.PORT || 3000, '127.0.0.1', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('app listening at http://%s:%s', host, port)
});