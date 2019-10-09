---
title: Nodejs系列-7-Buffer模块
date: 2019-10-08 15:37:52
tags: [note]
categories: Nodejs
---
Buffer是用于操作二进制数据的类。  

<!-- more -->
JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互.

Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require，因此无需使用 require('buffer').Buffer。

	var bf=new Buffer([1,2,3,4,10]);
	console.log(bf); 
	//<Buffer 01 02 03 04 0a> 返回一个长度是5字节的数组（以16进制打印出来，1字节=8位）
	console.log(bf.length);//5

Buffer实例一旦创建，长度无法修改。

## 常用方法
>buf为实例方法，Buffer为对象方法。


- 填充数据，可以设置起始点和编码方式
    
      buf.fill(value[, offset[, end]][, encoding])  

- 要写入 buf 的字符串，可以设置起始点，长度和编码方式

      buf.write(string[, offset[, length]][, encoding])

- 查找目标值是否存在

      buf.includes(value[, byteOffset][, encoding])

- 查找索引

      buf.indexOf(value[, byteOffset][, encoding])

- 比较两个buffer是否相等（数值是否相等，而非比较引用地址）
     
      buf.equals(otherBuffer)

- 拷贝一个buffer 
      
      buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

- 比较两个buffer大小 
      
      buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])

- 分配一个大小为 size 字节的新建的 Buffer 。
      Buffer.alloc(size[, fill[, encoding]])  
      如果 fill 为 undefined ，则该 Buffer 会用 0 填充，encoding默认为 'utf8'
      Buffer也有下标，可以通过 buf[index] 进行操作
      length：字节长度（非字符长度）
- 返回字符串的实际字节长度（js中字符串长度获取的是字符长度）
      Buffer.byteLength(string[, encoding])  

- 比较两个buf的大小

      Buffer.compare(buf1, buf2)  

- 返回一个合并了 list 中所有 Buffer 实例的新 Buffer
      Buffer.concat(list[, totalLength])
 
- 使用八位字节数组 array 分配一个新的 Buffer。
      Buffer.from(array)

- 判断对象是否是一个 Buffer
      Buffer.isBuffer(obj)

- 判断Buffer支持的字符编码方式
      Buffer.isEncoding(encoding)  
      encoding可选值有：ascii、utf8、utf16le、ucs2、base64、latin1、binary、hex

## 参考文章
1. [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html) 