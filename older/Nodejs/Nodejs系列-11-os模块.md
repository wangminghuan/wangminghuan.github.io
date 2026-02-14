---
title: Nodejs系列-11-os模块
date: 2019-10-17 14:09:15
tags: [note]
categories: Nodejs 系列
---

os 模块提供了操作系统相关的实用方法



## os.EOL

一个字符串常量，定义操作系统相关的行末标志：

在 Windows 系统上为`\r\n `,POSIX 系统上为`\n `。

## os.arch
返回一个字符串，表明 Node.js 二进制编译所用的操作系统 CPU 架构
## os.hostname
以字符串的形式返回操作系统的主机名。
## os.homedir
以字符串的形式返回当前用户的主目录。
## os.tmpdir
返回一个字符串，表明操作系统的默认临时文件目录。
## os.platform
返回一个字符串，指定 Node.js 编译时的操作系统平台。
## demo

    const os =require("os")
    console.log(os.EOL==='\r\n')
    console.log(os.arch())
    console.log(os.hostname())
    console.log(os.homedir())
    console.log(os.tmpdir())
    console.log(os.platform())


运行结果：

    true
    x64
    DESKTOP-00N6PT9
    C:\Users\wmh
    C:\Users\wmh\AppData\Local\Temp
    win32