---
title: ES6系列-4-Proxy与Reflect
date: 2019-11-04 11:10:13
tags: [javascript]
categories: ES6系列
---
## 概述
Proxy: 英文意思为：代理，读音为：[ˈprɒksi]。它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

<!-- more -->
我们先看一个例子

    var obj = new Proxy({}, {
      get(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
      }
    });

运行下面代码：

    obj.name="mike"
    //setting name!

    obj.name
    //getting name!
可以看到ES6重载了点运算符，即用自己的定义覆盖了语言的原始定义。

## Proxy 对象

### Proxy 构造函数
ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

    var proxy = new Proxy(target, handler);

- target参数表示所要拦截的目标对象
- handler参数也是一个对象，用来定制拦截行为

我们在target对象上设置一层拦截：

      var target = {};
      var handler = {
        get(target, property){
          return 'Li'
        },
      };
      var proxy = new Proxy(target, handler);

当修改target对象时

      target.name="jack";

可以看到proxy其实是接收到变化了
![](1.jpg)

但当我们访问proxy下属性时，返回的依旧是`Li`:
 
      proxy.name //'Li'
直接设置proxy.name,proxy返回的依旧是`Li`,target变为了`tom`:

      proxy.name="tom"
      proxy.name //'Li'
      target.name //"tom"
这很好理解，所有访问操作都会经过代理再处理一层，所以返回的永远是 `Li`

### Proxy 实例
Proxy 实例也可以作为其他对象的原型对象（沿用上述例子）。

      var target = {};
      var handler = {
        get(target, property){
          return 'Li'
        },
      };
      var proxy = new Proxy(target, handler);
      var obj = Object.creat(proxy)
      console.log(obj.time);// 'Li'


## Proxy 实例方法

### get()
get方法用于拦截某个属性的读取操作，可以接受三个参数：

    get(target,property[,self])

    - target: 目标对象
    - property: 属性名
    - self: proxy 实例本身,严格地说，是操作行为所针对的对象，可选


### set()

### apply()

### has()

### construct()

### deleteProperty()

### defineProperty()

### getOwnPropertyDescriptor()

### getPrototypeOf()

### isExtensible()

### ownKeys()

### preventExtensions()

### setPrototypeOf()


## Proxy.revocable()

## this 问题