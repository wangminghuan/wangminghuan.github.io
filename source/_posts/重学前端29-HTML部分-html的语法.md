---
title: 重学前端29-HTML部分-html的语法
date: 2019-05-24 08:28:23
tags: [html]
categories: 重学前端
---
## 概述
我们平时写 HTML 语言，都习惯把关注点放到各种标签上，很少去深究它的语法。HTML 这样的语言，与 JavaScript 这样的语言有一些本质的不同。他不具备[图灵完备](https://segmentfault.com/q/1010000000692654)性，为“标记语言（mark up language）”，它是纯文本的一种升级，“标记”一词的概念来自：编辑审稿时使用不同颜色笔所做的“标记”。  

HTML 其实是 SGML （一种古老的标记语言）中规定的一种格式，但是实际的浏览器没有任何一个是通过 SGML 引擎来解析 HTML 的。今天的 HTML 仍然有 SGML 的不少影子，本次介绍的是 SGML 留给 HTML 的重要的遗产：基本语法和 DTD。
<!-- more -->

## 基本语法
HTML 作为 SGML 的子集，它遵循 SGML 的基本语法：包括标签、转义等。

![](重学前端29-HTML部分-html的语法/29-1.jpg)

#### 标签语法
- 开始标签：`<tagname>`

  带属性的开始标签： `<tagname attributename="attributevalue">`
- 结束标签：`</tagname>`
- 自闭合标签：`<tagname />`

#### 文本语法

在 HTML 中，规定了两种文本语法，一种是普通的文本节点，另一种是 CDATA 文本节点。

文本节点看似是普通的文本，但是，其中有两种字符是必须做转义的：`< 和 &`。
CDATA 也是一种文本，它存在的意义是语法上的意义：在 CDATA 节点内，不需要考虑多数的转义情况。只有字符组合 `]]>` 需要处理，这里不能使用转义，只能拆成两个 CDATA 节点。

#### 注释语法
注释语法以`<!--开头，以-->`结尾，注释的内容非常自由，除了`-->`都没有问题。

#### DTD 语法（文档类型定义）

SGML 的 DTD 语法十分复杂，但是对 HTML 来说，其实 DTD 的选项是有限的，具体参见第二部分。

#### ProcessingInstruction 语法（处理信息）

ProcessingInstruction 多数情况下，是给机器看的。HTML 中规定了可以有 ProcessingInstruction，但是并没有规定它的具体内容，所以可以把它视为一种保留的扩展机制。对浏览器而言，ProcessingInstruction 的作用类似于注释。

## 关于DTD 
DTD 的全称是 Document Type Defination，也就是文档类型定义。SGML 用 DTD 来定义每一种文档类型，HTML 属于 SGML，在 HTML5 出现之前，HTML 都是使用符合 SGML 规定的 DTD。  

HTML4.01 有三种 DTD。分别是严格模式、过渡模式和 frameset 模式。

- 严格模式的 DTD 规定了 HTML4.01 中需要的标签：

      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

- 过渡模式的 DTD 除了 html4.01，还包含了一些被贬斥的标签，这些标签已经不再推荐使用了，但是过渡模式中仍保留了它们：

      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
- frameset 结构的网页如今已经很少见到了，它使用 frameset 标签把几个网页组合到一起：

      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

HTML4.01 又规定了 XHTML 语法，同样有三个版本：

- 版本一

      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

- 版本二

      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


- 版本三
	
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

但是这些复杂的 DTD 写法并没有什么实际作用， 浏览器根本不会用 SGML 引擎解析它们，所以到了 HTML5，干脆放弃了 SGML 子集这项坚持，规定了一个简单的，大家都能记住的 DTD：

    <!DOCTYPE html>

但是，HTML5 也仍然保留了 HTML 语法和 XHTML 语法。

## 文本实体

HTML4.01 的 DTD 里包含的 URL ，其实是可以访问的。

但是 W3C 警告说，禁止任何浏览器在解析网页的时候访问这个 URL，不然 W3C 的服务器会被压垮。


url里面的内容是符合 SGML 规范的 DTD，它规定了 HTML 包含了哪些标签、属性和文本实体。其中文本实体分布在三个文件中：HTMLsymbol.ent HTMLspecial.ent 和 HTMLlat1.ent, 了解即可。


