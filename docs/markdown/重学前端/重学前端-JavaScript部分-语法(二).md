---
title: 重学前端-JavaScript部分-语法(二)
lastUpdated: 2019-07-10 06:00:00
---
# {{$frontmatter.title}}
JavaScript 遵循了一般编程语言的“语句 - 表达式”结构，多数编程语言都是这样设计的。本章我们学习下语句与表达式

## 语句
在 JavaScript 标准中，把语句分成了两种：声明和语句。可进行如下分类
![](./image/5655925735.png)
![](./image/5655925736.jpg)

下面介绍几种语句：
### 语句块
语句块就是一对大括号,且会产生作用域

### 空语句
空语句就是一个独立的分号，实际上没什么大用。
### with语句
with 语句是个非常巧妙的设计，但它把 JavaScript 的变量引用关系变得不可分析，所以一般都认为这种语句都属于糟粕
```
let o = {a:1, b:2}
with(o){
    console.log(a, b);
}
```
### try语句和throw语句
try 语句和 throw 语句用于处理异常。一般来说，throw 用于抛出异常，但是单纯从语言的角度，我们可以抛出任何值，但是不建议这样使用
```
try {
    throw new Error("error");
} catch(e) {
    console.log(e);
} finally {
    console.log("finally");
}
```
## 表达式语句
上面讲到了很多种语句类型，但是，其实最终产生执行效果的语句不多。事实上，真正能干活的就只有表达式语句，其它语句的作用都是产生各种结构，来控制表达式语句执行，或者改变表达式语句的意义。下面介绍下都有哪些表达式（语句）

### Primary Expression 主要表达式
Primary Expression。它是表达式的最小单位，它所涉及的语法结构也是优先级最高的，包含了各种直接量，如数字123，字符串hello world等。
同时，任何表达式加上圆括号，都被认为是 Primary Expression，这个机制使得圆括号成为改变运算优先顺序的手段
```
({});
(function(){});
(class{ });
[];
/abc/g;
this;
```
以上都可以理解为直接量
### Member Expression 成员表达式
Member Expression 通常是用于访问对象成员
```

a.b;
a["b"];
new.target; //用于判断函数是否是被 new 调用
super.b;    //构造函数中，用于访问父类的属性的语法
```
带函数的模板也被当做 Member Expression
```
fn`a${b}c` // 等同于 fn({0:['a','c'],1:b的值})
```
带参数列表的 new 运算也被当做 Member Expression（不带参数的不是）
```
new Cls();
```
### NewExpression NEW 表达式

Member Expression 加上 new 就是 New Expression，注意此处的New Expression没有参数列表
```
new Cls
new new Cls(1) //等同 new (new Cls(1))
```
### CallExpression 函数调用表达式
Member Expression 还能构成 Call Expression，基本形式就是Member Expression + 参数
```
a.b(c)(d)(e);
a.b(c)[3];
a.b(c).d;
a.b(c)`xyz`;
```
### LeftHandSideExpression 左值表达式
NewExpression 和 CallExpression 都属于LeftHandSideExpression。左值表达式就是可以放到等号左边的表达式
### AssignmentExpression 赋值表达式
赋值表达式很常见，同时他还有一些其他写法
```
a = b = c = d  // 向右结合 a = (b = (c = d))
a += b
```
### Expression表达式
在 JavaScript 中，表达式就是用逗号运算符连接的赋值表达式：
```
a=b,b=1,null;
```
在 JavaScript 中，比赋值运算优先级更低的就是逗号运算符了。我们可以把逗号可以理解为一种小型的分号

### 更新表达式 UpdateExpression
左值表达式搭配 ++ -- 运算符，可以形成更新表达式。他会改变左值表达式的值

```
-- a;
++ a;
a --
a ++
```
### 一元运算表达式 UnaryExpression
更新表达式搭配了一个一元运算符可以形成一元运算表达式
```
delete a.b;
void a;
typeof a;
- a;
~ a;
! a;
await a;
```
### 乘方表达式 ExponentiationExpression
乘方表达式也是由更新表达式构成的。它使用**号
```
++i ** 30
2 ** 30 //正确
-2 ** 30 //报错 -(2 ** 30) 就可以了
``` 
### 乘法表达式 MultiplicativeExpression
这里面包含：乘法，除法，求余
```
x * 2
x / 2
x % 2
```
### 加法表达式 AdditiveExpression
这里面包含：加法，减法
```
x + 1
x - 1
```
### 移位表达式 ShiftExpression
移位是一种位运算，包含：向左移动（`<<`）,向右移动（`>>`），无符号向右移动（`>>>`）

PS：在 JavaScript 中，二进制操作整数并不能提高性能，移位运算这里也仅仅作为一种数学运算存在。
### 关系表达式 RelationalExpression
关系运算包含
```
<=   //小于等于
>=   //大于等于
<    //小于
>    // 大于
instanceof // 检测目标是否为指定实例
in // 检测属性是否存在目标及其原型链上
```
并且，此处的`<=`与`>=`针对的完全是数字类型，不等价于`<`或`==`
```
null <= undefined  // false
null == undefined  // true
```
### 相等表达式 EqualityExpression
相等表达式由四种运算符和关系表达式构成，四种运算符包含
```
==
!=
===
!==
```
关于`==`运算符，有许多不太符合直觉的地方，我们可以牢记以下三条规则

- undefined 与 null 相等；
- 字符串和 bool 都转为数字再比较
- 对象转换成 primitive 类型再比较

### 位运算表达式
位运算包含三种：按位与（`&`）、按位或（`|`）、按位异或（`^`）
### 逻辑与/或表达式
逻辑运算包含两种：逻辑与（`&&`）和逻辑或（`||`）
逻辑表达式具有短路特性
### 条件表达式 ConditionalExpression
条件运算符又称三目运算符
```
x ? a : b
```