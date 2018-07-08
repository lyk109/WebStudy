// var net = require('net');
// var server = net.createServer(function(socket) {
// 	console.log("server is connected!")
// 	socket.on('data',function(data) {
// 		socket.write('HTTP/1.1 200 OK\r\n');
// 		socket.write('Transfer-Encoding: chunked\r\n');
// 		socket.write('\r\n');
// 		socket.write('8\r\n');
// 		socket.write('12345678\r\n');
// 		socket.write('0\r\n');
// 		socket.write('\r\n');
// 	})
// })

// server.listen(22222, function() {
// 	console.log('server is ready, waiting for connecting ...');
// })

var http = require('http');
var server = http.createServer();
server.on('request', function(request, response) {
	var url = request.url;
	if (url == '/hello') {
		response.end('hello');
	} else {
		response.end('home page');
	}
})

server.listen(3000, function() {
	console.log('server is ready!');
})