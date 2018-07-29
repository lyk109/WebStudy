var board = document.getElementsByClassName('board')[0];
var td = board.getElementsByTagName('td');
var score = document.getElementById('score');

// 初始化游戏
function restart() {
	document.getElementsByClassName('endGame')[0].style.display = 'none';
	document.getElementsByClassName('endGame')[1].style.display = 'none';
	document.getElementsByClassName('container')[0].style.opacity = 1;
	for (var i = 0; i < 16; i++) {
		td[i].innerHTML = '';
	}
	var num1 = Math.floor(16*Math.random());
	var num2 = Math.floor(16*Math.random());
	while (num1 == num2) {
		num2 = Math.floor(16*Math.random());
	}
	td[num1].innerHTML = "<p>2</p>";
	td[num2].innerHTML = "<p>"+(Math.random() - 0.8 > 0 ? 4 : 2)+"</p>";
}
restart();

document.querySelectorAll('.dateTime')[0].innerText = new Date(document.querySelectorAll('.dateTime')[0].innerText).toLocaleString();
// 重新游戏
document.getElementById('restart').onclick = function() {
	restart();
}
document.getElementsByClassName('restart')[0].onclick = function() {
	restart();
}

//在空白处生成新的数字
function generate() {
	var hasEmpty = false;
	for (var i = 0; i < td.length; i++) {
		if (td[i].innerText == '') {
			hasEmpty = true;
		}
	}
	if (hasEmpty) {
		var num = Math.floor(16*Math.random());
		while (td[num].innerText) {
			var num = Math.floor(16*Math.random());
		}
		td[num].innerHTML = "<p>"+(Math.random() - 0.5 > 0 ? 4 : 2)+"</p>";
	}
	finish();
}

//判断是否结束
function finish() {
	var finished = true;
	for (var i = 0; i < 16; i++) {
		if (td[i].innerText == '') {
			finished = false;
			break;
		}
		if (i%4 !== 3 && td[i].innerText == td[i+1].innerText) {
			finished = false;
			break;
		}
		if (i < 12 && td[i].innerText == td[i+4].innerText) {
			finished = false;
			break;
		}
	}
	if (finished) {
		end();
		var xhr = new XMLHttpRequest();
		var score = document.getElementById('score').innerText;
		xhr.open('GET', '/2048/postScore?score=' + score);
		xhr.timeout = 10000;
		xhr.onload = function () {
			if (xhr.status == 500) {
				alert("分数上传失败");
			} else {
				alert("分数上传成功");
			}
		};
		xhr.ontimeout = function() {
			alert("分数上传响应超时");
		}
		xhr.send();
	}
}

//游戏结束
function end() {
	document.getElementsByClassName('endGame')[0].style.display = 'block';
	document.getElementsByClassName('endGame')[1].style.display = 'block';
	document.getElementsByClassName('container')[0].style.opacity = 0.5;
}

//更新分数
function freshScore(addScore) {
	var score = parseInt(document.getElementById('score').innerText);
	score = score + addScore;
	document.getElementById('score').innerText = score;
}

//设置数字对应类名
function numClass(num) {
	switch(num) {
		case 2:
		case 4:
			return 'small';
		case 8:
		case 16:
		case 32:
		case 64:
			return 'medium';
		case 128:
		case 256:
			return 'large';
		case 512:
			return 'num512';
		case 1024:
			return 'num1024';
		case 2048:
			return 'num2048';
		case 4096:
		case 8192:
			return 'num4096';
		case 16384:
			return 'extraLarge';

	}
}

// 封装移动方法
function move(element, direction, distance, callback) {
	if (distance == 0) {
			callback && callback();
			return;
		}
	var target = -75*distance;
	var timer = setInterval(function() {
		if (parseInt(getComputedStyle(element)[direction]) - target == 0) {
			callback && callback();
			clearInterval(timer);
			return;
		}
		var step = parseInt(getComputedStyle(element)[direction]) - target > 0 ? 5 : -5;
		element.style[direction] = parseInt(getComputedStyle(element)[direction])  - step + 'px';
	}, 2)
}

// 左滑
function left(n) {
	var tmp; //记录上一个数字
	var p = []; //记录包含数字的方块
	var distances = []; //记录原始数字需要移动的距离
	var nums = []; //记录新数字
	var position = 0;
	for (let i = 0+4*n; i < 4+4*n; i++) {
		if (td[i].innerText) {
			p.push(td[i].children[0]);
			if (parseInt(td[i].innerText) !== tmp) {
				tmp = parseInt(td[i].innerText);
				nums.push(tmp);
				position = nums.length - 1;
				distances.push(i-4*n-position);
			} else {
				tmp = undefined;
				if (position == nums.length - 1) {
					tmp = undefined;
					nums.push(2*nums.pop());
					addScore = addScore + nums[nums.length-1];
					distances.push(i-4*n-position);
					position = nums.length;
				} else {
					tmp = parseInt(td[i].innerText);
					nums.push(tmp);
					position = nums.length - 1;
					distances.push(i-4*n-position);
				}
			}
		}
	}
	for (let i = 0; i < p.length; i++) {
		move(p[i], 'left', distances[i], function() {
			if (i == p.length-1) {
				for (let j = 0+4*n; j < 4+4*n; j++) {
					if (nums[j - 4*n]) {
						td[j].innerHTML = '<p class='+numClass(nums[j - 4*n])+'>'+nums[j-4*n]+'</p>';
					} else {
						td[j].innerHTML = '';
					}
				}
			}
		});
	}
	for (let i = 0; i < distances.length; i++) {
		if (distances[i] >= 1) {
			return 1;
		}
	}
}

// 右滑
function right(n) {
	var tmp; //记录上一个数字
	var p = []; //记录包含数字的方块
	var distances = []; //记录原始数字需要移动的距离
	var nums = []; //记录新数字
	var position = 0;
	for (let i = 3+4*n; i > -1+4*n; i--) {
		if (td[i].innerText) {
			p.push(td[i].children[0]);
			if (parseInt(td[i].innerText) !== tmp) {
				tmp = parseInt(td[i].innerText);
				nums.push(tmp);
				position = 3 - (nums.length - 1);
				distances.push(position - (i - 4*n));
			} else {
				if (position == 3 - (nums.length - 1)) {
					tmp = undefined;
					nums.push(2*nums.pop());
					addScore = addScore + nums[nums.length-1];
					distances.push(position - (i - 4*n));
					position = 3 - nums.length;
				} else {
					tmp = parseInt(td[i].innerText);
					nums.push(tmp);
					position = 3 - (nums.length - 1);
					distances.push(position - (i - 4*n));
				}
			}
		}
	}
	for (let i = 0; i < p.length; i++) {
		move(p[i], 'left', -1*distances[i], function() {
			if (i == p.length-1) {
				for (let j = 3+4*n; j > -1+4*n; j--) {
					if (nums[3 - (j - 4*n)]) {
						td[j].innerHTML = '<p class='+numClass(nums[3 - (j - 4*n)])+'>'+nums[3 - (j - 4*n)]+'</p>';
					} else {
						td[j].innerHTML = '';
					}
				}
			}
		});
	}
	for (var i = 0; i < distances.length; i++) {
		if (distances[i] >= 1) {
			return 1;
		}
	}
}

//上滑
function up(n) {
	var tmp; //记录上一个数字
	var p = []; //记录包含数字的方块
	var distances = []; //记录原始数字需要移动的距离
	var nums = []; //记录新数字
	var position = 0;
	for (let i = 0; i < 4; i++) {
		var data = td[4*i+n];
		if (data.innerText) {
			p.push(data.children[0]);
			if (parseInt(data.innerText) !== tmp) {
				tmp = parseInt(data.innerText);
				nums.push(tmp);
				position = nums.length - 1;
				distances.push(i-position);
			} else {
				tmp = undefined;
				if (position == nums.length - 1) {
					tmp = undefined;
					nums.push(2*nums.pop());
					addScore = addScore + nums[nums.length-1];
					distances.push(i-position);
					position = nums.length;
				} else {
					tmp = parseInt(data.innerText);
					nums.push(tmp);
					position = nums.length - 1;
					distances.push(i-position);
				}
			}
		}
	}
	for (let i = 0; i < p.length; i++) {
		move(p[i], 'top', distances[i], function() {
			if (i == p.length-1) {
				for (let j = 0; j < 4; j++) {
					data = td[4*j+n];
					if (nums[j]) {
						data.innerHTML = '<p class='+numClass(nums[j])+'>'+nums[j]+'</p>';
					} else {
						data.innerHTML = '';
					}
				}
			}
		});
	}
	for (let i = 0; i < distances.length; i++) {
		if (distances[i] >= 1) {
			return 1;
		}
	}
}

//下滑
function down(n) {
	var tmp; //记录上一个数字
	var p = []; //记录包含数字的方块
	var distances = []; //记录原始数字需要移动的距离
	var nums = []; //记录新数字
	var position = 0;
	for (let i = 3; i > -1; i--) {
		var data = td[4*i+n];
		if (data.innerText) {
			p.push(data.children[0]);
			if (parseInt(data.innerText) !== tmp) {
				tmp = parseInt(data.innerText);
				nums.push(tmp);
				position = nums.length - 1;
				distances.push(3-i-position);
			} else {
				tmp = undefined;
				if (position == nums.length - 1) {
					tmp = undefined;
					nums.push(2*nums.pop());
					addScore = addScore + nums[nums.length-1];
					distances.push(3-i-position);
					position = nums.length;
				} else {
					tmp = parseInt(data.innerText);
					nums.push(tmp);
					position = nums.length - 1;
					distances.push(3-i-position);
				}
			}
		}
	}
	for (let i = 0; i < p.length; i++) {
		move(p[i], 'top', -distances[i], function() {
			if (i == p.length-1) {
				for (let j = 3; j > -1; j--) {
					data = td[4*j+n];
					if (nums[3-j]) {
						data.innerHTML = '<p class='+numClass(nums[3-j])+'>'+nums[3-j]+'</p>';
					} else {
						data.innerHTML = '';
					}
				}
			}
		});
	}
	for (let i = 0; i < distances.length; i++) {
		if (distances[i] >= 1) {
			return 1;
		}
	}
}

// 绑定事件
var isMoving = false;
var addScore = 0;
document.onkeydown = function(e) {
	if (isMoving) {
		return;
	} else {
		addScore = 0
		var hasMoved = false;
		if (e.key == 'ArrowLeft') {
			for (let n = 0; n < 4; n++) {
				if (left(n)) {
					hasMoved = true;
					isMoving = true;
				}
			}
		}
		if (e.key == 'ArrowRight') {
			for (let n = 0; n < 4; n++) {
				if (right(n)) {
					hasMoved = true;
					isMoving = true;
				}
			}
		}
		if (e.key == 'ArrowUp') {
			for (let n = 0; n < 4; n++) {
				if (up(n)) {
					hasMoved = true;
					isMoving = true;
				}
			}
		}
		if (e.key == 'ArrowDown') {
			for (let n = 0; n < 4; n++) {
				if (down(n)) {
					hasMoved = true;
					isMoving = true;
				}
			}
		}
		if (hasMoved) {
			setTimeout(function() {
				isMoving = false;
				freshScore(addScore);
				generate();
			}, 200)
		}
	}
}