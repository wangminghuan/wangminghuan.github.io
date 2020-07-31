---
title: Python系列-3-条件与循环
date: 2020-07-31 09:01:39
tags:
---

## 条件判断
py中只有`if else` 判断，没有`switch case`，语法格式如下：

    if <条件判断1>:
        <执行1>
    elif <条件判断2>:
        <执行2>
    elif <条件判断3>:
        <执行3>
    else:
        <执行4>
举个例子:

    s = input('birth: ')
    birth = int(s)  # 此处一定要做类型转换，py不同与js不会做自动类型转换
    if birth < 1990:
        print('90前')
    else:
        print('90后')

### 三目运算       
Python 是一种极简主义的编程语言，它没有引入`? :`这个新的运算符，而是使用已有的 if else 关键字来实现相同的功能:

    exp1 if contion else exp2

举个例子：

    a=10
    b=a*-10 if a>20 else a*10
    c='Leo' if a>100  else ('Tom' if a>10 else 'Jack')
    print(b) # 100
    print(c) # Jack

## 循环
Python 中的循环语句有 for 和 while。

### while循环
语法格式如下：

    while 判断条件(condition)：
        执行语句(statements)……

举个例子：

    i=1
    while i>=1:
      print(i)
      i += 1
      if i == 15:
        print("跳出")
        break
      elif i>10:
        print("继续")
        continue
    print("循环结束")

当i为15的时候会跳出while循环，执行后面的语句

### for循环
通过for in 进行循环，千万不要遗漏冒号(:)

    lists = ["C", "C++", "Perl", "Python"] 
    for item in lists:
        print(item)
    print("循环结束")

可以通过break跳出循环：

    maps=[1,3,4,7]
    for item in maps:
      if(item>3):
        print(item
        break
    print('循环结束')

运行结果：
   
    4
    循环结束

### range()函数
可以使用内置range()函数。它会生成数列
    # 输出0-9
    for i in range(10):
      print(i)

    # 输出2-7
    for i in range(2,8):
      print(i)
    
    # 指定步长输出：2,5
    for i in range(2,8,3):
      print(i)
## pass 语句

Python pass是空语句，是为了保持程序结构的完整性。pass 不做任何事情，一般用做占位语句，如下实例
