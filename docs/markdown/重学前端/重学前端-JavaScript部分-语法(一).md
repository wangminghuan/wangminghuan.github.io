---
title: 重学前端-JavaScript部分-语法(一)
lastUpdated: 2019-07-10 05:00:00
---
# {{$frontmatter.title}}

本文我们开始介绍语法部分相关内容


## 脚本与模块
ES6之前，JS中只有一种源文件，称之为脚本；ES6之后，出现了另外一种源文件，称之为：模块


### 模块的使用

我们可以在script标签中加入`type="module"` 属性，这时候加载的文件就是模块，反之则为脚本
```
 <script type="module" src="xxxxx.js"></script>
```
在脚本文件中我们可以使用import声明与export声明

![](./image/4642586522.jpg)

关于import 与 export的用法可以参考[ES6系列-5-Class与Module](/ES6系列-5-Class与Module/)

### 函数体
宏任务中可能会执行的代码包括“脚本”、“模块”和“函数体”，函数体其实也是一个语句的列表。跟脚本和模块比起来，函数体中的语句列表中多了 return 语句可以用，函数体实际上有四种，下图做了对比

![](./image/4642586523.jpg)

## JS语法的全局机制

 JavaScript 语法的全局机制：预处理和指令序言，这两个机制对于我们解释一些 JavaScript 的语法现象非常重要
### 预处理

JavaScript 执行前，会对脚本、模块和函数体中的语句进行预处理。预处理过程将会提前处理 var、函数声明、class、const 和 let 这些语句，以确定其中变量的意义。

#### var 声明

在预处理阶段，var 的作用能够穿透一切语句结构（包括`if(false)`也无法阻挡），它只认脚本、模块和函数体三种语法结构。在ES6出现之前，为了模拟函数作用域，经常使用IIFE
#### function 声明

在全局（脚本、模块和函数体），function 声明表现跟 var 相似，不同之处在于，function 声明不但在作用域中加入变量，还会给它赋值：
```

console.log(foo); // 打印出函数体
function foo(){}
```
如果出现在`if(false)`下，仍然会产生变量，只是不会被提前赋值

```
console.log(foo); // undefined 
if(true) {
    function foo(){} // 如果没有此处代码，上面console部分会报错
}
```
#### class 声明
class 声明在全局的行为跟 function 和 var 都不一样

提前使用会报错，这符合正常预期
```
console.log(c); // 报错 Uncaught ReferenceError: c is not defined
class c{}
```
但下面这种情况仍然会报错
```
  var c = 1;
  function foo(){
      console.log(c); // ReferenceError: Cannot access 'c' before initialization
      class c {}
  }
  foo();
```
这说明，class 声明也是会被预处理的，它会在作用域中创建变量，并且要求访问它时抛出错误。class 的声明作用不会穿透 if 等语句结构，所以只有写在全局环境才会有声明作用
### 指令序列
脚本和模块都支持一种特别的语法，叫做指令序言（Directive Prologs）。的目的是留给 JavaScript 的引擎和实现者一些统一的表达方式，在静态扫描时指定 JavaScript 代码的一些特性。

"use strict"是 JavaScript 标准中规定的唯一一种指令序言
## 自动插入分号规则

因为JavaScript 语言提供了相对可用的分号自动补全规则，所以很多开发者倾向于不写分号。  
分号自动补全规则有三条：

- 有换行符，且下一个符号是不符合语法的，那么就尝试插入分号。
- 有换行符，且语法中规定此处不能有换行符，那么就自动插入分号。
- 源代码结束处，不能形成完整的脚本或者模块结构，那么就自动插入分号。

但在实际应用中，还有一个no LineTerminator here 规则：表示它所在的结构中的这一位置不能插入换行符

![](./image/4642586521.jpg)

举个例子：
```
function foo(){
  return 
  1
}
foo(); // undefined;
```
上面例子中，根据no LineTerminator here规则，return后面不能插入换行符，但现在存在换行符，那个一句分号自动补全规则的第二条：`有换行符，且语法中规定此处不能有换行符，那么就自动插入分号`，引擎会在return后面直接插入分号，那么执行结果就不难理解了。

日常开发中还会出现几种不写分号，极易造成错误的情况：

- 以括号开头的语句
```
  (function(a){
      console.log(a);
  })()/*这里没有被自动插入分号*/
  (function(a){
      console.log(a);
  })()
```
- 以数组开头的语句
```
  var a = [[]]/*这里没有被自动插入分号*/
  [3, 2, 1, 0].forEach(e => console.log(e))
```
- 以正则表达式开头的语句
```
  var x = 1, g = {test:()=>0}, b = 1/*这里没有被自动插入分号*/
  /(a)/g.test("abc")
  console.log(RegExp.$1)
```
- 以模板字符串开头的语句
```
  var f = function(){
    return "";
  }
  var g = f/*这里没有被自动插入分号*/
  `Template`.match(/(a)/);
  console.log(RegExp.$1)
```