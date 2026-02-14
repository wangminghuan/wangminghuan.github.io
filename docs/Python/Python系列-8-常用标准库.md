---
title: Python系列-8-常用标准库
date: 2020-10-14 18:32:28
tags: [note]
categories: Python
---

## 概述

Python提供了一个强大的标准库，内置了许多非常有用的模块，可以直接使用（标准库是随Python一起安装的）， 日常应用比较广泛的模块是：

| 名称 | 作用 |
| ---  | ---  |	
| re | 正则表达式操作 |
| datetime / time | 为日期和时间处理同时提供了简单和复杂的方法。| 
| random	| 提供了生成随机数的工具。| 
| math	| 为浮点运算提供了对底层C函数库的访问。|
| zlib	| 直接支持通用的数据打包和压缩格式：zlib，gzip，bz2，zipfile，以及 tarfile。| 
| pathlib / os.path | 文件和目录操作访问 |
| sys	| 工具脚本经常调用命令行参数。这些命令行参数以链表形式存储于 sys 模块的 argv 变量。| 
| glob	| 提供了一个函数用于从目录通配符搜索中生成文件列表。| 
| os	| 提供了不少与操作系统相关联的函数。| 
| argparse | 命令行选项、参数和子命令解析器 |
| base64 /json/urllib | Internet相关数据处理|
| html / xml | 结构化标记处理工具 |
| threading / queue | 多线程相关 |


## 常用标准库示例
### re

      import re

      p = re.compile(r'(\d+)')
      print(p.match('123abc').groups())    # ('123',)
      print(p.search('abc'))               # None

### datatime / time 
注意Python的timestamp是一个浮点数，整数位表示秒, 而nodejs是以整数来表示的

      import time 
      print (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))  #  获取当前时间：2020-10-14 14:16:31

      import datetime
      now = datetime.datetime.now() # 获取当前datetime
      print(now)              # 当前时间  2020-10-14 14:22:21.735610
      print(now.timestamp())  # 时间戳 浮点型  1602656541.73561

### math && random

    import math
    import random

    rand = random.randrange(10)   # 获取0-10内的随机数
    print(rand)                   # 6
    print(math.pow(2,rand))       # 计算2的n次方 64

### sys && os

    import os
    print(os.getcwd())  # 获取当前运行目录 F:\python-demo
    
    import sys
    print(sys.argv)    # 获取命令行参数 ['main.py']

### argparse

    import argparse

    def main():
        parser = argparse.ArgumentParser(description="Demo of argparse")
        parser.add_argument('-n','--name', default=' Li ')
        parser.add_argument('-y','--year', default='20')
        parser.add_argument('-s','--sex', default='man')
        args = parser.parse_args()
        print(args)
        name = args.name
        year = args.year
        sex = args.sex
        print('Hello {} {} {}'.format(name,year,sex))

    if __name__ == '__main__':
      main()

执行`python main.py -n Tom --year 40`


    Namespace(name='Tom', sex='man', year='40')
    Hello Tom 40 man

 `-n`,`--name`表示同一个参数，default参数表示在运行命令时的缺省参数

### glob

该模块可根据 Unix 终端所用规则找出所有匹配特定模式的路径名

    import glob

    print(glob.glob('*.py'))  # 找出当前目录下的所有的py文件（不含子目录） ['hello.py', 'index.py', 'io.py', 'main.py', 'main2.py']

### zlib

此模块为需要数据压缩的程序提供了一系列函数，且与gzip兼容

    import zlib
 
    s = b'witch which has which witches wrist watch'
    print(len(s))                # 41

    t = zlib.compress(s)    
    print(t)                     # b'x\x9c+\xcf,I\xceP(\xcf\xc8\x04\x92\x19\x89\xc5PV9H4\x15\xc8+\xca,.Q(O\x04\xf2\x00D?\x0f\x89'
    print(len(t))                # 37

    print(zlib.decompress(t))    # b'witch which has which witches wrist watch'

### json && urllib

urllib 是一个收集了多个用到 URL 的模块的包（写爬虫会经常用到）：

- urllib.request 打开和读取 URL

- urllib.error 包含 urllib.request 抛出的异常

- urllib.parse 用于解析 URL

- urllib.robotparser 用于解析 robots.txt 文件


      import urllib.request
      import urllib.parse

      url = 'https://www.baidu.com/'

      # 解析url参数
      print(urllib.parse.urlparse(url))  

      # 定义一个请求头的User-Agent字段
      headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36'}

      # 自定义请求头信息，返回一个请求的对象request，Request()参数，还可以接收data参数，表示请求体
      request = urllib.request.Request(url,headers = headers)

      # 通过urlopen访问url，服务器返回response对象
      response = urllib.request.urlopen(request)

      # 读取返回结果
      result = response.read()

      with open('baidu.html','wb') as f:
          f.write(result)

运行结果：

      ParseResult(scheme='https', netloc='www.baidu.com', path='/', params='', query='', fragment='')
      # 本地出现baidu.html文件，跟正常访问时返回的源码一样
  
### json 

json 模块提供了一种很简单的方式来编码和解码JSON数据。 其中两个主要的函数是 json.dumps() 和 json.loads()

      import json

      data={"status":"1","notice":{"title":"测试"}}

      # 将一个Python数据结构转换为JSON 类似js中的JSON.stringify
      # 只对Number,String,List,Dict 有效，其他类型如Tuple会报错
      obj=json.dumps(data)
      print(obj)                   # {"status": "1", "notice": {"title": "\u6d4b\u8bd5"}}
      print(isinstance(obj,str))   # True


      # 将一个JSON编码的字符串转换回一个Python数据结构,类似js中的JSON.parse
      strs=json.loads(obj)
      print(strs)                   # {'status': '1', 'notice': {'title': '测试'}}
      print(isinstance(strs,dict))  # True

而 `json.dump()` 和 `json.load()` 来编码和解码JSON数据,用于处理文件:


      with open('test.json', 'w') as f:
          json.dump(data, f)
      
      with open('test.json', 'r') as f:
          data = json.load(f)

### base64

此模块提供了将二进制数据编码为可打印的 ASCII 字符以及将这些编码解码回二进制数据的函数。

## 关于 Python

Python2.x已经是遗产，已经不再维护，Python3.x是现在和未来的语言。

目前，Python最流行的发行版是 [Anaconda](https://www.anaconda.com/), 除了标准库以外，集成了很多常用软件包（尤其科学计算相关依赖）,安装后可以使用conda来管理Python环境和依赖。

Python的优点：

- 语法简洁：容易上手，入门简单
- 跨平台：windows, mac, linux 均支持
- 可扩展性：可以直接调用c/c++代码
- 开放源码：开源生态圈，源码可查
- 类库丰富：得力于开源，相关工具类库非常丰富

jupyter notebook 可以能将代码、文档等这一切集中到一处，让用户一目了然。可以随时运行多个自己编写的py代码

## 参考
- [Python 标准库 - 3.7](https://docs.python.org/zh-cn/3.7/library/index.html)
- [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn)
- [清华大学开源软件镜像站-Anaconda 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)
- [The Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/latest/)
- [Python官方文档](https://www.python.org/doc/)
- [Conda使用指南](https://zhuanlan.zhihu.com/p/44398592)