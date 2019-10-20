---
title: 'Nodejs系列-1-基础'
date: 2019-10-08 09:47:51
tags: [note]
categories: Nodejs
---
## Nodejs是什么？
官网是这样介绍Nodejs的：Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。  

那么，NodeJs、 V8 和JavaScript 三者之前到底是怎样一种关系？这些我们经常挂在嘴边的东西，本文我们再一次进行梳理。


<!-- more -->
### JavaScript 运行时
运行时是一种面向对象的编程语言（面向对象编程）的运行环境。如chrome、火狐、Edge或者Safari等浏览器每个浏览器都有一个JS运行时环境。浏览器对外暴露的供开发者使用的Web API就位于其中。除此之外，用来解析代码的Javascript引擎也是位于JS运行时环境中的。  

我们可以把JS的运行时环境（浏览器V8引擎为例）看作一个大的容器，里面有一些其他的小容器。当JS引擎解析代码时，就是把代码片段分发到不同的容器里：

- **堆**: V8引擎遇到变量声明和函数声明的时候，就把它们存储在堆里面;
- **栈**：当引擎遇到像函数调用之类的可执行单元，就会把它们推入调用栈;
- **web API 容器**：事件监听函数、HTTP／AJAX请求、定时器函数等;
- **回调队列(event loop)**：回调队列会按照添加的顺序存储所有的回调函数，然后等待执行栈为空。当执行栈为空的时候，回调队列会把队列首部的那个回调函数推入执行栈。当执行栈再次为空的时候，再将此时队列首部函数推入;
- **事件循环(callback queue)**：事件循环可以被看作是JS运行时环境中的这样的一个东西：它的工作是持续的检测调用栈和回调队列，如果检测到调用栈为空，它就会通知回调队列把队列中的第一个回调函数推入执行栈。更详细可参考[Nodejs系列-2-EventLoop](https://blog.mhwang.club/Nodejs%E7%B3%BB%E5%88%97-2-EventLoop/#more/);
- **阻塞与非阻塞I/O**: 如HTTP请求处理模式;


而Node.js为Javascript提供了一个完全不一样的运行时环境. Node.js 不会提供DOM树、AJAX、以及其他的Web API。但是，在Node环境下你可以安装你需要的包来构建你的程序。

### JavaScript 调用栈（Call Stack）

JavaScript 是一门单线程的语言，这意味着它只有一个调用栈，因此，它同一时间只能做一件事。   

调用栈是一种数据结构，它记录了我们在程序中的位置。如果我们运行到一个函数，它就会将其放置到栈顶。当从这个函数返回的时候，就会将这个函数从栈顶弹出，这就是调用栈做的事情(ps：堆栈执行顺序是先进后出，就像往桶里面放东西)。 

当达到调用栈最大的大小的时候就会发生这种情况(chrome中)：

![](2.png)

单线程执行代码是无法充分利用CPU资源，使得运行效率低。由于JavaScript只有一个调用栈，为了提高JavaScript的执行效率，解决方案就是采用异步调用，而内部处理执行机制就是利用事件循环-[EventLoop](https://blog.mhwang.club/Nodejs%E7%B3%BB%E5%88%97-2-EventLoop/#more/)

### V8 概述

V8 作为一个 JavaScript 引擎，最初是服役于 Google Chrome 浏览器的。它随着 Chrome 的第一版发布而发布以及开源。现在它除了 Chrome 浏览器，已经有很多其他的使用者了。诸如 NodeJS、MongoDB、CouchDB 等。

V8使用C++开发, 最主要的工作就是「把 JavaScript 直译成机器码，然后运行」。采用的是即时编译技术（JIT：just-in-time compiler），并没有产生二进制码或其他的中间码。

### V8 In NodeJS


    ├── ...
    ├── deps
    │   ├── ...
    │   ├── v8
    │   ├── ...
    ├── ...
    ├── lib
    │   ├── ...
    │   ├── buffer.js
    │   ├── child_process.js
    │   ├── console.js
    │   ├── ...
    ├── node -> out/Release/node
    ├── ...
    ├── out
    │   ├── ...
    │   ├── Release
    |         ├── node
    |         ├── node.d
    |         ├── obj
    |             └── gen
    |                 ├── ...
    |                 ├── node_natives.h
    |                 ├── ...
    │   ├── ...
    ├── src
    │   ├── ...
    │   ├── debug-agent.cc
    │   ├── debug-agent.h
    │   ├── env-inl.h
    │   ├── env.cc
    │   ├── ...
    ├── 
    ...

需要关注的几个目录和文件：

- `/deps/v8`：这里是V8源码所在文件夹，你会发现里面的目录结构跟V8源码十分相似。NodeJS除了移植V8源码，还在增添了一些内容。

- `/src`：由C/C++编写的核心模块所在文件夹，由C/C++编写的这部分模块被称为「Builtin Module」

- `/lib`：由JavaScript编写的核心模块所在文件夹，这部分被称为「Native Code」，在编译Node源码的时候，会采用V8附带的js2c.py工具，把所有内置的JavaScript代码转换成C++里面的数组，生成out/Release/obj/gen/node_natives.h文件。有些 Native Module 需要借助于 Builtin Module 实现背后的功能。

- `/out`：该目录是Node源码编译(命令行运行make)后生成的目录，里面包含了Node的可执行文件。当在命令行中键入node xxx.js，实际就是运行了out/Release/node文件。

V8在NodeJs运行时的整体过程:

![](1.png)

Node在启动的时候，就已经把 Native Module，Builtin Module 加载到内存里面了。后来的 JavaScript 代码，就需要通过 V8 进行动态编译解析运行。

### Nodejs 概述
Node.js是一个Javascript运行环境(runtime)。实际上它是对Chrome V8引擎进行了封装。V8引擎执行Javascript的速度非常快，性能非常好。但是NodeJS并不是提供简单的封装，然后提供API调用，Node对一些特殊用例进行了优化，提供了替代的API，使得V8在非浏览器环境下运行得更好。如增加Buffer类来处理二进制数据等。

## NodeJs的REPL

REPL（Read-Eval-Print Loop） 中文的话有翻译成：交互式解释器 或 交互式编程环境。  

交互式解释器（REPL）既可以作为一个独立的程序运行，也可以很容易地包含在其他程序中作为整体程序的一部分使用。REPL为运行JavaScript脚本与查看运行结果提供了一种交互方式，通常REPL交互方式可以用于调试、测试以及试验某种想法。

基本上所有的脚本语言有REPL的。

Node.js 自身也使用 repl 模块为执行 JavaScript 代码提供交互接口。

![](4.png)

也可以在在一个 Node.js 实例中启动多个 REPL 实例（引入nodejs 内置的repl模块）：

    //repl-demo.js 
    const repl = require('repl');
    const msg = 'message';

    repl.start('> ').context.m = msg;

运行结果：

![](5.png)
## NodeJs中的全局(global)对象
类似浏览器全局对象 window，但是 node（ECMAScript） 环境中是没有window的（本质上，浏览器的window 其实就是扩展自ECMAScript中的 global）

### 日志打印

    console对象

### 文件路径类
当前文件（模块）所在目录

    __dirname

当前文件（模块）的文件名称（包含文件绝对路径）

    __filename

### 定时器类

    setTimeout()/clearTimeout()
    setInterval()/clearInterval()
    setImmediate()/clearImmediate()

### 模块对象类

    module
    exports
    require

### 进程类
    process

### 文件buffer

    Buffer	

## 参考文章
- [JavaScript、Node.js与V8的关系](https://segmentfault.com/a/1190000014722508)
- [【译】JS运行时环境](https://juejin.im/post/5c7be69e51882555a8223325)

##  概述
path 模块提供用于处理文件路径和目录路径的实用工具，path的几乎所有操作均不检测文件是否真是存在，只针对路径字符串本身进行解析。

## path.dirname
方法返回 path 的目录名，类似于 Unix 的 dirname 命令

    path.dirname(path)

例子：

    const path =require("path");
    const static=path.join(__dirname,'static/js/app.js');
    console.log(path.dirname(static))

运行结果：

    D:\MyProject\DEMO-CODE\PATH\static\js

## path.extname
方法返回 path 的扩展名，从最后一次出现 `.`（句点）字符到 path 最后一部分的字符串结束。没有则返回空

    path.extname(path)

例子：

    const path =require("path");
    const static=path.join(__dirname,'static/js/app.js');
    console.log(path.extname(static))

运行结果：

    .js
## path.basename
方法返回 path 的最后一部分，类似于 Unix 的 basename 命令。

    path.basename(path[, ext])

例子：

    const path =require("path");
    const static=path.resolve('static','js','app.js');
    console.log(path.basename(static))
    console.log(path.basename(static,'.js'))

运行结果：

    app.js
    app
## path.step(属性)
提供平台特定的路径片段分隔符：
    Windows 上是 `\`。
    POSIX 上是 `/`。  

例子：
    
    const path =require("path");
    const static=path.resolve('static','js','app.js');
    console.log(static.split(path.sep))

运行结果：

    [ 'D:', 'MyProject', 'DEMO-CODE', 'PATH', 'static', 'js', 'app.js' ]  
## path.join
方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。Unix系统是`/`，Windows系统是`\`。

    path.join([...paths])

例子:

    const path =require("path");
    const static=path.join('static','js','app.js');
    console.log(static)

运行结果：

    static\js\app.js

## path.resolve

方法将路径或路径片段的序列解析为绝对路径。如果没有传入 path 片段，则 path.resolve() 将返回当前工作目录的绝对路径

    path.resolve([...paths])

例子：

    const path =require("path");
    const static=path.resolve('static','js',"app.js","..");
    console.log(static)
    console.log(path.resolve())

运行结果：

      D:\MyProject\DEMO-CODE\PATH\static\js
      D:\MyProject\DEMO-CODE\PATH

### path.resolve 与 path.join 区别

join是把各个path片段连接在一起； resolve把`／`当成根目录，在传入非`/`路径时，会自动加上当前目录形成一个绝对路径，而join仅仅用于路径拼接。


      const path =require("path");
      const static=path.join('static','js','app.js');
      const static1=path.join('../static','js','app.js');
      const static2=path.resolve('static','js','app.js');
      const static3=path.resolve('../static','js','app.js')
      console.log(static)
      console.log(static1)
      console.log(static2)
      console.log(static3)

运行结果：

      static\js\app.js
      ..\static\js\app.js
      D:\MyProject\DEMO-CODE\PATH\static\js\app.js
      D:\MyProject\DEMO-CODE\static\js\app.js

join只会做拼接，而resolve将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在。

## path.relative
法根据当前工作目录返回 from 到 to 的相对路径。

    path.relative(from, to)

例子，

    const path =require("path");
    const static=path.resolve('static','js','app.js');
    const img=path.resolve('static','img','20190701223743,jpg');
    console.log(path.relative(img,static))

将返回从img目录进入static目录的相对路径

      ..\\..\\js\\app.js

如果两个不在一个盘符下，将返回参数to的路径

    const path =require("path");
    const cDir=path.resolve(process.argv[0]);
    console.log(path.relative(img,cDir))

结果为：

      C:\\Program Files\\nodejs\\node.exe
## path.parse
法返回一个对象，其属性表示 path 的重要元素。 尾部的目录分隔符将被忽略，

    path.parse(path)

例子：

    const path =require("path");
    const static=path.resolve('static','js','app.js');
    console.log(path.parse(static))

运行结果

    { root: 'D:\\',
    dir: 'D:\\MyProject\\DEMO-CODE\\PATH\\static\\js', //文件目录
    base: 'app.js', //文件名
    ext: '.js', //文件扩展名
    name: 'app' } //文件名称


## Http概述
http模块主要用于搭建HTTP服务。大体上可以分为两个部分：客户端http请求 与 服务端http响应 

## 客户端http请求
利用http模块向服务器发送http请求：

### http.request
    http.request(url[, options][, callback])

我们将远端js文件下载到本地

      const http = require("http");
      const fs=require("fs");
      const path=require("path");
      const options = {
        hostname: 's29.9956.cn',
        port: 80,
        path: '/static/common/js/vue.min.js?v=1549865000',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };
      let filename = path.resolve('vue.js');
      let writeStream = fs.createWriteStream(filename,{encoding:'utf8'});
      const req = http.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`数据写入中...`);
          writeStream.write(chunk)
        });
        res.on('end', () => {
          console.log('响应中已无数据');
          writeStream.end();
        });
      });

      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
      });
      req.end(); //使用 http.request() 时，必须始终调用 req.end() 来表示请求的结束，即使没有数据被写入请求主体。

运行结果：

      状态码: 200
      响应头: {"server":"Tengine","content-type":"application/javascript; charset=utf-8","content-length":"85310","connection":"close","vary":"Accept-Encoding","date":"Fri, 16 Aug 2019 11:19:19 GMT","last-modified":"Thu, 27 Jun 2019 02:03:26 GMT","etag":"\"5d1423ee-14d3e\"","accept-ranges":"bytes","ali-swift-global-savetime":"1565954359","via":"cache21.l2cn1807[0,200-0,H], cache22.l2cn1807[0,0], kunlun4.cn698[0,200-0,H], kunlun2.cn698[0,0]","age":"5519659","x-cache":"HIT TCP_MEM_HIT dirn:11:519083382","x-swift-savetime":"Mon, 09 Sep 2019 10:23:15 GMT","x-swift-cachetime":"7776000","timing-allow-origin":"*","eagleid":"3da864a015714740181924794e"}
      数据写入中...
      数据写入中...
      数据写入中...
      响应中已无数据

最终文件被下载到本地

### http.get
由于大多数请求都是没有主体的 GET 请求，因此 Node.js 提供了这个便捷的方法。 这个方法与 http.request() 的唯一区别是它将方法设置为 GET 并自动调用 req.end()：

    http.get(url[, options][, callback])

例子：

    const http = require("http");
    http.get("http://pv.sohu.com/cityjson?ie=utf-8",(res)=>{
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        console.log(rawData)
      });
    }).on('error', (e) => {
      console.error(`出现错误: ${e.message}`);
    });

运行结果：

    var returnCitySN = {"cip": "115.60.61.16", "cid": "410100", "cname": "河南省郑州市"};

### http.ClientRequest
http.ClientRequest是由http.request或者是http.get返回产生的对象，表示一个已经产生而且正在进行中的HTPP请求。

一般会显式地在这个对象上绑定监听函数来监听整个请求的状态，如：`req.on("error")` 监听异常，`req.end()`结束发起的http请求

## 服务端http响应

通过http模块在服务端创建http服务，处理客户端的请求返回对应相应数据

### http.Server

通过实例化http.Server即可创建http服务, http.Server是一个基于事件的服务器，它是继承自EventEmitter，http.Server提供的事件如下：

    - request：当客户端请求到来时，该事件被触发，提供两个参数req和res，表示请求和响应信息，是最常用的事件
    - connection：当TCP连接建立时，该事件被触发，提供一个参数socket，是net.Socket的实例
    - close：当服务器关闭时，触发事件（注意不是在用户断开连接时） 
    - listen：启动一个服务器来监听连接，listen存在多个可能的参数
        server.listen(handle[, backlog][, callback])
        server.listen(options[, callback])
        server.listen(path[, backlog][, callback]) 用于 IPC 服务器。
        server.listen([port[, host[, backlog]]][, callback]) 用于 TCP 服务器。

例子：

      const http=require("http");
      const server=new http.Server();
      server.listen(8080)
      server.on("request",function(req,res){
          res.writeHead(200,{
              "content-type":"text/plain"
          });
          res.write("hello nodejs");
          res.end();
      });
      server.on("close",()=>{
        console.log("http服务关闭")
      })

      server.on("connection",()=>{
        console.log("TCP连接建立")
      })
      setTimeout(()=>{
        server.close()
      },5000)

打开本机浏览器访问`http://localhost:8080/`,得到内容：

      hello nodejs

服务端运行结果：

      TCP连接建立
      http服务关闭

### http.createServer
我们也可以使用http.createServer方法来创建服务，塔返回了一个http.Server对象

    http.createServer([options][, requestlistener])

参数说明：

    - options <Object>
      IncomingMessage <http.IncomingMessage> 指定要使用的 IncomingMessage 类。用于扩展原始的 IncomingMessage。默认值: IncomingMessage。
      ServerResponse <http.ServerResponse> 指定要使用的 ServerResponse 类。用于扩展原始 ServerResponse。默认值: ServerResponse。
    - requestListener <Function>

我们在本地开启一个http服务，且根据不同地址返回不同的内容，根目录请求返回一个本地文件：

    const http = require('http');
    const fs = require('fs');
  
    const service=http.createServer( (request, response)=>{
      if (request.url == "/") {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(`${__dirname}/index.html`).pipe(response);
      }else{
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("404 error! File not found.");
      }
      
    })
    service.listen(8080);
    console.log('Server running on port 8080.');


### http.ServerResponse
http.ServerResponse是返回给客户端的信息，决定了用户最终看到的内容，一般也由http.Server的request事件发送，并作为第二个参数传递，它有三个重要的成员函数，

- res.writeHead(statusCode,[heasers])：向请求的客户端发送响应头，该函数在一个请求中最多调用一次，如果不调用，则会自动生成一个响应头
- res.write(data,[encoding])：想请求的客户端发送相应内容，data是一个buffer或者字符串，如果data是字符串，则需要制定编码方式，默认为utf-8，在res.end调用之前可以多次调用
- res.end([data],[encoding])：结束响应，告知客户端所有发送已经结束，当所有要返回的内容发送完毕时，该函数必需被调用一次，两个可选参数与res.write()相同。如果不调用这个函数，客户端将用于处于等待状态。

上述例子均有调用。



## TCP与UDP

二者均为传输层协议，但又有一些不同之处。

### TCP 协议

  - 可靠的、面向连接的协议、传输效率低
  - 效率要求相对低，但对准确性要求相对高的场景
  - 文件传输、接受邮件、远程登录

### UDP 协议

  - 不可靠的、无连接的服务、传输效率高
  - 效率要求相对高，对准确性要求相对低的场景
  - 在线视频、网络语音电话

## dgram（数据报）模块
dgram模块提供了 UDP 数据包 socket 的实现

### 创建scoket实例

      new dgram.Socket()
      dgram.createSocket(type[, callback]) //type: 'udp4' 或 'udp6' 

### scoket实例下方法
- 绑定（监听）端口
        server.bind([port][, address][, callback])
        - prot: 未指定则由系统分配
        - address: 默认 0.0.0.0，表示所有地址/IP
        - callback: 绑定成功后的回调
- 发送数据
         server.send(msg, port, [address])
         - msg: 发送的数据（字符串/Buffer）

- 关闭服务
      server.close()

- 可监听事件
      - close
      - error
      - listening
      - message



## 例子
 
### service 部分
    const dgram = require('dgram');
    const serverSocket = dgram.createSocket('udp4');    //udp4 => ipv4

    serverSocket.on('listening', () => {
        console.log('服务器开启成功，等待数据：');
    });

    // 当接收到数据的时候出发
    serverSocket.on('message', data => {
        console.log('接收到了数据：', data.toString());
    })

    /**
    * 监听指定的地址以及端口
    */
    serverSocket.bind(8080, '127.0.0.1');

### client 部分

    const dgram = require('dgram');

    const clientSocket = dgram.createSocket('udp4');

    /**
    * 发送数据
    * UDP，无连接协议，不需要连接到服务器，然后再发数据
    */

    clientSocket.send('hello', 8080, '127.0.0.1');
## net 模块

net 模块提供了创建基于流的 TCP 或 IPC 服务器(`net.createServer`)和客户端(`net.createConnection`) 的异步网络 API

## 创建

### 服务端创建

  new net.Server()
  net.createServer([port[, host]])

  server.listen(端口, [ip])
    - 端口：
    -	ip：默认为0.0.0.0，表示所有

### 客户端 创建
    new net.Socket()
		net.createConnection(port[, host][, connectListener])

## 例子

### service 部分

      const net = require('net');
      const server = net.createServer( () => {
          // 这个函数其实就是connection事件绑定的函数
      });
      // 当有客户端连接的时候触发
      server.on('connection', socket => {
          // socket => 当前连接的 socket 对象
          console.log('连接建立了');
          socket.on('data', data => {
              socket.write('show me the money');
              console.log(data.toString(), socket.remoteAddress, socket.remotePort);
          });

      });
      // 0.0.0.0 : * 通配
      server.listen(8080, '0.0.0.0');

### client 部分

      const net = require('net');

      /**
      * 创建客户端与udp不同
      *  net.Socket 类
      * 
      *  1. new net.Socket()
      *  2. net.createConnection()
      */

      // 要连接的目标主机的地址以及端口号
      const clientSocket = net.createConnection(8080, '127.0.0.1');
      clientSocket.write('hello');

      // 监听数据传输
      clientSocket.on('data', data => {
          console.log('服务器返回：', data.toString());
      });

      // 当数据包接收完成的时候触发
      clientSocket.on('end', () => {
          console.log( '数据包接收完成' );
      });

## 数据包
在数据传输过程中不仅仅只有主体数据（你要发送的主要内容），还包括了一些其他的数据信息，比如发送端的IP、端口等，以方便接受者对数据进行处理与回复。 

如果发送的数据比较大的话，还会对发送的数据进行分包，每一个包中包含有一部分主体数据以及上面提到的额外信息，接收方在接收到数据以后会数据包进行整合等一系列操作。  

这种传输规则就是数据传输协议中的规定，不同的协议对传输规则有不同的规定。


## net 模块与 http 模块

NodeJs的net 模块用于创建基于流的 TCP 或 IPC 的服务器，而http模块主要是用来创建HTTP服务; TPC/IP协议是传输层协议，主要解决数据如何在网络中传输，而HTTP是应用层协议,日常中接触的更多。关于网络协议部分具体的可参考[重学前端6-浏览器部分-工作流程-请求/](https://blog.mhwang.club/%E9%87%8D%E5%AD%A6%E5%89%8D%E7%AB%AF6-%E6%B5%8F%E8%A7%88%E5%99%A8%E9%83%A8%E5%88%86-%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B-%E8%AF%B7%E6%B1%82/)

## 参考
- [浅析nodejs的http模块](https://www.jianshu.com/p/ab2741f78858)