---
title: Nodejs系列-7-fs模块
date: 2019-10-09 15:34:01
tags: [note]
categories: Nodejs
---

fs模块提供了一些与文件系统进行交互的 API，所有文件系统操作都具有同步和异步的形式。
<!-- more -->

## fs.ReadStream 类
成功调用 fs.createReadStream() 将会返回一个新的 fs.ReadStream 对象。

		  fs.createReadStream(path[, options])

我们读取本地一个文本文件：

    const fs = require("fs");
    const path = require("path");

    let filename = path.resolve('demo.txt');
    let readStream = fs.createReadStream(filename,{encoding:'utf8'});
    readStream.on("open",(data)=>{
        console.log('打开了,触发open',data)
    })
    readStream.on("ready",()=>{
      console.log('ReadStream已经ready,触发ready')
    })
    readStream.on("data",(data)=>{
        console.log("数据来了！");
        console.log("已经读取的字节数",readStream.bytesRead);
    })
    readStream.on("close",(data)=>{
        console.log('读取结束，触发close')
    })
    console.log("读取文件路径为："+readStream.path)

运行结果：

    读取文件路径为：C:\Users\wmh\Desktop\nodejs\demo.txt
    打开了,触发open 3
    ReadStream已经ready,触发ready
    数据来了！
    已经读取的字节数 11
    读取结束，触发close

## fs.WriteStream 类
成功调用 fs.createWriteStream() 将会返回一个新的 fs.WriteStream 对象。
		
    fs.createWriteStream(path[, options])

我们在上面例子的基础上，改为写入模式：

    const fs = require("fs");
    const path = require("path");

    let filename = path.resolve('demo.txt');
    let writeStream = fs.createWriteStream(filename,{encoding:'utf8'});
    writeStream.on("open",(data)=>{
        console.log('打开了,触发open',data)
    })
    writeStream.on("ready",()=>{
      console.log('触发ready')
    })
    writeStream.on("close",(data)=>{
        console.log('写入结束，触发close')
    })
    console.log("写入文件路径为："+writeStream.path)
    writeStream.write("My name is Jack!")
    writeStream.end();

运行结果：

    写入文件路径为：C:\Users\wmh\Desktop\nodejs\demo.txt
    打开了,触发open 3
    触发ready
    写入结束，触发close

## fs.Stats 类
		fs.stat(path[, options], callback)

## fs.FSWatcher 类
		fs.watch(filename[, options][, listener])
		fs.watchFile(filename[, options], listener)

## 参考
- [fs 模块-- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/fs.html)