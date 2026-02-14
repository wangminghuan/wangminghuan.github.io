---
title: VueJs设计与实现笔记
date: 2022-05-09 17:29:44
tags: [note]
categories: Vue 系列
---
本文记录霍春阳-《VueJs设计与实现》阅读过程中的一些笔记


## 第一章

### 命令式与声明式

视图框架通常分为命令式与声明式，各自有优点，声明式代码的性能不优与命令式代码的性能

### 运行时与编译时
一个框架可以是运行时、编译时以及运行时+编译时。
举个例子，现在有一个render函数

    function Render(obj,root) {
      const el = document.createElement(obj.tag)
      if( typeof obj.children === "string" ){
        const text = document.createTextNode(obj.children)
        el.appendChild(text)
      } else if (obj.children) {
         obj.children.forEach(child => Render(child,el))
      }
      root.appendChild(el)
    }

用户可以这样使用：

    Render({
      tag:"div",
      children:[{
        tag:"span",
        children:"Hello world"
      }]
    },document.body)

上述就是一个纯运行时的功能，但用户会觉得Render函数调用太复杂，直接使用HTML标签的描述方式来调用更直观，于是便引入编译器实现如下功能
   
    <div>
      <span>Hello world</span>
    </div>

    编译为

    {
      tag:"div",
      children:[{
        tag:"span",
        children:"Hello world"
      }]
    }
然后再调用Render函数得到了一样的结果，上述过程就是 编译时 + 运行时。
而纯编译时就是直接编译为命令式代码，Render函数也省了

    <div>
      <span>Hello world</span>
    </div>

    编译为

    const div = document.createElement('div')
    const span = document.createElement('span')
    span.innerText = 'hello world'
    div.appendChild(span)
    document.body.appendChild(div)

编译时代码运行效率更高，性能可能会更好，但没有什么灵活性，纯运行时又无法提前分析用户代码进而优化，VueJs采用的编译时+运行时架构，在保持灵活性的同时尽可能地优化代码