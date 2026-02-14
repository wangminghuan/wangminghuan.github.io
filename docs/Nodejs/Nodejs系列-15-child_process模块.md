---
title: Nodejs系列-15-child_process模块
date: 2019-10-17 18:38:19
tags: [note]
categories: Nodejs 系列
---


## 概述
Nodejs天生是单线程单进程的，child_process模块可以用于新建子进程。子进程的运行结果储存在系统缓存之中（最大200KB），等到子进程运行结束以后，主进程再用回调函数读取子进程的运行结果。

<!-- more -->

## exec && execSync

用来执行shell命令

      child_process.exec(command[, options][, callback])

参数说明：

    - command <string> 要运行的命令，并带上以空格分隔的参数。
    - options <Object> 参见官网
    - callback <Function> 当进程终止时调用并带上输出。
      error <Error>
      stdout <string> | <Buffer>
      stderr <string> | <Buffer>

例子，我们通过命令行来进行文件夹拷贝

      const child_process = require('child_process');
      child_process.exec('cp -rf static static1', (err, stdout, stderr) => {
        if (err) {
          console.log('error:' + stderr);
        } else {
          console.log('success');
        }
      })

execSync是exec的同步执行版本

## execFile
execFile方法直接执行特定的程序，参数作为数组传入，不会被bash解释，因此具有较高的安全性

    child_process.execFile(file[, args][, options][, callback])

参数说明：

    - file <string> 要运行的可执行文件的名称或路径。
    - args <string[]> 字符串参数的列表。
    - options <Object> 参见官网
    - callback <Function> 当进程终止时调用并带上输出。
      error <Error>
      stdout <string> | <Buffer>
      stderr <string> | <Buffer>


例子：子进程执行本地2.js

    const { execFile } = require('child_process');
    const child = execFile('node', ['2.js'], (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    });
    
    //2.js 内容
    console.log("Hello!")

输出：
   
    Hello!
  
## spawn
spawn方法创建一个子进程来执行特定命令，用法与execFile方法类似，但是没有回调函数，只能通过监听事件，来获取运行结果。它属于异步执行，适用于子进程长时间运行的情况。

      child_process.spawn(command[, args][, options])

参数说明：

    - command <string> 要运行的命令。
    - args <string[]> 字符串参数的列表。
    - options <Object> 参见官网

例子，我们依旧通过子进程执行本地2.js

    const child_process = require('child_process');
    ls=child_process.spawn('node', ['2.js'])
    ls.stdout.on('data',  (data)=> {
      console.log('stdout: ' + data);
    });

    ls.stderr.on('data', (data)=>{
      console.log('stderr: ' + data);
    });

    ls.on('close', (code)=>{
      console.log('child process exited with code ' + code);
    });

运行结果：

    stdout: Hello!

    child process exited with code 0

也可通过spawn实现文件夹复制功能（windows下powershell执行有问题）

      const child_process = require('child_process');
      child_process.spawn('cp', ['-rf', 'static', 'static2'])

## fork 与 send

fork方法直接创建一个子进程，执行Node脚本。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。

    child_process.fork(modulePath[, args][, options])

例子：1.js 与 2.js 进行通信：

    const child_process = require('child_process');
    const n = child_process.fork('./2.js');
    n.on('message', (m)=> {
      console.log('PARENT got message:', m);
    });
    n.send({ hello: 'world' });
    
2.js中内容：

    process.on('message',(m)=> {
      console.log('CHILD got message:', m);
    });
    process.send({ foo: 'bar' });

运行结果：

    CHILD got message: { hello: 'world' }
    PARENT got message: { foo: 'bar' }

## 参考
- [child-process模块](https://javascript.ruanyifeng.com/nodejs/child-process.html)


 