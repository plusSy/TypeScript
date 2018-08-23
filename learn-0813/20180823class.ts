/**
 * 四. 类 class
*/

/**
 * 介绍
*/

// 传统的JavaScript程序使用函数和基于原型的继承来创建可重用组件,但对于熟悉使用面向对象方式的程序员来讲就有些棘手,因为他们用的是基于类的继承并且对象是由类构建出来的.从ECMA2015,也就是ES6开始,JavaScript程序员将能够使用基于类的面向对象的方式.使用typescript,我们允许开发者现在就使用这些特性,并且编译后的JavaScript可以在所有浏览器平台上运行,而不需要等到下个JavaScript版本.

// 类 example
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `hello ${this.greeting}`
  }
}

let greeter = new Greeter('word');
console.log('greeter', greeter.greet());

// 如果使用过C#或者Java,这种语法会相当熟悉.我们声明一个Grerter类.这个类有三个成员:一个叫做greeting属性,一个构造函数和一个greet方法.

// 你可以注意到,我们在引用任何一个成员的时候都会使用到this.他表示我们访问的是类的成员.

// 最后, 我们使用new构造了Greeter类的一个实例.他会调用之前定义的构造函数,创建了一个Greeter类型的新对象,并执行构造函数初始化它.


/**
 * 继承
*/

// 在typeScript里面
