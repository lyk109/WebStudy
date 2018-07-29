var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
	res.writeHead(200,{"Access-Control-Allow-Origin": "*"});
	res.end('from'+req.url);
})

server.listen(5000)