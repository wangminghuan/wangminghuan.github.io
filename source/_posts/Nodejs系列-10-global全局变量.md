---
title: Nodejs系列-10-global全局变量
date: 2019-10-17 14:07:46
tags: [note]
categories: Nodejs 系列
---

类似浏览器全局对象 window，但是 node（ECMAScript） 环境中是没有window的（本质上，浏览器的window 其实就是扩展自ECMAScript中的 global），但有些变量虽然看起来是全局的，但其实并不是。 它们仅存在于模块范围内，如 文件路径类 和 模块对象类

<!-- more -->

## 日志打印

    console对象

## 文件路径类
当前文件（模块）所在目录

    __dirname

当前文件（模块）的文件名称（包含文件绝对路径）

    __filename

## 定时器类

    setTimeout()/clearTimeout()
    setInterval()/clearInterval()
    setImmediate()/clearImmediate()

## 模块对象类

    module
    exports
    require

## 进程类
    process

## 文件buffer

    Buffer	