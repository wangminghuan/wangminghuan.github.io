---
title: jenkins搭建前端上线系统小试
date: 2019-09-24 16:49:47
tags: [前端工程化]
categories: Nodejs
---

## 概述
一次在跟同事讨论中忽然萌生了自己手动搭建一套上线系统的想法，第一次上手，所以选用了业内比较成熟的方案-jenkins。之前只是用过jenkins进行过一些操作，并未自己从0到1完成搭建，本文记录下自己整个过程中的遇到的一些问题与解决方案。

<!-- more -->

## 准备知识
linux安装软件的方式（知道的可以直接跳过本节）：

一般有三种方式：[Linux系统中安装软件的几种方式](https://blog.csdn.net/qq_36119192/article/details/82866329)  

1. 源码包安装：
    下载源码 -> 解压 -> 运行configure配置等 -> make 编译 -> make  install 安装

2. rpm包安装：
  RedHat Package Manager，由红帽公司提出，建议统一的数据库文件，详细记录软件包的安装、卸载等变化信息，能够自动分析软件包依赖关系。用RPM工具可以将二进制程序进行打包，包被称为RPM包。RPM包并不是跨平台的。

3. yum源安装：
  Yellow dog Updater, Modified, 是一个在Fedora和RedHat以及CentOS中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装

linux启动服务管理两种方式service和systemctl：

service作为启动init进程的主命令存在一些历史缺陷，Systemd就是他的升级版，他为系统的启动和管理提供一套完整的解决方案。Systemd 并不是一个命令，而是一组命令，涉及到系统管理的方方面面：systemctl是 Systemd 的主命令，用于管理系统。


## 方案一： docker安装
docker作为目前比较火的一个名词，自己一直没机会使用，了解到jenkins可以通过docker来安装，于是，从docker开始，进入了采坑之旅。

### centos上安装docker

自己的服务器为阿里云，版本如下（以下所有操作均是基于此台机器）：

    uname -a
    Linux iZ2zeb34hcp1ui0lowu4atZ 3.10.0-957.5.1.el7.x86_64 #1 SMP Fri Feb 1 14:54:57 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux

docker的安装还是比较简单的，参照[阿里云官方文档](https://help.aliyun.com/document_detail/51853.html)几分钟搞定：

添加yum源

      # yum install epel-release –y // 安装并启用 EPEL 源。
      # yum clean all
      # yum list

安装并运行Docker

      # yum install docker-io –y
      # systemctl start docker // 启动docker服务
    
检查安装结果。

      # docker info


### 关于 docker
"Docker" 的本质其实是解决了应用服务的 "隐私" 问题，实现进程、内存、文件、网络之间相互隔离。也可以简单把 Docker 理解成一种虚拟机，很多应用服务可以像桌面软件那样一键安装，免部署和环境配置。

#### 前端为什么需要使用 Docker？

1. 对于 Full Stack 工程师。Docker 可以提供一种简单轻便的服务器编程环境，而且可以随用随删、降低环境配置成本。
2. 很多 FE 日常工作中需要跟 Nginx、MongoDB、MySQL 等服务器应用打交道。用 Docker 可以很容易部署一个测试环境，学习和倒腾.

####  Docker 中的三个概念

    Container - 容器
    Image - 镜像
    Registry - 仓库

可以像下面这张图来类比：

![](1.jpg)

### docker 安装jenkins

使用下面的 docker run 命令运行 jenkinsci/blueocean 镜像作为Docker中的一个容器(如果本地没有镜像，这个命令会自动下载):

    docker run \
      --rm \
      -u root \
      -p 8080:8080 \
      -v jenkins-data:/var/jenkins_home \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v "$HOME":/home \
      jenkinsci/blueocean

此时就进入jenkins安装流程，具体参照此处[jenkins官网安装示例](https://jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/#setup-wizard)：

启动服务，输入密码继续；

![](1.png)

启动后安装推荐插件:

![](2.png)

安装插件完成后，进入设置初始账号密码:

![](3.png)

设置完毕即可进入jenkins主页：

![](4.png)

### jenkins 配置nodejs

### jenkins + github 配置项目

### 遇到的问题


## RPM方式安装jenkins


## 总结

## 参考
- [Systemd 入门教程：实战篇](https://www.cnblogs.com/zwcry/p/9602756.html)
