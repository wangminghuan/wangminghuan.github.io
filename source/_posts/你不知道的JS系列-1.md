---
title: 你不知道的JS系列-1
date: 2021-01-14 18:18:54
tags: [你不知道的js]
categories: JavaScript
---

## 前言

本篇主要为阅读《你不知道的JavaScript-上卷》中发现的一些问题，梳理整理下自己知识点，加上一些自己的理解
<!-- more -->

## 编译原理

通常会将 JavaScript 归类为“动态”或“解释执行”语言，但事实上它是一门编译语言，但它并非同C++等语言是进行提前编译的（词法分析:拆词->语法分析:AST抽象语法树->代码生成：AST转为可执行代码），它的编译过程是在JS引擎中完成的（代码执行前进行编译）：

- 引擎从头到尾参与js的编译与执行过程
- 编译器则是引擎的好朋友，负责语法解析与代码生成等工作
- 作用域也是引擎的好朋友，通过一套严格规则来确定当前执行代码对这些标识符的访问权限

## 词法作用域

同多数编程语言一样，JS的作用域为词法作用域（也成为静态作用域），也就是作用域是根据你编写代码时变量与块作用域写在哪里决定的，而非运行时决定。

请看下面例子：

		var val=1;
		function foo(){
		  console.log(val)
		}
		function bar(){
		 var val=2;
		  foo()
		}
		bar() ;//运行结果为：1

这是因为函数foo在函数bar中调用，但其作用域在定义时已经确定，即只能访问到foo函数内部跟全局作用域。

JavaScript 中有两种机制可以“欺骗词法作用域”：

###  eval 

看下面的例子:

		var a=1;
		function foo(str,b){
		eval(str);
		console.log(a,b)
		}
		var str="var a=2";
		foo(str,4) // 运行结果为：2,4  

在执行eval之后，引擎并不知道eval是以动态的方式进入的，并对词法环境进行修改。所以这个时候词法作用域就会被破坏。

严格模式的程序中，eval 在运行时有其自己的词法作用域

### with

with通常被当作重复引用一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身。  
with将对象的属性当作作用域中的标识符来处理，从而创建了一个新的词法作用域（运行阶段）。

	function foo(obj){  
	    with(obj){  
	        a = 2;  
	    }  
	}  
	var o1 = { a : 3 };  
	var o2 = { b : 3 };  
	  
	foo(o1);  
	console.log( o1.a );    // 2
	  
	foo(o2);  
	console.log( o2.b );    // 3
	console.log( a );       // 2，表明a泄漏到全局作用域上了！

with在严格模式下已经无法使用。最重要的时，由于eval 和 with 会绕开js引擎在编译阶段进行的性能优化，导致运行变慢；这些在js语言精粹中也有提及，都是js设计中的“糟粕”，不要再使用了。

## 报错

- ReferenceError：作用域中遍寻不到所需的变量，引擎就会抛出该异常；
- TypeError：作用域判别成功了，但是对结果的操作是非法或不合理的；

## 函数作用域

JS的词法作用域是基于函数的，在ES6语法中的块级作用域出现之前，我们创建作用域通常都是基于函数的，也经常看到如下代码：

    (function(){
      var a=1;
      console.log(a)
    })();
    console.log(a); //ReferenceError 引用报错

### IIFE

上述函数被称为立即执行函数表达式，也称为IIFE（Immediately Invoked Function Expression），它还有其他写法：

    (function(){
      var a=1;
      console.log(a)
    }());

两种写法是一致的，不过第一种经常出现在一些第三方库中，将全局对象的引用作为函数参数传递进去：

      var a=2;
      (function ( global ) {
      var a = 3;
      console.log( a ); // 3
      console.log( global.a ); // 2
      })( window );

这种写法使得函数对全局对象的引用更清晰直观。

IIFE 还有一种变化的用途是倒置代码的运行顺序， 将需要运行的函数放在第二位， 在 IIFE执行之后当作参数传递进去。 这种模式在[UMD项目](/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E8%BF%9B%E5%8C%96%E5%8F%B2/#UMD)中被广泛使用。 

## 块级作用域
块作用域是一个用来对之前的最小授权原则进行扩展的工具， 将代码从在函数中隐藏信息扩展为在块中隐藏信息。  
在ES6之前，JS是不不支持块级作用域的，但深入研究后，其实是有其他替代方案的。

### with
with会创建一个块级作用域，但他会引发其他问题，因为不再推荐使用

### try/catch

没错，try/catch的catch分句会创建一个块级作用域：

    try {
      throw 1;
    } catch (a) {
      a = 2;
      console.log( a );
    }
    console.log(a) ; //ReferenceError: a is not defined

但是try/catch在chrome中有性能问题（虽然从语法上看不应该运行缓慢）

### let && const

let 关键字可以将变量绑定到所在的任意作用域中。 换句话说， let为其声明的变量隐式地了所在的块作用域。

    var foo = true;
    if (foo) {
      let bar = foo * 2;
      console.log( bar );
    }
    console.log( bar ); // ReferenceError

const 与 let基本等同，只是其定义的值无法修改。

## 参考
- [知乎-JavaScript中圆括号() 和 方括号[] 的特殊用法疑问？](https://www.zhihu.com/question/20127472)

