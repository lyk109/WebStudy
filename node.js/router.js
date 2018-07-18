var fs = require('fs');
var express = require('express');

var router = express.Router();

// CORS settings
router.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Hearders', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-with');
	res.header('Access-Control-Allow-Methods', "PUT,POST,GET,DELETE,OPTIONS");
	res.header('X-Powered-By', '3.2.1');
	next();
})

router.get('/', function(req, res) {
	fs.readFile(__dirname+'/index.html', function(err, data) {
		if (err) {
			res.end('failed to read file');
		} else {
			res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
			res.end(data.toString());
		}
	})
})

router.get('/paper1', function(req, res) {
	res.sendFile(__dirname + '/public/A 9 GHz Dual-Mode Digitally Controlled Oscillator for GSMUMTS Transceivers in 65 nm CMOS.pdf')
})

module.exports = router;