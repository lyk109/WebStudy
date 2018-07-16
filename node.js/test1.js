var express = require('express');

var app = express();

require('./route')(app);

app.listen(9001, function() {
	console.log('app server is online...')
})