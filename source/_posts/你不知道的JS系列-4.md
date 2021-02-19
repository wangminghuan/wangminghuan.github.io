---
title: 你不知道的JS系列-4
date: 2021-02-19 17:15:03
tags: [你不知道的js]
categories: JavaScript
---

## 前言

本篇开始，记录在阅读《你不知道的JavaScript-中卷》中遇到的自己遗漏的知识点，阅读章节为第一部分：类型和语法
<!-- more -->

## 类型与值

JavaScript 中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。所以在对变量执行 typeof 操作时，得到的结果并不是该变量的类型，而是该变量持有的值的类型。

JS的七种类型已经提及无数遍了：null、 undefined 、boolean 、string 、number 、object 和 symbol; 除了object外，其他都被称为基本类型。

基本类型的值只能通过复制来赋值，而Object只能通过引用进行复制，与指针不同，无论多少个引用，最终指向的都是同一个值（函数的参数传递也遵循该规则）。

下面补充几种常见类型中的知识点：

### 数组

- 使用 delete 运算符可以将单元从数组中删除，但是单元删除后，数组的 length 属性并不会发生变化
- 类数组转换（如NodeList, arguments）常用方法：
      Array.prototype.slice.call( document.querySelectorAll(".goods-info") )
      Array.from( arguments )

### 字符串
- 字符串经常被当作"字符数组"，因为字符串的很多方法都与字符串数组类似，但二者不一样：字符串不可修改，数组值可修改
- 字符串可以调用数组的多数方法，除了`reverse`（字符串值不可变）
      Array.prototype.map.call("abc", function(v){
        return v.toUpperCase() + ".";
        }).join(""); //A.B.C

### 数字
- JavaScript 没有真正意义上的整数: `42.0 === 42`
- `toPrecision` 方法用来指定有效数位的显示位数：
        (42.59).toPrecision(5) //"42.590"
        (42.59).toPrecision(3) //"42.6"
- `42..tofixed(3)` 与 `42 .tofixed(3)` 可以被引擎正常解析，但不推荐使用
- 数字类型有几个特殊值：`NaN`、`+Infinity`、`-Infinity` 和 `-0`。NaN 是一个特殊值，它和自身也不相等, 表示值是“不是数字的数字”，是数字类型运算过程中产生的错误值。`window.isNaN` 的检测有bug: `window.isNaN('foo')===true`, 推荐使用ES6的 `Number.isNaN`
- JavaScript存在 `0` 与 `-0`, 且 `-0===0`，判断方法见下方isNegZero方法；符号用来表示其他信息（如移动方向），所以存在是有必要的
- [ES6 提供了二进制和八进制数值的新的写法](/ES6系列-2-新增类型与扩展方法/)
- 几个polyfill写法：
      /*
       @desc 判断两个小数是否相等
      */
     
      if (!Number.EPSILON) {  // Number.EPSILON为指定误差，ES6 下无需添加 
        Number.EPSILON = Math.pow(2,-52);
      }
      function numbersCloseEnoughToEqual(n1,n2) {
        return Math.abs( n1 - n2 ) < Number.EPSILON;
      }
      console.log(numbersCloseEnoughToEqual( 0.1+0.2, 0.3 )); // true
      console.log(numbersCloseEnoughToEqual( 0.0000001, 0.0000002 )); // false
      
      /*
       @desc 判断是否为-0
      */
      function isNegZero(n) {
        n = Number( n );
        return (n === 0) && (1 / n === -Infinity);
      }
      /*
       @desc  Number.isInteger ES6之前的profill
      */
      if (!Number.isInteger) {
        Number.isInteger = function(num) {
          return typeof num == "number" && num % 1 == 0;
        };
      }

      /*
       @desc  Number.isSafeInteger ES6之前的profill
      */
      if (!Number.isSafeInteger) {
        Number.isSafeInteger = function(num) {
          return Number.isInteger( num ) &&
            Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
        }; 
      }

      /*
       @desc  Number.isNaN ES6之前的profill
      */
      if (!Number.isNaN) {
        Number.isNaN = function(n) {
          return (
            typeof n === "number" &&
            window.isNaN( n )
          ); 
       };
      }

      /*
       @desc  Object.is ES6之前的profill
      */
      if (!Object.is) {
        Object.is = function(v1, v2) {
          // 判断是否是-0
          if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
          }
          // 判断是否是NaN
          if (v1 !== v1) {
            return v2 !== v2;
          }
          // 其他情况
          return v1 === v2;
        };
      }