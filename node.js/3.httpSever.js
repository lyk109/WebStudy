var http = require("http");

var server = http.createServer();

server.on('request', function(request, response) {
	response.setHeader('Content-Type', 'text/plain; charset=utf-8')
	console.log(request.socket.remotePort);
	console.log(request.socket.localPort);
	console.log(response.socket.remotePort);
	console.log(response.socket.localPort);
	var products = [{
		name: 'Apple X',
		price: 8888
	}, {
		name: '华为p20 pro',
		price: 5000
	}, {
		name: 'xiami MIX2s',
		price: 8888
	}]
	if (request.url === '/product') {
		response.end(JSON.stringify(products))
	}
})

server.listen(8000, function() {
	console.log("http服务器已就绪...")
})