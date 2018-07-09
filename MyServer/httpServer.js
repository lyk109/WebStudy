var http = require('http');
var server = http.createServer();
var template = require('art-template');
var fs = require('fs');
var util = require('util'); //util.inspect(request, {depth: null})

// create Server
var server = http.createServer();

// root Directory
var www = 'C:/Users/10959/Desktop/GitRepo/WebStudy/MyServer'

// handle Request
server.on('request', function(req, res) {
	
	//get request source path
	var url = req.url;
	var path = www + url;
	console.log(url);

	//assess the type of path
	fs.stat(path, function(err, stat) {

		if (err) {
			console.log(1);
			res.statusCode = 404;
			return res.end();
		}

		// if path is a directory
		if (stat.isDirectory()) {
			console.log(2);
			//read template file
			var folderTemplate = fs.readFileSync(www + '/folderTemplate.html').toString();
			var filesPath = fs.readdirSync(path);
			var files = filesPath.map(function(item) {
				var type = item.split('.');
				type = type.length - 1 ? type[type.length - 1] : 'folder';
				if(['jpg', 'png', 'gif', 'jpeg'].indexOf(type) >= 0){
					type = 'image';
				}
				return {
					name: item,
					className: type,
					url: url[url.length-1] == '/' ? url + item : url + '/' + item
				};
			})

			var html = template.render(folderTemplate, {
				files: files
			})

			res.setHeader('Content-Type', 'text/html; charset: utf-8');
			res.end(html);
		}

		//if path is a file
		else if (stat.isFile()) {
			console.log(3);
			fs.readFile(path, function(err, data) {

				if (err) {
					res.statusCode = 404;
					res.end();
					return console.log('failed to read file');
				}

				//handle the MIME type
				if (/\.html$/.test(path)) {
					res.setHeader('Content-Type', 'text/html; charset: utf-8');
					res.end(data.toString());
				} else if (/\.css$/.test(path)) {
					res.setHeader('Content-Type', 'text/css; charset: utf-8');
					res.end(data.toString());
				} else if (/\.(png|jpg|gif|jpeg)$/.test(path)) {
					res.setHeader('Content-Type', 'image/' + path.match(/(png|jpg|gif|jpeg)$/)[0]);
					res.end(data);
				} else if (/\.js$/.test(path)) {
					res.setHeader('Content-Type', 'application/javascipt; charset: utf-8');
					res.end(data.toString());
				} else {
					res.statusCode = 404;
					res.end();
				}
			})
		}

	});

})

// put server on service
server.listen(9000)