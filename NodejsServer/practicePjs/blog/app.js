var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

//public and module files configuraion
app.use('/public/',express.static(path.join(__dirname, '/public/')));
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules')));

//body-parser configuration for POST request
app.use(bodyParser.urlencoded( {extented: false}));
app.use(bodyParser.json());

//express template engine configuration
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, '/views/'));

//cookie configuration
app.use(session({
	secret: 'lykBlog',
	resave: false,
	saveUninitialized: true
}))

//router configuration
app.use(require('./router'));

//start express server at port 9000
app.listen(9000, function() {
	console.log('express blog server is started ...');
})