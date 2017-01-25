var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://user1:user1@ds117899.mlab.com:17899/fazzar');


var app = express();
app.use(routes);


app.use(bodyParser.json());


app.listen(8080);
console.log("server running")
module.exports = app;
