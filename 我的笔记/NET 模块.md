## NET 模块

###1. 概念

​	NET模块与HTTP模块，前者是基于TCP的封装，而后者本质是TCP层，但是做了比较多的数据封装，我们视之为更高层。

### 2. 引入

​	使用  `require`方法引入net模块，即可使用net模块的方法。

​	`var net = require('net')`	

### 3. 服务器端构建

​	NET模块提供   `createServer(fn)` 方法来创建服务器，当服务器被连接时，服务器便会生成一个socket对象并传给函数回调函数`fn`，同时执行该函数。下面是一个服务器端例子：

> var net = require('net');
>
> 
>
> // 当收到客户端连接请求时，执行下面的函数
>
> var server = net.createServer(function(socket){
>
> ​	console.log('server connected');
>
> ​	// 当接收到客户端发送的数据时，执行下面函数
>
> ​	socket.on('data', function(data){
>
> ​		//打印客户端发送过来的数据
>
> ​		console.log(data.toString())
>
> ​		//向客户端发送 'Hello, this is server!\n\r'
>
> ​		socket.write('Hello, this is server!\n\r');
>
> ​		//向客户端发送 'Bye!\n\r'，并结束连接。
>
> ​		socket.end('Bye!\n\r')
>
> ​	})
>
> ​	//当连接断开时，执行下面函数
>
> ​	socket.on('end',function(){
>
> ​		console.log('sever disconnected')
>
> ​	})
>
> })
>
> 
>
> // 开启服务器，监听端口5000，同时执行下面函数
>
> server.listen(5000,function(){
>
> ​	console.log("server started: port 5000.")
>
> })

### 4.客户端程序构建

​	NET模块提供   `connect({port:5000},fn)`方法来创建TCP连接，该方法第一个参数传入一个对象，对象中port可以指定TCP端口。当连接到服务器成功时，则执行函数 `fn`。下面是一个客户端程序例子（可结合上面服务器端进行连接测试）：

> var net = require('net');
>
> // 发起TCP连接，当客户端成功连接到服务器时，执下面函数
>
> var client = net.connect({port: 5000}, function(){
>
> ​	console.log('client connected')；
>
> ​	// 向服务器发送 'hello, this is client!\n\r'
>
> ​	client.write('hello, this is client!\n\r');
>
> })
>
> // 当接收到服务器端数据时，执行下面函数
>
> client.on('data',function(data){
>
> ​	// 打印服务器发来的数据
>
> ​	console.log(data.toString());
>
> ​	// 结束连接
>
> ​	client.end();
>
> })
>
> // 当连接结束时，执行下面函数
>
> client.on('end',function(){
>
> ​	console.log('client disconnected');
>
> })

### 5.服务器客户端执行顺序

1. 服务器端：server.listen(5000,fn)      开启服务器，监听port端口，执行fn；

2. 客户端：connect({port: 5000},fn)     创建客户端，并向服务器发起连接请求;

3. 服务器端：执行创建服务器时所传入的函数，即createServer(fn)中的fn;

   客户端：执行创建客户端是所传入的函数，即connect({port: 5000},fn)中的fn;

4. client.on('data',fn): 当客户端接收到服务器端发来的数据则执行fn;

   server.on('data',fn): 当服务器端接收到客户端发来的数据则执行fn;

   client.on('end',fn)和server.on('end',fn): 当连接结束时，执行fn。

**备注：**TCP连接的结束可以由client和server任意一方发起。