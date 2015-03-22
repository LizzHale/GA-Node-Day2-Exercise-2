var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var pg = require('pg');
var models = require('./models/index.js');

var app = express();
var server = app.listen(3000);

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  models.Chirp.findAll({order: 'id DESC'}).done(function(error, chirps) {
    res.render('index', {
      chirp: chirps 
    });
  });
});

app.post('/add', function (req, res) {
  models.Chirp.create({
    chirp: req.body.chirp
  }).done(function(error, data) {
    res.redirect('/');
  });
});

app.get('/edit/:id', function (req, res) {
  models.Chirp.find(req.params.id).done(function(error, chirps) {
    res.render('edit', {
      chirp: chirps
    });
  });
});

app.put('/edit/:id', function (req, res) {
  models.Chirp.find(req.params.id).done(function(error, chirps) {
    chirps.updateAttributes({
      chirp: req.body.chirp
    }).done(function(error, data) {
      res.redirect('/');
    });
  });
});

