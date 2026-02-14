---
title: Flutter开发系列-3
date: 2022-07-06 15:28:40
tags: [Flutter]
---

## 概述
本文我们开始系统了解Flutter的世界。

<!-- more -->

## Widget、Element和RenderObject

Flutter 的核心设计思想便是“一切皆 Widget”。Widget，是构建Flutter界面的基石。而 Flutter把视图数据的组织和渲染抽象为三部分：Widget、Element和RenderObject

![](1.webp)

Flutter 渲染过程，可以分为这么三步：
- 首先，通过 Widget 树生成对应的 Element 树；
- 然后，创建相应的 RenderObject 并关联到 Element.renderObject 属性上；
- 最后，构建成 RenderObject 树，以完成最终的渲染。

那为什么要设计中间的Element？因为 Widget 具有不可变性（只要变化就销毁重建），但 Element 却是可变的。实际上，Element 树这一层将 Widget 树的变化（类似 React 虚拟 DOM diff）做了抽象，可以只将真正需要修改的部分同步到真实的 RenderObject 树中，最大程度降低对真实渲染视图的修改，提高渲染效率，而不是销毁整个渲染视图树重建。


**用 Vue 来比喻的话**：Widget 就是 Vue 的 template；Element 就是 virtual DOM；RenderObject 就是真实的DOM树
**用 React 来比喻的话**：Widget 就是JSX；Element 就是 virtual DOM；RenderObject 就是真实的DOM树

## StatelessWidget 和 StatefulWidget

Flutter借鉴了React/Vue等设计思想，UI的视图变化是声明式的，而非命名式的。所以很容易理解Widget中的无状态组件（StatelessWidget）与有状态组件（StatefulWidget）

虽然StatefulWidget 的场景已经完全覆盖了 StatelessWidget，但无意义的使用大量有状态widget滥用会直接影响 Flutter 应用的渲染性能。我们可以遵循以下规则来判断：**父 Widget 是否能通过初始化参数完全控制其 UI 展示效果？**如果可以，请使用StatelessWidget，反之使用StatefulWidget

## State生命周期

同React/Vue一样，FlutterFlutter 中说的生命周期，也是指有状态的widget，对于无状态widget生命周期只有 build 这个过程，也只会渲染一次，而有状态widget则比较复杂，下面我们就来看看StatefulWidget的生命周期过程。
![](2.webp)

以模板代码为例，我们可以在State中监听每个生命周期的执行
```
class _MyHomePageState extends State<MyHomePage>{
  @override
  initState() {
    print('init state');
    super.initState();
  }

  @override
  didChangeDependencies() {
    print('did change dependencies');
    super.didChangeDependencies();
  }

  @override
  didUpdateWidget(MyHomePage oldWidget) {
    print('did update widget');
    super.didUpdateWidget(oldWidget);
  }

  @override
  deactivate() {
    print('deactivate');
    super.deactivate();
  }

  @override
  dispose() {
    print('dispose');
    super.dispose();
  }

  @override
  reassemble() {
    print('reassemble');
    super.reassemble();
  }
  @override
  Widget build(BuildContext context) {
    print("build");
  }
}
```
下图做了简要总结
![](4.webp)

## APP 生命周期

整个 App 也有对应的生命周期：

![](5.webp)

flutter提供了一个`WidgetsBindingObserver` 类，里面提供了很多APP相关的回调事件。还是以模板代码为例，我们可以在State中监听APP的生命周期的执行过程:
```
class _MyHomePageState extends State<MyHomePage> with WidgetsBindingObserver {
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);//注册监听器
  }
  @override  
  @mustCallSuper  
  void dispose(){
    super.dispose();
    WidgetsBinding.instance.removeObserver(this);//移除监听器
  }
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) async {
    print("$state");
  }
}
```
模拟器上测试，APP切回后台依次打印：`AppLifecycleState.inactive -> AppLifecycleState.paused`,再将APP切回前台打印：`AppLifecycleState.resumed`