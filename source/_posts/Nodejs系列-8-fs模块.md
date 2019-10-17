---
title: Nodejs系列-8-fs模块
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

`mkdirSync`与`mkdir`类似

## fs.readdir && fs.readdirSync
readdir方法用于读取目录，返回一个所包含的文件和子目录的数组
   
    fs.readdir(path[, options], callback)

参数解释：
    - path <string> | <Buffer> | <URL>
    - options <string> | <Object>
      encoding <string> 默认值: 'utf8'。
      withFileTypes <boolean> 默认值: false。
    - callback <Function>
      err <Error>
      files <string[]> | <Buffer[]> | <fs.Dirent[]>
例子，读取文本的static文件夹：

      fs.readdir("./static",(err,files)=>{
        if (err) {
          console.log(err);
          return;
        }
        console.log(files)
      })

运行结果：

       [ 'css', 'img', 'index.html', 'js' ]

`readdirSync`与`readdir`类似

## fs.stat && fs.statSync
stat方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。

    fs.stat(path[, options], callback)

参数解释：
    - path <string> | <Buffer> | <URL>
    - options <Object>
      bigint <boolean> 返回的 fs.Stats 对象中的数值是否应为 bigint 型。默认值: false。
      callback <Function>
    - err <Error>
      stats <fs.Stats>
我们将上述例子中获取到的static进行遍历，获取对应文件的stat

      fs.readdir("./static",(err,files)=>{
        if (err) {
          console.log(err);
          return;
        }
        files.map((file)=>{
          fs.stat(path.join(__dirname,"static", file),(err,stats)=>{
              if (err) {
                console.log(err);
                return;
              }
            if (stats.isFile()) {
              console.log("%s is file", file);
            }else if (stats.isDirectory ()) {
              console.log("%s is a directory", file);
            }
          });
          
        }) 
      })

运行结果：

      css is a directory
      img is a directory
      index.html is file
      js is a directory

利用`fs.statSync` 与 `fs.readdirSync` 可以封装一个常用功能：遍历目录下的所有文件
       
      /**
      *
      * @desc 遍历目录下的所有文件
      * @param {p}:要遍历目录路径
      */
      let localFileArr=[];
      function readPathSync (p) {
        const stat = fs.statSync(p)
        if (stat.isDirectory()) {
          const ls = fs.readdirSync(p).map(file => path.join(p, file))
          for (let i = 0; i < ls.length; i++) {
            arguments.callee(ls[i])
          }
        } else {
          localFileArr.push(p)
        }
      }

运行

      readPathSync(path.join(__dirname,"static")); 
      
可以得到static文件夹下的所有文件

    [ 'C:\\Users\\wmh\\Desktop\\nodejs\\static\\css\\fonts\\element-icons.535877f.woff',
      'C:\\Users\\wmh\\Desktop\\nodejs\\static\\css\\style.css',
      'C:\\Users\\wmh\\Desktop\\nodejs\\static\\img\\1.png',
      'C:\\Users\\wmh\\Desktop\\nodejs\\static\\img\\2.png',
      'C:\\Users\\wmh\\Desktop\\nodejs\\static\\index.html',
      'C:\\Users\\wmh\\Desktop\\nodejs\\static\\js\\app.js' ]

## fs.existsSync
用来判断给定路径是否存在:如果路径存在，则返回 true，否则返回 false。

    fs.existsSync(path)

注意：`fs.exists` **已废弃！！！**

## fs.copyFile && fs.copyFileSync

拷贝文件到指定路径，V8.5+版本支持

    fs.copyFile(src, dest[, flags], callback)

参数解释：

    - src <string> | <Buffer> | <URL> 要拷贝的源文件名。
    - dest <string> | <Buffer> | <URL> 拷贝操作的目标文件名。
    - flags <number> 用于拷贝操作的修饰符。默认值: 0。
    - callback <Function>

例子：

    fs.copyFile("./static/index.html","./test/test.html",()=>{
      console.log("拷贝完成")
    })
因为拷贝时目标地址目录必须存在，所有一般使用过程中，我们需要做下处理：

利用`fs.existsSync`、 `mkdirSync`与 `fs.readdirSync` 可以封装一个常用功能：拷贝目录下所有文件

    /**
    * @desc 拷贝原目录下所有文件到目标目录
    * @param {*} src 原目录
    * @param {*} dest 目标目录
    */
    function copySync (src, dest) {
      const stat = fs.statSync(src)
      if (stat.isDirectory()) {
        //原地址是一个文件夹，判断目标文件夹是否存在
        if (!fs.existsSync(dest)) fs.mkdirSync(dest)
        const ls = fs.readdirSync(src).map(file => path.join(src, file))
        for (let i = 0; i < ls.length; i++) {
          arguments.callee(ls[i], path.join(dest, path.basename(ls[i])))
        }
      } else {
        //path.dirname() 方法返回 path 的目录名
        //原地址是一个文件，先判断目标地址文件所在目录是否存在
        if (!fs.existsSync(path.dirname(dest))) fs.mkdirSync(path.dirname(dest))
        fs.copyFileSync(src, dest)
      }
    }

执行：

    copySync(path.join(__dirname,"static"),path.join(__dirname,"_static"))

完成文件夹拷贝

## fs.unlink && fs.unlinkSync
删除文件，当删除路径不是文件时，同步模式下会报错，所以，一般使用时与stat配合使用
    
     fs.unlink(path, callback)

例子：

    fs.unlink("./static/js",(err)=>{
      if(err){
        console.log('删除失败')
        return
      }
      console.log("删除成功")
    })

## fs.rmdir && fs.rmdirSync
删除文件夹(必须为空文件夹)，当删除路径不是文件夹时，同步模式下会报错，所以，一般使用时与stat配合使用(V12 新增了option选项)

    fs.rmdir(path, callback)

参数说明：

    - path <string> | <Buffer> | <URL>
    - callback <Function>
      err <Error>

利用`fs.unlinkSync` 与 `fs.rmdirSync` 可以封装一个常用功能：删除目录下所有文件

     /**
      *
      * @desc 删除目录下所有文件
      * @param {p}:要删除的目录地址
      */
    function removeSync (p) {
      const stat = fs.statSync(p)
      if (stat.isDirectory()) {
        const ls = fs.readdirSync(p).map(file => path.join(p, file))
        for (let i = 0; i < ls.length; i++) {
          arguments.callee(ls[i])
        }
        fs.rmdirSync(p)
      } else {
        fs.unlinkSync(p)
      }
    }

运行：
    
     removeSync(path.join(__dirname,"static"))

static目录被删除

## fs.watchfile && fs.unwatchfile
watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。

    fs.watchFile(filename[, options], listener)

参数说明：

    - filename <string> | <Buffer> | <URL>
    - options <Object>
      persistent <boolean> 默认值: true。
      interval <integer> 默认值: 5007。
    - listener <Function>
      current <fs.Stats>
      previous <fs.Stats>

每当访问文件时都会调用 listener 回调，例子:

    fs.watchFile('./demo.txt',  (curr, prev)=> {
      console.log('the current mtime is: ' + curr.mtime);
      console.log('the previous mtime was: ' + prev.mtime);
    });

    fs.writeFile('./demo.txt', "My Name is Tom", function (err) {
      if (err) throw err;

      console.log("file write complete");   
    });

运行结果：

    file write complete
    the current mtime is: Wed Oct 16 2019 18:48:30 GMT+0800 (GMT+08:00)
    the previous mtime was: Wed Oct 09 2019 18:08:38 GMT+0800 (GMT+08:00)

`unwatchfile`方法用于解除对文件的监听。

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
从 fs.stat()、fs.lstat() 和 fs.fstat() 及其同步的方法返回的对象都属于fs.Stats 类, 对象提供了关于文件的信息：


    Stats {
      dev: 1217250464,
      mode: 33206,
      nlink: 1,
      uid: 0,
      gid: 0,
      rdev: 0,
      blksize: undefined,
      ino: 1970324836979001,
      size: 264,
      blocks: undefined,
      atimeMs: 1571293841813.9216,
      mtimeMs: 1571293801942.3247,
      ctimeMs: 1571293801942.3247,
      birthtimeMs: 1571220882907.5747,
      atime: 2019-10-17T06:30:41.814Z,
      mtime: 2019-10-17T06:30:01.942Z,
      ctime: 2019-10-17T06:30:01.942Z,
      birthtime: 2019-10-16T10:14:42.908Z }
      
上图结果为Stats类型下的属性，还有一些方法：

    stats.isBlockDevice() #如果 fs.Stats 对象描述块设备，则返回 true。

    stats.isCharacterDevice() #如果 fs.Stats 对象描述字符设备，则返回 true。

    stats.isDirectory()  #如果 fs.Stats 对象描述文件系统目录，则返回 true。

    stats.isFile() #如果 fs.Stats 对象描述常规文件，则返回 true。

    stats.isFIFO() #如果 fs.Stats 对象描述先进先出（FIFO）管道，则返回 true。

    stats.isSocket() #如果 fs.Stats 对象描述套接字，则返回 true。

    stats.isSymbolicLink() #如果 fs.Stats 对象描述符号链接，则返回 true。此方法仅在使用 fs.lstat() 时有效。

## 参考
- [fs 模块-- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/fs.html)