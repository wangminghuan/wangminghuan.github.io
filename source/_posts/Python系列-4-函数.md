---
title: Python系列-4-函数
date: 2020-08-03 10:48:10
tags: [note]
categories: Python
---

## 概述
函数能提高应用的模块性，和代码的重复利用率。Python提供了许多内建函数，比如print()。但我们也可以自己创建函数:
1. `def` 关键字来开头
2. 括号中间为函数参数
3. 函数第一行可以选择性的使用字符串作为函数说明
4. 函数内容以冒号（:）开始
5. return 表示函数结束，无返回内容默认返回None

<!-- more -->

## 函数定义

Python 定义函数使用 def 关键字，一般格式如下：

    def 函数名（参数列表）:
        函数体

Python是一种对缩进非常敏感的语言，对代码格式要求非常严格的，这块在函数体中可以更直白的看出来，举个例子：

    def fn1(num):
        "将传入的数字转为正整数，包含0"
        if num<0:
          return abs(num)
        return num
    print(fn1(10))
    print(fn1(-10))
    print(fn1(0))

运行结果：

    10
    10
    0

## 参数

### 可更改(mutable)与不可更改(immutable)对象

在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list,dict 等则是可以修改的对象。所谓不可更改对象是指，变量只是一个对象的引用（指针），如：

    a = "Hello"
    a = [1,2,3]

a的重新赋值，并不会修改之前引用对象的值，而是重新创建了一个对象，把a又指向了这个对象。

    def change(a):
      a = 100

    b=20
    change(b)
    print(b) # b的值并没有被修改

但对于列表与字典，则会修改原始数据：

      def change(a):
        a.reverse()

      b=[1,2,3,4]
      change(b)
      print(b) # [4,3,2,1]
      
### 必需参数

必须参数就是函数运行时必须的参数，否则会报错，如上change方法，如果直接运行就会报错。


### 关键字参数

正常情况下，函数参数是按顺序解析的，但使用关键字参数允许函数调用时参数的顺序与声明时不一致：

    def printinfo( name, age ):
      print ("名字: ", name)
      print ("年龄: ", age)
      return

    printinfo(age=50,name='Tom')

运行结果：

    名字:  Tom
    年龄:  50


### 默认参数

这点与ES6语法类似，可以为函数指定默认参数

    def printinfo( name, age=20 ):
      print ("名字: ", name)
      print ("年龄: ", age)
      return

    printinfo('Tom')

运行结果：

    名字:  Tom
    年龄:  20
    

### 不定长参数
某些情况下不确定函数的参数个数，这个时候就需要不定长参数出场了，加了星号 `* `的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数:

    def printinfo( arg1, *vartuple ):

举个例子：

    def printinfo( arg1, *vartuple ):
      "打印任何传入的参数"
      print ("输出: ")
      print (arg1)
      print (vartuple)
      
    printinfo(1,2,3,4,5)

运行结果：

    1
    (2, 3, 4, 5)

## 匿名函数

python 使用 lambda 来创建匿名函数。

lambda 函数的语法只包含一个语句，如下：

    lambda [arg1 [,arg2,.....argn]]:expression

举个例子：

    sum = lambda ag1, ag2 : ag1 + ag2

    print(sum(1,10))

运行结果为：11。可以看到lambda的主体是一个表达式，而不是一个代码块。仅仅能在lambda表达式中封装有限的逻辑进去。