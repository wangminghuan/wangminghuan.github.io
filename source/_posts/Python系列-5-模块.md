---
title: Python系列-5-模块
date: 2020-10-10 15:43:17
tags: [note]
categories: Python
---
## 概述

关于模块的概念，都已有了概念，本章我们学习下python的模块, 看看它的模块化怎么玩儿。
<!-- more -->

## python中的模块

在Python中模块分为以下几种：

- 系统内置模块，例如：sys、time、json模块等等；
- 自定义模块，自定义模块是自己写的模块，对某段逻辑或某些函数进行封装后供其他函数调用。注意：自定义模块的命名一定不能和系统内置的模块重名了，否则将不能再导入系统的内置模块了。例如：自定义了一个sys.py模块后，再想使用系统的sys模块是不能使用的；
- 第三方的开源模块：这部分模块可以通过pip install进行安装，有开源的代码。pip 类似node中的npm。 pip 默认源为`https://pypi.org`，使用时可以设置国内镜像源 `pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`进行加速。PS: python3 使用 pip3

## 定义模块

我们先看下如何定义一个模块，不同于nodejs，py中不需要特定的语法。模块内部的作用域是在模块内，如果两个不同的模块如果需要共享变量，只需要通过引入对应变量即可。我们先定义一个模块`hello.py`:

    #!/usr/bin/env python3
    # -*- coding=utf-8 -*-

    listdata=[1,2,3]

    def sayHi(name):
      print("Hello,"+name)
      listdata.append(name)

    def foo(name):
      print("Hi! "+ name + ",I am foo")

这样，就定义好了一个模块，我们接下来看如何引用模块

## 引入模块

Python中引入模块的方式有以下几种:

### import 语句

    import module1[, module2[,... moduleN]

对于hello.py模块：

    import hello

    hello.sayHi('main') 
    print(hello.listdata)

我们可以通过模块名称访问模块内部所有的变量与函数。

### from  import 语句

 from 语句让你从模块中导入一个指定的部分到当前命名空间中：

    from modname import name1[, name2[, ... nameN]]

对于hello.py模块：

    from hello import listdata, sayHi

    sayHi('main') 
    print(listdata)

即可引入变量listdata 与 函数sayHi，可以直接调用，无须再加模块名称。


如果需要将模块中所有内容全部导入到当前命名空间中，需要使用：

    from modname import *

导入时也支持别名

    from fibo import fib as fibonacci



## 模块的概念

pip 默认源 https://pypi.org/   py3 使用 python3
设置国内镜像源 pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

## 使用模块

## 参考

- [python中的模块详解](https://baijiahao.baidu.com/s?id=1608487972546304614&wfr=spider&for=pc)
- [廖雪峰-Python教程](https://www.liaoxuefeng.com/wiki/1016959663602400/1017455068170048)
- [菜鸟教程-Python3 模块](https://www.runoob.com/python3/python3-module.html)
<!-- https://zhuanlan.zhihu.com/p/33913131 -->
<!-- https://zhuanlan.zhihu.com/p/146993325 -->