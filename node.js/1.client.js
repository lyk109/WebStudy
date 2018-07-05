var net = require('net');
var talkContent = ['client: hello!','client: 1','client: 3','client: 5','client: 7','client: 9','client: 11','client: 13','client: 15'];
var talkCount = 0;
var client = net.connect({port: 8124},function(){
	console.log('client connected');  //第三步
	setTimeout(function(){
		console.log(talkContent[talkCount]+'\r\n');
		client.write(talkContent[talkCount++]+'\r\n');
	},1000)
});

client.on('data',function(data){
	console.log(data.toString());  //第五步
	if(talkContent[talkCount] == undefined){
		client.end();
		return;
	}
	setTimeout(function(){
		console.log(talkContent[talkCount]+'\r\n');
		client.write(talkContent[talkCount++]+'\r\n');
	},1000)
	// client.end();
})

client.on('end',function(){
	console.log('client disconnected');  //第六步
})