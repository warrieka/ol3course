#!/usr/bin/env node
var express = require('express');
var path = require('path');
var mds = require('markdown-serve')
var fs = require('fs')

/*create the app*/
var app = express();

app.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.resolve(__dirname , 'public')));

/*render markdown*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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