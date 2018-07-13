var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', function(req, res) {
	var path = req.url;
	if (path == '/') {
		fs.readFile('index.html', function(err,data) {
			if(err){
				res.end('failed to read file');
			}else{
				res.setHeader('Content-Type', 'text/html; charset=UTF-8');
				res.end(data.toString());
			}
		})
	}
})

server.listen(9000, function() {
	console.log('server is ready...');
})