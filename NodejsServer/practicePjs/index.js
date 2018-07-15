var express = require('express');
var template = require('art-template');
var fs = require('fs');
var url = require('url');

var app = express();

app.engine('html', require('express-art-template'));

app.use(express.static('./'))

//handle message board application
app.get('/messageBoard', function(req, res) {
	fs.readFile('./messageBoard/public/messages.json', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			res.send('服务器端发生错误...');
		} else {
			var messages = JSON.parse(data).messages;
			res.render('messageBoard.html', {
				messages: messages
			})
		}
	})
})

app.get('/messageBoard/post', function(req, res) {
	fs.readFile('./messageBoard/post.html', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			res.send('服务器端发生错误...');
		} else {
			res.send(data);
		}
	})
})

app.get('/comment', function(req, res) {
	var query = url.parse(req.url, true).query;
	query.dateTime = new Date().toLocaleString();
	fs.readFile('./messageBoard/public/messages.json', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			res.send('服务器端发生错误...');
		} else {
			var messages = JSON.parse(data).messages;
			messages.unshift(query);
			var messagesFile = JSON.stringify({
				messages: messages
			});
			fs.writeFile('./messageBoard/public/messages.json', messagesFile, function(err) {
				if (err) {
					res.statusCode = 500;
					res.send('服务器端发生错误...');
				} else {
					res.redirect('messageBoard');
				}
			});
		}
	})
})

app.listen(9000, function() {
	console.log('server is online...')
})