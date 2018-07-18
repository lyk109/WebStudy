var express = require('express');
var fs = require('fs');
var path = require('path');

var User = require('./models/users.js')

var router = express.Router();

//社区首页
router.get('/', function(req, res) {
	res.render('index.html', {title: 'HOME'});
})

//社区注册页
router.get('/register', function(req, res) {
	res.render('register.html');
})

//注册信息处理
router.post('/register', function(req, res) {
	//处理注册用户的数据
	console.log(req.body);
	new User(req.body).save()
		.then(function() {
			console.log('successed!');
		}, function(err) {
			console.log(err);
		})
	//返回注册状态页
})

//社区登录页
router.get('/login', function(req, res) {
	res.render('login.html');
})

module.exports = router;