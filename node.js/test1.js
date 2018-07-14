var express = require('express');

var app = express();

// app.use('/public/', express.static('./public/'));

app.post('/post', function(req, res) {
	console.log(req);
})

app.use(express.static('./'));

app.listen(9000, function() {
	console.log('app server is online...')
})