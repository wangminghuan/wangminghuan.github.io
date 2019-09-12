---
title: ArrayBuffer TypedArray和DataView
date: 2019-09-12 17:29:21
tags:
---
## 1 概述
ArrayBuffer对象、TypedArray视图和DataView视图是 JavaScript 操作二进制数据的一个接口。这些对象早就存在，属于独立的规格（2011 年 2 月发布），ES6 将它们纳入了 ECMAScript 规格，并且增加了新的方法。它们都是以数组的语法处理二进制数据，所以统称为二进制数组。

这个接口的原始设计目的，与 WebGL 项目有关。浏览器与显卡之间的大量通信都是通过二进制数据完成的，而传统的文本格式是32位整数，为了解决数据转化的效率低下问题，使得二者可以直接通过二进制进行通信，二进制数组就是在这种背景下诞生的。它很像 C 语言的数组，允许开发者以数组下标的形式，直接操作内存。

<!-- more -->

## 2 二进制数组的组成
由三类对象组成：  

- ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

- TypedArray视图：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。

- DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。

简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据

### 2.1 ArrayBuffer 对象

ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

![](2.png)

可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。

### 2.2 TypedArray 视图

TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数（接受一个ArrayBuffer对象作为参数）: 

- Int8Array：8 位有符号整数，长度 1 个字节。
- Uint8Array：8 位无符号整数，长度 1 个字节。
- Uint8ClampedArray：8 位无符号整数，长度 1 个字节，溢出处理不同。
- Int16Array：16 位有符号整数，长度 2 个字节。
- Uint16Array：16 位无符号整数，长度 2 个字节。
- Int32Array：32 位有符号整数，长度 4 个字节。
- Uint32Array：32 位无符号整数，长度 4 个字节。
- Float32Array：32 位浮点数，长度 4 个字节。
- Float64Array：64 位浮点数，长度 8 个字节。

这 9 个构造函数生成的数组，统称为TypedArray视图。它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。普通数组与 TypedArray 数组的差异主要在以下方面: 

- TypedArray 数组的所有成员，都是同一种类型。
- TypedArray 数组的成员是连续的，不会有空位。
- TypedArray 数组成员的默认值为 0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)返回一个 TypedArray 数组，里面 10 个成员都是 0。
- TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。

譬如我们读取一个文件的二进制数据

      document.getElementById("select-file").addEventListener("change",(e)=>{
            const files=e.target.files[0];
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(files)
            fileReader.onload = function () {
                  let arrayBuffer = this.result;
                  console.log(arrayBuffer)
                  let uInt8data=new Uint8Array(arrayBuffer);
                  console.log(uInt8data)
                  console.log(uInt8data.buffer)
            }
      })

结果如下：

![](1.png)

### 2.3 DataView 视图

DataView视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。

DataView视图支持的类型共8种，除不支持 Uint8ClampedArray 类型外，其他与TypedArray视图相同

### 2.4 ArrayBuffer 与字符串的互相转换

对于ArrayBuffer TypedArray 和DataView 更详细的用法可以参考阮一峰的ES6教程（参考文章1）

## 3 二进制数组的应用 


## 参考文章
1. [阮一峰 ECMAScript 6 入门 之 ArrayBuffer](http://es6.ruanyifeng.com/#docs/arraybuffer)


