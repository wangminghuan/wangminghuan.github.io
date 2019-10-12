---
title: Nodejs系列-7-fs模块
date: 2019-10-09 15:34:01
tags: [note]
categories: Nodejs
---

fs模块提供了一些与文件系统进行交互的 API，所有文件系统操作都具有同步和异步的形式。作为nodejs开发中最常用的模块之一，下面我们介绍一些常见API用法。
<!-- more -->

## fs.readFile && fs.readFileSync
readFile方法用于异步读取数据。

    fs.readFile(path[, options], callback)

参数解释：

    - path: 文件路径（相对或绝对），相对路径是相对于当前进程（process.cwd()）所在的路径
    - options <Object> | <string>
        encoding <string> | <null> 默认值: null。
        flag <string> 参阅支持的文件系统标志。默认值: 'r'。
    - callback <Function>

示例：

    const fs= require("fs");
    fs.readFile("demo.text","utf8",(err,data)=>{
      if (err) {
        console.log(err)
        return;
      };
      console.log(data);
    })

运行结果：

    My name is Jack!

如果不指定编码方式，返回的是Buffer数据：

    <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 c9 00 00 00 ff 08 06 00 00 00 9a 6b 2d 75 00 00 03 bc 49 44 41 54 78 9c ed d5 a1 11 c0 20 00 ... >

`readFileSync`与`readFile`类似，只是执行过程换成了同步模式。

## fs.writeFile && fs.writeFileSync
writeFile方法用于写入文件。

    fs.writeFile(file, data[, options], callback)

参数解释：

    - file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
    - data <string> | <Buffer> | <TypedArray> | <DataView>
    - options <Object> | <string>
      encoding <string> | <null> 默认值: 'utf8'。
      mode <integer> 默认值: 0o666。
      flag <string> 参阅支持的文件系统标志。默认值: 'w'。
    - callback <Function>

例子1，写入数据为字符串时，需指定字符编码，缺省时为utf8

    fs.writeFile("./demo-1.txt","My job is coding","utf8",(err)=>{
      if(err){
        console.log("写入失败")
        return;
      }
      console.log("写入成功")
    })

例子2, 写入数据为二进制数据时，encoding 选项会被忽略, 我们将一个图片的base64字符串保存到本地

    const base64Img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAE0lEQVQImWN8Eyz6nwEImBigAAAkPwJXo01dBgAAAABJRU5ErkJggg=="
    const base64Data = base64Img.replace(/^data:image\/\w+;base64,/, "");//过滤掉标识
    const data=Buffer.from(base64Data, 'base64');
    fs.writeFile("./red.png",data,(err)=>{
      if(err){
        console.log("写入失败")
        return;
      }
      console.log("写入成功")
    })

我们将一个gif图写入本地,图片二进制数据参见：[点我访问](http://www.matthewflickinger.com/lab/whatsinagif/bits_and_bytes.asp)

    const arr=[0x47,0x49,0x46,0x38,0x39,0x61,0x0A,0x00,0x0A,0x00,0x91,0x00,0x00,0xFF,0xFF,0xFF,0xFF,0x00,0x00,0x00,0x00,0xFF,0x00,0x00,0x00,0x21,0xF9,0x04,0x00,0x00,0x00,0x00,0x00,0x2C,0x00,0x00,0x00,0x00,0x0A,0x00,0x0A,0x00,0x00,0x02,0x16,0x8C,0x2D,0x99,0x87,0x2A,0x1C,0xDC,0x33,0xA0,0x02,0x75,0xEC,0x95,0xFA,0xA8,0xDE,0x60,0x8C,0x04,0x91,0x4C,0x01,0x00,0x3B];
    const data=Buffer.from(arr);
    fs.writeFile("./red.gif",data,(err)=>{
      if(err){
        console.log("写入失败");
        return;
      }
      console.log("写入成功")
    })

### 文件描述符

在文件描述符的情况下，文件不会被替换！ 数据不一定写入到文件的开头，文件的原始数据可以保留在新写入的数据之前和/或之后，行为几乎与直接调用 `fs.write` 类似：

    fs.open('./demo-1.txt', 'a+', (err,fd)=>{
      if(err){
        console.log("打开失败")
      }
      fs.writeFileSync(fd,"锄禾日当午;")
      fs.writeFileSync(fd,"汗滴禾下土")
      fs.close(fd,function(err){
        if(err){
          console.log("关闭失败")
          return;
        }
        console.log('file closed');
      })
    })

运行结果：

    锄禾日当午;汗滴禾下土

下面例子也可以实现同样的功能：

    fs.writeFileSync("./demo-1.txt",";"+new Date().getTime().toString(),{
      flag:"a+"
    })
    fs.writeFileSync("./demo-1.txt",";"+new Date().getTime().toString(),{
      flag:"a+"
    })

运行结果：

    ;1570873714714;1570873714715


`writeFileSync`与`writeFile`类似

## fs.mkdir && fs.mkdirSync
mkdir方法用于新建目录

    fs.mkdir(path[, options], callback)

参数解释：

    - path <string> | <Buffer> | <URL>
    - options <Object> | <integer>
      recursive <boolean> 默认值: false。
      mode <integer> Windows 上不支持。默认值: 0o777。
    - callback <Function>

例子：

    fs.mkdir('./tmp/a/apple', { recursive: true }, (err) => {
      if (err) {
        console.log("创建失败");
        return;
      }
      console.log("创建成功")
    });

创建 /tmp/a/apple 目录，无论是否存在 /tmp 和 /tmp/a 目录。


## fs.readdir && fs.readdirSync
readdir方法用于读取目录，返回一个所包含的文件和子目录的数组

## fs.stat && fs.statSync
stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。

## fs.watchfile && fs.unwatchfile
watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。

## fs.existsSync
用来判断给定路径是否存在:如果路径存在，则返回 true，否则返回 false。



 `fs.exists` **已废弃**


## fs.ReadStream 类

我们经常用到的`fs.readFile`方法可以满足多数场景，但对于大文件，譬如超过10M文件的读取，`fs.readFile`就不是最优选择了，因为该方法将数据一次性全部读取到内存中,会造成系统的假死或引发其他问题，此时，我们需要使用`fs.ReadStream`类来处理数据；类似大文件场景下，对于写入数据，我们选择`fs.createWriteStream`类来处理：


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