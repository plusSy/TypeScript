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

printLabel(myObj)

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
