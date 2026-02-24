---
title: Flutter开发系列-1
lastUpdated: 2022-06-30 14:05:12
---
# {{ $frontmatter.title }}

遥想1.0正式版发布时自己曾折腾过一段，后来渐渐又遗忘了，正好有个需求需要用到Flutter，如今Flutter3.0正式版已发布，此系列文章均基于：3.0.3稳定版。

## 安装
Flutter的安装教程网上一搜一大把，依照[Flutter中文网](https://flutter.cn/docs/get-started/install)的安装流程一般没什么问题，我简单罗列下步骤（Windows 10 64位）
- 下载Flutter SDK到本地任意一个盘
- 设置环境变量(用户变量 `\path\flutter\bin`)
- 运行 `flutter doctor` 运行检测，按照指示修改

自己遇到的几个问题：

- `flutter doctor`会检测visual studio，这个是用来开发类似Electron的桌面应用，不需要的话直接运行 `flutter config --no-enable-windows-desktop` 禁用掉检测（visual studio 安装包真心大，得8G）
- 提示安卓证书问题时，运行`flutter doctor --android-licenses` 一路yes下去即可
- vs code 安装flutter插件后`ctrl+shift+p`输入flutter选择`New project`可以快速创建一个项目（一个简单的计数器示例应用 Demo）
- 真机调试时，请先通过android studio 安装 Google USB Driver
- `flutter devices`可以查看当前关联到的设备列表
- 真机或模拟器构建时，如果会卡在 `Running Gradle task 'assembleDebug' .. `, 是国内环境问题（google服务导致依赖库地址访问超时，需要设置多处，可参照[此文章](https://www.jianshu.com/p/e6ecc3ad13b7)进行设置，与文章中描述不同的是，3.0添加的maven仓库是这样
```
maven { 
        url 'https://maven.aliyun.com/repository/google' 
        allowInsecureProtocol = true
      }
      maven { 
        url 'https://maven.aliyun.com/repository/jcenter'
        allowInsecureProtocol = true
      }
      maven { 
        url 'http://maven.aliyun.com/nexus/content/groups/public'
        allowInsecureProtocol = true
      }
      maven {
        url "https://storage.flutter-io.cn/download.flutter.io"
        allowInsecureProtocol = true
      }
```
博客中经常提到的环境变量设置在用户变量下：
```
PUB_HOSTED_URL=https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

### Gradle

Java生态体系中有三大构建工具：Ant、Maven和Gradle, Gradle于2007年首次发布，并在2013年被Google用作Android项目的构建系统。它旨在支持预计将非常庞大的多项目构建。Flutter中的安卓打包也是基于Gradle，至于Gradle如何配置，里面又包含Maven仓库的配置，这里我们不深究，知道Gradle是干嘛的就行了。
      

## Dart概述

Flutter选用的开发语言是Dart（Google开发），Dart亮相于2011年10月10日至12日在丹麦奥尔胡斯举行的GOTO大会上。Dart 的诞生正是要解决 JavaScript 存在的、在语言本质上无法改进的缺陷。而为了推广 Dart，Google 甚至将自己的 Chrome 浏览器内置了 Dart VM，可以直接高效地运行 Dart 代码。而对于普通浏览器来说，Google 也提供了一套能够将 Dart 代码编译成 JavaScript 代码的转换工具。这样一来，开发者们就可以毫无顾虑地使用 Dart 去开发了，而不必担心兼容问题。再加上出身名门，Dart 在一开始就赢得了部分前端开发者的关注。但Google没料到的是JavaScript 的生命力似乎比预想的更强大.由于缺少顶级项目的使用，Dart 始终不温不火。2015 年，在听取了大量开发者的反馈后，Google 决定将内置的 Dart VM 引擎从 Chrome 移除，这对 Dart 的发展来说是重大挫折，替代 JavaScript 就更无从谈起了。

Dart 也借此机会开始转型：在 Google 内部孵化了移动开发框架 Flutter，弯道超车进入了移动开发的领域；而在 Google 未来的操作系统 Fuchsia 中，Dart 更是被指定为官方的开发语言。Dart彻底转变了思路，成为专注大前端与跨平台生态的语言。

至于Flutter为什么最终选择了Dart？Google 公司给出的原因很简单也很直接：Dart 语言开发组就在隔壁，对于 Flutter 需要的一些语言新特性，能够快速在语法层面落地实现；而如果选择了 JavaScript，就必须经过各种委员会和浏览器提供商漫长的决议。

### JIT 与 AOT

借助于先进的工具链和编译器，Dart 是少数同时支持 JIT（Just In Time，即时编译）和 AOT（Ahead of Time，运行前编译）的语言之一

语言在运行之前通常都需要编译，JIT 和 AOT 则是最常见的两种编译模式：

- JIT 在运行时即时编译（Just in time），在开发周期中使用，可以动态下发和执行代码，开发测试效率高，但运行速度和执行性能则会因为运行时即时编译受到影响（如：JavaScript、Python、Php）。
- AOT 即提前编译（Ahead of time），可以生成被直接执行的二进制代码，运行速度快、执行性能表现好，但每次执行前都需要提前编译，开发测试效率低（如：C、C++）。

总结来讲，在开发期使用 JIT 编译，可以缩短产品的开发周期。Flutter 最受欢迎的功能之一热重载，正是基于此特性。而在发布期使用 AOT，就不需要像 React Native 那样在跨平台 JavaScript 代码和原生 Android、iOS 代码之间建立低效的方法调用映射关系。所以说，Dart 具有运行速度快、执行性能好的特点。

### 单线程

Dart 中并没有线程，只有 Isolate（隔离区）。Isolates 之间不会共享内存，就像几个运行在不同进程中的 worker，通过事件循环（Event Looper）在事件队列（Event Queue）上传递消息通信，这点类似NodeJs。

## 跨平台开发

跨平台开发方案的三个时代根据实现方式的不同，业内常见的观点是将主流的跨平台方案划分为三个时代。

- Web 容器时代：基于 Web 相关技术通过浏览器组件来实现界面及功能，典型的框架包括 Cordova(PhoneGap)、Ionic 和微信小程序。
- 泛 Web 容器时代：采用类 Web 标准进行开发，但在运行时把绘制和渲染交由原生系统接管的技术，代表框架有 React Native、Weex 和快应用，广义的还包括天猫的 Virtual View 等。
- 自绘引擎时代：自带渲染引擎，客户端仅提供一块画布即可获得从业务逻辑到功能呈现的多端高度一致的渲染体验。Flutter，是为数不多的代表。

### Web 容器时代

Web 时代的方案，主要采用的是原生应用内嵌浏览器控件 WebView（iOS 为 UIWebView 或 WKWebView，Android 为 WebView）的方式进行 HTML5 页面渲染，并定义 HTML5 与原生代码交互协议，将部分原生系统能力暴露给 HTML5，从而扩展 HTML5 的边界。这类交互协议，就是我们通常说的 JS Bridge（桥）,这也是常说的Hybrid 开发模式。因为web容器本身的渲染方式与APP的渲染方式（创建控件，设置属性后即可完成页面渲染）有很大差别，性能和体验与原生开发存在肉眼可感知的差异。但不可否认的这种模式是现存最多也最成功的例子

### 泛 Web 容器时代
泛 Web 容器时代的解决方案优化了 Web 容器时代的加载、解析和渲染这三大过程，把影响它们独立运行的 Web 标准进行了裁剪，以相对简单的方式支持了构建移动端页面必要的 Web 标准（如 Flexbox 等），也保证了便捷的前端开发体验；同时，这个时代的解决方案基本上完全放弃了浏览器控件渲染，而是采用原生自带的 UI 组件实现代替了核心的渲染引擎，仅保持必要的基本控件渲染能力，从而使得渲染过程更加简化，也保证了良好的渲染性能。

缺点也很明显，抛开框架本身需要处理大量平台相关的逻辑外，随着系统版本变化和 API 的变化，我们还需要处理不同平台的原生控件渲染能力差异，修复各类奇奇怪怪的 Bug。而频繁的通过Bridge与Native异步通信，性能消耗也很明显，在一些场景下会出现明显的卡顿，典型的如RN下的长列表滑动。

### 自绘引擎时代
这时期的代表 Flutter 则开辟了一种全新的思路，即从头到尾重写一套跨平台的 UI 框架，包括渲染逻辑，甚至是开发语言
- 渲染引擎依靠跨平台的 Skia(发音:sikiya)图形库来实现，Skia 引擎会将使用 Dart 构建的抽象的视图结构数据加工成 GPU 数据，交由 OpenGL 最终提供给 GPU 渲染，至此完成渲染闭环，因此可以在最大程度上保证一款应用在不同平台、不同设备上的体验一致性
- 开发语言选用的是同时支持 JIT（Just-in-Time，即时编译）和 AOT（Ahead-of-Time，预编译）的 Dart，不仅保证了开发效率，更提升了执行效率（比使用 JavaScript 开发的泛 Web 容器方案要高得多）。


## Flutter 设计原理
Flutter 和其他跨平台方案的本质区别：React Native 之类的框架，只是通过 JavaScript 虚拟机扩展调用系统组件，由 Android 和 iOS 系统进行组件的渲染；Flutter 则是自己完成了组件渲染的闭环。

Flutter 是怎么完成组件渲染的呢？Flutter合成视图数据，然后通过 Skia 交给 GPU 渲染。

### Skia

Skia 是一款用 C++ 开发的、性能彪悍的 2D 图像绘制引擎，其前身是一个向量绘图软件。2005 年被 Google 公司收购后，因为其出色的绘制表现被广泛应用在 Chrome 和 Android 等核心产品上。Skia 在图形转换、文字渲染、位图渲染方面都表现卓越，并提供了开发者友好的 API。因此，架构于 Skia 之上的 Flutter，也因此拥有了彻底的跨平台渲染能力。通过与 Skia 的深度定制及优化，Flutter 可以最大限度地抹平平台差异，提高渲染效率与性能。

### Flutter 架构图

Flutter 架构采用分层设计，从下到上分为三层，依次为：Embedder、Engine、Framework。

![](./image/0519455319.webp)

- Embedder 是操作系统适配层，实现了渲染 Surface 设置，线程设置，以及平台插件等平台相关特性的适配。从这里我们可以看到，Flutter 平台相关特性并不多，这就使得从框架层面保持跨端一致性的成本相对较低。
- Engine 层主要包含 Skia、Dart 和 Text，实现了 Flutter 的渲染引擎、文字排版、事件处理和 Dart 运行时等功能。Skia 和 Text 为上层接口提供了调用底层渲染和排版的能力，Dart 则为 Flutter 提供了运行时调用 Dart 和渲染引擎的能力。而 Engine 层的作用，则是将它们组合起来，从它们生成的数据中实现视图渲染。
- Framework 层则是一个用 Dart 实现的 UI SDK，包含了动画、图形绘制和手势识别等功能。为了在绘制控件等固定样式的图形时提供更直观、更方便的接口，Flutter 还基于这些基础能力，根据 Material（Google Android风格） 和 Cupertino（Apple IOS 风格） 两种视觉设计风格封装了一套 UI 组件库。我们在开发 Flutter 的时候，可以直接使用这些组件库。

## 参考
- [Flutter中文网](https://flutter.cn/docs/get-started/install/windows)
- [Dart中文网](https://dart.cn/guides)