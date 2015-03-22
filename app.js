var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var pg = require('pg);
var models = require('./models/index.js');

var app = express();
var server = app.list(3000);

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

