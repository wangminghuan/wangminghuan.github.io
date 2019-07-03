---
title: async-await promise和setTimeout执行顺序
date: 2019-07-03 12:44:00
tags: [note]
categories: JavaScript
---
## 概述
简单记录下看到一道面试题而引发的一些思考。
<!-- more -->

## 题目

    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
    }

    async function async2() {
      console.log("async2");
    }

    console.log("script start");

    setTimeout(function() {
      console.log("setTimeout");
    }, 0);

    async1();

    new Promise(function(resolve) {
      console.log("promise1");
      resolve();
    }).then(function() {
      console.log("promise2");
    });

    console.log("script end");

执行结果：

    script start
    async1 start---
    async2
    promise1
    script end
    async1 end
    promise2
    setTimeout

## 解释

1. 主线程顺序执行，先输出 "script start" 没什么问题。
2. 执行到setTimeout，这是一个异步任务，且为宏任务（macroTask），推入任务队列（queue）。继续执行主线程内代码。
3. 接着执行async1函数，这是一个异步函数，执行过程与普通函数没区别，输出"async1 start", 然后遇到了await。
4. await命令后面可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。此时会把async2函数转成 `return new Pomise((resolve)=>{console.log("async2");resolve(undefined)})`,因此会输出"async2",然后跳出async1函数，继续执行主线程内的代码，发起一个微任务（microTask），等到异步操作完成，再接着执行函数体内后面的语句。
5. 继续执行遇到了一个promise对象，输出"promise1"后，再发起一个微任务（microTask），跳出对象，继续执行主进程内的代码
6. 遇到`console.log("script end")`,便输出"script end",此时主进程代码执行完毕，主线程就会去读取“任务队列”，先执行微任务，再执行宏任务。
7. 首先，进入async1函数，执行await后函数体内容，输出"async1 end"
8. 然后，进入promise对象执行resole方法，输出"promise2"
9. 最后，执行setTimeout宏任务,输出"setTimeout"

## 问题
其实对于上述第7和8步的执行顺序是存在争议的（promise2 和 async1 end 的顺序），具体可参照参考文章的[关于 async 函数的理解](https://juejin.im/post/5c0f73e4518825689f1b5e6c)。
chrome 71之前的版本，await 执行时要额外创建出两个 promise（有时会是多个），会导致promise2先于async1执行，但这种方式创建多个Promise对象的开销很大，所以chrome73进行了优化，所以按正常流程理解就好，无需太纠结于异步任务的执行顺序，且async2函数有没有通过async声明执行结果都一致。

## 延伸题目

    async function asyncTest1() {
      console.log('2');
      await console.log('3');
    }
    async function asyncTest2() {
      await console.log('4');
      console.log('5');
    }
    async function asyncTest3() {
      await new Promise(function (resolve) {
        console.log('6');
        resolve();
      }).then(function () {
        console.log('7');
      });
      console.log('8');
    }

    console.log('1');

    setTimeout(function () {
      console.log('9');
      new Promise(function (resolve) {
        console.log('10');
        resolve();
      }).then(function () {
        console.log('11');
      })
      asyncTest1();
    });

    asyncTest2();

    asyncTest3();

    new Promise(function (resolve) {
      console.log('12');
      resolve();
    }).then(function () {
      console.log('13');
    });
可以按上面思路分析一下执行结果：

    1  4  6  12  5  7  13  8  9  10  2  3  11

## 参考

1. [关于 async 函数的理解](https://juejin.im/post/5c0f73e4518825689f1b5e6c)