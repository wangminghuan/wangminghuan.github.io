---
title: Python系列-1-基本数据类型
date: 2020-07-09 14:07:30
tags: [note]
categories: Python
---
## 概述
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

### CURD

废话不说，上代码：

    ls=[1,2,3]    # Create
    ls[0]=0       # Update
    print(ls[0])  # Retrieve
    del ls[2]     # Delete
    print(ls)     # [0, 2]
    del ls        # 删除变量，访问ls会报错

### 函数与方法

列表类型包含函数：

| 函数名 | 描述 |
| ---    | ---  |
| len(list) | 列表元素个数 |
| max(list) |	返回列表元素最大值(列表元素必须均为Number类型，否则报错) |
| min(list)	| 返回列表元素最小值(列表元素必须均为Number类型，否则报错) |
| list(seq)	| 将元祖转化为列表 |

列表类型包含方法名（设置`ls=[1,2,1]`）：

| 方法名 | 描述 | 例子 |
| ---    | ---  | ---  |
| list.append(obj) | 在列表末尾添加新的对象，返回None |ls.append((2,0)) 结果： [1,2,1,(2, 0)] |
| list.count(obj) | 统计某个元素在列表中出现的次数，返回次数|ls.count(1) 结果：2 |
| list.extend(seq) | 在列表末尾一次性追加另一个序列中的多个值,返回None |ls.extend((2,0)) 结果： [1,2,1,2,0] |
| list.index(obj) | 从列表中找出某个值第一个匹配项的索引位置,返回索引 |ls.index(1) 结果：0 |
| list.insert(index,obj) | 将对象插入列表,返回为None | ls.insert(1,-10) 结果：[1, -10, 2, 1] |
| list.pop(index=-1) | 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值 | ls.pop(0) 结果：[2,1] |
| list.remove(obj) | 移除列表中某个值的第一个匹配项,返回为None | ls.remove(1) 结果：[2,1] |
| list.reverse() | 反向列表中元素,返回为None | ls.reverse() 结果：[1,2,1] |
| list.sort(key=None, reverse=False) | key用来进行比较的元素;reverse :True降序,False升序（默认），返回None | ls.sort() 结果：[1,1,2] |
| list.clear() | 清空列表，返回None | ls.clear() 结果：[] |
| list.copy() | 复制列表，返回复制后的新列表(非指针) | ls.copy() 结果：[1,2,1]|

## Tuple-元组

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

### CURD

相比列表，元组是无法修改的，所以只能更新出新元组

    tup=(1,2,3)         # Create
    print(tup + (4,5))  # tup[0]=0 会报错
    print(tup[0])       # Retrieve
    del tup             # del tup[2] 会报错 且删除后变量tup就不存在了

### 函数与方法

元组类型包含函数与列表基本一致（参见列表函数部分），除了len,min,max外：

| 函数名 | 描述 |
| ---    | ---  |
| tuple(iterable)| 将可迭代系列转换为元组 |

无内置方法

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

集合本身是一个无序的不重复元素序列，并不支持索引操作。

### CURD

集合本身不支持索引操作，常用操作中只剩下删除操作支持

    s={1,2,3}
    print(s)
    del s

### 函数与方法

以`set={1,2,1}`为例：

| 方法名 | 描述 | 例子 |
| ---    | ---  | ---  |
| set.add(ele)	| 为集合添加元素(只能添加Sting或Number)，返回None| set.add('5') 结果：{1, 2, '5'}|
| set.clear()	| 移除集合中的所有元素，返回None| set.clear() 结果：set()|
| set.copy()	| 拷贝一个集合 返回复制后的新集合(非指针) | set.copy() 结果：{1, 2}|
| set.update(obj) |	给集合添加元素 | set.update({3,1,5})  结果：{1, 2, 3, 5}|
| set.pop()	| 随机移除元素,返回被删除的元素 | set.pop()  结果：{}|
| set.remove(item) |	移除指定元素(元素不存在会报错) | set.remove(2)  结果：{1} |
| set.difference(s)|	返回多个集合的差集，元素包含在集合 set中,但不在集合s中  |set.difference({2,4}) 结果：{1} |
| set.difference_update(s)|	移除两个集合都包含的元素,返回None|set.difference_update({2,4}) 结果：{1} |
| set.discard(calue)|	删除集合中指定的元素（功能等同remove,但不存在元素时不会报错）| set.discard(4)  结果:{1,2}	|
| set.intersection(set1, set2 ... etc)|	返回两个或更多集合中都包含的元素，即交集|	自行测试 |
| set.intersection_update()|	获取两个或更多集合中都重叠的元素，不同于intersection，该方法会修改原始集合。|	自行测试 |
| set.isdisjoint(s)|	判断两个集合是否包含相同的元素，s中是否有包含集合set的元素,不包含返回 True，否则返回 False。|	自行测试 |
| set.issubset(s)|	用于判断集合的所有元素是否都包含在指定集合中，即 set 的所有元素是否都包含在集合 s 中,是则返回True，否返回False|	自行测试 |
| set.issuperset(s)|判断指定集合的所有元素是否都包含在原始的集合中, 即s 的所有元素是否都包含在集合 set 中，都包含返回True,否返回False|	自行测试 |
| set.symmetric_difference(s)|	返回两个集合中不重复的元素集合，即会移除两个集合中都存在的元素(返回新集合)|	自行测试 |
| set.symmetric_difference_update(s)|	原始集合set 中移除与 s 集合中的重复元素，并将不重复的元素插入到集合 set 中|	自行测试 |
| set.union(set1, set2...)|返回两个或多个集合的并集，即包含了所有集合的元素，重复的元素只会出现一次|	自行测试 |


## Dictionary-字典
字典（dictionary）是Python中另一个非常有用的内置数据类型。是一种映射类型，字典用 `{ }` 标识，它是一个无序的 键(key) : 值(value) 的集合,非常类似Javascript中的对象（key如果为String类型就必须用引号，这点与js不同）。

列表是有序的对象集合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。

    dicta={'name':'jack','age':12}
    dictb=dict([('name','tom'),('job','worker')])
    print(dicta)
    print(dicta.keys())
    print(dicta.values())
    print(dictb)
    print(dicta['name'])

运行结果：

    {'name': 'jack', 'age': 12}
    dict_keys(['name', 'age'])
    dict_values(['jack', 12])
    {'name': 'tom', 'job': 'worker'}
    jack

### CURD
与列表非常类似，因为字典键值的唯一性与不可变性，通过键值来进行索引（键必须不可变，所以可以用数字，字符串或元组充当，而用列表就不行）

    dict={'name':'Tom','age':12}    # Create
    dict['name']='Jack'             # Update
    print(dict['name'])             # Retrieve
    del dict['age']                 # Delete
    print(dict)                     # {'name': 'Jack'}
    del dict                        # 删除变量，访问dict会报错

### 函数与方法


| 函数名 | 描述 |
| ---    | ---  |
| len(dict)| 计算字典元素个数，即键的总数 |
| str(dict)| 输出字典，以可打印的字符串表示 (类似js中的stringify)|
| type(dict)| 返回输入的变量类型，该方法对所有基本类型均有效 |


Python字典包含了以下内置方法，以`dict={'s':"Tom",1:'14'}`为例：

| 方法名 | 描述 | 例子 |
| ---    | ---  | ---  |
| dict.clear()	| 删除字典内所有元素，返回None| dict.clear() 结果：{}|
| dict.copy()	| 返回一个字典的浅复制| dict.clear() 结果：{}|


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