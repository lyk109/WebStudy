var fs = require('fs');
fs.readFile('test1.js',function(error,data){
	console.log(data);  //默认二进制转十六进制。
	console.log(data.toString());
});