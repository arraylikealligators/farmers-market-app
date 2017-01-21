var express = require('express');
var bodyParser = require('body-parser')


var mongoose = require('mongoose');
mongoose.connect('mongodb://user1:user1@ds117899.mlab.com:17899/fazzar');
                

var app = express();
var routes = require('./routes.js')(app, express);


app.listen(8080);
app.use(bodyParser.json());
console.log("server running")


module.exports = app; 