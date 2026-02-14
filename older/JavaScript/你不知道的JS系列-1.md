---
title: 你不知道的JS系列-1
date: 2021-01-14 18:18:54
tags: [你不知道的js]
categories: JavaScript
---

## 前言

本篇主要为阅读《你不知道的JavaScript-上卷》中遇到自己遗漏的知识点，加上一些自己的理解进行了梳理整理，阅读章节为第一部分：作用域和闭包


## 编译原理

通常会将 JavaScript 归类为“动态”或“解释执行”语言，但事实上它是一门编译语言，但它并非同C++等语言是进行提前编译的（词法分析:拆词->语法分析:AST抽象语法树->代码生成：AST转为可执行代码），它的编译过程是在JS引擎中完成的（代码执行前进行编译）：

- 引擎从头到尾参与js的编译与执行过程
- 编译器（js中也可以称为解释器）则是引擎的好朋友，负责语法解析与代码生成等工作
- 作用域也是引擎的好朋友，通过一套严格规则来确定当前执行代码对这些标识符的访问权限

PS: 解释器将代码编译为中间码，中间码最终由引擎编译为机器码执行
## 词法作用域

同多数编程语言一样，JS的作用域为词法作用域（也成为静态作用域），也就是作用域是根据你编写代码时变量与块作用域写在哪里决定的，而非运行时决定。

请看下面例子：

		var val=1;
		function foo(){
		  console.log(val)
		}
		function bar(){
		 var val=2;
		  foo()
		}
		bar() ;//运行结果为：1

这是因为函数foo在函数bar中调用，但其作用域在定义时已经确定，即只能访问到foo函数内部跟全局作用域。

JavaScript 中有两种机制可以“欺骗词法作用域”：

###  eval 

看下面的例子:

		var a=1;
		function foo(str,b){
		eval(str);
		console.log(a,b)
		}
		var str="var a=2";
		foo(str,4) // 运行结果为：2,4  

在执行eval之后，引擎并不知道eval是以动态的方式进入的，并对词法环境进行修改。所以这个时候词法作用域就会被破坏。

严格模式的程序中，eval 在运行时有其自己的词法作用域

### with

with通常被当作重复引用一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身。  
with将对象的属性当作作用域中的标识符来处理，从而创建了一个新的词法作用域（运行阶段）。

	function foo(obj){  
	    with(obj){  
	        a = 2;  
	    }  
	}  
	var o1 = { a : 3 };  
	var o2 = { b : 3 };  
	  
	foo(o1);  
	console.log( o1.a );    // 2
	  
	foo(o2);  
	console.log( o2.b );    // 3
	console.log( a );       // 2，表明a泄漏到全局作用域上了！

with在严格模式下已经无法使用。最重要的时，由于eval 和 with 会绕开js引擎在编译阶段进行的性能优化，导致运行变慢；这些在js语言精粹中也有提及，都是js设计中的“糟粕”，不要再使用了。

## 报错

- ReferenceError：作用域中遍寻不到所需的变量，引擎就会抛出该异常；
- TypeError：作用域判别成功了，但是对结果的操作是非法或不合理的；

## 函数作用域

JS的词法作用域是基于函数的，在ES6语法中的块级作用域出现之前，我们创建作用域通常都是基于函数的，也经常看到如下代码：

    (function(){
      var a=1;
      console.log(a)
    })();
    console.log(a); //ReferenceError 引用报错

### IIFE

上述函数被称为立即执行函数表达式，也称为IIFE（Immediately Invoked Function Expression），它还有其他写法：

    (function(){
      var a=1;
      console.log(a)
    }());

两种写法是一致的，不过第一种经常出现在一些第三方库中，将全局对象的引用作为函数参数传递进去：

      var a=2;
      (function ( global ) {
      var a = 3;
      console.log( a ); // 3
      console.log( global.a ); // 2
      })( window );

这种写法使得函数对全局对象的引用更清晰直观。

IIFE 还有一种变化的用途是倒置代码的运行顺序， 将需要运行的函数放在第二位， 在 IIFE执行之后当作参数传递进去。 这种模式在[UMD项目](/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E8%BF%9B%E5%8C%96%E5%8F%B2/#UMD)中被广泛使用。 

### 补充：立即执行函数的原理
> 更多可参考《Javascript高级程序设计》第七章：函数表达式

对于函数表达式：

      var foo = function(){
        console.log("foo")
      }

进行调用：

      foo(); 

也可以合并为：

      var foo = function(){
        console.log("foo")
      }();

我们来进一步简化：

    function foo(){
        console.log("foo")
      }();

上面代码会直接报错，因为解析器遇到 `function` 关键字时会把后面的内容解析为函数声明，函数声明语句后面加上一对圆括号，只是函数声明语句与分组操作符的组合而已。由于分组操作符不能为空，所以报错；括号内传入一个表达式则不会再报错，但等同于：

      function foo(){
        console.log("foo")
      };
     (1); // 只是一个函数声明 + 一个表达式

所以，如何让解析器将代码直接解析成表达式，而非函数声明才是关键，因为javascript中的圆括号不能包含语句，都会被解析为表达式，所以：

     (function foo(){
        console.log("foo")
      }())

函数名称多数情况下基本无用，可以省略，这样就变成了我们经常看到的形式：
     (function(){
        console.log("foo")
      }())
当然，我们可以直接左侧部分强制解析为函数表达式，然后加上括号直接调用，就变成了另外一种常见方式：

     (function(){
        console.log("foo")
      })()

当然，除了圆括号，其他运算符也能达到目的（强制引擎解析为函数表达式）：

    !function(){ /* code */ }();
    ~function(){ /* code */ }();
    -function(){ /* code */ }();
    +function(){ /* code */ }();
    true && function(){ /* code */ }();

但以上写法多多少少都存在一些副作用(如：修改函数返回值)，更推荐的写法依旧是圆括号。
## 块级作用域
块作用域是一个用来对之前的最小授权原则进行扩展的工具， 将代码从在函数中隐藏信息扩展为在块中隐藏信息。  
在ES6之前，JS是不不支持块级作用域的，但深入研究后，其实是有其他替代方案的。

### with
with会创建一个块级作用域，但他会引发其他问题，因为不再推荐使用

### try/catch

没错，try/catch的catch分句会创建一个块级作用域：

    try {
      throw 1;
    } catch (a) {
      a = 2;
      console.log( a );
    }
    console.log(a) ; //ReferenceError: a is not defined

但是try/catch在chrome中有性能问题（虽然从语法上看不应该运行缓慢）

### let && const

let 关键字可以将变量绑定到所在的任意作用域中。 换句话说， let为其声明的变量隐式地了所在的块作用域。

    var foo = true;
    if (foo) {
      let bar = foo * 2;
      console.log( bar );
    }
    console.log( bar ); // ReferenceError

const 与 let基本等同，只是其定义的值无法修改。

函数作用域和块作用域的行为是一样的，可以总结为：任何声明在某个作用域内的变量，都将附属于这个作用域

## 声明提升

先看两个例子：

    console.log(a)
    var a=1;

对，没有报错，运行结果是 undefined
    
    a = 2;
    var a;
    console.log(a);
大多数会认为a又被赋值了，所以输出应该是undefined, 但输出结果是2。

所以，到底发生了什么，先有鸡（赋值）还是先有蛋（声明）？

上面讲到过引擎会对代码先进行编译，编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来。

譬如：var a=1; 引擎会将它分成两个部分，var a 和 a=1; 第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在原地等待执行阶段，也就是说，所有的声明（变量与函数）都会在编译阶段先被处理。


    foo();
    function foo() { 
      console.log( a ); // undefined
      var a = 2;
    }

上面的代码中函数foo 会被提升到当前作用域中，foo中的变量a也被提升到了函数作用域内的顶部，值得注意的是，函数表达式(包括具名函数)的作用域并不会提升。

      foo(); // TypeError 
      bar(); // ReferenceError
      var foo = function bar() { 
        // ... 
      }
如果多处“重复声明”，函数声明的优先级最高，其次才是变量。

      foo(); // 1
      var foo;
      function foo() { 
        console.log( 1 ); 
      }
      foo = function() { 
        console.log( 2 );
      };
      foo();//2  

后面出现的函数声明可以覆盖前面的，也可以这样理解，foo执行时，引擎其实已经把`function foo{...}` 提升到最顶部，后面再次调用foo时，后面的函数表达式覆盖了函数声明，此时变输出2

不过我们要尽量避免重复声明，会引发意想不到的问题！


## 闭包

闭包，总是笼罩着一层神秘色彩，关于这块内容其实理解的一直不够透彻。其实自己在日常书写中有意无意都会创建闭包，只是，我们不知道"它"叫闭包而已。

### 概念

当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包；通俗理解的闭包就是：能够读取其他函数内部变量的函数。对，闭包的直观判断就是函数。

      function foo() {
        var a = 2;
        function bar() { 
          console.log( a ); 
        }
        return bar; 
      }
      var baz = foo(); 
      baz(); // 2 在函数外部访问到了其他函数内部的变量

当然，也可以使用其他方式对函数的值进行传递:

    var fn;
    function foo(){
      var a=1;
      fn=function(){
        console.log(a)
      }
    }
    function bar(){
      fn(); // 快看，这就是闭包
    }
    foo();  // 必须先执行，才能形成之传递
    bar(); // 1
### 创建

上述都是人为刻意的创建闭包，回归到我们日常开发中，只要使用了回调函数，其实就是在使用闭包！！！

譬如经常看到的多个li标签点击展示索引值的问题：

    const list=document.querySelectorAll("li");
    for(var i=0;i<list.length;i++){
        list[i].addEventListener("click",function(){
          alert(i)
        })
    }
但是，如果按上述代码执行，无论怎么点击，alert的结果永远是一样的（list.length-1）

这是因为每次循环执行的代码都被封闭在一个共享的作用域中，此时，我们需要创建一个闭包作用域，使得每次循环都是独立的作用域，将上述代码进行改写：

    const list=document.querySelectorAll("li");
    for(var i=0;i<list.length;i++){
      (function(j){
        list[j].addEventListener("click",function(){
          alert(j)
        })
      })(i);
    }

当然，如果使用ES6语法，利用let创建的块级作用域可以更简单的实现：

    const list=document.querySelectorAll("li");
    for(let i=0;i<list.length;i++){
        list[i].addEventListener("click",function(){
          alert(i)
        })
    }

### 模块

考虑下面代码，创建一个coolMod模块

    function coolMod(){
      var something="cool";
      var another=[1,2,3];
      function doSomething(){
        console.log(something)
      }
      function doAnother(){
        console.log(another)
      }
      return {
        doSomething:doSomething,
        doAnother:doAnother
      }
    }
    var foo = coolMod(); // 也可以将coolMod改为立即调用函数，变为单例模式
    foo.doSomething(); 
    foo.doAnother(); 

doSomething() 和 doAnother() 函数具有涵盖模块实例内部作用域的闭包

从coolMod模块也可以看出，模块模式需要具备两个必要条件：
- 为创建内部作用域而调用了一个包装函数
- 包装函数的返回 值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。

模块模式另一个简单但强大的变化用法是，命名将要作为公共 API 返回的对象：通过在模块实例的内部保留对公共 API 对象的内部引用，可以从内部对模块实例进行修改。

      var foo = (function coolMod(id) {
      function change() {
        // 修改公共 API 
        publicAPI.identify = identify2;
      }
      function identify1() {
        console.log(id);
      }
      function identify2() {
        console.log(id.toUpperCase());
      }
      var publicAPI = {
        change: change,
        identify: identify1
      };
      return publicAPI;
      })('foo mod');
      foo.identify(); //foo mod
      foo.change();
      foo.identify(); // FOO MOD

#### 创建一个模块依赖加载器

创建一个模块依赖加载器，这里只是介绍下核心逻辑：

    var MyModules = (function Manager() {
      var modules = {};
      function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) { 
          deps[i] = modules[deps[i]]; 
        } 
        modules[name] = impl.apply(impl, deps); 
        // 核心逻辑，将定义的模块函数挂载到内部modules对象下，并对外暴露API
        // apply 用法回忆：function fn(a,b){return a+b}; fn.apply(fn,[1,2]);
      }
      function get(name) {
        return modules[name];
      }
      return {
        define: define,
        get: get
      }
    })();

可以看到闭包的写法，下面开始定义一个模块`bar`

    MyModules.define( "bar", [], function() {
      function hello(who) {
        return "Let me introduce: " + who;
      }
      return { hello: hello }; 
    });
   
`bar`模块不依赖任何内容，同时对外暴露`hello`方法；
再定义一个`foo`模块，他依赖bar模块：

     MyModules.define( "foo", ["bar"], function(bar) { 
        function awesome(name) { 
          console.log(bar.hello( name ).toUpperCase()); 
        }
      return { awesome: awesome }; 
      });

可以看到`foo`模块的`awesome`方法依赖`bar`的`hello`方法，我们执行下两个模块，并调用下foo模块对外暴露的`awesome`方法

    var bar = MyModules.get( "bar" );
    var foo = MyModules.get( "foo" );
    foo.awesome('jack'); // LET ME INTRODUCE: JACK


requireJS等模块加载库逻辑会比这个复杂许多，但基本核心思想大致相同，可以看到里面存在大量闭包的用法。

ES6语法开始支持的原生的模块语法，import 可以将一个模块中的一个或多个 API 导入到当前作用域中，并分别绑定在一个变量上，而上面的例子是将整个模块的 API 导入并绑定到一个变量上；export 会将当前模块的变量/函数导出为公共API, 而上面例子是通过函数return出去；

ES6 的模块文件是一个独立的作用域，不需要再创建函数作用域闭包来处理了

## 拓展

- [知乎-JavaScript中圆括号() 和 方括号[] 的特殊用法疑问？](https://www.zhihu.com/question/20127472)

