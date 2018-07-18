var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/blog');

var userSchema = new Schema({
	nickname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		required: true
	},
	createTime: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: '/public/img/avatar-default.png'
	},
	bio: {
		type: String,
		default: ''
	},
	gender: {
		type: Number,
		enum: [-1,0,1],
		default: -1
	},
	birthday: {
		type: Date
	},
	status: {
		type: Number,
		//无限制：0；限制评论：1；限制登录：2；
		enum: [0,1,2],
		default: 0
	}
})

module.exports = mongoose.model('User', userSchema);