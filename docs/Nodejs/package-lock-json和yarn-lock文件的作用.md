---
title: package-lock.json和yarn.lock文件的作用
date: 2019-07-10 18:37:17
tags: [note]
categories: Nodejs
---
## 概述
在node项目中如果我们使用 `npm install` 或 `yarn install` 时会发现本地会生成一个`package-lock.json` 或 `yarn.lock`文件，这个文件到底是做什么用？
<!-- more -->
## 官方解释
根据官方文档解释基本如下：  

package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

翻译一下：package-lock.json是当 node_modules 或 package.json 发生变化时自动生成的文件。这个文件主要功能是确定当前安装的包的依赖，以便后续重新安装的时候生成相同的依赖，而忽略项目开发过程中有些依赖已经发生的更新。

## 原因

npm是一个用于管理package之间依赖关系的管理器，它允许开发者在pacakge.json中间标出自己项目对npm各库包的依赖。你可以选择以如下方式来标明自己所需要库包的版本，并且依赖版本管理非常宽松，默认生成的版本都是`^`写法，如：`"vue": "^2.5.0"`。这里面的向上标号是向后（新）兼容的，如果vue的最新版本是超过2.5.0，并在大版本号（2）上相同，就允许下载最新版本的vue库包，例如实际上可能运行npm install时候下载的具体版本是2.6.1。同一个项目一天之内可能会 install 到不同版本的依赖。而依赖库包版本的不同，可能会导致其行为特征不同，甚至有时候会出现完全不兼容。

在受到 yarn.lock 的强烈冲击之后，npm 还是决定在 5.0.0+ 版本默认生成 package-lock.json。

## 作用

npm5.0以后的版本就开始提供自动生成package-lock.json功能，为的是让开发者知道只要你保存了源文件，到一个新的机器上、或者新的下载源，只要按照这个package-lock.json所标示的具体版本下载依赖库包，就能确保所有库包与你上次安装的完全一样。

## 参考

1. [package-lock.json官方文档](https://docs.npmjs.com/files/package-lock.json)
2. [知乎-npm install 生成的package-lock.json是什么文件？有什么用？](https://www.zhihu.com/question/62331583)

