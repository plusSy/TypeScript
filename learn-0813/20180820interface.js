/**
 * 三.接口
 *
 * TypeScript的核心原则之一就是对值所具有的的结构进行类型检查.他有时候被称为"鸭式辨型法"(能像鸭子一样叫,一样游泳的都是鸭子)或者"结构性子类型化".
 * 在TypeScript里,接口的作用就是为这些类型命名和为你的代码或者第三方代码定义契约.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 接口初识
*/
var myObj = { size: 10, label: 'size 10 Object' };
function printLabel(labelObj) {
    console.log(labelObj);
}
printLabel(myObj);
function printLabelInterface(labelObj) {
    console.log(labelObj.label);
}
printLabelInterface(myObj);
function crateSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) { // if change the color to colr,it can throw an message ` 属性“colr”在类型“SquareConfig”上不存在。你是否指的是“color”? `
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = crateSquare({ color: 'red' });
console.log('add 接口', mySquare);
var p1 = { x: 10, y: 0 };
// p1.x = 20; // 无法分配到"x",因为他是常数或者只读属性.
// TypeScript具有 ReadonlyArray<T> 类型, 它与Array<T>相似,只是把所有可变方法去掉了,因此可以确保数组创建后在也不能被修改:
var a = [1, 2, 3, 4];
var ro = a;
// ro[0] = 12; // 类型“ReadonlyArray<number>”中的索引签名仅允许读取。
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
console.log('---->', ro[2]);
// 上面代码的最后一行,可以看到就算把整个 ReadonlyArray 赋值到一个普通数组也是不可以的,但是可以用类型断言重写.
a = ro;
function crateSquares(config) {
    // function crateSquares(config: SquareConfig): { color: string; area: number } {
    // ...
}
var mySquares = crateSquares({ color: 'blue', width: 100 }); // 对象文字只能指定已知的属性，但“colour”中不存在类型“SquareConfig”。是否要写入 color?
// 对象字面量会被特殊对待而且会经过 额外属性检查,当将他们赋值给变量或者参数传递的时候.如果一个对阿星字面量存在任何"目标类型"不包含的属性时.你会得到以上错误.
// 绕开这些检查,最简单的方法就是使用类型断言:
var mySquarez = crateSquares({ width: 100, opacity: 0.5 });
// 我们稍后会讲到索引签名,但在我们这里要表示的是SquareConfig可以有任意数量的额属性,并且只要他们不是color和width,那么就无所谓他们的类型是什么.
// 还有最后一种跳过这种检查的方法,这可能会让你感动惊讶,他就是将这个对象赋值给一个两一个变量:因为squareOptions不经过额外属性检查,所以编译器不会报错.
var squareOptions = { colour: "red", width: 100 };
var mySquarezz = crateSquare(squareOptions);
// 这样定义后,我们可以像使用其他接口一样使用这个函数类型的接口.下例展示了如何创建一个函数类型的变量,并将一个同类型的函数赋值给这个变量.
var mySearchFunc;
mySearchFunc = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
// 对于函数类型的类型检查来说,函数的参数名不需要与接口里定义的名字相匹配.比如,我们使用下面的代码重写上面的例子
var mySearchFun;
mySearchFun = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
// 函数的参数会逐个进行检查,要求对应位置上的额参数类型是兼容的.如果不想指定类型,TypeScript的类型系统会推断出参数类型,因为参数直接赋值给了SearchFunc类型变量.函数的返回值类型是通过其返回值推断出来的(此例是 true 和 false).如果让这个函数返回数字或者字符串,类型检查器会警告我们函数的返回值类型与SearchFunc接口中的定义不匹配.
var mySearchFunction;
mySearchFunction = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
// 上面的例子里, 我们定义了S他ringArray接口,它具有索引签名.这个索引签名表示了当用number去索引StringArray时会得到string类型的返回值.
// 共有支持两种索引签名: 字符串和数字.可以同时使用两种类型的索引,但是数字索引的返回值必须是字符串索引返回值类型的子类型.这是因为当使用number来索引时,JavaScript会将它转换成string然后再去索引对象.也就是说100(一个number)去索引等同于使用"100"(一个string)去索引,因此两者需要保持一致.
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var myReadyonlyArray = ['Alice', 'Bob'];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    return Clock;
}());
var Clokk = /** @class */ (function () {
    function Clokk(h, m) {
    }
    Clokk.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clokk;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log('beep loop');
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick, tick");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
var square = {};
square.color = "red";
square.gendel = "man";
square.sideLength = 100;
function getCounter() {
    var counter = function (start) {
        console.log('start number', start);
    };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
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
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
// class Image implements SelectableControl { // error 类“Image”错误实现接口“SelectableControl” 类型“Image”中缺少属性“state”
//   select() { }
// }
var localtion = /** @class */ (function () {
    function localtion() {
    }
    return localtion;
}());
// 在上面例子中,SelectableCteol包含了Control所有成员,包括私有成员state.因为state是私有成员,所以只能够是Ctrol的子类们才能实现SelectableControl接口.因为只有Control的子类才能拥有一个声明于Control的私有成员,这对私有成员的兼容性是必要的.
// 在Control类内部,是允许通过SelectableControl的实例来访问私有成员state的.实际上,SelectableControl接口拥有select方法的Control类是一样的.Button和TextBox类是SelectableControl的子类(因为他们都继承自Control并有select方法),但Image和Location类并不是这样的.
