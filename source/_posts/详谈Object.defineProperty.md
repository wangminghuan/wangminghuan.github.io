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

|  属性   | 默认值  | 说明   | 
|  :----- | :-----|  :----- | 
| configurable	| false	| 描述属性是否可以被删除，默认为 false ; 具备 数据描述符 和 存取描述符 | 
| enumerable	| false	| 描述属性是否可以被for...in或Object.keys枚举，默认为 false ; 具备 数据描述符 和 存取描述符 | 
| writable	| false	| 描述属性是否可以修改，默认为 false ; 具备 数据描述符 | 
| value	| undefined	| 属性值，默认为undefined ; 具备 数据描述符 |  
| get	| undefined	| 当访问属性时触发该方法，默认为undefined ; 具备 存取描述符 | 
| set	| undefined	| 当属性被修改时触发该方法，默认为undefined; 具备 存取描述符 | 


js对象中属性描述符号有两种形式： 数据描述符和存取描述符：

### 数据描述符

拥有可写或不可写值的属性，可选键值如下：

- configurable
- enumerable
- writable
- value

举个例子：

      var a={};
        Object.defineProperty(a, "b", {
          configurable: false, // 不可删除
          enumerable: false,// 不可通过for in 枚举
          writable: false, // 不可通过等号赋值改写
          value: 8  //属性值
        })
        console.log(a.b);//8
        console.log(Object.keys(a));// []
        a.b=1; //报错  Uncaught TypeError: Cannot assign to read only property 'b' of object '#<Object>'
        delete a.b //报错 Uncaught TypeError: Cannot delete property 'b' of #<Object>

### 存取描述符

由一对getter-setter函数功能来描述的属性，可选键值如下：

- configurable
- enumerable
- get
- set

举个例子：

      var b={},val='7';
      Object.defineProperty(b, "a", {
        configurable: false, // 不可删除
        enumerable: false,// 不可通过for in 枚举
        get: function () {
          return val
        },
        set: function (newVal) {
          val = newVal
        }
      })
      console.log(b.a);// 7
      console.log(Object.keys(b));//[]
      b.a=1;
      console.log(b.a);// 1
      delete b.a ;//报错 Uncaught TypeError: Cannot delete property 'a' of #<Object>

因为JS的数据描述符和存取描述符只能选取一种规则，所以在 descriptor 中 如果设置了 set 或 get, 就不能设置 writable 和 value 中的任何一个，否则报如下错误：

        Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object> at Function.defineProperty 

## 数据劫持

Vue的数据劫持就是利用Object.defineProperty来实现的（vue中可以直接改变data，vue内部的watcher机制会监听到这些数据的变化从而刷新页面，而react则是手动驱使setState去改变内部的state，从而使得页面刷新）  

下面我们简单模拟下数据劫持的过程：


    function observe(obj) {
        if (!obj || typeof obj !== "object") {
          return;
        }
        Object.keys(obj).forEach(function (key) {
          defineReactive(obj, key, obj[key])
        })
      }

    function defineReactive(obj, key, value) {

      observe(value); //监听属性内部对象的变化
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false, //不能删除
        get: function () {
          return value
        },
        set: function (newVal) {
          console.log("监听到属性" + key + "变化了", value + "-->" + newVal);
          value = newVal
        }
      })
    }
    const obj = {
      name: "jack",
      age: "14",
      desc: {
        job: "coder",
        worker: "bj"
      }
    }
    observe(obj)

我们接下来修改对象的属性

    obj.name="mike"
    //监听到属性name变化了 jack-->mike

    obj.desc.job="teacher"
    //监听到属性job变化了 coder-->teacher

这样，便实现了数据的劫持。