---
title: Nodejs系列-12-net模块
lastUpdated: 2019-10-17 14:09:17
tags: [note]
categories: Nodejs 系列
---
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


## net 模块与 http 模块

NodeJs的net 模块用于创建基于流的 TCP 或 IPC 的服务器，而http模块主要是用来创建HTTP服务; TPC/IP协议是传输层协议，主要解决数据如何在网络中传输，而HTTP是应用层协议,日常中接触的更多。关于网络协议部分具体的可参考[重学前端-浏览器部分-工作流程-请求](/markdown/重学前端/重学前端-浏览器部分-工作流程-请求)
