var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes/routes.js');
var mongoose = require('mongoose');


var app = express();
var port = process.env.PORT || 8080;

<<<<<<< HEAD
=======
var mongoose = require('mongoose');


>>>>>>> database
mongoose.connect('mongodb://user1:user1@ds117899.mlab.com:17899/fazzar');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(routes);

// var routes = require('./routes.js')(app, express);

app.listen(port);
console.log("server running on port " + port);

module.exports = app;
