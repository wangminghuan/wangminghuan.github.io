---
title: 重学前端 - CSS部分-颜色的绘制
date: 2019-05-25 16:00:00
tags: [css]
categories: 重学前端
---
## 概述
最常见的颜色相关的属性就是 color 和 backgroud-color。css中颜色表示有一下几种方式：

|  属性  | 版本  |  继承性  | 简介  |  
|  ----  | ----  | ----  | ----  |
| HEX	   | CSS1  | 	无	 | CSS颜色值十六进制(HEX)表示,语法如：#rrggbb或#rgb  | 
| RGB	| CSS2| 	无	| CSS2 颜色 RGB表示方式 |
| RGBA| 	CSS3| 	无| 	CSS3 颜色值RGBA表示方式 | 
| HSL	| CSS3	| 无| 	CSS3 颜色值HSL表示方式 | 
| HSLA	| CSS3| 	无	| CSS3 颜色值HSLA表示方式 | 
| Transparent	| CSS3	| 无 |	CSS3 颜色值透明(Transparent)表示方式(RGBA) | 



## RGB 颜色
我们在计算机中，最常见的颜色表示法是 RGB 颜色，它符合光谱三原色理论：红、绿、蓝三种颜色的光可以构成所有的颜色。 0 - 255 的数字表示每一种颜色，这正好占据了一个字节，每一个颜色就占据三个字节。 

红绿蓝三种颜色的光混合起来就是白光，没有光就是黑暗，所以在 RGB 表示法中，三色数值最大表示白色，三色数值为 0 表示黑色。  

## CMYK 颜色
颜料显示颜色的原理是它吸收了所有别的颜色的光，只反射一种颜色，所以颜料三原色其实是红、绿、蓝的补色，也就是：品红、黄、青。

在印刷行业，使用的就是这样的三原色（品红、黄、青）来调配油墨，这种颜色的表示法叫做 CMYK，它用一个四元组来表示颜色。

为什么它比三原色多了一种？在印刷行业中，黑色颜料价格最低，而品红、黄、青颜料价格较贵，如果要用三原色调配黑色，经济上是不划算的，所以印刷时会单独指定黑色。

对 CMYK 颜色表示法来说，同一种颜色会有多种表示方案，但是我们参考印刷行业的习惯，会尽量优先使用黑色。

## HSL 颜色
HSL颜色模型用一个值来表示人类认知中的颜色，专业的术语叫做色相（H）。加上颜色的纯度（S）和明度（L），就构成了一种颜色的表示。它是一种语义化的颜色。当我们对一张图片改变色相时，人们感知到的是“图片的颜色变了”。相比RGB颜色。

## RGBA
RGBA 是代表 Red（红色）、Green（绿色）、Blue（蓝色）和 Alpha 的色彩空间。RGBA 颜色被用来表示带透明度的颜色，实际上，Alpha 通道类似一种颜色值的保留字。在 CSS 中，Alpha 通道被用于透明度，所以我们的颜色表示被称作 RGBA，而不是 RGBO（Opacity）。

为了方便使用，CSS 还规定了名称型的颜色，它内置了大量（140 种）的颜色名称。不过这里我要挑出两个颜色来讲一讲：金（gold）和银（silver）。

如果你使用过这两个颜色，你会发现，金（gold）和银（silver）的视觉表现跟我们想象中的金色和银色相差甚远。与其被叫做金色和银色，它们看起来更像是难看的暗黄色和浅灰色。

为什么会这样呢？在人类天然的色彩认知中，实际上混杂了很多其它因素，金色和银色不仅仅是一种颜色，它还意味着一定的镜面反光程度，在同样的光照条件下，金属会呈现出更亮的色彩，这并非是用一个色值可以描述的，这就引出了接下来要讲的渐变。

## 渐变
在 CSS 中，background-image这样的属性，可以设为渐变。CSS 中支持两种渐变，一种是线性渐变，一种是放射性渐变：

### 线性渐变

    linear-gradient(direction, color-stop1, color-stop2, ...);

direction 可以是方向，也可以是具体的角度：

    to bottom
    to top
    to left
    to right
    to bottom left
    to bottom right
    to top left
    to top right
    120deg
    3.14rad

color-stop 是一个颜色和一个区段：

    rgba(255,0,0,0)
    orange
    yellow 10%
    green 20%
    lime 28px
### 放射性渐变
    radial-gradient(shape size at position, start-color, ..., last-color);

## 形状

CSS 中的很多属性还会产生形状，比如我们常见的属性：

    border
    box-shadow
    border-radius

这些产生形状的属性非常有趣，我们也能看到很多利用它们来产生的 CSS 黑魔法。winter建议把它们用于基本的用途，把 border 用于边框、把阴影用于阴影，把圆角用于圆角，所有其它的场景，都有一个更好的替代品：datauri+svg。

## 补充 svg 作为 dataURI
举个例子：

    <style>
    .bg {
      background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='10' /></svg>")  no-repeat;
      background-size: 100% 100%;
      height: 50px;
      width: 50px;
     }
    .img{
        height: 50px;
        width: 50px;
        display: block;
      }
      </style>

      <img class="img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMCcgaGVpZ2h0PSczMCc+PGNpcmNsZSBjeD0nMTUnIGN5PScxNScgcj0nMTAnIC8+PC9zdmc+">
      <div class="bg"></div>

最终个效果：

![](./image/2446165962.png)

## 参考文章

1. [【译】在 dataURI 中使用 SVG 的最佳方法](https://youhaosuda.com/blog/43)
2. [关于SVG](https://segmentfault.com/a/1190000013237541)