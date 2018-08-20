/**
 * 一.基础类型
 *
 * 布尔值/数字/字符串/数组/元组/枚举/any/void/never/undefined/null/类型断言
 */
/**
 * 布尔值
*/
var isDone = true;
/**
 * 数字
 * 和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
 * */
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
/**
 * 字符串
 * '' 与 "" 都表示 字符串
 * 你还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ `），并且以${ expr }这种形式嵌入表达式
 **/
var namm = "Bob";
var age = 12;
var persionMessage = namm + " \u7684\u5E74\u7EA7\u662F " + age;
/**
 * 数组
 * 定义方式: 1.直接在数据类型后面加[] 2.使用数组泛型，Array<元素类型>：
*/
var arr1 = [1, 2, 3];
var arr2 = [9, 1, 3, 4];
/**
 * 元祖 Tuple
 * 元祖类型允许表示一个已知元素数量和类型的数组,各元素的类型不必相同.
 *
 * 联合类型是高级主题
*/
var tupleArr;
tupleArr = [0, '123'];
// 当访问一个已知索引的元素，会得到正确的类型
console.log(typeof tupleArr[1] === 'string'); // true
// 当访问一个越界的元素，会使用联合类型替代
tupleArr[3] = 'word'; // 字符串可以赋值给(string | number)类型
console.log(typeof tupleArr[3]);
// console.log(tupleArr[5].toString()); // 'string' 和 'number' 都有 toString
console.log('5', typeof tupleArr[5]);
// tupleArr[6] = true; // Error, 布尔不是(string | number)类型
/**
 * 枚举
 * enum类型是对JavaScript标准数据类型的一个补充; 像 c#等其他语言一样,使用枚举类型可以为一组数值赋予友好的名字
 *
 * 默认情况下,从0开始为元素编号.也可以手动设置其初始值,或者手动指定成员的值
*/
var Color;
(function (Color) {
    Color[Color["red"] = 10] = "red";
    Color[Color["blue"] = 11] = "blue";
    Color[Color["yellow"] = 12] = "yellow";
    Color["green"] = "green";
})(Color || (Color = {}));
;
var enumRed = Color.red;
var enumBlue = Color.blue;
var enumGreen = Color.green;
console.log('enumRed', enumRed); // 10
console.log('enumBlue', enumBlue); // 11
console.log('enumGreen', enumGreen); // green
// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字.例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
var colorName = Color[12];
console.log('colorName', colorName); // yellow 因为上面代码里它的值是12
/**
 * Any
 * 为那些在编程阶段还不清楚类型的变量指定一个类型.
 * 我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查.那么我们可以使用 any类型来标记这些变量.
*/
var nosure = 4;
nosure = "change the typeof any to string";
nosure = true; // maybe it`s can be defined a boolean
// 在对现有代码进行改写的时候,any类型是十分有用的,它允许你在编译时,可选择的包含或移除类型检查.你可能认为这和Object有相似的作用,就像它在其他语言中那样.但是Object类型的变量只是允许你给他赋任意值,但是却不能在上面任意的调用其方法,即便他真的有这些方法.
var noSure = 5;
console.log('noSure.toFixed()', noSure.toFixed());
var prettySure = 5;
// console.log('prettySure.toFixed()', prettySure.toFixed()); // 类型 Object上不存在属性 toFixed.
// 当只知道一部分数据的类型时候, any类型也是有用的.比如 一个数组包含了不同的数据类型
var anyArr = [1, true, false, '213', {}];
console.log('anyArr', anyArr[3]);
/**
 * void
 * 某种程度上看,void与any恰好相反,他表示没有任何类型.当一个函数没有返回值时,通常会见到的返回值为void
*/
function warnUser() {
    console.log('this is my warning message!');
}
// 声明一个void类型的变量没有什么大作用,因为他只能赋予 undefined 和 null.
var unusable = null;
console.log("void", unusable);
/**
 * null 和 undefined
 * typeScript中,undefined和null 都有属于自己的数据类型, undefined 和 null.和 void 相似,他们本身的类型用处不大:
*/
var undefinedType = undefined;
var nullType = null;
// 默认情况下,null 和 undefined 是所有类型的子类型.就是说你可以将 null 和 undefined 赋值给 number 类型的变量.
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。
/**
 * never
 * never 类型表示哪些永远不存在的值的类型.例如,never类型是哪些总是会抛出异常或者根本不会有返回值的函数表达式或者箭头函数表达式的返回值类型;变量也可能是never类型,当他们被永不为真的类型保护所约束时.
 *
 * never 类型是任何类型的子类型,也可以赋值给任何类型;然而没有类型是never类型的子类型或可以赋值给never类型(除了never本身之外),及时any也不可以赋值给never.
 *
 * 下面是一些返回never类型的函数:
*/
// 返回never的函数必须存在无法到达的终点
function error(message) {
    throw new Error(message);
}
// error('倒车,请注意!')
// 推断的返回值类型为 never
function fail() {
    return error('something faild');
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
// infiniteLoop();
/**
 * 类型断言
 *
 * 有时候自己很清楚的知道一个实体的类型并且比它的现有类型更确切的类型.
 * 通过 类型断言 的方式可以明确其类型.类型断言好比其它语言里的数据类型,但是不进行特殊的数据检查和解构.
 *
*/
// 类型断言有两种形式.其一是"尖括号"语法:
var someVal = 'this is a string';
var strLength = someVal.length;
console.log('strLength', strLength);
// 另一种是 as 语法
var strLen = someVal.length;
console.log('strLen', strLen);
