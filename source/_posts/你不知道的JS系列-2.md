---
title: 你不知道的JS系列-2
date: 2021-01-16 11:57:04
tags: [你不知道的js]
categories: JavaScript
---

## 前言

本篇主要为阅读《你不知道的JavaScript-上卷》中遇到自己遗漏的知识点，加上一些自己的理解进行了梳理整理，阅读章节为第一部分：this和对象原型
<!-- more -->

## 关于this
`this`关键字是 JavaScript 中最复杂的机制之一, 在面向对象编程中，他是不可或缺的一份子。this到底是什么呢？不同与js中的词法作用域，this是一个很特别的存在:  

    this 在任何情况下都不指向函数的词法作用域

this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用!!!!

### 调用栈

利用chrome的调试工具，我们可以很清晰的看到函数的调用栈：

    function baz() { 
      // 当前调用栈是：baz // 因此，当前调用位置是全局作用域 
      console.log( "baz" ); 
      bar(); // <-- bar 的调用位置 
    }
    function bar() {
      // 当前调用栈是 baz -> bar // 因此，当前调用位置在 baz 中 
      console.log( "bar" ); 
      foo(); // <-- foo 的调用位置 
    }
    function foo() { 
      // 当前调用栈是 baz -> bar -> foo // 因此，当前调用位置在 bar 中 
      console.log( "foo" ); 
    }
    baz(); // <-- baz 的调用位置

栈中第二个元素，这就是真正的调用位置：

![](./1.png)
![](./2.png)
![](./3.png)

## this 绑定规则

在函数的执行过程中如何确定 this 的绑定对象，有以下四条规则：

### 默认绑定
最常见的函数调用方式就是：独立调用；此时函数内的this指向全局对象（非严格模式下）

    function foo(){
      console.log(this.a)
    }
    var a=1
    foo();// 1

### 隐式绑定
我们先看如下代码：

    function foo() { 
      console.log( this.a ); 
    }
    var obj = { 
      a: 2, 
      foo: foo 
    };
    obj.foo(); // 2

通过obj对象来调用函数，被调用函数被obj对象“拥有”了，这就是一种隐式绑定，并且对象属性引用链的最后一层才会影响this，在上面例子上，继续添加：

    var obj2 = {
      a:1,
      obj:obj
    }
    obj2.obj.foo(); // 2


但隐式绑定经常出现this丢失的问题：

    function foo() { 
      console.log( this.a ); 
    }
    var obj = { 
      a: 2, 
      foo: foo 
    };
    var a="global";
    var bar=obj.foo;
    bar(); // global

    setTimeout(obj.foo,1000) // global

this隐式丢失是非常常见的（在回调函数更是常见），此时需要我们进行显示绑定

### 显式绑定
此时，我们请出`call`函数与`apply`函数以及`bind`函数, call 与 apply 功能基本相同以call为例，先说下这两个函数，依旧沿用上面的例子

    function foo() { 
      console.log( this.a ); 
    }
    var obj = { 
      a: 2, 
      foo: foo 
    };
    var a="global";
    var bar=obj.foo;
    bar.call(obj); // 2

通过call可以强制将this指向obj对象，但对于回调函数，call/apply依旧无能为例，因为执行call/apply就相当于执行了函数，并没有返回新的函数，此时，就需要ES5中的bind函数登场了：
    
    setTimeout(obj.foo.bind(obj),1000); // 2

JavaScript 语言和宿主环境中许多新的内置函数，都提供了一 个可选的参数，通常被称为“上下文”（context），其作用和 bind(..) 一样：

    function foo() { 
      console.log( this.a ); 
    }
    var obj = { 
      a: 2, 
      foo: foo 
    };
    var a="global";

    [1].forEach(foo,obj);// 2

它们内部也是通过call/apply来进行了显示绑定

### new绑定
首先要跳出一个误区：JS中没有构造函数，所谓的构造函数，其实只是对函数的“构造调用”。

用new调用过会自动执行以下操作：

- 创建（或者说构造）一个全新的对象。
- 这个新对象会被执行 [[ 原型 ]] 连接。
- 这个新对象会绑定到函数调用的 this。
- 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

我们接着看代码：
   
   function foo(a){
     this.a=a;
   }
   var bar=new foo(2);
   console.log(bar.a) //2
   


## this 绑定优先级

对于正常函数调用来说，函数绑定this的优先级如下：

      new绑定 >  显式绑定 >  隐式绑定 > 用默认绑定
      
但，凡事总有例外:

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind时，此时会执行默认规则，如对参数进行柯里化（关于柯里化会单独开篇再讲）：

     function add(a,b){
       console.log("a:" + a + ", b:" + b);
     }
     add.apply(null,[2,3]);// a:2, b:3

但这样用null来忽略this的指向还是不够"安全"，我们可以通过创建空对象来实现：

    function add(a,b){
       console.log("a:" + a + ", b:" + b);
     }
     add.apply(Object.create( null ),[2,3]);// a:2, b:3
     
## 箭头函数

ES6中的箭头函数不适用四种标准规则，而是根据外层（函数或者全局）作用域来决定 this，箭头函数回归了词法作用域来替代this的机制

    function foo() {
      setTimeout(() => {
        // 这里的 this 在此法上继承自 foo()
        console.log(this.a); // 2
      },100);
      setTimeout(function(){
      console.log(this.a);// global
      },200);
    }
    var obj = {
      a:2
    };
    var a = "global";
    foo.call(obj);
## 对象
 JavaScript 中一共有七种主要类型（术语是“语言类型”）: `null/undefined/boolean/string/number/symbol/object`,具体可参见[重学前端系列-数据类型](/重学前端3-JavaScript部分-数据类型/)，
 
[重学前端系列-对象](/重学前端4-JavaScript部分-对象/)

