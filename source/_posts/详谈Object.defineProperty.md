---
title: 详谈Object.defineProperty
date: 2019-11-14 16:33:48
tags: [js]
categories: JavaScript
---
## 概述
Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性，并返回这个对象。

<!-- more -->

## 语法

	Object.defineProperty(obj,prop,descriptor)

## 参数

- obj 需要定义属性的对象。
	
- prop 需定义或修改的属性的名字。
	
- descriptor 将被定义或修改的属性的描述符。

## 属性描述符

主要有两种形式： 数据描述符和存取描述符.

### 数据描述符

拥有可写或不可写值的属性，可选键值如下：

- configurable: 当且仅当configurable为true时，该属性描述符才能够被改变，也能被删除，默认为false（默认不可delect删除） 
- enumerable:  当其值为true时，该属性才能够出现在对象的枚举属性中，默认为false（不可枚举 譬如：for in） 
- writable: 当且仅当该属性的值为true时，该属性才能被赋值运算符改变， 默认为false。 
- value： 该属性对应的值，可以是任意有效的javascript的值（数值，对象，函数等），默认为undefined

举个例子：

      var a={};
      Object.defineProperty(a, "b", {
            configurable: false, // 不可删除
            enumerable: false,// 不可通过for in 枚举
            writable: false, // 不可通过等号赋值改写
            value: 8  //属性值
          })

### 存取描述符

由一对getter-setter函数功能来描述的属性，可选键值如下：

- configurable: 当且仅当configurable为true时，该属性描述符才能够被改变，也能被删除，默认为false（默认不可delect删除）
- enumerable:  当其值为true时，该属性才能够出现在对象的枚举属性中，默认为false（不可枚举 譬如：for in） 
- get:  给属性提供getter的方法，如果没有 getter 则为undefined。当我们读取某个属性的时候，其实是在对象内部调用了该方法，此方法必须要有return语句。该方法返回值被用作属性值。默认为 undefined 。
- set：设置属性值的方法， 如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为undefined。也就是说，当我们设置某个属性的时候，实际上是在对象的内部调用了该方法。

## 注意点

1. 在 descriptor 中 如果设置了 set 或 get, 就不能设置 writable 和 value 中的任何一个，否则报如下错误

        Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object> at Function.defineProperty 


