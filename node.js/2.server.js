var net = require('net');
var talkContent = ['server: hi!','server: 2','server: 4','server: 6','server: 8','server: 10','server: 12','server: 14','server: 16']
var talkCount = 0;
var server = net.createServer(function(socket){
	console.log('server connected');  //第二步
	socket.on('end',function(){
		console.log("server disconnected");  //第六步
	});
	socket.on('data',function(data){
		console.log(data.toString());  //第四步
		setTimeout(function(){
			console.log(talkContent[talkCount]+'\r\n');
			socket.write(talkContent[talkCount++]+'\r\n');
		},1000);
		// socket.end('hello\r\n');
	});
});
server.listen(8124, function(){
	console.log('server bound');   //第一步
})