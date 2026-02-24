---
title: Python系列-3-条件与循环
lastUpdated: 2020-07-31 09:01:39
---
# {{ $frontmatter.title }}
判断与循环, 在各个语言中基本都有对应实现，也是开始编程最基础的语法，本文学习下pyhon中是如何玩转这些的。

## 条件判断
py中只有`if else` 判断，没有`switch case`，语法格式如下：
```
  if <条件判断1>:
      <执行1>
  elif <条件判断2>:
      <执行2>
  elif <条件判断3>:
      <执行3>
  else:
      <执行4>
```
举个例子:
```
s = input('birth: ')
birth = int(s)  # 此处一定要做类型转换，py不同与js不会做自动类型转换
if birth < 1990:
    print('90前')
else:
    print('90后')
```
### 三目运算       
Python 是一种极简主义的编程语言，它没有引入`? :`这个新的运算符，而是使用已有的 if else 关键字来实现相同的功能:
```
exp1 if contion else exp2
```
举个例子：
```
a=10
b=a*-10 if a>20 else a*10
c='Leo' if a>100  else ('Tom' if a>10 else 'Jack')
print(b) # 100
print(c) # Jack
```
## 循环
Python 中的循环语句有 for 和 while。

### while循环
语法格式如下：
```
while 判断条件(condition)：
    执行语句(statements)……
```
举个例子：
```
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
```
当i为15的时候会跳出while循环，执行后面的语句

### for循环
通过for in 进行循环，千万不要遗漏冒号(:)
```
  lists = ["C", "C++", "Perl", "Python"] 
  for item in lists:
      print(item)
  print("循环结束")
```
可以通过break跳出循环：
```
  maps=[1,3,4,7]
  for item in maps:
    if(item>3):
      print(item)
      break
  print('循环结束')
```
运行结果：
```   
  4
  循环结束
```
### range()函数
可以使用内置range()函数。它会生成数列
```
  # 输出0-9
  for i in range(10):
    print(i)

  # 输出2-7
  for i in range(2,8):
    print(i)
  
  # 指定步长输出：2,5
  for i in range(2,8,3):
    print(i)
```     
## pass 语句

Python pass是空语句，是为了保持程序结构的完整性。pass 不做任何事情，一般用做占位语句，如下实例
```
  for l in 'Runoob': 
    if l == 'o':
        pass
        print ('执行 pass 块')
    print ('当前字母 :', l)
  
  print ("Run over!")
```
执行结果：
```
  当前字母 : R
  当前字母 : u
  当前字母 : n
  执行 pass 块
  当前字母 : o
  执行 pass 块
  当前字母 : o
  当前字母 : b
  Run over!
```
## 其他语句

### with语句

python中的with语句使用于对资源进行访问的场合，保证不管处理过程中是否发生错误或者异常都会执行规定的`__exit__`（“清理”）操作，释放被访问的资源，比如: 有文件读写后自动关闭、线程中锁的自动获取和释放等

与python中with语句有关的概念有：上下文管理协议、上下文管理器、运行时上下文、上下文表达式、处理资源的代码段。

经常看到的是进行文件操作时会带有with语句
```
  with open( '/path/to/file', 'r' ) as f:
    print( f.read() ) 
``` 
此处with的作用就是在读取结束后（包括出错后）执行close函数，不用我们每次调取。

### del 语句

del语句删除一些对象引用,只是删除引用，变为了一个可回收的对象，内存会不定期回收

### return 语句

返回函数执行结果, 与c++/nodejs等基本一致：
```
  def add(x,y):
      result = x + y
      return result

  print(add(10,24))
```
### yeild 语句

yeild 语句等同于yeild表达式，使用了yield 表达式的函数被称为生成器（generator）

### assert 语句

当表达式为False时则触发AssertionError异常，代码终止
```
  def testAssert(num):
    if num>0:
      print("输入大于0，正常执行")
    else:
      print("输入小于0！")
      assert False ,'Not positive integer'
  try:
    n=input("请输入正整数：") 
    testAssert(int(n))

  except Exception as ex:
      print("发现错误:",ex)
```
执行`python main.py`,输入10：
```
  输入大于0，正常执行
```
执行`python main.py`,输入-10：
```
  输入小于0！
  发现错误: Not positive integer
```
### raise语句

raise语句是抛出一个异常，即使程序没有任何问题:
```
  print('run')

  raise RuntimeError("没事找事，怎么了")
```
执行结果：
``` 
  run
  Traceback (most recent call last):
    File "main.py", line 188, in <module>
      raise RuntimeError("没事找事，怎么了")
  RuntimeError: 没事找事，怎么了
```
### global语句

global 语句是作用于整个当前代码块的声明。 它意味着所列出的标识符将被解读为全局变量
```
  x=1
  y=0

  def foo():
    x=2

  def fun():
    global y  # 声明为全局变量
    y=2

  foo()
  fun()

  print(x)   # 1
  print(y)   # 3
```
## 参考

- [Python3 条件控制](https://www.runoob.com/python3/python3-conditional-statements.html)
- [Python3 循环语句](https://www.runoob.com/python3/python3-loop.html)