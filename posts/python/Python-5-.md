---
title: Python系列-5-模块
date: 2020-10-10
categories:
  - python
tags:
  - note
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

### from .. import 语句

 from 语句让你从模块中导入一个指定的部分到当前命名空间中：

    from modname import name1[, name2[, ... nameN]]

对于hello.py模块：

    from hello import listdata, sayHi

    sayHi('main') 
    print(listdata)

即可引入变量listdata 与 函数sayHi，可以直接调用，无须再加模块名称。

导入时也支持别名

    from modname import name as otherName

对于hello.py模块：

    from hello import sayHi as sayHello, listdata as listArr

    sayHello('Tom')
    print(listArr)
  
###  from .. import *

如果需要将模块中所有内容全部导入到当前命名空间中，需要使用：

    from modname import *

对于hello.py模块：

    from hello import *

    sayHi('Tom')
    print(listdata)

但是尽量避免这种引用方式，这样会将引用模块中所有的变量及函数引入到当前模块内，极大概率的会污染当前命名空间。

- `import *` 无法导入以下划线开头的变量名
- 如果定义了`__all__`, `import *` 只会导入__all__中指定的变量，无论是否以下划线开头

推荐直接使用 import， 语法简单且基本不会造成命名冲突

## 作用域

上面提到模块内部的作用域是在模块内，如果模块之前共享数据的话只需要引入对应变量即可：

    import hello

    # 执行sayHi函数
    hello.sayHi('Tom')

    # 修改listdata
    hello.listdata.append("main")

    print(hello.listdata)
  
  运行结果：

     hello Tom
     [1, 2, 3, 'Tom', 'main']

可以看到 listdata 数据在hello.py模块中增加一条数据`Tom`,在当前模块内又被追加上数据`main`，相当于两个模块“共享”了这个数据。当然这种方式在nodejs中与ES6中都是通用的。

在python中没有类似public,private等关键词来修饰成员函数和成员变量,那怎么才能将函数或变量作为作为非公开的（private）？

### 非类定义

很多博客跟文档反复提到'_'开头的命名，但对于非类成员的定义，下划线开头的命名方式只对于`import *` 有效（上面有提到），其他引入方式仍是可以正常访问的，这个只能作为规范，只是“不建议”直接引用，而不是“不能”直接引用。

### 类定义

对于类成员的定义

我们定义一个类，放在hi.py中

    class Hi(object):
      def __init__(self):
          self.__list=[1,2,3]
          self.list=[-1,-2]

      def add(self,name):
          self.__list.append(name)
          self.list.append(name)
          print("Hello,"+name)
          print(self.__list)

然后我们在main.py中执行

        from hello import Hi

        p = Hi()

        p.add("Tom")

        print(p.list)

运行结果为：

      Hello,Tom
      [1, 2, 3, 'Tom']
      [-1, -2, 'Tom']

如果我们再打印下内部`__list`属性：

       print(p.__list)   

此时就会报错：

      Traceback (most recent call last):
        File "main.py", line 19, in <module>
          print(p.__list)
      AttributeError: 'Hi' object has no attribute '__list'

## 导入模块的搜索路径

用import hello时，python会搜寻hello.py文件，搜索顺序如下: 

- 首先搜寻内置模块是否有hello（所以我们定义的模块名不要和内置模块相同）
- 如果内置模块没有，则看下面这些目录里有没有(以下结果通过内置`sys`模块的`sys.path`属性获取):
   
        ['F:\\python-demo',
         'C:\\Users\\wmh\\AppData\\Local\\Programs\\Python\\Python37\\python37.zip', 
         'C:\\Users\\wmh\\AppData\\Local\\Programs\\Python\\Python37\\DLLs', 
         'C:\\Users\\wmh\\AppData\\Local\\Programs\\Python\\Python37\\lib', 
         'C:\\Users\\wmh\\AppData\\Local\\Programs\\Python\\Python37', 
         'C:\\Users\\wmh\\AppData\\Roaming\\Python\\Python37\\site-packages', 
         'C:\\Users\\wmh\\AppData\\Local\\Programs\\Python\\Python37\\lib\\site-packages']

执行导入模块命令时，会首先检查待导入的模块是否在当前已有模块之中，如果有则跳过import。因此模块之间相互引用不会导致无限循环

## 相对引用与绝对引用
python中的import分为绝对引用和相对引用两种。绝对引用就是上面我们采用的引用方式，对与相对引用，在nodejs中也经常遇到，不同的是：Python中只采用`.`来拼接

对于如下结构：

        home
        ├─── hello.py

我们可以这样引用

        from home.hello import Hi


`.`只能放在from后，不能放import后，更多用法请参考：[python模块详解](https://zhuanlan.zhihu.com/p/33913131)

## `if __name__ == '__main__'`

经常会在别人的代码中发现`if __name__ == '__main__'`, 我们接着上面的例子，执行如下代码：

    import hello 

    print(__name__)
    print(hello.__name__)

运行结果：

    __main__
    hello

其实，`if __name__ == '__main__'`的含义就是：该模块直接执行时运行的代码，如果被引用时则不执行；这算是一种约定俗成的写法。

## 参考

- [python中的模块详解](https://baijiahao.baidu.com/s?id=1608487972546304614&wfr=spider&for=pc)
- [廖雪峰-Python教程](https://www.liaoxuefeng.com/wiki/1016959663602400/1017455068170048)
- [菜鸟教程-Python3 模块](https://www.runoob.com/python3/python3-module.html)
- [python模块详解](https://zhuanlan.zhihu.com/p/33913131)
- [NodeJs与python的使用对比](https://zhuanlan.zhihu.com/p/146993325)