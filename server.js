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
    res.render('tryit', { code: "Geef hier HTML in" });
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
    preParse: function(markdownFile) {          
              if( markdownFile.meta )
                return { title: markdownFile.meta.title,
                         content: markdownFile.parseContent(), 
                         example: markdownFile.meta.example, 
                         opdracht: markdownFile.meta.opdracht } 
              else  return { content: markdownFile.parseContent() }
          }
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

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = app.listen(server_port, server_ip_address, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('app listening at http://%s:%s', host, port)
});