---
title: 重学前端 - JavaScript部分-词法
date: 2019-07-10 04:00:00
tags: [js]
categories: 重学前端
---
## 概述

我们都知道JS是一种“解释执行”的语言，不同于c++等语言的提前编译，它的编译过程是在JS引擎中完成的（代码执行前进行编译），更多内容可参考：[你不知道的JS系列-1](/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JS%E7%B3%BB%E5%88%97-1/#more)  

对于所有需要编译的语言来说，都需要提前指定一些规则来设计语言，这些规则就可以称之为“文法”。  

文法是编译原理中对语言的写法的一种规定，一般来说，文法分成词法和语法两种。词法规定了语言的最小语义单元：token，可以翻译成“标记”或者“词”。这里我们统一称为“词”，

我们把视角再转回到JS身上：所有源码中出现的内容包括了：空白符号、换行符、注释、标识符名称、符号、数字直接量、字符串直接量、正则表达式直接量、字符串模板。接下来，编译器在代码执行前就需要对这些内容进行语法分析（拆词）

## 几点说明

1. Javascript支持多种空白符号
2. Javascript只支持四种字符作为换行符
3. Javascript支持单行注释与多行注释
4. Javascript中的标识符名称可以以“$”、“_”或者 Unicode 字母开始
5. Javascript中的字符串直接量支持单引号和多引号两种
6. Javascript中‘/’不仅可以作为除法，也可以作为正则表达式，所以词法分析器需要两套词法
7. Javascript中模板字符串也需要单独的词法来处理
8. Javascript支持数字直接量，不过对于`12.toString()`这种写法要人为处理，否则默认词法会将`12.`划分为一个“token”,从而引发异常