var http = require('http');
var app = http.createServer();

app.get = function(url, callback) {
	app.on('request', function(req, res) {
		if (req.url === url) {
			res.send = function(content) {
				res.setHeader('Content-Type', 'text/html; charset=UTF-8');
				return res.end(content);
			};
			callback(req, res);
		}
	})
}

module.exports = function() {
	return app;
}