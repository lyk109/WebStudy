var express = require('express');
var fs = require('fs');
var path = require('path');
var md5 = require('blueimp-md5');

var User = require('./models/users.js')

var router = express.Router();

//社区首页
router.get('/', function(req, res) {
	console.log(req.session);
	res.render('index.html', {
		title: 'HOME',
		user: req.session.user,
	});
})

//退出账户
router.get('/logout', function(req, res) {
	req.session.user = null;
	res.redirect('/');
})

//社区注册页
router.get('/register', function(req, res) {
	res.render('register.html');
})

//注册请求信息处理
router.post('/register', function(req, res) {
	//处理注册用户的数据: 将注册用户信息添加到数据库
	//判断用户是否已经存在
	req.body.password = md5(md5(req.body.password));
	User.findOne({nickname: req.body.nickname})
		.then(function(data) {
			if (data) {
				return '用户昵称已存在！';
			} else {
				return User.findOne({email: req.body.email});
			}
		})
		.then(function(data) {
			if (data) {
				data = data == '用户昵称已存在！' ? data : '该邮箱已被注册'
				res.send(data);
			} else {
				new User(req.body).save()
					.then(function(user) {
						console.log('用户信息保存成功');
						//使用Session记录用户登录状态
						req.session.user = user;
						res.send('注册成功！');
					}, function(err) {
						console.log('保存失败！');
						console.log(err._message);
						res.send('注册失败！')
					})
			}
		})
})

//社区登录页
router.get('/login', function(req, res) {
	res.render('login.html');
})


//社区登录请求信息处理
router.post('/login', function(req, res) {
	req.body.password = md5(md5(req.body.password));
	User.findOne(req.body)
		.then(function(user) {
			if (user) {
				req.session.user = user;
				res.send('登陆成功！');
			} else {
				res.send('用户名或密码错误，请重试！')
			}
		}, function(err) {
			res.send('服务器异常！请稍后重试。');
		})
});

//其他未知路径
router.get(/./, function(req, res) {
	res.render('layout.html', {title: 'HOME'});
})

module.exports = router;