# XMLHttpRequest对象
XMLHttpRequest最早是在IE5引进的浏览器接口，可以用来发送http(s)请求，ajax也是因此而来的。后来W3C标准化了这个接口，也就是`XHR 2`。相比于`XHR 1`,`XHR 2`支持CORS,可以使用onload来代替readyState=4;

### XHR1与XHR2对比
- **XHR1**
	+ 只支持文本数据的传输，无法读取和上传二进制数据。
	+ 传送和接收数据时，没有进度信息，只能提示是否完成
	+ 收到同域限制
- **XHR2**
	+ 可以设置HTTP请求的时限
	+ 可以使用FormData对象管理表单数据
	+ 可以上传文件
	+ 可以发送跨域请求
	+ 可以获取服务器端二进制数据
	+ 可以获取数据传输进度

### 使用
```javascript
// 首先，实例化一个XMLHttpRequest对象
var xhr = new XMLHttpRequest();
// 然后定义发送请求的目标地址和方法
xhr.open('GET','127.0.0.1:5000');
// 设置请求时限: 5s
xhr.timeout = 5000;
// 请求超时事件
xhr.ontimeout = function(event) {
	alert('请求超时');
}
// 接收二进制数据
xhr.responseType = 'blob'; //默认'TEXT'
var blob = new Blob([xhr.response], {type: 'image/jpg'}); //以jpg图片举例
// 添加一个表单项
// 方式一：自定义一个FormData对象
var formData = new FormData();
formData = append('username','Jack');
formData = append('id', '123456');
// 方式二：通过网页表单元素来生成一个表单对象
var form = document.getElementById('myForm');
var formData = new FormData(form);
// 发送请求
xhr.send(formData);
```

### 常用属性
- [`readyState`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState) ：表示请求的状态，用数字表示，分别有：
	+ `0`: 表示请求还**未被打开**，即`xhr.open()`还未被调用；
	+ `1`: 表示请求还**未被发送**，即`xhr.send()`还未被调用；
	+ `2`: 表示**已获取响应头**。
	+ `3`: 表示**正在下载响应体**。
	+ `4`: 表示**整个请求完成**。
- [`status`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status) : 表示请求响应的状态码（200，301，404 ...）
- [`responseText`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText): 服务器返回的文本`数据`
- [`statusText`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText): 服务器返回的状态文本（200 OK, 301）
- [`timeout`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout): 一个整数(unsigned long)，设置超时自动终止请求的时间(ms)