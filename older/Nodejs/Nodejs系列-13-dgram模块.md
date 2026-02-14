---
title: Nodejs系列-13-dgram模块
date: 2019-10-17 14:09:20
tags: [note]
categories: Nodejs 系列
---

dgram模块提供了 UDP 数据包 socket 的实现


## 创建scoket实例

      new dgram.Socket()
      dgram.createSocket(type[, callback]) //type: 'udp4' 或 'udp6' 

## scoket实例下方法
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

