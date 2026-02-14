---
title: web开发框架之koa2
date: 2020-11-17 09:52:00
tags: [koa, koa2, express]
categories: Web框架
---

## 概述
Nodejs天生就是异步操作，非阻塞I/O操作，使得它在服务端有着一些其他语言没有的天生优势。那么如何创建Web Server？koa2也用了两年，主要用来在服务端搭建web服务（编写spa主模板路由，api反向代理等简单功能），也未系统学习过。它跟Egg.js又各自有什么优缺点，最近正好有时间，从头细致捋一遍koa，并与egg做下对比。



## 原生nodejs

框架只是nodejs底层api的再封装，我们使用nodejs的api可以很简单的实现一个web server:
```
    const http=require("http")
    var url = require('url');
    http.createServer((req,res)=>{
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var pathname = url.parse(req.url, true).pathname;
      if(pathname=="/list"){
        res.write('I am list')
      }else{
        res.write('I am home')
      }
      res.end()
    }).listen(8008,()=>{
      console.log('web server started at port 8008')
    })
```
运行一下，访问`http://localhost:8008/` 与 `http://localhost:8008/list` 分别返回不用的内容。

但实际应用中不会这么简单，如何处理本地静态文件，如何解析get/post请求参数与返回内容，如何管理路由，如何管理cookie等等，都是需要考虑的。于是就出现了web server 框架, 其中最著名的当属express

##  Express
Express 是一个最小且灵活的 Node.js Web 应用框架，它为 Web 和移动应用程序提供一组强大的功能。但由于初期nodejs对异步的解决方案基本都是通过callback实现的，async/await还未纳入官方方案，于是就有了最臭名昭著的[callback hell](http://callbackhell.com/)。

于是，Express 幕后原班人马重新打造了新的web 框架--Koa
## koa基本组成

Koa源码非常精简，只有四个文件：

- application.js：Application(或Koa)负责管理中间件，以及处理请求
- context.js：Context维护了一个请求的上下文环境
- request.js：Request对`req`做了抽象和封装
- response.js：Response对`res`做了抽象和封装 

## 中间件
Koa2本身只能算一个极简的HTTP服务器，自身不内置中间件，但是提供中间件内核。我们可以把一个HTTP请求理解为水流，而各种各样的中间件类似各种管道，它会对水流进行处理。每个中间件在HTTP请求过程中会改写请求，响应等数据。koa的中间件模型就是经常被提起的“洋葱模型”

![](./image/2360903500.jpg)


### 理解中间件
中间件是按顺序执行, 从第一个中间件开始执行，遇到`next`进入下一个中间件，一直执行到最后一个中间件，在逆序，执行上一个中间件`next`之后的代码，一直到第一个中间件执行结束才发出响应。以下面代码为例，会更容易理解：

    // app.js
    const Koa = require('koa')
    const app = new Koa()
    app.use(async (ctx, next) => {
      console.log(1);
      await next();
      console.log(1.1);
    });

    app.use(async (ctx, next) => {
      console.log(2);
      await next();
      console.log(2.2);
    });

    app.use(async (ctx, next) => {
      console.log(3);
      await next();
      console.log(3.3);
    });

    module.exports = app

启动后，通过浏览器访问 `http://localhost:3000/`, 控制台会出现如下结果（其实会发出2个请求，因为加载首页html时，也会加载一次favicon.ico文件）

    1
    2
    3
    3.3
    2.2
    1.1

中间件包含两个参数 ctx, next。

### Koa-router

Koa-router 是 koa 的一个路由中间件，它可以将请求的URL和方法（如：GET 、 POST 、 PUT 、 DELETE 等） 匹配到对应的响应程序或页面。
    
    // routes/index.js

    const router = require('koa-router')()

    router.get('/', async (ctx, next) => {
      await ctx.render('index', {
        title: 'Hello Koa 2!'
      })
    })
    module.exports = router

接着还需要分别调用 router.routes() 和 router.allowedMethods() 来得到两个中间件，并且调用 app.use() 使用这两个中间件：

    const index = require('./routes/index') 
    app.use(index.routes()).use(index.allowedMethods())

注意，此处关于路由的调用，[koa-generator](https://github.com/i5ting/koa-generator) 中的代码如下:

    // routes
    app.use(index.routes(), index.allowedMethods())

但通过查阅koa源码，app.use只接收一个参数，第二个参数是无效的：

![](./image/6437834703.png)

也有人在[issue区](https://github.com/i5ting/koa-generator/issues/57)提了同样的问题，然而无人回答。所以本人做了修改。同时根据自己常用的一些中间件，做了一个项目模板：[koa2-template](https://github.com/wangminghuan/koa2-template)


### 上下文对象

Koa Context 将 node 的 request 和 response 对象封装到单个对象中，ctx是一次完整的HTTP请求的上下文，会贯穿这个请求的生命周期。也就是说在整个请求阶段都是共享的。

我们打印下上面例子中的第一个中间件：

    app.use(async (ctx, next) => {
      console.log(1);
      console.log([ctx.request.url,ctx.response])
      await next();
      console.log([ctx.request.url,ctx.response])
      console.log(1.1);
    });

启动后，通过浏览器访问 `http://localhost:3000/`, 控制台会出现如下结果:


    1
    [ '/json',
      { status: 404,
        message: 'Not Found',
        header: [Object: null prototype] {},
        body: undefined } ]
    2
    3
    3.3
    2.2
    [ '/json',
      { status: 200,
        message: 'OK',
        header:
        [Object: null prototype] { 'content-type': 'application/json; charset=utf-8' },
        body: { code: 0, data: {} } } ]
    1.1

结合“洋葱图”可以看到，在中间件中都是可以访问到ctx对象的，在创建 context 的时候，还会同时创建 request 和 response 。只不过进入“洋葱”时只有request数据内容；在穿出“洋葱”时，ctx对象的response才有了相关数据。

## 项目初始化

koa官方并没有相关脚手架可以快速初始化项目，此处推荐狼叔的 koa-generator, 我在此基础上做了一些修改，提交到了该仓库：[koa-template](https://github.com/wangminghuan/koa2-template)

## 用户认证方案

服务端服务离不开用户认证，早期常用的方法是：

- 用户输入用户名+密码提交登录
- 服务端认证通过后下发session_id,将cookie写入用户端
- 用户端每次请求都会携带这个cookie,服务端通过cookie(session_id)查找用户信息从而判断用户身份

这个流程在单台机器上没有什么问题，一旦遇到服务器集群就有问题了，这就要求不同机器之间的session共享，做session数据持久化，工程量比较巨大，除此之外还有另外一种方案就是jwt


### jwt

jwt 全称为`JSON web token`,目前最流行的跨域认证解决方案。

jwt的大体流程如下：

- 用户输入用户名+密码提交登录
- 服务端认证通过后，下发用户信息（json）返给用户
- 用户每次请求都带上这个json数据，服务端完全靠这个对象认证用户身份
- 为了防止篡改，这个json对象一般都需要签名加密（具体签名规格参考下面阮一峰博客）

这样做的好处是服务端完全不需要存储session数据，服务端变成无状态的了。但也有一个比较大的弊端：由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

### jsonwebtoken
koa中我们使用`jsonwebtoken`模块, 并将其作为中间件来运行,先定义一个check_token方法：
    
    // config/token.js

    const check_token=async (ctx,next)=>{
      const url = ctx.url;
      if(ctx.method != 'GET'  && !URL_PASS_LOGIN.includes(url)){
      let token= ctx.get("Authorization");
      if(!token){
        return ctx.response.body={
          code:2001,
          message:"未登录，请登录！"
        }
      }
      let {name = ''} = await jwt.verify(token,TOKEN_ENCODE_STR);
      // do something...
    }
      await next();
    }
  
在app.js中进行调用，注意执行顺序(router注册之前)
      
      // checkToken
      app.use(check_token);

      // routes
      app.use(index.routes(), index.allowedMethods())
## Mongoose

koa中我们使用Mongoose来连接数据库

### 连接

    const mongoose = require('mongoose');
    // 此处链接的是数据库，如果不存在会自动创建,有则直接连接
    mongoose.connect('mongodb://localhost:27017/mall',{ useNewUrlParser: true }).then(
      () => { 
        console.log("Connection success~")
      },
      err => { 
        console.log(err)
      }
    );

如果需要用户名密码登陆，则连接地址为：
   
    mongodb://username:password@localhost:27017/mall

如果mall数据库没有设置管理员，需要使用admin数据库的管理员进行间接操作，则连接地址为

    mongodb://username:password@localhost:27017/mall?authSource=admin
   
### Shema

Shema即XML Schema，XSD (XML Schema Definition)是W3C于2001年5月发布的推荐标准，指出如何形式描述XML文档的元素。

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection，创建集合之前，需要先实例化一个Shema
   
    // db/index.js
    const Schema = mongoose.Schema; 
    let userSchema = new Schema({
      u_name: String,
      u_pwd: String,
      u_code: String,
      token: {
        type: String,
        default: ""
      }
    })


### Model

将上一步的schema，通过`mongoose.model(modelName, schema)` 函数转换为一个 Model

     // db/index.js
    // 第一个参数是跟 model 对应的集合（ collection ）名字的 单数 形式，
    mongoose.model('User', userSchema); // 会自动创建一张users集合（表）

### Documents
Documents是Model的实例，如果需要新建集合，只需要实例化Model, 并调用save即可：
    
    // service/user.js

    const User = require('../db').User;

    let user = new User({u_name,u_pwd,u_code,token});
    let resp = await user.save();

### CURD

常用的增删改查方法有些是挂载在`Model.prototype`下，有些是挂载在`Model`下的，类似这样（代码仅为示意图，不代表Model的具体实现）

    class Model{
      constructor() {
      }
      save() {
        return 'save';
      }
    }
    Model.update=function(){
      return 'update'
    }
    const m=new Model();
    console.log(m.save()); //'save'
    console.log(Model.prototype.save());//'save'
    console.log(Model.update()); //'update'

具体如截图所示（来源mongoose官网V5.10.16）

   ![](./image/8141350100.png)

## 其他

### koa-views
在koa2中使用模板机制必须依靠中间件，最常用的便是koa-views

    // 加载模板引擎
    const views = require('koa-views')
    app.use(views(path.join(__dirname, './views'), {
        extension: 'ejs'
    }))
    
如果需要模板引擎则需要额外安装ejs,或pug,在extension声明即可
### koa-static
koa-static是静态资源请求中间件，不涉及其他的处理过程，只是单纯的读取文件


    app.use(require('koa-static')(__dirname + '/source/dist'))
### koa-body
服务端收到请求时，需要对参数做对应解析（query，form, multipart）等，koa-body就是出来处理这些的：

  const koaBody = require('koa-body')
  app.use(koaBody({
    multipart:true
  }))

koa-generator 中推荐的是 koa-bodyparser 但其不支持文件上传，koa-body用法与koa-bodyparser基本一致，且支持文件类型解析

### koa-router

顾名思义，这是koa的路由中间件，也是非常重要的一部分，有兴趣的可以详细去了解，此处我们只简单介绍下使用方式：

    
    // routes/index.js

    const router = require('koa-router')()
    const controller = require('../controller')
    router.get('/', async (ctx, next) => {
      await ctx.render('index')
    })
    .post("/api/user/login",controller.user.login)
    .post("/api/common/upload",controller.common.upload)

在app.js中注册，注意执行顺序（一般在最后）

    const index = require('./routes/index')
    app.use(index.routes(), index.allowedMethods())
    
## 参考

- [NodeJS框架Expres与Koa](https://www.jianshu.com/p/6f7930687835)
- [Expres与Koa对比](https://www.jianshu.com/p/b4335b482fc6)
- [知乎专栏-Koa2第二篇：中间件](https://zhuanlan.zhihu.com/p/150700836)
- [简书-koa洋葱模型](https://www.jianshu.com/p/c76d9ffd7899)
- [koa-router allowedMethods](https://www.jianshu.com/p/fef91266a44c)
- [koa-官网文档](https://koa.bootcss.com/)
- [koa-github](https://github.com/koajs/koa)
- [koa-middleware官网列表](https://github.com/koajs/koa/wiki)
- [json-web-token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [mongoose官网文档](http://mongoosejs.net/docs/guide.html)