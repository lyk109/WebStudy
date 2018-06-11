//利用数组实现列表结构
// List.prototype = Object.create(Array.prototype);
// function List(){
// 	this.listSize = 0;
// 	this.pos = 0;
// 	this.clear = function(){
// 		this.pos = 0;
// 		this.listSize = 0;
// 		for(var i = this.length - 1; i >= 0; i--){
// 			this.pop();
// 		}
// 		return this;
// 	}
// 	this.getElement = function(){
// 		return this[this.pos];
// 	}
// 	this.insert = function(exitItem, newItem){
// 		var position = this.indexOf(exitItem);
// 		if(position >= 0){
// 			this.splice(position+1,0,newItem);
// 			this.listSize += 1;
// 		}else{
// 			return exitItem + ' is not exist!'
// 		}
// 		return this;
// 	}
// 	this.append = function(item){
// 		this.push(item);
// 		this.listSize += 1;
// 	}
// 	this.remove = function(item){
// 		var position = this.indexOf(item);
// 		this.splice(position,1);
// 		this.listSize -= 1;
// 	}
// 	this.front = function(){
// 		this.pos = 0;
// 	}
// 	this.end = function(){
// 		this.pos = this.length - 1;
// 	}
// 	this.next = function(){
// 		if(this.pos < this.length){
// 			this.pos = this.pos + 1;
// 		}else{
// 			return 'at last position';
// 		}				
// 	}
// 	this.prev = function(){
// 		if(this.pos > 0){
// 			this.pos = this.pos - 1;
// 		}else{
// 			return 'at first position';
// 		}
// 	}
// 	this.currPos = function(){
// 		return this.pos;
// 	}
// 	this.moveTo = function(newPos){
// 		if(0 <= newPos && newPos < this.length){
// 			this.pos = newPos;
// 		}else{
// 			return newPos + ' is out of range!';
// 		}	
// 	}
// }
//利用数组实现栈
// function Stack(){
// 	this.dataStore = [];
// 	this.length = 0;
// 	this.top = 0;
// 	this.peek = undefined;
// 	this.empty = true;
// 	this.clear = clear;
// 	this.pop = pop;
// 	this.push = push;
// }