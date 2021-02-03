---
title: 你不知道的JS系列-3
date: 2021-02-02 16:52:59
tags: [你不知道的js]
categories: JavaScript
---
## 概述
本篇接着《你不知道的JavaScript-上卷》，介绍本书的最后一部分：原型与类。

从接触JavaScript这门语言开始，相信都绕不开原型，原型链，面向对象，类等概念，我们可以先抛开这些东西，跳出来看下JavaScript的诞生过程。这个可以参考[阮一峰-Javascript继承机制的设计思想](https://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html) 和 Javascript设计者-- [Brendan Eich的百科](https://baike.baidu.com/item/Brendan%20Eich)，会渐渐明白Javascript为何存在这么多的争议，为什么叫Javascript却跟Java没有一毛钱的关系，更像是C语言和Self语言一夜情的产物~~

Javascript的基本设计思路如下：

      (1)借鉴C语言的基本语法;
      (2)借鉴Java语言的数据类型和内存管理;
      (3)借鉴Scheme语言，将函数提升到"第一等公民"(first class)的地位;
      (4)借鉴Self语言，使用基于原型(prototype)的继承机制

说好听点就是集各家所长，难听点就是四不像了~；设计者也未曾料到Javascript会发展壮大到如今的地步，所谓时势造英雄。

下面，我们进入正题，再次学习下Javascript的原型与类

<!-- more -->
## 面向对象
与其它的语言相比，JavaScript 中的“对象”总是显得不那么合群。Javascript是面向对象的一门语言（也是一门函数式编程语言，后续再开文介绍），关于对象可以参考之前的博文[重学前端系列-对象](/重学前端4-JavaScript部分-对象/)

而面向对象的编程语言中，有两种不同的流派来“抽象”对象，一种是基于类的编写（Java，C++等），一种是基于原型的编写（Self，kevo）；

因为一些政治原因，JavaScript 推出之时受管理层之命被要求模仿 Java，所以，Brendan Eich 在“原型运行时”的基础上引入了 new、this 等语言特性，使之“看起来更像 Java”，不过也导致JavaScript的原型链更难理解。

## 原型
在 JavaScript 之前，原型系统就更多与高动态性语言配合，Brendan Eich最终选择了原型系统来进行设计，而原型系统的原型系统的“复制操作”有两种实现思路：

- 一个是并不真的去复制一个原型对象，而是使得新对象持有一个原型的引用；
- 另一个是切实地复制对象，从此两个对象再无关联。

显然，Brendan Eich选择的是第一种，上面已经多次提到了`[[Prototype]]`，就是关联对象的特殊属性：

    var anotherObject = { a:2 }; 
    var myObject = Object.create( anotherObject );// 创建一个关联到 anotherObject 的对象
    console.log(myObject.a);// 2

熟悉JS中原型链的很容易理解上面的运行结果，当我们获取一个对象属性时就会触发`[[Get]]`操作，该操作的第一步就是检查获取的属性是否存在当前对象中，如果有就使用，如果没有则会顺着对象的`[[Prototype]]`属性继续查找，使用 `for..in` 遍历对象时原理和查找 `[[Prototype]]` 链类似，所有普通的 `[[Prototype]]` 链最终都会指向内置的 `Object.prototype`

![](./1.png)


## 类
我们经常讨论到的设计模式如：迭代器模式、观察者模式、工厂模式、单例模式等，都是基于面向对象类的基础上实现了。**类本身也是一种设计模式!!!!**；在Javascript的世界中，类不是必须的（这点不同于Java，Java中万物都是类），也可以选择面向过程化编程。

纵然ES6中提供了class等关键字，但Javascript依旧是面向对象的编程语言，而非面向类。

### 理解类与实例
如果拿建筑蓝图与建筑实体来做类比：建筑蓝图就是一个类，它只是建造计划，并不是真正的建筑；而依旧设计蓝图建造出来的实体建筑就是一个实例：它是一个真正存在的对象。

### 构造函数
类的实例是由构造函数创建的，这个函数通常与类名相同，使用伪代码来实现一个例子：

    class CoolGuy {
      specialTrick = 'something'
      CoolGuy( trick ) {  
        specialTrick = trick  // 构造函数
      }
      showOff() { 
        output( "Here's my trick: ", specialTrick ) 
        } 
     }

调用类构造函数来生成一个 CoolGuy 实例： 

    Joe = new CoolGuy( "jumping rope" ) 
    Joe.showOff() // Here's my trick: , specialTrick

对于真正的类语言来说，构造函数是属于类的。然而，在 JavaScript 中恰好相反——**实际上“类”是属于构造函数的!!!**

### 继承和多态
面向对象的语言的三大特性：封装，继承和多态
- 封装
  《JavaScript高级程序设计》-第6章 面向对象的程序设计-6.2 创建对象中有

- 继承
在面向类的语言中，我们可以先定义一个类，然后定义一个继承前者的类。 后者通常被称为“子类”，前者通常被称为“父类”，这点非常类似现实中的“父亲与孩子”。
子类会继承父类的一些属性与方法，但是也可以重写所有继承的行为甚至定义新行为，所以子类定义好后，其实是一个完全独立的不同于父类的类。子类只是父类行为复制后的一个副本

- 多态
首选，简单明确下多态的概念：同一个操作，作用于不同的对象，会产生不同的结果。（可参照博客：[设计模式-多态](https://www.jianshu.com/p/004c974a2f53)）

任何方法都可以引用继承层次中高层的方法，同时在继承链的不同层次中一个方法名可以被多次定义。在子类中也可以相对引用它继承的父类，这种相对引用 通常被称为`super`


