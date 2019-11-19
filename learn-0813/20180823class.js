/**
 * 四. 类 class
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
 * 介绍
*/
// 传统的JavaScript程序使用函数和基于原型的继承来创建可重用组件,但对于熟悉使用面向对象方式的程序员来讲就有些棘手,因为他们用的是基于类的继承并且对象是由类构建出来的.从ECMA2015,也就是ES6开始,JavaScript程序员将能够使用基于类的面向对象的方式.使用typescript,我们允许开发者现在就使用这些特性,并且编译后的JavaScript可以在所有浏览器平台上运行,而不需要等到下个JavaScript版本.
// 类 example
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "hello " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('word');
console.log('greeter', greeter.greet());
// 如果使用过C#或者Java,这种语法会相当熟悉.我们声明一个Grerter类.这个类有三个成员:一个叫做greeting属性,一个构造函数和一个greet方法.
// 你可以注意到,我们在引用任何一个成员的时候都会使用到this.他表示我们访问的是类的成员.
// 最后, 我们使用new构造了Greeter类的一个实例.他会调用之前定义的构造函数,创建了一个Greeter类型的新对象,并执行构造函数初始化它.
/**
 * 继承
*/
// 在typeScript里面,我们可以使用常用的面向对象模式.基于类的程序设计中一种最基本的模式是允许使用继承来扩展现在的类.例如:
var AnimalTwoLeg = /** @class */ (function () {
    function AnimalTwoLeg() {
    }
    AnimalTwoLeg.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + " m.");
    };
    return AnimalTwoLeg;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('wolf! wolf!');
    };
    return Dog;
}(AnimalTwoLeg));
var dog = new Dog();
dog.bark();
dog.move(23);
dog.bark();
// 这个例子展示了最基本的类的继承: 类从基类中继承了属性和方法.这里,Dog是一个派生类,它派生自Animal的基类, 通过extends关键字.派生类通常称为子类,基类通常被称为超类.
// 因为Dog继承了Animal的功能,所以我们可以创建一个Dog的实例,它能够bark(),move()
// 下面这个例子比较复杂.
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "s.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log('Slithering...');
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log('Galloping...');
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake('sammay the python');
var tom = new Horse('Tommy the palomino');
sam.move();
tom.move(100);
// 这个例子展示了一些上面没有提到的特性.这一次,我们使用了 extends 关键字创建了 Animal 两个子类: Snake 和 Horse
// 与前一个例子的不同点是,派生类包含了一个构造函数,他必须 调用 super(),他会执行基类的构造函数.而且,在构造函数里访问 this的属性之前,我们一定要调用super().这个是typescript强制执行的一条重要的规则.
// 这个例子演示了如何在子类里可以重写父类的方法.Snake类和Horse类都创建了move方法,他们重写了从Animal继承来的move方法,使得move方法根据不同的类而具有不同的功能.注意,即使tom被声明为Animal类型,但因为它的值是Horse,调用tom.move(100)时,他会调用Horse里重写的方法.
/**
 * 公共,私有与受保护的修饰符
*/
/**
 * 默认为public
*/
// 在上面的例子里面,我们可以自由的访问程序里面定义的成员.如果你对其他语言中的类比较了解,就会注意到我们在之前的代码里并没有使用public来做修饰;例如 c#要求必须明确的使用public指定成员的可见性.在Typescript里面,成员都默认为public.
// 你也可以明确的将一个成员标记成public.我们可以用下面的方式重写Animal类.
var AnimalPub = /** @class */ (function () {
    function AnimalPub(theName) {
        this.name = theName;
    }
    AnimalPub.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 1; }
        console.log(this.name + " moved " + distanceInMeters + "s.");
    };
    return AnimalPub;
}());
// 理解 private
// 当成员被标记成 private时,他就不能在声明他的类的外部访问.比如:
var AnimalPri = /** @class */ (function () {
    function AnimalPri(theName) {
        this.name = theName;
    }
    return AnimalPri;
}());
// new AnimalPri('Cat').name; // 属性“name”为私有属性，只能在类“AnimalPri”中访问。
new AnimalPub('Cat').name;
// TypeScript使用的是结构性类型系统.当我们比较两种不同类型时,并不在乎他们从何而来,如果所有成员的类型都是兼容的,我们就认为他们的类型是兼容的.
// 然而,当我们比较带有 private 或 protected 成员类型的时候,情况就不同了.如果其中一个类型里包含了一个private成员,那么只有当另外一个类型中也存在这样一个private成员,并且他们都是来自同一处声明时,我们才认为这两个类型是兼容的.对于protected成员也使用这个规则.
// 下面看一个例子,更好的说明了这一点.
var Animals = /** @class */ (function () {
    function Animals(thename) {
        this.name = thename;
    }
    return Animals;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, 'Rhino') || this;
    }
    return Rhino;
}(Animals));
var Employe = /** @class */ (function () {
    function Employe(theName) {
        this.name = theName;
    }
    return Employe;
}());
var animals = new Animals("Goat");
var rhino = new Rhino();
var employe = new Employe("Bob");
animals = rhino;
// animals = employe; // 不能将类型“Employe”分配给类型“Animals” .类型具有私有属性“name”的单独声明.
// 这个例子中有 Animals 和 Rhino 两个类,Rhino是Animals的子类.还有一个Employe类,其类型上看上去和Animals类型是相同的.我们创建了几个这些类的实例,并且相互赋值,则看出了问题.
// 由于Animals和Rhino共享了来自Animals里面定义的私有成员 private name: string,因此,他们是兼容的.然而Employe却不是这样的.当把Employe赋值给Animal的时候,得到一个错误,说他们的类型不兼容.尽管Employe也有一个私有成员 name,但它明显不是Animals里面定义的那个.
// 理解 protected
// protected 修饰符与private修饰符的行为很相似,但有一点不同,protected成员在派生类中仍然可以访问.如下列:
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, My name is " + this.name + ",and I work in " + this.department + "!";
    };
    return Employee;
}(Person));
var howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 属性“name”受保护，只能在类“Person”及其子类中访问
// 注意: 我们不能在Person类外使用name,但是我们任然可以通过Employee类的实例方法访问,因为Employee是由Person派生而来的.
// 构造函数也可以被标记成 protected.这意味着这个类不能在包含它的类外被实例化,但是能继承.比如:
var PersonProtected = /** @class */ (function () {
    function PersonProtected(theName) {
        this.name = theName;
    }
    return PersonProtected;
}());
var EmployeeProtected = /** @class */ (function (_super) {
    __extends(EmployeeProtected, _super);
    function EmployeeProtected(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    EmployeeProtected.prototype.getElevatorPitch = function () {
        return "Hello, My name is " + this.name + ",and I work in " + this.department + "!";
    };
    return EmployeeProtected;
}(PersonProtected));
var howards = new EmployeeProtected("Howard", "Sales");
// let john = new PersonProtected("John"); // 类“PersonProtected”的构造函数是受保护的，仅可在类声明中访问.
// readonly 修饰符
// 你可以使用 readonly 关键字将属性设置为只读的.只读属性必须在声明时或构造函数里被初始化.
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("Man width the 8 strong legs!");
// dad.name = "Man with the 3-piece suit"; // 无法分配到“name”，因为它是常数或只读属性。
console.log(dad);
// 参数属性
// 在上面例子中.我们不得不定义一个受保护的成员 name 和一个构造函数 theName 在 person 类里,并且立刻给 name 和 theName 赋值.这种情况经常会遇到.参数属性可以方便的让我们在一个地方定义并初始化一个成员.下面的例子是对之前Animal类的修改版,使用了参数属性.
var AnimalRedefine = /** @class */ (function () {
    function AnimalRedefine(name) {
        this.name = name;
    }
    AnimalRedefine.prototype.move = function (distanceInMeters) {
        console.log(this.name + " moved " + distanceInMeters + "s.");
    };
    return AnimalRedefine;
}());
// 注意看 我们是如何舍弃了 theName, 仅在构造函数里使用 private name: sting 参数来创建和初始化name成员.我们把声明和赋值合并在了一处.
// 参数属性通过给构造函数参数添加一个访问限定字符来声明.使用 private 限定一个参数属性会声明并初始化一个私有成员;对于public 和 protected来说也是一样.
// 存取器
// TypeScript 支持通过getters/setters来截取对对象成员的访问.他能帮助你有效的控制对对象成员的访问.
// 下面来看 如何把一个简单的类改写成 使用 get 和 set.首先,我们从一个没有读取器的例子开始.
var Employeee = /** @class */ (function () {
    function Employeee() {
    }
    return Employeee;
}());
var employeee = new Employeee();
employeee.fullName = "Bobe No.1";
if (employeee.fullName) {
    console.log('employeee.fullName', employeee.fullName);
}
// 我么可以水边的设置 fullName 的值,这是非常方便的,但是 这可能会带来一定的问题.
// 下面这个版本里面,我们先检查用户密码是否正确,然后再允许其修改员工信息.我们把对 fullName 的直接访问改成了可以检查密码 set 方法.我们也加了一个get方法,让上面的例子仍然可以工作.
var passcode = "secret passcode";
var Employes = /** @class */ (function () {
    function Employes() {
    }
    Object.defineProperty(Employes.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employes");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employes;
}());
var employes = new Employes();
employes.fullName = "Bob Smith";
if (employes.fullName) {
    console.log('employes.fullName', employes.fullName);
}
