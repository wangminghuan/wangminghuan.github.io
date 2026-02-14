---
title: Flutter开发系列-4
date: 2022-07-07 12:05:14
tags: [Flutter, Widget]
---

<!-- https://www.jianshu.com/p/47cbfbabc1e9 -->

## 布局方式

Container，是一种允许在其内部添加其他控件的控件，Flutter 的 Container 仅能包含一个子 Widget

如同 Android 的 LinearLayout、前端的 Flex 布局一样，Flutter 中也有类似的概念，即将子 Widget 按行水平排列的 Row，按列垂直排列的 Column，以及负责分配这些子 Widget 在布局方向（行 / 列）中剩余空间的 Expanded。

设置子 Widget 在这两个方向上的对齐规则 mainAxisAlignment(主轴) 与 crossAxisAlignment(纵轴)。
![](1.webp)

### Scaffold

### 
<!-- https://appunite.com/blog/flutter-splash-screen-for-android-and-ios -->
## 参考

- [《Flutter实战·第二版》](https://book.flutterchina.club/)
- [flutter常见报错 hasSize 为什么出现 解决办法](https://blog.csdn.net/jsp13270124/article/details/106139465)