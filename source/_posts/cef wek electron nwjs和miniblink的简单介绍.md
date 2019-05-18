---
title: 'cef wek electron nwjs和miniblink的简单介绍'
date: 2019-05-16 16:37:42
tags: [notes, 闲话前端]
categories: Chromium
---
## 概述
前端这两年的发展开始出现一个新的分支，PC桌面应用，类比移动端的混合开发，PC端的各种“壳子”也是百花齐放。我们来细数下这些年出现的相关内核

<!-- more -->

## wke
wke出现的比较早，wke 是一个基于 WebKit 精简的浏览器引擎，[github](https://github.com/BlzFans/wke)上可以发现这个项目早在2013年左右已经停止更新了，同时有一个新的fork的[github项目](https://github.com/cexer/wke)目前还在维护，同时介（吐）绍（槽）了原项目的相关发展。因为wke 是由 WebKit 2011 年的版本精简而来，之后一直没有同步 WebKit 更新过，因此 wke 对 HTML5 的支持能力停留在 2011 年，一直未改进。所以，bug很多，但是，体积很小!!

## cef（Chromium Embeded Framework）
CEF的历史：

- CEF有两种版本的Chromium Embedded Framework：CEF 1和CEF 3
- 在Chromium Content API出现后，CEF 2的开发被放弃。
- CEF 1是基于Chromium WebKit API的单进程实现。它不再积极发展或支持。
- CEF 3是基于Chromium Content API的多进程实现，其性能类似于Google Chrome。

优点: 是由于集成的chromium内核，所以对H5支持的很全，同时因为使用的人也多，各种教程、示例，资源很多。  

缺点: 最新的cef已经夸张到了100多M，不支持xp了（chromium对应版本是M49）。而且由于是多进程架构，对资源的消耗也很大。

## nwjs 和 electron
二者都是基于chromium内核，提供了一个能通过 JavaScript 和 HTML 创建桌面应用的平台，同时集成 Node 来授予网页访问底层系统的权限，所以支持性对前端友好。

功能上看，二者差不多，主要的区别是入口方式。Electron是基于node的，入口是类似node module的index.js，这是因为Electron是基于node的event-loop将chromium的功能和event全部整合app，Electron的开发跟其他的node应用没区别。NW.js像一个跑在node-platform上的浏览器，所以他的入口是index.html，NW.js将自己的功能都整合进了chromium-runtime，因此更接近一个前端的应用开发方式。NW.js也可以用到node的api，这是通过binding到chromium-runtime来调用的。

同时，nwjs支持xp，新版的electron已经不支持xp了。  

安装包依旧比较大，且内存占用高居不下。

## miniblink
miniblink是一个开源的、单文件、且目前已知的最小的基于chromium的，浏览器控件，主要就是把blink从chromium抽离了出来，同时补上了cc层（硬件渲染层）。github地址：https://github.com/weolar/miniblink49

缺点应该是，目前文档较少，遇到问题需要自己解决。

## 延伸

### 浏览器内核知多少
浏览器的内核是分为两个部分的：渲染引擎（layout engineer）或（Rendering Engine）和 JS 引擎。

渲染引擎：负责对网页语法的解释（HTML、javaScript、引入css等），并渲染（显示）网页。    
JS引擎：javaScript的解释、编译、执行。    

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于单指渲染引擎。 主流的内核有：Trident(IE)、Gecko(FireFox)、Webkit(Safari)、Presto(opera前内核、已废弃)、blink(Chrome)、edgehtml(IE Edge)PS:国内很多的双核浏览器的其中一核便是 Trident，美其名曰 “兼容模式”。

|  主流浏览器   | 内核  |
|  ----  | ----  |
| IE -> Edge| 	trident->EdgeHTML | 
| Chrome	| webkit->blink | 
| Safari	| webkit | 
| Firefox | 	Gecko | 
| Opera	  | Presto->blink | 


关于浏览器内核的纷争和发展，具体访问参考4即可。此处着重说下WebKit。

### WebKit

WebKit内核则是苹果基于KDE小组（Linux桌面系统）的 KHTML 引擎开发出来的，可以说 WebKit 是 KHTML 的一个开源的分支（感谢苹果当年弃用了Gecko）。webkit内核的轻便得到了谷歌的青睐，2008 年谷歌公司发布 chrome 浏览器，采用的 chromium 内核便 fork 了Webkit，同时，chrome将webkit内核发扬光大。

### Chromium
Chromium是谷歌为了研发Chrome而启动的项目，两者基于相同的源代码构建，Chrome所有的新功能都会先在Chromium上实现，待验证稳定后才会移植，因此Chromium的版本更新频率更高，也会包含很多新的功能，但作为一款独立的浏览器，Chromium的用户群体要小众得多。由于两款浏览器“同根同源”，因此它们有着同样的logo，只是配色不同。谷歌发布的 chrome 浏览器使用的内核被命名为 chromium。chromium 虽然是开源引擎webkit的一个分支，却把 WebKit 的代码梳理得可读性提高很多。也有很多人将chrome内核依旧称为webkit内核。  

因为一些利益原因和项目问题（个人认为主要是利益原因），Google 决定从 WebKit 衍生出自己的 Blink 引擎。

### Blink
Blink 其实是 WebKit 的分支，如同 WebKit 是 KHTML 的分支一样，Google 和 Opera Software 将共同研发该内核。自chrome 28开始，已经改用blink内核了。

### JS引擎
说起JS引擎，大家估计首先想到的就是V8，这是chrome内置的js解释器，同时万能的node也是基于V8开发的。

其实各大浏览器也有自己的js引擎，只是没有V8那么出名而已
	
|  主流浏览器   | js引擎  |
|  ----  | ----  |
|IE | EdgeJScript（IE3.0-IE8.0） / Chakra（IE9+之后，查克拉，微软也看火影么..）| 
| Chrome | V8（大名鼎鼎）|
|Safari | Nitro（4-）|
|Firefox | SpiderMonkey（1.0-3.0）/ TraceMonkey（3.5-3.6）/ JaegerMonkey（4.0-）OperaLinear A（4.0-6.1）/ Linear B（7.0-9.2）/ Futhark（9.5-10.2）/ Carakan（10.5-）|
| Firefox | SpiderMonkey（1.0-3.0）/ TraceMonkey（3.5-3.6）/ JaegerMonkey（4.0-）OperaLinear A（4.0-6.1）/ Linear B（7.0-9.2）/ Futhark（9.5-10.2）/ Carakan（10.5-）|

### UserAgent
关于UserAgent其实它的发展更有趣，可以访问参考6。

## 参考
1. [github之wke](https://github.com/cexer/wke)
2. [屌炸天的内核来袭，史上最小chromium内核miniblink](https://zhuanlan.zhihu.com/p/22611497)
3. [github之cef](https://github.com/chromiumembedded/cef)
4. [Electron 和 NW.js 在技术上的差异](https://zhuanlan.zhihu.com/p/34250289)
5. [全面了解浏览器（内核）发展史](https://www.jianshu.com/p/db1b230e3415)
6. [浏览器野史 UserAgent列传](http://litten.me/2014/09/26/history-of-browser-useragent/)
7. [主流浏览器内核及JS引擎](https://juejin.im/post/5ada727c518825670b33a584)