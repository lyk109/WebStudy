# vue框架

```javascript
var vm = new Vue({
    // Vue实例被挂载的元素
	el: '#app',
    // Vue实例中定义数据集
	data: {
		name: 'Evan You',
		message: 'Vue test',
		htmlStr: "<h1>h1 Title</h1>",
		className: 'class1'
	},
    // Vue实例中定义的方法
	methods: {
		fn: function() {
			alert(this.message);
		}
	},
    // Vue实例中定义的过滤器
	filters: {
		filter1: function(){};
	},
    // Vue实例中的自定义指令
	directives: {
		focus: {
			inserted: function(el) {
				el.focus();
			}
		}
	}
})
```

### v-cloak
用来防止页面在vuejs加载完成之前对用户显示vue的模块语法，Vue加载完成后会移除包含v-cloak属性的标签的display:none的css属性。

### v-text与{{ }}

```html
<!-- 当v-text=""空字符串时，标签中内容会正常显示，即v-text无效果 -->
<div v-text="">这里面的内容在vueJs加载后会失效</div>
```

### v-html
将字符串以HTML的形式解析
```html
<!-- 当v-html=""空字符串时，标签中内容会正常显示，即v-html无效果 -->
<div v-html="htmlStr"></div>
```
### v-bind:attrName
用来绑定属性，可以写入合法的js表达式
```html
<div v-bind:class="className"></div>
<!-- 可简写为下面的形式 -->
<div :class="className"></div>
```
### v-on:eventName
用来绑定事件可用@替代即: `@eventName`
v-on:eventName.stop 阻止冒泡
v-on:eventName.prevent 阻止默认事件
v-on:eventName.capture 添加事件侦听时使用捕获机制
v-on:eventName.self 触发源是本身时才触发
v-on:eventName.once 只触发一次

### v-model
实现表单元素和Model中数据的双向绑定
```html
<!--通过组合value属性和事件keyup来实现双向绑定-->
<input type="text" v-bind:value="message" v-on:keyup="updateValue">
<!--Vue自带的双向绑定方法-->
<input type="text" v-model="message">
<script>
	new Vue({
		el: "#app",
		data: {message: '123'},
		methods: {
			updateVaule: function(e) {
				this.message = e.target.value;
			}
		}
	})
</script>
```

### v-for
+ 迭代数组
```html
	<ul>
		<li v-for="(item,i) in list">索引：{{ i }} 元素：{{ item }}</li>
	</ul>
```
+ 迭代对象
```html
	<div v-for="(key,value,i) in userObj"></div>
```
+ 迭代数字
```html
	<p v-for="i in 10">这是第{{ i }}个p标签</p>
```

> **在使用v-for迭代时，最好加上v-bind:key属性来唯一标识迭代元素，防止功能错误**

### v-if 和 v-show

+ v-if的不满足条件的元素直接移除dom元素
+ v-show则是隐藏相应元素（display:none）
- 正常显示时
```html
<h1 v-if='true'>v-if</h1>
<h1 v-show='true'v-show></h1>
```
```html
<!-- 解析之后在DOM中为 -->
<h1>v-if</h1>
<h1>v-show</h1>
```
- 隐藏时
```html
<h1 v-if="false">v-if</h1>
<h1 v-show="false">v-show</h1>
```
```html
<!-- 解析之后在DOM中为 -->
<h1 style="display:none;"></h1>
```

### 为元素绑定类名
+ 方式一：数组 --->
```html
<h1 v-bind:class="['red','italic',flag?'thin':'']"></h1>
```
+ 方式二：对象 --->
```html
<h1 v-bind:class="classObj"></h1>
```
classObj是Vue实例中的data中的数据，其值的形式为：{red: true, italic: false, thin: false}，其中true和false则表示是否激活该类名

### 元素的内联样式
+ 可以直接传入一个样式的对象：
```html
<h1 v-bind:style="styleObj"></h1>
```
+ 可以以数组形式闯入一个组对象：
```html
<h1 v-bind:style="[styleObj1,styleObj2]"></h1>
```

### 过滤器
```javascript
// data的值时规定死的，永远表示过滤器管道符前的数据
Vue.filter('过滤器名称', function(data, arg) {
	var newData = fn(data);
	return newData;
	})
// 私有化过滤器
new Vue({
    filter: {
        "filter name": function() {
            // filt method;
        }
    }
})
```

### 自定义设置
+ 自定义按键修饰符：Vue.config.keycode.(名字) = （按键的keycode）
```javascript
Vue.config.keycode.f2 = 113 //类似于这种形式
```
+ 自定义指令:
```javascript
Vue.directive(指令名，{
		bind: function(el) {
			// 每当指令绑定到元素身上时立即执行
		}，
		inserted： function(el) {
			// 元素插入到DOM中时，会执行
		}，
		updated: function(el) {
			// 元素v-node更新时，会执行
		}
	})
```
### 生命周期

`beforeCreate` --> `created` --> `beforeMount` --> `mounted` --> `beforeDestroy` --> `destroyed`

`mounted` --> `beforeUpdate` --> `updated`