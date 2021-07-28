---
title: 你不知道的JS系列-4
date: 2021-02-19 17:15:03
tags: [你不知道的js]
categories: JavaScript
---

## 前言

本篇开始，记录在阅读《你不知道的JavaScript-中卷》中遇到的自己遗漏的知识点，阅读章节为第一部分：类型和语法
<!-- more -->

## 类型与值
> 更多内容可参考[重学前端 - JavaScript部分-数据类型](/%E9%87%8D%E5%AD%A6%E5%89%8D%E7%AB%AF3-JavaScript%E9%83%A8%E5%88%86-%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B/)

JavaScript 中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。所以在对变量执行 typeof 操作时，得到的结果并不是该变量的类型，而是该变量持有的值的类型。

JS的七种类型已经提及无数遍了：null、 undefined 、boolean 、string 、number 、object 和 symbol; 除了object外，其他都被称为基本类型。

基本类型的值只能通过复制来赋值，而Object只能通过引用进行复制，与指针不同，无论多少个引用，最终指向的都是同一个值（函数的参数传递也遵循该规则）。

下面补充几种常见类型中的知识点：

### 数组

- 使用 delete 运算符可以将单元从数组中删除，但是单元删除后，数组的 length 属性并不会发生变化
- 类数组转换（如NodeList, arguments）常用方法：
      Array.prototype.slice.call( document.querySelectorAll(".goods-info") )
      Array.from( arguments )

### 字符串
- 字符串经常被当作"字符数组"，因为字符串的很多方法都与字符串数组类似，但二者不一样：字符串不可修改，数组值可修改
- 字符串可以调用数组的多数方法，除了`reverse`（字符串值不可变）
      Array.prototype.map.call("abc", function(v){
        return v.toUpperCase() + ".";
        }).join(""); //A.B.C

### 数字
- JavaScript 没有真正意义上的整数: `42.0 === 42`
- `toPrecision` 方法用来指定有效数位的显示位数：
        (42.59).toPrecision(5) //"42.590"
        (42.59).toPrecision(3) //"42.6"
- `42..tofixed(3)` 与 `42 .tofixed(3)` 可以被引擎正常解析，但不推荐使用
- 数字类型有几个特殊值：`NaN`、`+Infinity`、`-Infinity` 和 `-0`。NaN 是一个特殊值，它和自身也不相等, 表示值是“不是数字的数字”，是数字类型运算过程中产生的错误值。`window.isNaN` 的检测有bug: `window.isNaN('foo')===true`, 推荐使用ES6的 `Number.isNaN`
- JavaScript存在 `0` 与 `-0`, 且 `-0===0`，判断方法见下方isNegZero方法；符号用来表示其他信息（如移动方向），所以存在是有必要的
- [ES6 提供了二进制和八进制数值的新的写法](/ES6系列-2-新增类型与扩展方法/)
- 几个polyfill写法：
      /*
       @desc 判断两个小数是否相等
      */
     
      if (!Number.EPSILON) {  // Number.EPSILON为指定误差，ES6 下无需添加 
        Number.EPSILON = Math.pow(2,-52);
      }
      function numbersCloseEnoughToEqual(n1,n2) {
        return Math.abs( n1 - n2 ) < Number.EPSILON;
      }
      console.log(numbersCloseEnoughToEqual( 0.1+0.2, 0.3 )); // true
      console.log(numbersCloseEnoughToEqual( 0.0000001, 0.0000002 )); // false
      
      /*
       @desc 判断是否为-0
      */
      function isNegZero(n) {
        n = Number( n );
        return (n === 0) && (1 / n === -Infinity);
      }
      /*
       @desc  Number.isInteger ES6之前的polyfill
      */
      if (!Number.isInteger) {
        Number.isInteger = function(num) {
          return typeof num == "number" && num % 1 == 0;
        };
      }

      /*
       @desc  Number.isSafeInteger ES6之前的polyfill
      */
      if (!Number.isSafeInteger) {
        Number.isSafeInteger = function(num) {
          return Number.isInteger( num ) &&
            Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
        }; 
      }

      /*
       @desc  Number.isNaN ES6之前的polyfill
      */
      if (!Number.isNaN) {
        Number.isNaN = function(n) {
          return (
            typeof n === "number" &&
            window.isNaN( n )
          ); 
       };
      }

      /*
       @desc  Object.is ES6之前的polyfill
      */
      if (!Object.is) {
        Object.is = function(v1, v2) {
          // 判断是否是-0
          if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
          }
          // 判断是否是NaN
          if (v1 !== v1) {
            return v2 !== v2;
          }
          // 其他情况
          return v1 === v2;
        };
      }
  
## 原生函数

下面介绍下与数据类型相关的十个内建函数, 之前也已经介绍过，每一种基本类型在对象中都有对应的内置函数，且在操作过程中，引擎会自动进行装箱/拆箱转换

### String / Number / Boolean
对于字符串/数字/布尔类型的数据，多数情况下都是使用字面量进行操作的（性能更优），基本很少使用对应的内置函数进行创建：

    var a = new String( "abc" );
    var b = new Number( 42 );
    var c = new Boolean( true );

    // 通过new关键字创建的是字符串的封装对象，而非基本类型值
    a.valueOf(); // "abc"
    b.valueOf(); // 42
    c.valueOf(); // true 

不推荐使用构造函数来创建基本数据类型，会产生很多副作用

### Array
构造函数 `Array()` 不要求必须带 `new` 关键字 `new Array(3)` 与 `Array(3)`是等效的, 返回的都是一个数组；不过构造函数调用时返回的稀疏数组（将包含至少一个“空单元”的数组称为“稀疏数组”）令人有些困惑：

      Array(3)  //[empty × 3]

不同浏览器展示的结果有些不同，上面结果为chrome 88 版本下的结果，接下来对这个稀疏数组进行方法调用：
     
     Array(3).map((item)=>{console.log(item)}) // 不执行
     Array(3).join("-")  // "--"

map方法对于只有空单元的数据不执行，而join方法却可以。我们可以通过下述方式来创建包含 undefined 单元（而非“空单元”）的数组来避免上述问题的发生：

    Array.apply(null,{length:3}) // [undefined, undefined, undefined]

### Object / Function / RegExp
除了RegExp外，Object 与 Function这两个构造函数很少用到，不是必须也不建议使用。

PS: 在chrome 88下测试，`new` 关键字可以省略，且JavaScript 有一处奇特的语法，即构造函数没有参数时可以不用带`()`调用

      Function() instanceof Function       // true
      new Function() instanceof Function   // true

      Object() instanceof Object           // true
      new Object() instanceof Object       // true

      new RegExp instanceof RegExp          // true
      RegExp() instanceof RegExp           // true


### Date / Error

Date 与 Error是经常用到的两个内置函数

      (new Date()).getTime()     // 获取当前时间戳
      throw new Error("error")  // 抛出错误

在chrome 88下测试，`Error('error')` 等同于 `new Error('error')`, 但是Date 加new与不加new调用时，结果不一致：

     var d=Date();           // "Mon Feb 22 2021 17:05:10 GMT+0800 (中国标准时间)"
     d instanceof Date;      // false
     typeof d;               // string

     var _d=new Date();      // Mon Feb 22 2021 17:06:50 GMT+0800 (中国标准时间)
     _d instanceof Date      // true

所以，如果就是需要进行构造函数调用，建议加上`new`关键字，以免产生意想不到的结果，同时也便于理解。
### Symbol
作为ES6新进成员，此处不再赘述，Symbol函数只能直接调用，无法通过构造函数调用：

`new Symbol('')` 会直接报错：`Uncaught TypeError: Symbol is not a constructor`

很显然，Symbol并非构造函数~

PS: 此处插一个知识点：ES6 允许Symbol到String的显式强制类型转换，隐式强制转换会报错：

      var s1 = Symbol( "cool" );
      String( s1 );  // "Symbol(cool)"
      s1 + '';       // Uncaught TypeError: Cannot convert a Symbol value to a string
       
## 类型转换

作为动态语言，JavaScript 中所有的类型转换可称之为：强制类型转换，同时分为显式与隐式；转换规则可参考[重学前端-JavaScript部分](/重学前端-JavaScript部分-数据类型/#类型转换)，里面介绍的比较详细，下面部分为补充部分
### 类型转换规则
#### ToString && ToNumber

从 ES5 开始，使用 Object.create(null) 创建的对象 [[Prototype]] 属性为 null，并且没有 valueOf() 和 toString() 方法，因此无法进行强制类型转换

      String(Object.create(null)) // Cannot convert object to primitive value
      Number(Object.create(null)) // Cannot convert object to primitive value

补充：**JSON 字符串化**

执行`JSON.stringify(...)`即可得到JSON字符串化的结果，那内部的实现逻辑又是怎样？

类似其他类型转化为字符串时调用内部的`toString`方法，JSON转化为字符串时调用内部的`toJSON`方法，不同的是：得到结果后还会再进行一步字符串化操作：

      var o={
        a:1,
        toJSON: function(){
          return {
            b:this.a *10
          }
        }
      }
      JSON.stringify(o) // "{"b":10}"

`toJSON()` 需要“返回一个能够被字符串化的安全的 JSON 值”。

**JSON.stringify(value[, replacer [, space]])**

- replacer: 可选参数，它可以是数组或者函数
        var a={
          b: 42,
          c: "42",
          d: [1,2,3]
        }
        /*replacer为数组时，只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中*/
        JSON.stringify(a, ["b","c"]) // "{"b":42,"c":"42"}"
        
        /* replacer为函数时，在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理
        在开始时, replacer 函数会被传入一个空字符串作为 key 值，代表着要被 stringify 的这个对象。随后每个对象或数组上的属性会被依次传入
        */
        JSON.stringify(a, function(k,v){
          if(k!=='d') return v
        })
        // "{"b":42,"c":"42"}"
- space:可选参数，指定缩进用的空白字符串，用于美化输出

总结：整个转换过程遵循如下原则：

- 字符串、数字、布尔值和 null 的 JSON.stringify(..) 规则与 ToString 基本相同。
- 如果传递给 JSON.stringify(..) 的对象中定义了 toJSON() 方法，那么该方法会在字符
串化前调用，以便将对象转换为安全的 JSON 值。

#### ToBoolean

以下为可以显式转换为false的值：

- undefined
- null
- false
- +0、-0 和 NaN
- ""

JavaScript 代码中会出现假值对象，如document.all：它是一个类数组对象，包含了页面上的所有元素。但现在在多数浏览器上强制转换结果却是false:

      Boolean(document.all)  // false

这个是浏览器厂商因为一些其他因素强制改写的结果，注意避免掉坑。
### 显式强制类型转换

String(..) , Number(..) , Boolean(..), .toString(..)方法都可以实现类型强制转换。除此以外还有一些其他情况：

#### 日期转换为数字

          +new Date() === +new Date;
          +new Date() === Date.now();
          +new Date() === new Date().getTime();

#### 位运算符(~)


按位非（NOT）运算符~经常出现，它可以用在以下两种情况下：**判断x的值是否大于-1** 和 **截除掉数字值的小数部分**

可以记住以下等式：`~x = -(x+1)`，多数情况下都是适用的。在查找索引过程中可以这样改写：

      var msg="Hello World"
      if(!~msg.indexOf("success")){
        // 只有msg.indexOf("success")==-1的情况下才执行
        console.log("error")
      }

PS: 由 -(x+1) 推断 ~-1 的结果应该是 -0，然而实际上结果是 0，因为它是字位操作而非数学运算。

两个波浪线时可用作截除数字值的小数部分：

      ~~-49.6; // -49
      
#### 数字字符串的解析

- 解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止
- 转换不允许出现非数字字符，否则会失败并返回 NaN

      parseInt( "40px" ); // 42 直解析数字字符串，其他类型会先强制转换成字符串
      Number( "40px" ); // NaN

PS: parseInt在ES5之前存在bug，会根据字符串的第一个字符来决定转换基数，避免这个问题需要强制：`parseInt(xxx,10)`
### 隐式强制类型转换
觉得不够明显的强制类型转换都可以归到隐式强制类型转换下，隐式转换虽然被人诟病，但它可以减少冗余，让代码更简洁

#### 字符串 <=> 数字 （+/-）

我们都知道 `+` 运算符即能用于数字加法，也能用于字符串拼接，依照的规则可以概括为：

**如果 + 的其中一个操作数是字符串（或通过ToPrimitive操作能转换成字符串），则执行字符串拼接；否则执行数字加法**

看个例子：

     [1,3] + [5]  // "1,35"

数组valueOf操作无法得到基本数据类型，使用toString方法两个数据就转换成对应了字符串

同时需要注意的是：`a + ""` 会对 a 调用 valueOf 方法，而`String(a)` 则是直接调用 ToString操作

`- `运算符是数字减法，因此 a - 0 会将 a 强制类型转换为数字，再看一个例子：

      [3] - [1]; // 2

数组先转换成字符串，然后再转换成Number进行运算
#### 其他类型 => 布尔值

以下情况数据会被强制转换为布尔值：

- if (..) 语句中的条件判断表达式。
- for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
- while (..) 和 do..while(..) 循环中的条件判断表达式。
- ? : 中的条件判断表达式。
- 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）。

逻辑运算符 `||` 和 `&&`, 返回值是两个操作数中的一个（且仅一个）；这与Java,php等语言返回布尔值不同，在 JavaScript（以及 Python 和 Ruby）返回的是某个操作数的值，所以更准确的称呼应该是“选择器运算符”或者“操作数选择器运算符”

### == 与 ===
宽松相等（==）与严格相等（===）里面的坑是最多的，也是让人吐槽最多的地方，主要集中在宽松相等的判定规则有时候让人琢磨不透。二者的区别可以这么理解：**== 允许在相等比较中进行强制类型转换，而 === 不允许**

#### 字符串与数字之间的相等比较

- 如果 Type(x) 是数字，Type(y) 是字符串，则返回 x == ToNumber(y) 的结果。
- 如果 Type(x) 是字符串，Type(y) 是数字，则返回 ToNumber(x) == y 的结果。


      0 == ""  // true
      "42" == 42  // true
      
也就是说：**在==中，如果两边分别为Number 与 String类型，就将String类型转化为Number类型再比较**
#### 其他类型与布尔值之间的相等比较
- 如果 Type(x) 是布尔类型，则返回 ToNumber(x) == y 的结果；
- 如果 Type(y) 是布尔类型，则返回 x == ToNumber(y) 的结果。


     false == 0    // true
     "42" == true // false  true先转化为1，再依据上面规则“42”会转化为数字42，故不相等

也就是说：**在==中，如果两边分别为Boolean 与其他类型，就将Boolean类型转化为Number类型再比较**

#### null 与 undefined之间的比较

- 如果 x 为 null，y 为 undefined，则结果为 true。
- 如果 x 为 undefined，y 为 null，则结果为 true

也就是说：**在 == 中 null 和 undefined 相等（它们也与其自身相等），除此之外其他值都不存在这种情况**

#### 对象与非对象之间的相等比较
> 下面转化规则只提到了字符串和数字，没有布尔值，因为布尔值会先被转化为数字

- 如果 Type(x) 是字符串或数字，Type(y) 是对象，则返回 x == ToPrimitive(y) 的结果
- 如果 Type(x) 是对象，Type(y) 是字符串或数字，则返回 ToPromitive(x) == y 的结果


    0==[]                           // true
    Object('abc') == "abc"          // true
    Object(undefined) == undefined  // false
    Object(null) == null            // false

也就是说：**在 == 中 对象会通过ToPromitive进行转换为基本类型，再进行后续比较**
#### 其他少见情况
先看如下代码：

      "0" == false;     // true
      false == 0;       // true
      false == "";      // true
      false == [];      // true  []转化为""  false 转化为 0 即0 == ""
      "" == 0;          // true  ""转化为数字0
      "" == [];         // true
      0 == [];          // true
      "" == 0;          // true
      "" == [];         // true
      0 == [];          // true

      [] == ![];         // true  ![]转化为false  即 [] == false
      [] == [];          // false  两个都是引用类型，直接比较引用对象

      0 == "\n"          // true  Number("\n")==0

其实，只要按上面的规则进行对照，都能迎刃而解，不过为了避免出错，可以遵循以下两个原则：

- 如果两边的值中有 true 或者 false，千万不要使用 ==
- 如果两边的值中有 []、"" 或者 0，尽量不要使用 ==

这样可以最大程度的避免强制类型转换的坑。
## 语法

### 语句和表达式
>更多详细内容可访问：[github笔记-js中表达式和语句](https://github.com/wangminghuan/MyNotes/blob/master/JavaScript/js%E4%B8%AD%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%92%8C%E8%AF%AD%E5%8F%A5.md)

- 语句都有一个结果值, chrome下的开发控制台（JavaScript REPL——read/evaluate/print/loop）显示的就是语句的结果值。

- 代码块的结果值就是最后一个语句的结果值

### 逗号运算符

逗号操作符可以在一条语句中执行多个操作，常用于声明多个变量；

    var num1=1, num2=2, num3=3; 

除此之外，逗号操作符还可以用于赋值。在用于赋值时，逗号操作符总会返回表达式中的最后一项：

    var num = (5, 1, 4, 8, 0); // num 的值为 0 

可以使用逗号运算符将多个表达式串联为一个语句：

    var a = 42;
    var a1 = 42;
    var a2 = 42;
    var b = (a++, a)  // 执行a, 再执行+1操作, 最终返回a的值
    var c = a1++,a1   // 把a1赋值给c, 再执行+1操作, 然后又声明了一次a1
    var d = (a2++)   // 括号无法提升+1的执行顺序，等同于 var d = a2++
    
    a // 43
    a1 // 43
    a2 // 43
    b // 43  
    c // 42
    d // 42

### 上下文规则
js中同样的语法上下文不同，则会导致不同的结果：
#### 大括号{}

我们看一个例子：

      var a = {
        foo : bar()  //假设bar已经定义过
      }
去掉 var声明后，代码扔不会报错：

    {
      foo : bar()
    }
不过，此时上面的代码已经不是一个对象了，它是一个代码块，且foo 是语句 bar() 的标签，关于“标签语句”我们此处不再展开。那如果我们尝试这样改写，那么就会报错了：

    {
      "foo":bar()
    }
因为标签不允许使用双引号，所以 "foo" 并不是一个合法的标签。同样的我们需要注意：**JSON 的确是 JavaScript 语法的一个子集，但是 JSON 本身并不是合法的 JavaScript 语法**
#### 代码块

我们看下如下代码：

    [] + {}   // "[object Object]"
    {} + []   // 0
   
    

原因如下：{} 出现在 + 运算符表达式中，会被当作一个值（空对象）来处理，而[] 强制类型转换后为 ""，因此会得到{} 执行`toString`后的结果；{} 先出现时，会被解析为空代码块，而代码块后面的分号可以省略，`+[]` 就被强制转换为0

#### 对象解构
{ .. } 也可用于“解构赋值”

      var obj={
        a:1,
        b:2
      }
      var {a,b}=obj
      console.log(a,b)  // 1,2

      function add({a,b}){
        return a+b
      }
      console.log(add(obj)) // 3
#### 不存在的else if语法
事实上 JavaScript 没有 else if, 只存在 if else

    if(a==1){
      console.log("if")
    }else if(a==2){
      console.log("else")
    }
   
等同于：

    if(a==1){
      console.log("if)
    }else {
        if(a==2){
            console.log("else)
        }
    }

### 自动分号

JavaScript 有时会自动为代码行补上缺失的分号，即自动分号插入（Automatic Semicolon Insertion，ASI），且ASI 只在换行符处起作用，而不会在代码行的中间插入分号。

以下情况会执行ASI:

-  表达式语句: `var a = 42, b`
-  do..while 循环后面
-  break、continue、return 和 yield（ES6）等关键字后

ASI本质上更像一种“纠错机制”，所以能加分号的地方还是建议都手动加上。

### 其他

- 函数传递参数时，arguments 数组中的对应单元会和命名参数建立关联；否则不传参时不会建立关联
- switch判断时，执行的判断规则等同"==="操作
- try..catch..finally中，finally的返回值会“覆盖”try 和 catch 中 return 的返回值。
- 除了js外，HTML 页面中的内容也会产生全局变量，如：`<div id="foo"></div>` 就会创建一个全局foo变量，其值为该dom节点
- 对原生对象添加扩展功能时，注意向上兼容
- 内联代码中不可以出现 `</script`> 字符串，一旦出现即被视为代码块结束：

        <script>
          var code = "<script>alert('Hello World')</scr" + "ipt>";  // 规避报错
        </script>

## 参考
- [ECMAScript 位运算符](https://www.w3school.com.cn/js/pro_js_operators_bitwise.asp)
