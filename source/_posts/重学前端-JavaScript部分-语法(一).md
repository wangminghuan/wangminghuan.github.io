
---
title: 重学前端-JavaScript部分-语法(一)
date: 2019-07-10 05:00:00
tags: [js]
categories: 重学前端
---

## 概述
脚本与模块

## 自动插入分号规则

因为JavaScript 语言提供了相对可用的分号自动补全规则，所以很多开发者倾向于不写分号。  
分号自动补全规则有三条：

- 有换行符，且下一个符号是不符合语法的，那么就尝试插入分号。
- 有换行符，且语法中规定此处不能有换行符，那么就自动插入分号。
- 源代码结束处，不能形成完整的脚本或者模块结构，那么就自动插入分号。

但在实际应用中，还有一个no LineTerminator here 规则：表示它所在的结构中的这一位置不能插入换行符

![](./1.jpg)

举个例子：

    function foo(){
      return 
      1
    }
    foo(); // undefined;

上面例子中，根据no LineTerminator here规则，return后面不能插入换行符，但现在存在换行符，那个一句分号自动补全规则的第二条：`有换行符，且语法中规定此处不能有换行符，那么就自动插入分号`，引擎会在return后面直接插入分号，那么执行结果就不难理解了。

日常开发中还会出现几种不写分号，极易造成错误的情况：

- 以括号开头的语句

      (function(a){
          console.log(a);
      })()/*这里没有被自动插入分号*/
      (function(a){
          console.log(a);
      })()
- 以数组开头的语句

      var a = [[]]/*这里没有被自动插入分号*/
      [3, 2, 1, 0].forEach(e => console.log(e))

- 以正则表达式开头的语句

      var x = 1, g = {test:()=>0}, b = 1/*这里没有被自动插入分号*/
      /(a)/g.test("abc")
      console.log(RegExp.$1)

- 以模板字符串开头的语句

      var f = function(){
        return "";
      }
      var g = f/*这里没有被自动插入分号*/
      `Template`.match(/(a)/);
      console.log(RegExp.$1)