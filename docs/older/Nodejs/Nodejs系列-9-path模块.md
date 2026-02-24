---
title: Nodejs系列-9-path模块
lastUpdated: 2019-10-17 14:00:53
tags: [note]
categories: Nodejs 系列
---
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




