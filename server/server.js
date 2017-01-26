var express = require('express');

var bodyParser = require('body-parser');
var morgan = require('morgan')
var app = express();
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');


mongoose.connect('mongodb://user1:user1@ds117899.mlab.com:17899/fazzar');
                

app.use(morgan('dev'));
app.use(bodyParser.json());

var routes = require('./routes.js')(app, express);


app.listen(port)
console.log("server running on port " + port);


module.exports = app; 