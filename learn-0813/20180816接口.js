/**
 * 三.接口
 *
 * TypeScript的核心原则之一就是对值所具有的的结构进行类型检查.他有时候被称为"鸭式辨型法"(能像鸭子一样叫,一样游泳的都是鸭子)或者"结构性子类型化".
 * 在TypeScript里,接口的作用就是为这些类型命名和为你的代码或者第三方代码定义契约.
 */
/**
 * 接口初识
*/
var myObj = { size: 10, label: 'size 10 Object' };
function printLabel(labelObj) {
    console.log(labelObj);
}
printLabel(myObj);
"";
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
// readonly vs const
// 最简单判断该用 readonly 还是 const 的方法是要看要把它做为变量使用还是做为一个属性.做为变量使用的话用const,若做为属性则使用 readonly
