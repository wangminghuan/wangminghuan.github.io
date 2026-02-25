---
title: Fetch和XMLHttpRequest
lastUpdated: 2019-09-05 15:16:31
---
# {{ $frontmatter.title }}
本文小探一下Fetch相关内容

## 关于AJAX
2005 年，Jesse James Garrett 发表了一篇在线文章，题为“Ajax: A new Approach to Web Applications”（http://www.adaptivepath.com/ideas/essays/archives/000385.php）。他在这篇文章里介绍了一种技术，用他的话说，就叫 Ajax，是对 `Asynchronous JavaScript + XML` 的简写。这一技术能够向服务器请求额外的数据而无须卸载页面，会带来更好的用户体验。Garrett 还解释了怎样使用这一技术改变自从 Web 诞生以来就一直沿用的“单击，等待”的交互模式。

## Fetch
Fetch API不同于XMLHttpRequest,他是一种全新设计的api用于发起获取资源的请求。目标就是要替代现有的XMLHttpRequest接口。

### 基本用法
```
fetch("http://api.k780.com/?app=weather.today&weaid=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json").then((res)=>{
      return  res.json()
    }).then((data)=> {
    console.log(data);
  }).catch((e)=> {
    console.log(e)
  });
```
用es7 中的async/await 改写后
```
async function $fetch(url,params){
  try {
    let response = await fetch(url,{
      body:JSON.stringify(data),
      method: 'POST', 
    });
    let data = response.json();
    return data;
  } catch(e) {
    return e
  }
}
$fetch("http://api.k780.com/?app=weather.today&weaid=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json").then((res)=>{
  console.log(res)
})
```
对比XMLHttpRequest可以看出来fetch的语法简洁，更加语义化，且基于标准 Promise 实现，支持 async/await

### 配置参数

#### 请求配置
``` 
const myHeaders = new Headers(); //header的具体配置见参考3
fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // 为了让浏览器发送包含凭据的请求(chrome测试默认是包含的), include, same-origin, *omit
    headers: myHeaders,
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // 跨域请求是否发送 no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
```
### 返回内容·
- Response.status — 整数(默认值为200) 为response的状态码.
- Response.statusText — 字符串(默认值为"OK"),该值与HTTP状态码消息对应.
- Response.ok — 如上所示, 该属性是来检查response的状态是否在200-299(包括200,299)这个范围内.该属性返回一个Boolean值.
- Response.Body返回的是一个可读信息流（ReadableStream），所以需要先通过一次reslove处理成对应js数据，再进行解析。Response 下共有5个方法：
  1. arrayBuffer()
  2. blob()
  3. json()
  4. text()
  5. formData() 
  
这些方法让非文本化的数据使用起来更加简单

## 不足之处

1. 没有abort方法，请求发出后无法阻止，不支持超时控制。
2. fetch没有办法原生监测请求的进度，而XHR可以。
3. 无论请求返回时400，还是200，均会进入resolve处理，catch内捕获到的是resolve内发生的异常，譬如`Response.json()`的报错，所以，需要在resolve内判断`Response.status`或`Response.ok`来监测请求状态是否正常。


## 参考
1. [MDN Fetch 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
2. [传统 Ajax 已死，Fetch 永生](https://segmentfault.com/a/1190000003810652)
3. [MDN 使用 Fetch ](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#Headers)
4. [XMLHttpRequest Level 2 使用指南](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)