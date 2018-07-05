var http = require("http");

var server = http.createServer();

server.on('request',function(req,res){
	var products = [
	{
		name: 'Apple X',
		price: 8888
	},
	{
		name: '华为p20 pro',
		price: 5000
	},
	{
		name: 'xiami MIX2s',
		price: 8888
	}
	]
	if(req.url === '/product'){
		res.end(JSON.stringify(products));
	}
})

server.listen(8000, function(){
	console.log("http服务器已就绪...");
})