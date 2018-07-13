var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url');

var date = new Date().toLocaleString();
var comments = [{
	name: 'Jack',
	message: 'Nice day!',
	dateTime: date
},{
	name: 'Mark',
	message: "It's wonderful!",
	dateTime: date
},{
	name: 'Leo',
	message: "Haha, I'm coming",
	dateTime: date
}]

var server = http.createServer();

server.on('request', function(req, res) {
	var pathObj = url.parse(req.url, true);
	var path = pathObj.pathname;
	if (path === '/') {
		fs.readFile('messageBoard.html', function(err, data) {
			if(err){
				res.statusCode = 500;
				res.end();
			}else{
				var resHTML = template.render(data.toString(), {
					comments: comments
				});
				res.setHeader('Content-Type', 'text/html; charset=UTF-8');
				res.end(resHTML);
			}
		})
	}else if (path === '/post') {
		fs.readFile('post.html', function(err, data) {
			if (err) {
				console.log('ERROR : comment page not found');
				res.statusCode = 404;
				res.end();
			}else{
				res.setHeader('Content-Type', 'text/html; charset=UTF-8');
				res.end(data);
			}
		})
	}else if (path == '/comment') {
		var query = pathObj.query;
		query.dateTime = new Date().toLocaleString();
		comments.unshift(query);
		res.statusCode = 302;
		res.setHeader('Location', '/');
		res.end();
	}else if (path.indexOf('/public/') === 0) {
		fs.readFile('.' + path, function(err, data) {
			if (err) {
				console.log('ERROR : can not find ' + path);
				res.statusCode = 404;
			}else {
				res.setHeader('Content-Type', 'text/css');
				res.end(data);
			}
		})
	}else {
		res.statusCode = 404;
		res.end();
	}

})

server.listen(9000, function() {
	console.log('server is ready...');
})