var fs = require('fs');

function pReadFile(path) {
	var p = new Promise(function(resolve, reject) {
		fs.readFile(path, function(err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
	return p;
}

function pWriteFile(path, data) {
	var p = new Promise(function(resolve, reject) {
		fs.writeFile(path, data, function(err, data) {
			if (err) {
				reject(path + '写入失败');
			} else {
				resolve(path + '写入成功');
			}
		});
	});
	return p;
}

// pReadFile('./public/1-small.jpg')
// 	.then(function(data) {
// 		console.log('1-samll.jpg读取成功');
// 		return pWriteFile('./public/1-small-copy.jpg', data);
// 	}, function(err) {
// 		console.log('1-samll.jpg读取失败');
// 	})
// 	.then(function() {
// 		return pReadFile('./public/2-small.jpg');
// 	})
// 	.then(function(data) {
// 		console.log('2-samll.jpg读取成功');
// 		return pWriteFile('./public/2-small-copy.jpg', data);
// 	}, function(err) {
// 		console.log('2-samll.jpg读取失败')
// 	})

