// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var db = mongoose.connect('mongodb://localhost:27017/studentsInfo');

// var studentSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	gender: {
// 		type: Number,
// 		required: true,
// 		enum: [0,1],
// 		default: 0
// 	},
// 	grade: {
// 		type: String,
// 		require: true
// 	}
// })

// var Student = mongoose.model('Student', studentSchema);

// var newStudent = new Student({
// 	name: 'Jack',
// 	gender: 1,
// 	grade: 'grade 1'
// })

// newStudent.save(function(err) {
// 	if (err) {
// 		console.log('database write failed');
// 	} else {
// 		console.log('database write successed');
// 		mongoose.disconnect();
// 	}
// })

// Student.remove({name: 'Jack'}, function(err, info) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('success');
// 		console.log(info);
// 		mongoose.disconnect();
// 	}
// })

// var a = [];
// for(var i = 0; i < 10; i++){
// 	a[i] = function() {
// 		return i**3;
// 	}
// }

var express = require('express');
var path = require('path');

var app =  new express();

app.use('/', express.static(path.join(__dirname + '/'))