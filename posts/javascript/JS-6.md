---
title: 你不知道的JS系列-6
date: 2021-05-07
categories:
  - javascript
tags:
  - 你不知道的js
---

## 概述

<!-- more -->

### 断言

## ES6

- 语句由一个或多个表达式组成
- 一个独立的表达式也可以称为表达式语句
- JavaScript 引擎实际上是动态编译程序，然后立即执行编译后的代码
- 在 JavaScript 中作为常量的变量用大写表示，多个单词之间用下划线 _ 分隔
- JavaScript 中，只有值有类型；变量只是这些值的容器
- 如果一个函数内部有一个 this 引用，那么这个 this 通常指向一个对象。但它指向的是哪个对象要根据这个函数是如何被调用来决定。this 并不指向这个函数本身
- 默认值表达式是惰性求值的，这意味着它们只在需要的时候运行

### 解构

对象的结构赋值，与常见的赋值逻辑相反：

    const { a: X, b: Y }={a:10,b:20}
    const {M,N}={M:1,N:2}
    console.log([X,Y])  // [10,20]
    console.log([M,N])  // [1,2]

常规赋值是，`target:source` 模式，从上面例子可以看到他是反转的，将`:`左侧的值赋值给右侧，即`source:target` 模式

### 简洁属性/方法

ES6中可以将对象的属性简化:

      const x = 2, y = 3, 
      o = { 
        x, 
        y 
      }

同样，对于方法也可以简化

    const o={
      x(n){
        return n
      },
      y(m){
        return m
      }
    };

但是这种简洁写法也存在一定弊端，譬如内部引用时：

    const run={
      some:function some(x,y){
        if(x<y) return some(y,x)
        return x-y
      }
    }
    console.log(run.some(1,4))
    console.log(run.some(4,1))

此时我们无法用简洁模式表达(或者说会产生其他隐患问题)，但需来取即可


### super

### 标签模板

模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）

    const a=10;
    const b=2;
    function foo(...arg){
      console.log([...arg])
    }
    foo`Hello ${ a + b } world ${ a * b }`; //  [[ 'Hello ', ' world ', '' ], 12, 20 ]

从上面例子也可以看出等同于`foo([ 'Hello ', ' world ', '' ], 12, 20)`

标签模板调用函数时，函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分；被替换的部分作为后续参数依次传入。

    
### 箭头函数
  
在箭头函数内部，this 绑定不是动态的，而是词法的

### for of 循环

JavaScript 中默认为（或提供）iterable 的标准内建值包括：

- Arrays 
- Strings
- Generators（迭代器）
- Collections / TypedArrays ( 类数组）

普通对象并不适用for of循环