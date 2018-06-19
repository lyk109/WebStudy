//封装animate方法，获取元素elem的attr属性
//elem: HTMLElement  attr: String
function getStyle(elem, attr){
	return window.getComputedStyle ? window.getComputedStyle(elem)[attr] : elem.currentStyle(attr);
}

//animate方法，json中键值对表示elem的属性名和对应属性目标值数字值（px为单位）。缓动效果。
//到达所有目标后，执行fn;
//elem: HTMLElement  json: Object
function animate(elem, json, fn){
	clearInterval(elem.timerId);
	elem.timerId = setInterval(function(){
		var finished = true;
		for(var attr in json){
			if(attr == 'zIndex'){
				elem.style[attr] == json[attr];
			}else if(attr == 'opacity'){
				var current = parseInt(1000 * getStyle(elem, attr));
				console.log(current);
				var target = 1000 * json[attr];
				var step = (target - current)/10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				current += step;
				elem.style[attr] = current/1000 + '';;
				if(current != target){
					finished = false;
				}
			}else{
				var current = parseInt(getStyle(elem, attr));
				var target = json[attr];
				var step = (target - current)/10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				current += step;
				elem.style[attr] = current + 'px';
				if(current != target){
					finished = false;
				}
			}
		}
		if(finished){
			clearInterval(elem.timerId);
			if(fn){
				fn();
			};
		}
	}, 20)
}