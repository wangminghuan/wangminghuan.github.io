---
title: Flutter开发系列-2
date: 2022-07-04 11:32:15
tags: [Flutter, Dart]
---
## 概述

本次我们简要学习下Dart中的核心语法功能，并以Javascript的角度看Dart，做下简单的对比，以便快速掌握Dart


## Dart核心语法

### 变量与类型


#### 变量声明
Dart中声明变量可以有以下两种方式，一种是明确指定类型（Optional types）：`变量类型 变量名称 = 赋值`

```
num n1 = 1;

int n2 = 2;

double n3 = 3;

// 注意是String 单双引号都可以
String s1 = "hello";

// 三个引号可以换行
String s2 ="""
Hello Dart1
Hello Dart2
Hello Dart3
""";

bool b1 = false;
```
另外一种就是类型推倒(Type Inference)： `var/dynamic/const/final 变量名称 = 赋值`
```
void printInfo(){
  var c= "hello";
  const c1 = 10;            // const 表示变量在编译期间即能确定的值
  final c2 = s1+' Dart';   // final 定义的变量可以在运行时确定值，而一旦确定后就不可再变。
  print(c2); // hello Dart
  
  dynamic a2 = c;   // dynamic 声明的变量可以在运行时修改其类型 其他方式则不可以 PS:不建议使用
  print(a2.runtimeType); // String
  a2 = 18;
  print(a2.runtimeType); // int
  print(c); // 18  因为所有数据存的都是引用，所以变量c的值也会改变

}
void main() {
  printInfo();
}
```
需要注意的是，与运行时相关的逻辑，定义在函数内部，因为Dart的入口函数是main, 并不是像JS那样顺序执行的

#### 数据类型
上面已经提到了Dart的几种数据类型，num（int与double是num的子类）、bool、String，首先确认几点：
- Dart 是类型安全的语言，并且所有类型都是对象类型，都继承自顶层类型 Object，因此一切变量的值都是类的实例（即对象），甚至数字、布尔值、函数和 null 也都是继承自 Object 的对象
- 在必须是布尔类型的地方如： `if(nonbooleanValue)` 中必须是布尔值，Dart不会做类型转化
- 在默认情况下，未初始化的变量的值都是 null

**下面介绍下List 与 Map:**

其他编程语言中常见的数组和字典类型，在 Dart 中的对应实现是 List 和 Map。它们的声明和使用很简单，和 JavaScript 中的用法类似

```
var arr1 = ["Tom", "Andy", "Jack"];
var arr2 = List.of([1,2,3]);
arr2.add(499);
arr2.forEach((v) => print('${v}'));
  
var map1 = {"name": "Tom", 'sex': 'male'}; 
var map2 = Map.of({"name":"Li"});
map2['sex'] = 'male';
map2.forEach((k,v) => print('${k}: ${v}')); 
  
```


与Java 语言类似，在初始化集合实例对象时，你可以为它的类型添加约束

```
var arr1 = <String>["Tom", "Andy", "Jack"];
var arr2 = List<num>.of([1,2,3]);
arr2.add(499);
arr2.forEach((v) => print('${v}'));
  
var map1 = <String,String>{"name": "Tom", 'sex': 'male'}; 
var map2 = Map<String,String>.of({"name":"Li"});
map2['sex'] = 'male';
map2.forEach((k,v) => print('${k}: ${v}')); 

```
类似JS，Dart中的Set是无序的唯一项的集合：
```
var s1 = <String>{"Tom", "Andy", "Tom"};
  print(s1); //{Tom, Andy}
}

```

还有一种是symbol类型：是 Dart中比较特殊的一种类型

### 函数
>Dart 2.12及其以上版本会执行空安全检查，网上很多资料的Dart版本并不一致，导致自己跑的时候与文档表现不一致
Dart 认为重载会导致混乱，因此从设计之初就不支持重载，而是提供了可选命名参数和可选参数。Flutter的函数参数功能比较强大：

- 给参数增加{}，以 paramName: value 的方式指定调用参数，也就是命名参数(或称为：可选命名参数)；
- 给参数增加[]，则意味着这些参数是可以忽略的，也就是可选参数。
- 正常传参，则称为位置参数

```
void enable1Flags(int a, int b)=> print("$a,$b");     //位置参数

void enable2Flags({int? a, int? b})=> print("$a,$b");  //命名参数 2.12版本后必须添加? 表示可以不传或者赋值为空

void enable3Flags({int a=0, int b=0})=> print("$a,$b");  //命名参数+默认值

void enable4Flags(int a, [int b=0])=> print("$a,$b");    //位置参数 + 可选参数

void main() {
  enable1Flags(1,3);      //1,3
  enable2Flags(b:3,a:2);  //1,3
  enable3Flags(b:3,a:3);  //1,3
  enable4Flags(10);       //10,0
}

```

### 类

#### 类的定义与构造函数

Dart 是面向对象的语言，每个对象都是一个类的实例，都继承自顶层类型 Object。


```
class Person {
  String name;
  int age;
  String sex ='';
  String job = ''; //未在构造函数内初始化的需要先给初始值
  Person(this.name, this.age); 
  // 语法糖，等同于
  //   Person(String name, int age){
  //     this.name = name;
  //     this.age = age;
  //   }
  bool isAdult() => age >= 18 ? true : false;
}
main() {
  var p1 = Person('Jack', 12);  // Dart 2 以上版本，new关键字可以省略
  print("${p1.name} is ${p1.isAdult() ? 'adult' : 'underage'}");
}

```
上面是一个Dart通过构造函数定义类的一种方式，除默认的构造函数外，Dart 提供命名构造函数方法。代码如下：

```
class Person {
  String name;
  int age;
  String sex;
  String job;
  Person(this.name, this.age)
      : sex = '',
        job = '';
  Person.init(String dataName) : this(dataName,20);
  bool isAdult() => age >= 18 ? true : false;
}
main() {
  var p1 = Person('Jack', 12); //Dart 2 以上版本，new关键字可以省略
  var p2 = Person.init('Tom');
  print("${p1.name} is ${p1.isAdult() ? 'adult' : 'underage'}"); //Jack is underage
  print("${p2.name} is ${p2.isAdult() ? 'adult' : 'underage'}"); //Tom is adult
}
```
等同于下面写法(属性都得初始化)
```
class Person {
  String name ="";
  int age = 0;
  String sex = '';
  String job = '';
  Person(name, age){
    this.name = name;
    this.age = age;
  }
  Person.init(String dataName){
    name = dataName;
    age = 20;
  }
  bool isAdult() => age >= 18 ? true : false;
}

```
第一种语法糖写法更简洁明了，推荐第一种写法。在Dart中可以使用不同的参数来执行构造方法，所以提供命名构造函数的机制来实现多方式创建实例。

#### 类的属性与方法

和大多数语言一样，Dart 提供静态变量和静态方法：

```
class Person {
  static String sex ='man';
  static bool isOld() => sex =='man'? true:false;
}
```

静态方法无法使用this，也不能访问非静态成员，类的实例也无法调用静态方法，并且静态变量只有在被使用的时候才会初始化。

Dart 中并没有 public、protected、private 这些关键字，我们只要在声明变量与方法时，在前面加上“\_”即可作为 private 方法使用。如果不加“\_”，则默认为 public。但私有属性必须只有在通过库文件引用（单独的文件）时，实例才无法访问。

```
class Person {
  String name;
  int _age;
  String sex = 'man';
  Person(this.name) : _age = 10;
  bool _isOld() => sex == 'man' ? true : false;
}

```
#### 类的继承

Dart 通过extends关键字实现继承, 子类的构造函数需通过super关键字来调用或改造父类的构造函数：

```
class Person {
  String name;
  int age;
  Person(this.name, this.age); 
  bool isAdult() => age >= 18 ? true : false;
}
class Man extends Person {
  String sex = "man";
  Man(String name, int age):super(name,age);
}
main() {
  var p1 = Person('Jack', 12);
  var p2 = Man('Tom', 12);
  print("${p1.name} is ${p1.isAdult() ? 'adult' : 'underage'}");  //Jack is underage
  print("${p2.name} is ${p2.isAdult() ? 'adult' : 'underage'}");  //Tom is underage
  print (p1 is Person);  //true
  print (p2 is Person);  //true
}
```
#### 子类重写父类方法

子类在重写父类方法时，只要方法名称与父类相同，便可实现逻辑重写，@override为可选项, 但建议都加上:

```
class Man extends Person {
  String sex = "man";
  Man(String name, int age):super(name,age);
  @override
  bool isAdult() => sex == "man" ? true : false;
}
```

### 运算符
Dart 和绝大部分编程语言的运算符一样。不过，Dart 多了几个额外的运算符，用于简化处理变量实例缺失（即 null）的情况。

- `?.` 运算符：如果 a 不为 null，则调用a下的方法，否则跳过。 `a?.fn()`,这样可以避免抛出异常
- `??=` 运算符：赋值运算符：如果 a 为 null，则给 a 赋值 value，否则跳过。这种用默认值兜底的赋值语句在 Dart 中我们可以用 `a ??= value`` 表示。
- `??`运算符：条件表达式：如果 a 不为 null，返回 a 的值，否则返回 b。其他语言中通过 `(a != null)? a : b` 来实现这种情况。而在 Dart 中，这类代码可以简化为 `a ?? b`
- `..` 与`?..`，级联符号：用来在同一对象上进行序列操作
```
  var p = new Point(100, 200)
    ..printInfo()
    ..printHello();
```
如果对象可能为空，则可以在第一个级联操作符之前加上`?`:
```
var p = new Point(100, 200)
    ?..printInfo() 
    ..printHello();
```
不过对于不可能为null的对象使用`?..`Dart会报错提示：`Warning: Operand of null-aware operation '?..' has type 'xxx' which excludes null`

## 类型注解与泛型调用

Dart中的类型用于约束流入代码各位置的**值**的不同类型。类型会出现在两种位置：声明中的 类型注解（type annotations） 和 泛型调用（generic invocations） 的类型参数。

类型注解可以用于为变量，参数，字段，或者返回值声明类型：

```
int addNum(List<int> n){
   int result = 0;
   n.forEach((v)=>result=result+v);
   return result;
}

void main() {
  int m=addNum([1,2,4]);
  print(m); //7
}
```
类型注解位于代码静态声明结构的前面，并且他们不会在运行时”执行”。

而泛型的使用主要有如下好处：

- 正确指定泛型类型可以提高代码质量。
- 使用泛型可以减少重复的代码。

假设有这样一个函数，用户输入什么类型就返回什么类型，可能会这么写：
```
int getInfo (int n){
   return n;
}

void main() {
  print(getInfo(1));     // 1
  print(getInfo("str")); //报错 The argument type 'String' can't be assigned to the parameter type 'int'.
}
```
这样一来只能输入int类型的参数，对于其他类型的参数就会报错，当然我们也可以干掉类型限制

```
getInfo (n){
   return n;
}

void main() {
  print(getInfo(1));     //1
  print(getInfo("str")); // str
}
```
上述代码可以正常执行了，但这样会绕开类型检查，很容易产生隐患。这时候就需要泛型出场了。泛型简而言之,就是我不知道用户输入什么类型的值, 用一个标记符号代替,这个标记符号就是这种类型,在所有需要同一类型的地方使用这种标记,那么这个标记到底代表什么类型,等到被调用的时候由用户来制定：

```
T getInfo<T>(T n){
   return n;
}

void main() {
  print(getInfo<String>('str')); //str
  print(getInfo<int>(1));        // 1
  print(getInfo<bool>(false));   // false
}
```
## 参考
- [Dart 官网 - 高校指南](https://dart.cn/guides/language/effective-dart/usage)
- [浅谈 Dart 类与类的基本方法](https://juejin.cn/post/7000706151696302093)