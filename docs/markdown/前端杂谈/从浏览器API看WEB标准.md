---
title: 从浏览器API看WEB标准
lastUpdated: 2019-09-06 10:19:22
---
# {{$frontmatter.title}}

客户端JavaScript中有很多可用的API — 他们本身并不是JavaScript语言的一部分，却建立在JavaScript语言核心的顶部（window），为使用JavaScript代码提供额外的超强能力。他们通常分为两类：

- 浏览器API：内置于Web浏览器中，能从浏览器和电脑周边环境中提取数据，并用来做有用的复杂的事情 。如:Geolocation API
- 第三方API: 缺省情况下不会内置于浏览器中，是在某些情况下执行后挂载在全局window下

那么，我们每天使用的浏览器，里面到底有多少“API”?


## 常见的浏览器API

- 操作文档的API内置于浏览器中。最明显的例子是DOM
- 从服务器获取数据的API: 如：XMLHttpRequest和Fetch API。
- 用于绘制和操作图形的API:如：Canvas和WebGL
- 音频和视频API，如：HTMLMediaElement
- 设备API：Geolocation API
- 客户端存储API： Web Storage API 和 IndexedDB API

## 浏览器下所有API整理
大部分的浏览器 API 属于 Window 对象（或者说全局对象）,以windows下chrome 为例(Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"), 运行 `Object.getOwnPropertyNames(window)`, 得到909个API。

对这些api进一步梳理得到：  

W3C 标准下的 API：
* Web Audio API
* Web Cryptography API
* Media Source Extensions
* The Screen Orientation API
* Network Information API
* Web MIDI (Musical Instrument Digital Interface ) API
* IndexedDB API
* Gamepad API
* DeviceOrientation Event
* Web App Manifest
* WebVTT: The Web Video Text Tracks Format
* Touch Events
* Scalable Vector Graphics (SVG)
* Resize Observer API
* Intersection Observer
* Mutation Observer
* Cooperative Scheduling of Background Tasks
* Service Worker API
* Payment Request API
* Presentation API
* Web Authentication API

WICG 标准下的 API：
* Input Device Capabilitie
* Web Bluetooth API
* WebUSB API

ECMA 标准下的 API：
* JavaScript 全局变量
* ECMAScript 2018 Internationalization API

WHATWG 标准下的 API：
* Streams
* Encoding
* URL

Khronos 标准下的 API：
* WebGL

未标准化的 API：
* Web Background Synchronization
* WebRTC API
* Document Object Model XPath
* Visual Viewport API
* Performance Timeline API

浏览器环境的 API，正是这样复杂的环境。我们平时编程面对的环境也是这样一个环境。

## 目前web领域相关标准制定组织

- W3C：万维网联盟，创建于1994年。
- ECMA:欧洲计算机制造联合会, 制定JavaScript标准的ECMA 的39号技术委员会（ECMA TC39）
- WICG：Web Platform Incubator Community Group Web平台孵化器社区组，浏览器厂商也有参与，研究实验一些前沿功能。
- Khronos：多个国家和行业领导者创立，致力于发展开放标准的应用程序接口 API ，以实现在多种平台和终端设备上的富媒体创作、加速和回放。
- WHATWG： Web Hypertext Application Technology Working Group web超文本技术工作小组(2004年，数个浏览器厂商在无法忍受W3C罔顾现实情况意图抛弃HTML的时候，脱离W3C建立了该小组)。在2019年5月8日，[W3C 和 WHATWG 达成协议](https://www.w3.org/blog/news/archives/7753)：W3C 将不再独立发布与 DOM 和 HTML 直接相关的规范，而是与 WHATWG 合作，将 WHATWG 的审核草稿转为 W3C 推荐规范；同时 WHATWG 将负责维护 HTML 和 DOM 的现行标准。



## 关于JS的小知识

1. 1995年5月，Brendan Eich 只用了10天，就设计完成了这种语言的第一版。它是一个大杂烩，语法有多个来源： 
- 基本语法：借鉴 C 语言和 Java 语言。  
- 数据结构：借鉴 Java 语言，包括将值分成原始值和对象两大类。  
- 函数的用法：借鉴 Scheme 语言和 Awk 语言，将函数当作第一等公民，并引入闭包。  
- 原型继承模型：借鉴 Self 语言（Smalltalk 的一种变种）。  
- 正则表达式：借鉴 Perl 语言。  
- 字符串和数组处理：借鉴 Python 语言。 
2. 1996年11月，Netscape 公司决定将 JavaScript 提交给国际标准化组织 ECMA希望 JavaScript 能够成为国际标准，以此抵抗微软。ECMA 的39号技术委员会（Technical Committee 39）负责制定和审核这个标准（也是就github上ECMA TC39 的名称来源），1997年7月，ECMA 组织发布262号标准文件（ECMA-262）的第一版，之后[ECMA-262](https://github.com/tc39/ecma262)，一直就是JavaScript的标准文件名称了。
3. ECMAScript 只用来标准化 JavaScript 这种语言的基本语法结构，与部署环境相关的标准都由其他标准规定，比如 DOM 的标准就是由 W3C组织（World Wide Web Consortium）制定的。
4. 2015 年 6 月，发布了ES6 的第一个版本（正式名称就是《ECMAScript 2015 标准》），并规定标准在每年的 6 月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，直到下一年的 6 月份，草案就自然变成了新一年的版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。2016 年 6 月发布了ES2016标准，2017 年 6 月发布 ES2017 标准。
5. ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等.

## 参考文章
1. [ES6 的支持进度](https://kangax.github.io/compat-table/es6/)
2. [JavaScript 语言的历史](https://wangdoc.com/javascript/basic/history.html)
3. [ECMAScript 3 中文版 pdf](http://yanhaijing.com/es5/ECMAScript%E8%A7%84%E8%8C%83-%E7%AC%AC%E4%B8%89%E7%89%88_%E4%B8%AD%E6%96%87%E7%89%88.pdf)
4. [ecma-international ecma 262 5.1（英）](http://www.ecma-international.org/ecma-262/5.1/index.html)
5. [html标准-中文翻译](https://whatwg-cn.github.io/html/)
6. [css标准](https://www.w3.org/Style/CSS/)
7. [whatwg github](https://github.com/whatwg/)
8. [MSDN - webAPI](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)