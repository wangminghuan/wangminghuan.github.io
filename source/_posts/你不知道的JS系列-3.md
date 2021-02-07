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

说好听点就是集各家所长，难听点就是四不像了~；设计者也未曾料到Javascript会发展壮大到如今的地步，所谓时势造英雄。在深入了解Javascript后，应当取其精华，弃其糟泊；在《你不知道的JavaScript》中，本书作者其实是极其不推荐使用“模拟类”来设计代码。更推崇使用“行为委托”的方式设计代码。

下面，我们进入正题，再次学习下Javascript的原型与类

<!-- more -->
## 面向对象
与其它的语言相比，JavaScript 中的“对象”总是显得不那么合群。Javascript是面向对象的一门语言（也是一门函数式编程语言，后续再开文介绍），关于对象可以参考之前的博文[重学前端系列-对象](/重学前端4-JavaScript部分-对象/)

而面向对象的编程语言中，有两种不同的流派来“抽象”对象，一种是基于类的编写（Java，C++等），一种是基于原型的编写（Self，kevo）；

因为一些政治原因，JavaScript 推出之时受管理层之命被要求模仿 Java，所以，Brendan Eich 在“原型运行时”的基础上引入了 new、this 等语言特性，使之“看起来更像 Java”，不过也导致JavaScript的原型链更难理解。

## 原型
在 JavaScript 之前，原型系统就更多与高动态性语言配合，Brendan Eich最终选择了原型系统来进行设计，而原型系统的“复制操作”有两种实现思路：

- 一个是并不真的去复制一个原型对象，而是使得新对象持有一个原型的引用；
- 另一个是切实地复制对象，从此两个对象再无关联。

显然，Brendan Eich选择的是第一种，上面已经多次提到了`[[Prototype]]`，就是关联对象的特殊属性：

    var anotherObject = { foo:2 }; 
    var myObject = Object.create( anotherObject );// 创建一个关联到 anotherObject 的对象
    console.log(myObject.foo);// 2

熟悉JS中原型链的很容易理解上面的运行结果，当我们获取一个对象属性时就会触发`[[Get]]`操作，该操作的第一步就是检查获取的属性是否存在当前对象中，如果有就使用，如果没有则会顺着对象的`[[Prototype]]`属性继续查找，使用 `for..in` 遍历对象时原理和查找 `[[Prototype]]` 链类似，所有普通的 `[[Prototype]]` 链最终都会指向内置的 `Object.prototype`


![](./1.png)

JavaScript 中的对象具有高度的动态性：允许运行时向对象添加属性，这点与其他语言是完全不同的。我们为`myObject`添加属性
    
     myObject.foo='bar'
     console.log(myObject.foo, anotherObject.foo) ;// bar, 2

这个过程发生了“属性屏蔽”，也就是说，myObject 中包含的 foo 属性会屏蔽原型链上层的所有 foo 属性。
我们都习以为常，但是这个过程 其实存在三种情况，“属性屏蔽”不是一定发生的：

  1. 如果在 [[Prototype]] 链上层存在名为 foo 的普通数据访问属性并且没 有被标记为只读（writable:false），那就会直接在 myObject 中添加一个名为 foo 的新 属性，它是屏蔽属性。 
  2. 如果在 [[Prototype]] 链上层存在 foo，但是它被标记为只读（writable:false），那么 无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会 抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。 
  3. 如果在 [[Prototype]] 链上层存在 foo 并且它是一个 setter（参见第 3 章），那就一定会 调用这个 setter。foo 不会被添加到（或者说屏蔽于）myObject，也不会重新定义 foo 这 个 setter。

与我们常规认知不同，属性屏蔽只有在第一种情况下才发生。如果想要第二、三种也发生属性屏蔽，就需要使用`Object.defineProperty`方法来添加属性

### \_\_proto\_\_ 与 prototype

- \_\_proto\_\_  属性是一个访问器属性（一个getter函数和一个setter函数）, 暴露了通过它访问的对象的内部[[Prototype]] (一个对象或 null)，这个属性并不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6，但官网仍旧**不推荐使用**，而是使用`Object.setPrototypeOf`（写操作）、`Object.getPrototypeOf`（读操作）、`Object.create`（生成操作）来代替。

- prototype是函数才有的属性!!! 所有的函数默认都会拥有一个名为`prototype `的公有并且不可枚举的属性，它会指向另一个对象（通常被称为该函数的原型）。

### “类”函数
先看一下如下的代码：

    function Foo(name){
      this.name=name
    }
    Foo.prototype.sayHi=function(){
      console.log("Hi,"+this.name)
    }
    var f=new Foo("Tom")
    f.sayHi()                                             // Hi,Tom
    console.log(f.__proto__===Foo.prototype)              // true
    console.log(Object.getPrototypeOf(f)===Foo.prototype) // true
    console.log(Foo.prototype.constructor===Foo)           // true
    console.log(f.constructor===Foo)                       // true

通过 new 关键字 “实例”一个对象，`Foo`也通常被称作“构造函数”，但我们都知道，js的世界里面是没有类的，new 关键字也是Brendan Eich 模仿Java语法而设计出来的。实例f并没有方法`sayHi`，但看起来却向“继承”了Foo的方法，那么，这个过程究竟发生了什么？

通过new调用函数时，会将实例内部的[[Prototype]]属性(`__proto__`)关联到“类”函数的`prototype`属性下，也就是：`f.__proto__===Foo.prototype`，这样两个对象产生了关联，执行`f.sayHi`时会根据原型链查找到`Foo.prototype.sayHi`，此时看起来就像产生了所谓的“继承”，但是，JavaScript在这个过程并没有复制对象，只是通过委托的方式进行了属性(方法)的共享。



### “构造”函数

上述代码中`f.constructor===Foo`很容易让人误解 `Foo` 就是 `f`的构造函数（再加上new操作符更加深了这种误解），但实际并非如此：

`Object.prototype`对象下有一个公有并且不可枚举的属性`constructor`，这个属性引用的是对象关联的函数(本例为Foo)，而调用`f.constructor`跟过程其实也只是通过委托访问到了`Foo.prototype.constructor`，这点一定要明白：f下并不存在属性`constructor`！！！！


Foo 和其他函数没有任何区别。函数本身并不是构造函数，当我们在普通的函数调用前面加上 new 关键字之后，new 就会劫持所有普通函数并用构造对象的形式来调用它。

![](./2.png)
## 类
首先要明白一点：在Javascript的世界中，“模拟类”不是必须的（这点不同于Java，Java中万物都是类），因为Javascript无需通过类就可以直接创建对象。

在早期版本的 JavaScript 中，“类”的定义是一个私有属性 `[[class]]`，并且只能通过`Object.prototype.toString`来访问（这个方法是js中最准确判断数据类型的方法）。纵然ES6中提供了class等关键字，但Javascript依旧是面向对象的编程语言，而非面向类。

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


## 参考
- [MDN--Object.prototype.\_\_proto\_\_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
- [简书--\_\_proto\_\_ 和 prototype](https://www.jianshu.com/p/3d756c5bba16)

