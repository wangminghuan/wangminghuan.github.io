---
title: Nodejs系列-14-http模块
date: 2019-10-17 14:09:48
tags: [note]
categories: Nodejs
---
## Http概述
http模块主要用于搭建HTTP服务。大体上可以分为两个部分：客户端http请求 与 服务端http响应
<!-- more -->

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

## 参考
- [浅析nodejs的http模块](https://www.jianshu.com/p/ab2741f78858)
