---
title: Nodejs系列-7-Buffer模块
date: 2019-10-08
categories:
  - nodejs-系列
tags:
  - note
---

Buffer是用于操作二进制数据的类。  

<!-- more -->
JavaScript 语言没有用于读取或操作二进制数据流的机制。 Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互.

Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require，因此无需使用 require('buffer').Buffer。ps: `new Buffer` 已废弃

	var bf=Buffer.from([1,2,3,4,10]);
	console.log(bf); 
	// <Buffer 01 02 03 04 0a> 返回一个字节长度为5的Buffer，以16进制打印出来，1字节=8位
  // 转换成二进制来表示的话是这样： <Buffer 00000001 00000010 00000011 00000100 00001010> 
	console.log(bf.length);//5

每个字节能表达的大小为0-255, 其他整数会通过 ＆ 255 操作强制转换到此范围。  

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

## 补充
js弱类型语言，所以很少涉及到进制之前的转换，再补充一边相关内容，防止遗忘：

### ECMAScript-Numer类型
ECMAScript中的基本数据类型Numer，最基本的数值字面量格式是十进制，除了以十进制表示外，整数还可以通过八进制（以8为基础）或十六进制（以16为基数）的字面值来表示。其中，八进制字面值的第一位必须是零（0），然后是八进制数字序列（0~7），十六进制字面值的前两位必须是0x，后跟任何十六进制数字（0~9及A~F）。其中字母A~F可以大写，也可以小写：

    var octalNum1 = 070;  // 八进制的56
    var hexNum1 = 0xA;    // 十六进制的10

### 位/字节/字

- 位（bit）:计算机中的最小单位，逻辑0或1就是一个位
- 字节（byte）:有8位组成一个字节
- 字（word）：16位为一个字，32位为双字

C/C++语言中数据类型：大小（字节）

    double 8
    float 4
    long 4
    int 2 （32位或64位系统下int的长度为4字节）
    char 1

## 参考文章
1. [字符编码笔记：ASCII，Unicode 和 UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html) 