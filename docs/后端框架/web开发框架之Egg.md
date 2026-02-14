---
title: web开发框架之Egg
date: 2020-12-06 15:35:40
tags: [koa, egg, express]
categories: Web框架
---

## 概述

之前我们介绍过koa了，文本了解下Egg。如官网文档所说：Egg是继承于Koa, 对于企业级应用koa还略显单薄，Egg将koa作为基础框架，在它的模型基础上做了一些增强。



## 项目脚手架

Egg官网有配套的脚手架，用于快速初始化egg项目

    npm init egg --type=simple

关于此脚手架的执行原理，可参照：你不知道的npm init

## Egg VS Koa

如官网介绍Egg是以Koa作为基础进行增加开发的，相比Koa,它作了很多约定与限制，使用的时候只需在对应目录撰写对应逻辑即可。

由框架约定的目录：

    app/router.js 用于配置 URL 路由规则，具体参见 Router。
    app/controller/** 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。
    app/service/** 用于编写业务逻辑层，可选，建议使用，具体参见 Service。
    app/middleware/** 用于编写中间件，可选，具体参见 Middleware。
    app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。
    app/extend/** 用于框架的扩展，可选，具体参见框架扩展。
    config/config.{env}.js 用于编写配置文件，具体参见配置。
    config/plugin.js 用于配置需要加载的插件，具体参见插件。
    test/** 用于单元测试，具体参见单元测试。
    app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于agent.js的作用参见Agent机制。

由内置插件约定的目录：

    app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。
    app/schedule/** 用于定时任务，可选，具体参见定时任务。

引用插件时，安装完毕后，在`config/plugin.js` 中声明即可：


      mongoose: {
        enable: true,
        package: 'egg-mongoose',
      }

对应配置项在`config/config.default.js`中编写：

     mongoose: {
      clients: {
        mallDB: {
          url: 'mongodb://localhost:27017/mall',
          options: {},
        },
        mangeDB: {
          url: 'mongodb://localhost:27017/manage',
          options: {},
        },
      },
    }

按照官网建议，`app/controller`下的控制器只对输入输出做处理，业务相关逻辑放到`app/service`下：

      ├─service
      |  ├─address.js 
      |  ├─goods.js 
      |  ├─order.js
      |  └user.js  

service继承`require('egg').Service`, 函数接受到参数后，进行相关数据库操作，最终返回执行结果，在控制器中只需要调用即可。

    ctx.body = await ctx.service.address.detail(u_name, a_id)


这样做的优点是条理更加清晰，对大型项目来说，是非常有利的。

下面介绍几个自己在使用中发现的几处不同于koa的地方

## egg-mongoose

该模块用来实现egg连接mongodb，model定义在`app/model`文件夹下
      
      // app/model

      ├─model
      |  ├─address.js 
      |  ├─banner.js 
      |  ├─goods.js 
      |  ├─order.js
      |  └user.js        

在 `app/controller`（控制器）下使用方式为：
      
      ctx.model.address.xxx

打印下ctx.model看运行结果：

    { 
      Address: Model { Address },
      Banner: Model { Banner },
      Goods: Model { Good },
      Order: Model { Order },
      User: Model { User } 
    }

可以得知：`Address`是`model/address.js`文件名（首字母大写），Model模型名称对应的是mongodb集合名称（会自动添加复数s）

## egg-jwt

jsonwebtoken使用该模块，需要校验的路由地址，需要在`app/router.js`中指定，不指定则不校验

      router.get(/^\/index\//, controller.index.index)   // index开头的路由全部指向到同一个模板文件
          .post('/api/user/register', controller.user.register)
          .post('/api/user/login', controller.user.login)
          .post('/api/user/info', jwt, controller.user.info)  //校验token

也可以在中间件中指定哪些接口需要校验token（指定返回内容）
    
    // app/middleware/auth.js 下

    module.exports = (options, app) => {
      return async function(ctx, next) {
        const url = ctx.url;
        // 校验所有api下接口
        if (ctx.url.match(/^\/api\//) && !app.config.URL_PASS_LOGIN.includes(url)) {
          const token = (ctx.get('Authorization') || '').replace(/^Bearer /, '');
          if (!token) {
            ctx.response.body = {
              code: 2001,
              message: '未登录，请登录！',
            };
            return;
          }
        }
        // 校验token
        const u_name = await app.jwt.verify(token, app.config.jwt.secret);
        // do something 
        await next();
      }
    }

前端发送xmlhttprequest请求时需要指定header

      config.headers['Authorization'] =`Bearer ${token}`

默认token无效时会返回状态码401，需要在拦截器的error中做对应跳转处理

      error => {
        if(error.response.status === 401){
          window.location.replace(`/index/login?from=${encodeURIComponent(window.location.pathname+window.location.search)}`)
          return Promise.reject();
        }
      }
      
也可以在中间件中自定义返回参数。
## security 

对于post请求，Egg内置了安全插件[egg-security](https://github.com/eggjs/egg-security),可以临时进行关闭，但是不推荐这么做：

      security: {
        csrf: false,
      }

按照egg-security插件的要求，每次访问时候，会在cookie中写入一个安全校验值csrfToken，前端在请求时带上即可：

首先修改config/default.config.js文件：

    security: {
      csrf: {
        headerName: 'x-csrf-token', // 自定义请求头
      },
    }

前端修改对应拦截器，加入：

    config.headers['x-csrf-token']=getCookie('csrfToken'); // getCookie方法自行定义

## 总结

Egg扩展性与封装性都比较高，本身设计的初衷就是便于大型项目开发，所以约定与规范相比koa也没那么自由，毕竟二者应用场景不一样，各位按需选用即可。

## 参考

- [Egg.js官网文档](https://eggjs.org/zh-cn/intro/index.html)
- [egg-mongoose](https://github.com/eggjs/egg-mongoose)
- [egg-static](https://github.com/eggjs/egg-static)
- [egg-jwt](https://github.com/eggjs/egg-jwt)
- [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks)
- [Egg.js使用egg-jwt实现鉴权登录(适合新手)](https://blog.csdn.net/weixin_44934525/article/details/109163957)
- [Egg仿小米商城](https://github.com/Ouchuxuan/egg-xiaomi-shop)
