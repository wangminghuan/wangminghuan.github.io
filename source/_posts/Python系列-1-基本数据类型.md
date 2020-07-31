---
title: Python系列-1-基本数据类型
date: 2020-07-09 14:07:30
tags: [note]
categories: Python
---

最早接触到Python大概是在2009年，当时还在各大塞班（Symbina）论坛逛帖子，那时候大家都叫“大蟒蛇平台”，其实是python发音的一种音译。诺基亚的Symbina智能手机上支持C++和JAVA开发的两类程序， 装上Python后，也就可以支持众多以Python开发的各种程序了。曾经一度想自己编写，下载了论坛置顶资料，后来还是被不知道丢到哪里~

近两年python随着人工智能，数据分析，网络爬虫的火爆，python的天然优势又出来了，越来越多的人开始关注到python，其中包括我，十一年过去了，我又要“重新启航”了。

学习一门语言，先从基本数据类型开始吧。

<!-- more -->

![](1.png)

## Number-数字

### 整数

包括正整数与负整数，如：8，-100等, 整型是没有限制大小的，可以当做long类型使用（没有 python2 中的 Long）

    2 进 制：以'0b'开头。例如：'0b11011'表示10进制的27
    8 进 制：以'0o'开头。例如：'0o33'表示10进制的27
    10进制：正常显示
    16进制：以'0x'开头。例如：'0x1b'表示10进制的27

各进间数字进行转换（内置函数）：

    bin(i)：将i转换为2进制，以“0b”开头。
    oct(i)：将i转换为8进制，以“0o”开头。
    int(i)：将i转换为10进制，正常显示。
    hex(i)：将i转换为16进制，以“0x”开头。

### 浮点数

浮点数也就是小数，整数和浮点数在计算机内部存储的方式是不同的，整数运算永远是精确的（除法难道也是精确的？是的！），而浮点数运算则可能会有四舍五入的误差。浮点型也可以使用科学计数法表示（2.5e2 = 2.5 x 102 = 250）

### 布尔值

在 Python2 中是没有布尔型的，它用数字 0 表示 False，用 1 表示 True。到 Python3 中，把 True 和 False 定义成关键字了，但它们的值还是 1 和 0，它们可以和数字相加。注意大小写写法。

    print(True == 1) # True
    print(False == 0) # True

下列对象的布尔值是False：

    None；False；0（整型），0.0（浮点型）；0L（长整形）；0.0+0.0j（复数）；“”（空字符串）；[]（空列表）；（）（空元组）；{}（空字典）

### 复数
Python可以表示复数，日常用到复数的不过，先复习下复数的相关概念：

1. 把形如z=a+bi（a,b均为实数）的数称为复数，其中a称为实部，b称为虚部，i称为虚数单位，i<sup>2</sup>=-1;

2. 将复数的实部与虚部的平方和的正的平方根的值称为该复数的模，记作`∣z∣`

![](2.png)

关于复数的理解可以查看底部参考文章来进一步了解。

我们回到Python语法中：

    a=4.7+0.666j           #定义一个虚数
    print(a)               #输出这个虚数
    print(a.real)          #输出实部
    print(a.imag)          #输出虚部
    print(a.conjugate())   #输出该复数的共轭复数

运行结果：

    (4.7+0.666j)
    4.7
    0.666
    (4.7-0.666j)

除了直接定义外，还可以通过`complex()`，创建一个复数或者将一个数或字符串转换为复数形式：

    complex(3.2,0.005) # (3.2+0.005j)
    complex(1)    # (1 + 0j)
    complex('2+0.01j')  # (2+0.01j)

## String-字符串

字符串是以单引号`'`或双引号`"`或者三引号`'''`括起来的任意文本，如果需要包含引号，请用转义符`\`,如：

    print('Tom say:\"Hello!\"')
三引号支持换行

    print('''
    Hi Lili
    Hi Tom''')

字符串的截取的语法格式为：`变量[头下标:尾下标]`,`+`号拼接，`*`号复制：

    str = 'Hello world'
    print (str)          # 输出字符串
    print (str[0:-1])    # 输出第一个到倒数第二个的所有字符
    print (str[0])       # 输出字符串第一个字符
    print (str[2:5])     # 输出从第三个开始到第五个的字符
    print (str[2:])      # 输出从第三个开始的后的所有字符
    print (str * 2)      # 输出字符串两次，也可以写成 print (2 * str)
    print (str + "TEST") # 连接字符串

运行结果：

    Hello world
    Hello worl
    H
    llo
    llo world
    Hello worldHello world
    Hello worldTEST

字符串元素不可被修改,如下操作会报错：

    str = 'Hello world'
    str[0]='C'
    print(str) # TypeError: 'str' object does not support item assignment

### Bytes 类型

Python3 新增 bytes 类型，是指一堆字节的集合，十六进制表现形式，两个十六进制数构成一个 byte ，用带b前缀的单引号或双引号来表示。bytes通常用于网络数据传输、二进制图片和文件的保存等等。  

Bytes 与 String 可以相关转换

![](3.png)

举个例子：

    b1 = bytes()
    print(b1) # b''
    str='你好'
    result=str.encode(encoding='utf-8') # b'\xe4\xbd\xa0\xe5\xa5\xbd'
    print(result)
    print(result.decode(encoding='utf-8')) # 你好

## List-列表
List（列表） 是 Python 中使用最频繁的数据类型。   
列表是写在方括号 [] 之间、用逗号分隔开的元素列表。与Javascript中的数组非常相似。列表同样可以被索引和截取，列表被截取后返回一个包含所需元素的新列表。

操作与字符串很多相似之处:

    list = [1,0.02,True,'Hi']
    print(list[3])
    print(list[0:-1])
    print(list*2)
    print(list+['Tom'])
    print(list[0:3])
    print(list[0:3:2]) #截取可以接收第三个参数，参数作用是截取的步长

运行结果：

    Hi
    [1, 0.02, True]
    [1, 0.02, True, 'Hi', 1, 0.02, True, 'Hi']
    [1, 0.02, True, 'Hi', 'Tom']
    [1, 0.02, True]
    [1, True]

列表的元素不同于字符串，元素是可以被修改的

    list = [1,0.02,True,'Hi']
    list[0]='c'
    print(list)

运行结果：

    ['c', 0.02, True, 'Hi']

## Tuple-元祖

元组（tuple）与列表类似，不同之处在于元组的元素不能修改。  
元组写在小括号 () 里，元素之间用逗号隔开（可以把字符串看作一种特殊的元组）

    tup = (1, 2, '3', 4.1, 5, 6)
    tup1 = ()    # 空元组
    tup2 = (20,) # 一个元素，需要在元素后添加逗号
    tup3 = (20) # 一个元素，不加逗号就变成的Number类型

    print(tup[0]) # 1
    print(tup1)   # ()
    print(type(tup2)) # <class 'tuple'>
    print(type(tup3)) # <class 'int'>

## Set-集合

集合（set）是由一个或数个形态各异的大小整体组成的，构成集合的事物或对象称作元素或是成员。基本功能是进行成员关系测试和删除重复元素。  

可以使用大括号 `{ }` 或者 `set()` 函数创建集合。不过创建一个空集合必须用 `set()` 而不是 `{ }`，因为 `{ }` 是用来创建一个空字典


    sites = {'b', 'a', 'b', 'a', 'y'}
    sitea = set(['b','a','t','t','l','e'])
    print(sites)  # 输出集合，重复的元素被自动去掉
    print(sitea)
    print(sites - sitea) # a 和 b 的差集
    print(sites | sitea)  # a 和 b 的并集
    print(sites & sitea) # a 和 b 的交集
    print(sites ^ sitea)  # a 和 b 中不同时存在的元素

运行结果：

    {'y', 'b', 'a'}
    {'e', 'l', 'a', 't', 'b'}
    {'y'}
    {'e', 'l', 'a', 't', 'b', 'y'}
    {'b', 'a'}
    {'y', 't', 'e', 'l'}


## Dictionary-字典
字典（dictionary）是Python中另一个非常有用的内置数据类型。是一种映射类型，字典用 `{ }` 标识，它是一个无序的 键(key) : 值(value) 的集合,非常类似Javascript中的对象（key如果为String类型就必须用引号，这点与js不同）。

列表是有序的对象集合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。

    dicta={'name':'jack','age':12}
    dictb=dict([('name','tom'),('job','worker')])
    print(dicta)
    print(dicta.keys())
    print(dicta.values())
    print(dictb)

运行结果：

    {'name': 'jack', 'age': 12}
    dict_keys(['name', 'age'])
    dict_values(['jack', 12])
    {'name': 'tom', 'job': 'worker'}

## 数据类型转换
|  方法名   | 描述  |
|  ----  | ----  |
| int(x [,base])  | 将x转换为一个整数 |
| float(x)  | 将x转换到一个浮点数|
| complex(real [,imag])  | 创建一个复数 |
| str(x) | 将对象 x 转换为字符串 |
| repr(x)  | 将对象 x 转换为表达式字符串 |
| eval(str)  | 用来计算在字符串中的有效Python表达式,并返回一个对象 |
| tuple(s) | 将序列 s 转换为一个元组 |
| list(s) | 将序列 s 转换为一个列表|
| set(s) | 转换为可变集合 |
| dict(d) | 创建一个字典。d 必须是一个 (key, value)元组序列|
| frozenset(s) | 转换为不可变集合|
| chr(x) | 将一个整数转换为一个字符 |
| ord(x) | 将一个字符转换为它的整数值|
| hex(x)| 将一个整数转换为一个十六进制字符串|
| oct(x)| 将一个整数转换为一个八进制字符串 |


## 参考文章
- [PYTHON3基本数据类型](https://www.cnblogs.com/aiwanbuhui/p/7766352.html)
- [怎么理解虚数和复数？ - 李狗嗨的回答 - 知乎](https://www.zhihu.com/question/46877027/answer/542742130)