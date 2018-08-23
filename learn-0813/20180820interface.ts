/**
 * 三.接口
 * 
 * TypeScript的核心原则之一就是对值所具有的的结构进行类型检查.他有时候被称为"鸭式辨型法"(能像鸭子一样叫,一样游泳的都是鸭子)或者"结构性子类型化".
 * 在TypeScript里,接口的作用就是为这些类型命名和为你的代码或者第三方代码定义契约.
 */

/**
 * 接口初识
*/

let myObj = { size: 10, label: 'size 10 Object' }

function printLabel(labelObj: { label: string }) {
  console.log(labelObj);
}

printLabel(myObj);

// 类检查器会查看 printLabel 的调用.printLabel有一个参数,并要求这个对象参数有一个名为lebal,类型为string的的属性.需要注意的是,我们传入的对象参数实际上包含很多属性,但是编译器只会检查那些必须的属性是否存在,并且其类型是否匹配.

// 下面我们重写上面的例子,用接口来描述:必须包含一个label属性且其数据类型为string:

interface labelledVal {
  label: string
}

function printLabelInterface(labelObj: labelledVal) {
  console.log(labelObj.label)
}

printLabelInterface(myObj)

// labelledVal 接口就好像一个名字,用来描述上面例子里面的要求.它代表了有一个label的属性且类型为string的对象.需要注意的是,我们这里并不能像其他语言那样,说传给 printLabelInterface的对象实现了这个接口.我们只会去关注值的外形.只要传入的对象满足上面提到的必要条件,那么他就是被允许的.

// 还有一点就是,类型检查器不会去检查属性的顺序,只要相应的属性存在且数据类型是对的就是可以的.

/**
 * 可选属性
 * 
 * 接口里的属性不是全部都需要的.有些是只在某种条件下存在,或者根本不存在.可选属性在应用"option bags"模式时很常用,即给函数传入的参数对象中只有部分属性赋值了.
*/

// 下面是应用了 "option bags" 的例子.

interface SquareConfig {
  color?: string;
  width?: number;
}

function crateSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) { // if change the color to colr,it can throw an message ` 属性“colr”在类型“SquareConfig”上不存在。你是否指的是“color”? `
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = crateSquare({ color: 'red' })
console.log('add 接口', mySquare);

// 带有可选属性的接口,与普通的接口定义差不多,只是在可选属性名字定义的后面加了一个 ? 符号.

// 可选属性的好处之一是可以对可能存在的属性进行预定义,好处之二是可以捕获引用了不存在的属性时的错误比如我们将 createSquera 里面的 color修改后,就会得到一个报错信息


/**
 * 只读属性
 * 
 * 一个对象属性只能在对象刚刚创建时候修改其值.你可以在属性名前用 readonly 来指定只读属性.
*/

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 0 };

// p1.x = 20; // 无法分配到"x",因为他是常数或者只读属性.

// TypeScript具有 ReadonlyArray<T> 类型, 它与Array<T>相似,只是把所有可变方法去掉了,因此可以确保数组创建后在也不能被修改:

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 12; // 类型“ReadonlyArray<number>”中的索引签名仅允许读取。
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!

console.log('---->', ro[2])

// 上面代码的最后一行,可以看到就算把整个 ReadonlyArray 赋值到一个普通数组也是不可以的,但是可以用类型断言重写.

a = ro as number[];

// readonly vs const

// 最简单判断该用 readonly 还是 const 的方法是要看要把它做为变量使用还是做为一个属性.做为变量使用的话用const,若做为属性则使用 readonly

/**
 * 额外的属性检查
*/

// 我们在第一个例子中使用了接口,TypeScript 让我们传入了{size:number;label:string}到仅期望得到{label: string;}的函数里.我们已经学过了可选属性,并且知道他们在"options bags"模式里很有用. 但是我们要注意一下额外的属性检查.比如,拿 createAquare例子来说:

interface SquareConfig {
  color?: string;
  width?: number;
}

function crateSquares(config: SquareConfig): void {
  // function crateSquares(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquares = crateSquares({ color: 'blue', width: 100, }) // 对象文字只能指定已知的属性，但“colour”中不存在类型“SquareConfig”。是否要写入 color?

// 对象字面量会被特殊对待而且会经过 额外属性检查,当将他们赋值给变量或者参数传递的时候.如果一个对阿星字面量存在任何"目标类型"不包含的属性时.你会得到以上错误.

// 绕开这些检查,最简单的方法就是使用类型断言:

let mySquarez = crateSquares({ width: 100, opacity: 0.5 } as SquareConfig);

// 然而,最佳的方法是能够添加一个字符串索引签名,前提是能够确定这个对象可能具有某些作为特殊用途使用的额外属性.如果SquareConfig带有上面定义的类型color和width属性,并且还会带有任意数量的其他属性,那么我们可以这样定义它:

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

// 我们稍后会讲到索引签名,但在我们这里要表示的是SquareConfig可以有任意数量的额属性,并且只要他们不是color和width,那么就无所谓他们的类型是什么.

// 还有最后一种跳过这种检查的方法,这可能会让你感动惊讶,他就是将这个对象赋值给一个两一个变量:因为squareOptions不经过额外属性检查,所以编译器不会报错.

let squareOptions = { colour: "red", width: 100 };
let mySquarezz = crateSquare(squareOptions);

// 要留意,在像上面一样肩带的代码里,你可能不应该去绕开这些检查.对于包含方法和内部状态的复杂对象字面量来讲,你可能需要使用这些技巧,但是大部分额外属性检查错误是真正的bug.就是说你遇到了额外类型检查出的错误,比如"optionsbags",你应该去审查一下IDE类型声明.在这里,如果,如果支持传入color或 colour属性到createSquare,你应该修改SquareConfig定义来体现出这一点.

/**
 * 函数类型
*/

// 接口能够描述JavaScript中对象拥有的各种各样的外形.除了描述带有属性的普通对象外,接口也可以描述函数类型.

// 为了使用接口表示函数类型,我们需要给接口定义一个调用签名.他就像是一个只有参数列表和返回值类型的函数定义.参数列表里的每隔参数都需要名字和类型.

interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 这样定义后,我们可以像使用其他接口一样使用这个函数类型的接口.下例展示了如何创建一个函数类型的变量,并将一个同类型的函数赋值给这个变量.

let mySearchFunc: SearchFunc;

mySearchFunc = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 对于函数类型的类型检查来说,函数的参数名不需要与接口里定义的名字相匹配.比如,我们使用下面的代码重写上面的例子

let mySearchFun: SearchFunc;

mySearchFun = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

// 函数的参数会逐个进行检查,要求对应位置上的额参数类型是兼容的.如果不想指定类型,TypeScript的类型系统会推断出参数类型,因为参数直接赋值给了SearchFunc类型变量.函数的返回值类型是通过其返回值推断出来的(此例是 true 和 false).如果让这个函数返回数字或者字符串,类型检查器会警告我们函数的返回值类型与SearchFunc接口中的定义不匹配.

let mySearchFunction: SearchFunc;

mySearchFunction = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
}

/**
 * 可索引的类型
*/

// 与使用接口描述函数类型差不多,我们也可以描述那些能够"通过索引得到"的类型,比如a[10]或ageMap["daniel"].可索引类型具有一个 索引签名 ,他描述了对象索引的类型,还有响应的索引返回值类型.show u an example:

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 上面的例子里, 我们定义了S他ringArray接口,它具有索引签名.这个索引签名表示了当用number去索引StringArray时会得到string类型的返回值.

// 共有支持两种索引签名: 字符串和数字.可以同时使用两种类型的索引,但是数字索引的返回值必须是字符串索引返回值类型的子类型.这是因为当使用number来索引时,JavaScript会将它转换成string然后再去索引对象.也就是说100(一个number)去索引等同于使用"100"(一个string)去索引,因此两者需要保持一致.

class Animal {
  name: string;
}

class Dog extends Animal {
  breed: string;
}

interface NotOkey {
  // [x: number]: Animal; // 数字索引类型“Animal”不能赋给字符串索引类型“Dog”。
  [x: string]: Dog;
}

// 字符串索引签名能够很好的描述dictionary模式,并且他们也会确保所有属性与其返回值类型相匹配.因为字符串索引声明了 obj.property 和obj["property"] 两种形式都可以.下面的例子里, name的类型与字符串索引类型不匹配,所以类型检查器给出一个错误提示:

interface NumberDictionary {
  [index: string]: number;
  length: number; // 可以,length是number类型
  // name: string; // error, 'name'的类型与索引类型返回值的类型不匹配
}

// 最后,你可以将索引签名设置为只读,这样就防止了给索引赋值:

interface ReadyonlyStringArray {
  readonly [index: number]: string;
}

let myReadyonlyArray: ReadyonlyStringArray = ['Alice', 'Bob'];

// myReadyonlyArray[2] = "Mallory"; // error! 类型 myReadyonlyArray 中的索引签名只能用于读取

/**
 * 类 类型
 * 
 * 实现接口
*/

// 与c#或Java里接口的基本作用一样,TypeScript也能够用来明确的强制一个类去符合某种契约.

interface ClockInterfaceee {
  currentTime: Date;
}

class Clock implements ClockInterfaceee {
  currentTime: Date;
  constructor(h: number, m: number) { }
}

// 你也可以在接口中描述一个方法,在类里实现它,如下例:

interface ClockInterfa {
  currentTime: Date;
  setTime(d: Date);
}

class Clokk implements ClockInterfa {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

// 接口描述了类的公共部分,而不是公共和私有两个部分.

/**
 * 类静态部分与实例部分的区别
*/

// 当你操作类和接口的时候,你要知道类是具有两个类型的: 静态部分的类型和实例的类型.你会注意到,当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时,会得到一个错误.

interface ClockConstructorzz {
  new(hour: number, minute: number);
}

// class Clocc implements ClockConstructorzz { // 类“Clocc”错误实现接口“ClockConstructor”.类型“Clocc”提供的内容与签名“new(hour: number, minute: number): any”不匹配。
//   currentTime: Date;
//   constructor(h: number, minute: number) { }
// }

// 这里因为当一个类实现了一个接口时候,只对其实力部分进行类型检查.constructor存在于类的静态部分,所以不在检查的范围内.

// 因此,我们应该直接操作类的静态部分.看下面的例子,我们定义了两个接口, ClockConstructoe为狗在函数所用和ClockINterface为实例方法所用.为了方便我们定义一个构造函数createClock,他用传入的类型创建实例.

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep loop');
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick, tick");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 因为createClock 的第一个参数是ClockConstructor 类型,在createClock(AnalogClock, 7, 32)里面,会检查AnalogClock是否符合构造函数的签名.

/**
 * 继承接口 
*/

// 和类一样,接口也可以相互继承.这让我们能够从一个接口里面复制成员到另一个接口,可以灵活的将接口分割到可重用的接口里面.

interface Shape {
  color: string;
}

interface Gendel {
  gendel: string;
}

interface Square extends Shape, Gendel {
  sideLength: number;
}

let square = <Square>{};
square.color = "red";
square.gendel = "man";
square.sideLength = 100;

/**
 * 混合类型
 * 
 * 先前我们说过,接口能够描述JavaScript里丰富的类型.因为JavaScript其动态灵活的特点,有时你会希望一个对象可以同时具有上面提到的多种类型
*/

// 例子:一个对象可以同时作为函数和对象使用,并带有额外的属性

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {
    console.log('start number', start)
  };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.123;
console.log('c.interval', c.interval);

// 在使用JavaScript第三方库的时候,或许需要像上面一样去定义类型.

/**
 * 接口继承类
 * 
 * 当接口继承了一个类类型时候,他将会继承类的成员但不包括实现.就好像接口声明了所有类中存在的成员,但并没有提供具体实现一样.接口同样会继承到类的private和 protected 成员.这意味着当你创建了一个接口继承一个拥有私有或受保护的类时,这个接口类型只能被这个类或子类所实现.
*/

// 当你拥有一个庞大的继承结构时这很有用,但是要指出的是你的代码只在子类拥有特定属性时起作用.这个子类除了继承至基类外与基类没有任何关系.例如:

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// class Image implements SelectableControl { // error 类“Image”错误实现接口“SelectableControl” 类型“Image”中缺少属性“state”
//   select() { }
// }

class localtion {

}

// 在上面例子中,SelectableCteol包含了Control所有成员,包括私有成员state.因为state是私有成员,所以只能够是Ctrol的子类们才能实现SelectableControl接口.因为只有Control的子类才能拥有一个声明于Control的私有成员,这对私有成员的兼容性是必要的.

// 在Control类内部,是允许通过SelectableControl的实例来访问私有成员state的.实际上,SelectableControl接口拥有select方法的Control类是一样的.Button和TextBox类是SelectableControl的子类(因为他们都继承自Control并有select方法),但Image和Location类并不是这样的.