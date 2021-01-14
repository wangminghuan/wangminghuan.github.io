---
title: 你不知道的JS系列-1
date: 2021-01-14 18:18:54
tags: [你不知道的js]
categories: JavaScript
---

## 概论

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

IIFE，代表立即执行函数表达式 （Immediately Invoked Function Expression）

