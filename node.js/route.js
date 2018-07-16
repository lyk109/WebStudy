module.exports = function(app) {
	app.get('/', function(req, res) {
		res.send('<h1>首页</h1><a href="/admin">登录</a>');
	})

	app.get('/admin', function(req, res) {
		res.send('<h1>登录页</h1><a href="/">回到首页</a>');
	})
}