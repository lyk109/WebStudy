var express = require('express');

var app = express();

app.use('/public/', express.static('./public/'));

app.listen(9000, function() {
	console.log('app server is online...')
})