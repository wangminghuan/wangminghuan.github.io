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

## Python内置函数

### 数学运算类

| 函数名 | 描述 | 例子 |
| ---    | ---  | ---  |
| abs(a) | 求取绝对值|abs(-1)   |
| max(list) |  求取list最大值|max([1,2,3]) | 
| min(list) | 求取list最小值|min([1,2,3]) |
| sum(list) | 求取list元素的和|sum([1,2,3]) >>> 6|
| sorted(list) |  排序|返回排序后的list。|
| len(list) | list长度|len([1,2,3])|
| divmod(a,b)|  获取商和余数。| divmod(5,2) >>> (2,1)|
| pow(a,b) | 获取乘方数。|pow(2,3) >>> 8|
| round(a,b) |  获取指定位数的小数。a代表浮点数，b代表要保留的位数。|round(3.1415926,2) >>> 3.14|
| range(a[,b]) |  生成一个a到b的数组,左闭右开。| range(1,10) >>> [1,2,3,4,5,6,7,8,9]|

### 类型转换

| 函数名 | 描述 | 例子 |
| ---    | ---  | ---  |
| int(str) |  转换为int型| `int('1') >>> 1`| 
| float(int/str) :|  将int型或字符型转换为浮点型| `float('1') >>> 1.0`| 
| str(int) | 转换为字符型| `str(1) >>> '1'`| 
| bool(int) |  转换为布尔类型| `str(0) >>> False str(None) >>> False`| 
| bytes(str,code) |  接收一个字符串，与所要编码的格式，返回一个字节流类型| `bytes('abc', 'utf-8') >>> b'abc' bytes(u'爬虫', 'utf-8') >>> b'\xe7\x88\xac\xe8\x99\xab'`| 
| list(iterable) | 转换为list| `list((1,2,3)) >>> [1,2,3]`| 
| dict(iterable) | 转换为dict| `dict([('a', 1), ('b', 2), ('c', 3)]) >>> {'a':1, 'b':2, 'c':3}`| 
| enumerate(iterable)|  返回一个枚举对象。| 略 |
| tuple(iterable) |  转换为tuple|  `tuple([1,2,3]) >>>(1,2,3)`| 
| set(iterable) |  转换为set|  `set([1,4,2,4,3,5]) >>> {1,2,3,4,5} set({1:'a',2:'b',3:'c'}) >>> {1,2,3}`| 
| hex(int) | 转换为16进制| `hex(1024) >>> '0x400'`| 
| oct(int) |  转换为8进制|  `oct(1024) >>> '0o2000'`| 
| bin(int) |  转换为2进制|  `bin(1024) >>> '0b10000000000'`| 
| chr(int) |  转换数字为相应ASCI码字符|  `chr(65) >>> 'A'`| 
| ord(str) |  转换ASCI字符为相应的数字|  `ord('A') >>> 65`| 

### 功能相关

| 函数名 | 描述 | 例子 |
| ---    | ---  | ---  |
| eval() |  执行一个表达式，或字符串作为运算| `eval('1+1') >>> 2`| 
| exec() | 执行python语句| `exec('print("Python")') >>> Python`| 
| filter(func, iterable) | 通过判断函数fun，筛选符合条件的元素|  `filter(lambda x: x>3, [1,2,3,4,5,6]) >>> <filter object at 0x0000000003813828>`| 
| map(func, *iterable) | 将func用于每个iterable对象| `map(lambda a,b: a+b, [1,2,3,4], [5,6,7]) >>> [6,8,10]`| 
| zip(*iterable) |  将iterable分组合并。返回一个zip对象|  `list(zip([1,2,3],[4,5,6])) >>> [(1, 4), (2, 5), (3, 6)]`| 
| type()| 返回一个对象的类型。| 略|
| id()|  返回一个对象的唯一标识值。| 略|
| hash(object)| 返回一个对象的hash值，具有相同值的object具有相同的hash值| ` hash('python') >>> 7070808359261009780`
| help()| 调用系统内置的帮助系统。| 略|
| isinstance()| 判断一个对象是否为该类的一个实例。| 略|
| issubclass()| 判断一个类是否为另一个类的子类。| 略|
| globals() | 返回当前全局变量的字典。| 略|
| reversed(sequence) | 生成一个反转序列的迭代器|  `reversed('abc') >>> ['c','b','a']`| 

### 迭代器/生成器函数

迭代是Python最强大的功能之一，是访问集合元素的一种方式。字符串，列表，元组，集合，字典对象都可用于创建迭代器:


    str="0987"
    list =  [1,2,'3'] 
    tup = (10, 20, '30')
    sites = {'b', 'a', 'b', 'a', 'y'}
    dict = {'name':'jack','age':12}

    it0 = iter(str)
    it1 = iter(list)
    it2 = iter(tup)
    it3 = iter(sites)
    it4 = iter(dict)

    print(it0)
    print(it1)
    print(it2)
    print(it3)
    print(it4)

执行结果：

    <str_iterator object at 0x000001C8430F7DC8>
    <list_iterator object at 0x000001C8430F7E08>
    <tuple_iterator object at 0x000001C8430F7E48>
    <set_iterator object at 0x000001C8430D1A98>
    <dict_keyiterator object at 0x000001C8430D1B88>

迭代就是从迭代器中取元素的过程。比如我们用for循环从列表[1,2,3]中取元素，这种遍历过程就被称作迭代。上述数据类型通过iter函数转成迭代对象（ps:字符串，列表，元组，集合，字典本身都是支持for循环的，因为这些数据结构已经内置了iter函数），此时我们除了for循环外，还可以使用next函数进行迭代：

    import sys         # 引入 sys 模块
    
    list=[1,2,3,4]
    it = iter(list)    # 创建迭代器对象
    
    while True:
        try:
            print (next(it))
        except StopIteration:
            sys.exit()
运行结果：

      1
      2
      3
      4


在 Python 中，使用了 yield 的函数被称为生成器（generator）。跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器:

      def generate():
          yield 1
          yield [1,2,3]
          yield 'over'

      p = generate()
      print(p)

执行结果：

    <generator object generate at 0x0000013C5A583648>

**它支持for循环**

    for x in p:
      print(x, end=' ')

运行结果：

    1 [1, 2, 3] over

**也支持next方法**

    while True:
        try:
            print (next(p))
        except StopIteration:
            sys.exit()

运行结果：

      1
      [1, 2, 3]
      over


## 参考
- [python 常见的内置函数](https://blog.csdn.net/yangxiaoyan12/article/details/87566833)
- [Python3 函数](https://www.runoob.com/python3/python3-function.html)