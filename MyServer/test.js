var fs = require('fs');

// path is file or directory

// function need fs module
function isDirectory(path) {
	fs.stat(path, function(err, stats) {
		if(stats.isDirectory()){
			result = true;
		}
	})
}