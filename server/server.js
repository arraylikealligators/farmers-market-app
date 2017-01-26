var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes/routes.js');
var mongoose = require('mongoose');
var path = require('path');


var app = express();
var port = process.env.PORT || 8080;

let mongoURI = process.env.mongoURI || 'mongodb://user1:user1@ds117899.mlab.com:17899/fazzar';
mongoose.connect(mongoURI);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(path.join(__dirname, '../client')));
// var routes = require('./routes.js')(app, express);

app.listen(port);
console.log("server running on port " + port);

module.exports = app;
