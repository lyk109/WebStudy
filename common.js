//封装animate方法，获取元素elem的attr属性
//elem: HTMLElement  attr: String
function getstyle(elem, attr){
	return window.getComputedStyle ? window.getComputedStyle(elem)[attr] : elem.currentStyle(attr);
}

//animate方法，json中键值对表示elem的属性名和对应属性目标值数字值（px为单位）。缓动效果。
//elem: HTMLElement  json: Object
function animate(elem, json){
	elem.timerId = setInterval(function(){
		var finished = true;
		for(var attr in json){
			var current = parseInt(getstyle(elem, attr));
			var target = json[attr];
			var step = (target - current)/10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			current += step;
			elem.style[attr] = current + 'px';
			if(current != target){
				finished = false;
			}
		}
		if(finished){
			clearInterval(elem.timerId);
		}
	}, 20)
}