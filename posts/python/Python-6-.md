---
title: Python系列-6-面向对象
date: 2020-10-13
categories:
  - python
tags:
  - note
---

## 概述
 
上一篇中已经提到了Python中的类，这里我们再详细介绍下
<!-- more -->

## 类的写法

类是用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。对象是类的实例。

    class People:
        
        # 静态字段
        #定义基本属性
        name = ''
        age = 0
        # 定义私有属性,私有属性在类外部无法直接进行访问
        __weight = 0

        #定义构造方法
        def __init__(self,n,a,w):

            # 普通字段
            self.name = n
            self.age = a
            self.__weight = w
        def speak(self):
            print("%s 说: 我 %d 岁。" %(self.name,self.age))
    
    # 实例化类
    p = People('Tom',10,30)
    p.speak()
    # 直接访问静态字段 不可修改
    print(People.age)
    # 直接访问普通字段
    print(p.age)
  
 运行结果：

    Tom 说: 我 10 岁。
    0
    10

- 普通字段属于对象，静态字段属于类，如果每个对象都具有相同的字段，那么就使用静态字段（因为静态字段在内存中只保存一份）
- 类内部有一个特殊方法（构造方法）： `__init__` 方法，在实例化操作时候会被自动调用。
- 在类的内部，使用 def 关键字来定义一个方法，与一般函数定义不同，类方法必须包含参数 self, 且为第一个参数，self 代表的是类的实例(self不是关键字，所以也可以换成其他的，如my)

## 类的继承

Python 同样支持类的继承，定义一个Man类且继承上面的People类:

    class Man(People):
        sex = 'man'
        def __init__(self,n,a,w,g):
            #调用父类的构函
            People.__init__(self,n,a,w)
            self.job = g
        #覆写父类的方法
        def speak(self):
            print("%s 说: 我 %d 岁了，我是一名 %s "%(self.name,self.age,self.job))
    m = Man("Jack",20,50,'student')
    m.speak()
    print(Man.sex)

运行结果：

    Jack 说: 我 20 岁了，我是一名 student
    man

并且，Python还支持多个类的继承，需要注意圆括号中父类的顺序，若是父类中有相同的方法名，而在子类使用时未指定，python从左至右搜索 即方法在子类中未找到时，从左到右查找父类中是否包含方法：

新定义一个Speaker类：

    class Speaker:
        topic = ''
        name = 'Jam'
        def __init__(self,n,t):
            self.name = n
            self.topic = t
        def speak(self):
            print("我叫 %s，我是一个演说家，我演讲的主题是 %s"%(self.name,self.topic))
 
再定义一个Man类继承Speaker和People：

    class Man(Speaker,People):
        sex = 'man'
        def __init__(self,n,a,w,g):
            #调用父类的构函
            People.__init__(self,n,a,w)
            Speaker.__init__(self,n,a)
            self.job = g

    m = Man("Jack",20,50,'student')
    m.speak()
    print(Man.name)

执行结果：

    我叫 Jack，我是一个演说家，我演讲的主题是 20
    Jam

可以看到，多重继承时，是从左到右查找父类的。

继承过程中，子类的方法会重写父类的方法，如果需要调用父类方法，此时可以使用`super()`: 该函数是用于调用父类(超类)的一个方法：

    class Man(People):
        sex = 'man'
        def __init__(self,n,a,w,g):
            #调用父类的构函
            People.__init__(self,n,a,w)
            self.job = g
        #覆写父类的方法
        def speak(self):
            print("%s 说: 我 %d 岁了，我是一名 %s "%(self.name,self.age,self.job))
    m = Man("Jack",20,50,'student')
    m.speak()
    print(Man.sex)
    super(Man,m).speak()
    super(Man,m).speak()

运行结果：


    Jack 说: 我 20 岁了，我是一名 student
    man
    Jack 说: 我 20 岁。

ES6中也有super关键字，也是用在继承过程中，不过二者用法相差较大，有兴趣可以查看：[ECMAScript 6 入门-super关键字](https://es6.ruanyifeng.com/#docs/class-extends#super-%E5%85%B3%E9%94%AE%E5%AD%97)

最后，Python中**没有多态**的概念。

## 参考
- [Python 面向对象（进阶篇）](https://zhuanlan.zhihu.com/p/34781040)