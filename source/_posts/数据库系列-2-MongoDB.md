---
title: 数据库系列-1-MongoDB
date: 2020-01-21 10:02:36
tags: [noSql,MongoDB]
categories: 数据库
---
## 概述

NoSQL用于超大规模数据的存储。（例如谷歌或Facebook每天为他们的用户收集万亿比特的数据）。这些类型的数据存储不需要固定的模式，无需多余操作就可以横向扩展。

随着前端技术的不断迭代，代表MongoDB（文档数据库），Express（Web服务器），AngularJS（前端框架）和Node.js（后端JavaScript运行时）的MEAN堆栈开始流行。除其他原因外，MEAN堆栈很有吸引力，因为您需要了解的唯一语言是JavaScript。与等效的LAMP/LNMP堆栈相比，它还需要更少的RAM。

MongoDB无疑是NoSQL数据库中最受欢迎的数据库。它的文档数据模型为开发人员提供了极大的灵活性，而其分布式体系结构则提供了很好的可伸缩性。因此，通常选择MongoDB用于必须管理大量数据，得益于水平可伸缩性并处理不适合关系模型的数据结构的应用程序。

MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统,旨在为WEB应用提供可扩展的高性能数据存储解决方案。在其之上还具有一个基于图形的存储。MongoDB实际上并不存储JSON：它存储BSON（BSON 是一种类似 JSON 的二进制形式的存储格式，是 Binary JSON 的简称），该扩展了JSON表示（字符串）以包括其他类型，例如int，long，date，浮点，decimal128和地理空间坐标等。

<!-- more -->

## MongoDB中的概念

| RDBMS	| MongoDB  |
| ------ | ------ | ------ |
| 数据库 | 数据库 |
| 表格 | 集合 |
| 行 | 文档 |
| 列 | 字段 |
| 表联合 | 嵌入文档 |
| 主键 | 主键 (MongoDB 提供了 key 为 _id ) |

## MongoDB的使用

数据库安装完毕后，默认是有三个数据库的，这些数据库名是保留的，可以直接访问这些有特殊作用的数据库。

    > show dbs
    admin   0.000GB
    config  0.000GB
    local   0.000GB

- admin： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。  
- local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合。 
- config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。  

![](1.png)

ps:本博文中使用的可视化工具为[Robo 3T](https://robomongo.org/)

### 创建数据库

    use code

但此时创建的数据库 code 并不在数据库的列表中， 要显示它，我们需要向 code 数据库插入一些数据。（ps: MongoDB 中默认的数据库为 test，如果你没有创建新的数据库，将默认使用test数据库）

### 删除数据库

   db.dropDatabase()

会删除当前use的数据库。


### 创建集合

集合的概念类似MySql中的“表”，当插入一些文档时，MongoDB 会自动创建集合：

      db.city.insert({"name":"郑州"})

自动创建了集合city

我们也可以显式创造集合：

      db.createCollection("area")
  
![](2.png)

查询当前数据库下，集合个数：

       db.city.count();

### 删除集合
 

    > db.area.drop()
     true

    > show tables // show collections 同等效果
    city

area集合已经被删除

### 插入文档

文档的数据结构和 JSON 基本一样。所有存储在集合中的数据都是 BSON 格式。

使用 insert() 或 save() 方法向集合中插入文档：

    db.city.insert({
        name: '北京', 
        code: "001",
        description: '中华人民共和国首都',
        people: 2154.2*10000,
        tags: ['政治中心', '文化中心'],
        isCenter: true
    })

![](3.png)

`save()` 方法类似于 `insert()` 方法。如果指定 _id 字段，则会更新该 _id 的数据，不指定话功能同`insert()`方法:

        db.city.save({
            _id:ObjectId("5e280f0f3a83e53738ebd7c7"),
            name: '北京', 
            code: "100"
        })

`insert()` 方法如果指定的`_id`字段不存在则新建，如果存在就会报错，不会像`save()`方法一样更新数据


下表为MongoDB中常用的几种数据类型：

| 数据类型	| 描述  |
| ------ | ------ |
| String	| 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer	| 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。 |
| Boolean	| 布尔值。用于存储布尔值（真/假）。 |
| Double	| 双精度浮点值。用于存储浮点值。 |
| Min/Max keys | 	将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Array	| 用于将数组或列表或多个值存储为一个键。 |
| Timestamp	| 时间戳。记录文档修改或添加的具体时间。 |
| Object	| 用于内嵌文档。 |
| Null	| 用于创建空值。 |
| Symbol	| 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date	| 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID	| 对象 ID。用于创建文档的 ID。 |
| Binary Data	| 二进制数据。用于存储二进制数据。 |
| Code	| 代码类型。用于在文档中存储 JavaScript 代码。 |
| Regular expression | 正则表达式类型。用于存储正则表达式。 |

### 删除文档

删除文档使用remove方法，语法格式如下：

    db.collection.remove(
      <query>,
      {
        justOne: <boolean>,
        writeConcern: <document>
      }
    )
    参数说明：
    - query :（可选）删除的文档的条件。
    - justOne : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
    - writeConcern :（可选）抛出异常的级别。

删除id为 ObjectId("5e280f0f3a83e53738ebd7c7") 的文档

     > db.city.remove({name:"北京"},1)
     WriteResult({ "nRemoved" : 1 }) //成功删除1条

如果想清空所有：

      db.city.remove({})


### 更新文档

更新已存在的文档使用update方法，语法格式如下：

    db.collection.update(
      <query>,
      <update>,
      {
        upsert: <boolean>,
        multi: <boolean>,
        writeConcern: <document>
      }
    )

    参数说明：
    - query : update的查询条件，类似sql update查询内where后面的。
    - update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
    - upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
    - multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
    - writeConcern :可选，抛出异常的级别。

### 查询文档

查询文档使用find方法，语法格式如下：

    db.collection.find(query, projection)

    参数说明：
    - query ：可选，使用查询操作符指定查询条件
    - projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

例如，查询city集合下所有数据：

    > db.city.find()
    { "_id" : ObjectId("5e281760f7cb355794d2a86a"), "name" : "北京", "code" : "004", "description" : "中华人民共和国首都", "people" : 21542000, "tags" : [ "政治中心", "文化中心", "交流中心" ], "isCenter" : false }
    { "_id" : ObjectId("5e2818e9f7cb355794d2a86b"), "name" : "北京", "code" : "004", "description" : "中华人民共和国首都", "people" : 21542000, "tags" : [ "政治中心", "文化中心", "交流中心" ], "isCenter" : true }

如果你需要以易读（格式化）的方式来读取数据，可以使用 pretty() 方法：

    > db.city.find().pretty()
    {
      "_id" : ObjectId("5e281760f7cb355794d2a86a"),
      "name" : "北京",
      "code" : "004",
      "description" : "中华人民共和国首都",
      "people" : 21542000,
      "tags" : [
        "政治中心",
        "文化中心",
        "交流中心"
      ],
      "isCenter" : false
    }
    {
      "_id" : ObjectId("5e2818e9f7cb355794d2a86b"),
      "name" : "北京",
      "code" : "004",
      "description" : "中华人民共和国首都",
      "people" : 21542000,
      "tags" : [
        "政治中心",
        "文化中心",
        "交流中心"
      ],
      "isCenter" : true
    }
#### 条件查询

MongoDB支持类似MySql的where语句的条件查询：

#### AND查询

#### OR查询


## 数据库创建管理员

截止到目前，我们的数据库是对外开放的，意味着任何人只要拿到数据库地址，均可连接访问，显然，这是极其危险的，我们需要对数据库的访问加以限制：

切换到admin数据库：

    > use admin
    switched to db admin

创建管理员账号：

    > db.createUser({user: 'admin', pwd: 'xxx',roles:[{role: 'root', db: 'admin'}]})

此时我们需要重启下数据库（基于`/usr/local/mongodb/bin`目录）：

    ./mongod --shutdown  //关闭数据库

开启`/etc/mongod.conf`下的用户认证:

      dbpath = /data/db  #数据存储目录
      logpath = /data/logs/mongodb.log # 日志目录
      fork = true  # 后台进程启动
      auth=true    # 开启验证
      port = 3001  # 端口号  
      bind_ip=0.0.0.0 # 对外访问

启动数据库：

    ./mongod -f /etc/mongod.conf

这样便完成了用户校验功能。

## 参考

- [知乎专栏-MongoDB与MySQL：如何选择](https://zhuanlan.zhihu.com/p/92898439)
