#!/usr/bin/env node

var express = require('express');
var app = express();
var fs = require('fs')

app.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  
  if( req.originalUrl == '/' ){ 
      res.redirect('/index.html');
      return; }
      
  var msg = req.param('name');
    
  res.send( req.originalUrl  );
});

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