/**
 * 二.变量声明
 *
 * var/let/const
 *
 * let 和 const 是JavaScript里面相对较新的变量声明方式.let在很大程度上和var是相似的,但是可以避免变量作用域提升.
 * const 是对 let 的一个增强,它能阻止对一个变量再次赋值.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var _a, _b;
// 因为typeScript 是 JavaScript的 一个超集,所以本身就支持 let 和 const.下面我们会详说这些生命方式,以及为什么要替换 var
/**
 * 1.var 声明
*/
// 随便声明
var a = 10;
// 函数内部声明
function f() {
    var message = 'hello, word!';
    return message;
}
// 在其他函数内部访问相同的变量
function fun() {
    var a = 10;
    return function () {
        var b = a + 1;
        a++;
        return console.log(b);
    };
}
var g = fun();
g(); // 11
g(); // 12
// h可以获取到f函数里定义的a变量.每当 g被调用时,它都可以访问到f里的a变量,并且对其进行修改. 即使当g在f已经执行完后才被调用,它仍然可以访问及修改a.
function h() {
    var a = 1;
    a = 2;
    console.log('---->');
    var b = g();
    a = 3;
    console.log('----=====>');
    return b;
    function g() {
        console.log('----======----->');
        return a;
    }
}
h(); // ----> \->\ ----======-----> \->\ ----=====> \->\ 2
/**
 *作用域规则
 变量作用域提升
*/
function funUp(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return console.log(x);
}
funUp(true); // 10
funUp(false); // undefined
// 这个例子,变量x是在 if 判断里面的,return 则和if是同一级的,我们在外面访问到了x变量,这是因为 var 声明可以在包含他的函数,模块,命名空间或全局作用域内部任何位置被访问,包含他的代码块对此没有什么影响.有人称此为*var作用域或函数作用域*.函数参数也使用函数作用域.
/**
 * 捕获变量怪异之处
*/
for (var i = 0; i < 10; i++) {
    setTimeout(function () { console.log(i); }, 100 * i);
}
// 10 \->\ 10 \->\ 10 \->\ 10 \->\ 10 \->\ 10 \->\ 10 \->\ 10 \->\ 10 \->\ 10 
// 为什么会打印出 10个10 呢? setTimeout在若干毫秒之后执行一个函数,并且是在for循环结束后. for循环结束后,i的值为10.所以当函数被调用时候,它会打印出 10!
// 解决方法
for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}
// 0 \->\ 1 \->\ 2 \->\ 3 \->\ 4 \->\ 5 \->\ 6 \->\ 7 \->\ 8 \->\ 9
// 参数 i会覆盖for循环里的i,但是因为我们起了同样的名字,所以我们不用怎么改for循环体里的代码.
/**
 * 2.let 声明
 * let 声明和var写法一致.
*/
var hello = "hello";
/**
 * 块作用域
 * 当用let声明一个变量,它使用的是词法作用域或者块作用域.不同于使用var声明的变量那样可以包含在函数外访问,块作用域变量在包含他门的块或者for循环之外是不能访问的.
*/
function letFun(inner) {
    var a = 100;
    if (inner) {
        var b_1 = a + 1;
        return b_1;
    }
    // return b; // Cannot find name 'b'
}
letFun(true);
letFun(false);
// 在catch语句里面声明的变量也具有同样的作用域规则.
try { // 检查tryCode 内部有无报错
    throw 'no pass!'; // throw  向外抛出错误,并且停止向下运行.
}
catch (error) { // try 失败后执行
    console.log('reaon of no pass');
}
finally { // 无论try成功与否, finallyCode都会执行
    console.log('how about it!');
}
// console.log(error); // [ts] 找不到名称“error”。你是否指的是“Error”?
// 拥有块级作用域的变量的另一个特点是,它们不能在被声明之前读或写. 虽然这些变量始终"存在"于它们的作用域里,但在直到声明它的代码之前的区域都属于 暂时性死区。 它只是用来说明我们不能在 let语句之前访问它们,幸运的是TypeScript可以告诉我们这些信息.
/**
 * 重定义及屏蔽
 *
 * let 不可以重定义,也要注意定义顺序
*/
// 并不是要求两个均是块级作用域的声明TypeScript才会给出一个错误的警告。
// function y(x) {
//   let x = 100; // error: interferes with parameter declaration
// }
// function o() {
//   let x = 100;
//   var x = 100; // error: can't have both declarations of 'x'
// }
// 并不是说块级作用域变量不能用函数作用域变量来声明,而是块级作用域变量需要在明显不同的块里声明.
function r(condition, x) {
    if (condition) {
        var x_1 = 100;
        return console.log('innner', x_1);
    }
    return console.log('outer', x);
}
r(false, 10);
r(true, 10);
// 在一个嵌套作用域里引入一个新名字的行为称做屏蔽
function sumMatrix(matrix) {
    var sum = 0;
    for (var i_1 = 0; i_1 < matrix.length; i_1++) {
        var currentRow = matrix[i_1];
        for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
            sum += currentRow[i_2];
        }
    }
    return sum;
}
var _loop_1 = function (i_3) {
    setTimeout(function () { console.log(i_3); }, 100 * i_3);
};
// 通常来讲应该避免使用屏蔽,因为我们需要写出清晰的代码
/**
 * 块级作用域变量的获取
*/
// 当let声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，而是针对 每次迭代都会创建这样一个新作用域。
for (var i_3 = 0; i_3 < 10; i_3++) {
    _loop_1(i_3);
}
/**
 * 3.const声明
*/
var whouare = '你是谁';
// 它们与let声明相似,但是就像它的名字所表达的,它们被赋值后不能再改变.换句话说,它们拥有与 let相同的作用域规则,但是不能对它们重新赋值.这很好理解,它们引用的值是不可变的.
var student = {
    name: 'Bob',
    age: 12
};
// error
// student = { name: 'keven' }; // 无法分配到“student”，因为它是常数或只读属性
// ok
student.name = "keven";
/**
 * 4.let VS const
*/
// 都是作用域声明方式
// 使用最小特权原则,所有变量出了计划要修改的都应该使用const.基本原则就是如果一个变量不需要对他进行写入,那么其他人写入的代码也不能写入他们.
/**
 * 解构
*/
// 解构数组
var input = ['first', 'secound'];
var firstCount = input[0], secoundCount = input[1]; // firstCount = input[0]; secoundCount = input[1];
_a = [secoundCount, firstCount], firstCount = _a[0], secoundCount = _a[1]; // 解构作用于已声明的变量会更好
console.log(firstCount);
console.log(secoundCount);
// 作用于函数参数：
function ss(_a) {
    var first = _a[0], secound = _a[1];
    console.log('解构 arr', first);
    console.log('解构 arr', secound);
}
ss(['first', 'secound']);
// 你可以在数组里使用...语法创建剩余变量
var _c = [1, 2, 3, 4, 5], fir = _c[0], reset = _c.slice(1);
console.log('...整合剩余变量', fir);
console.log('...整合剩余变量', reset);
// 可以忽略其他元素
var _d = [1, 2, 3, 4, 5], aa = _d[0], b = _d[1], e = _d[4];
console.log('忽略其他元素 aa', aa);
console.log('忽略其他元素 b', b);
console.log('忽略其他元素 e', e);
/**--------------------**/
// 对象解构
var stu = { na: '小明', ag: 12, size: 'bar' };
var na = stu.na, ag = stu.ag;
(_b = { na: '小红', ag: 11 }, na = _b.na, ag = _b.ag); // 对象解构赋值, 这里我们需要用()括号将赋值语句括起来,因为JavaScript经常会以{}为一个代码块处理
var size = stu.size, anotherObj = __rest(stu, ["size"]); // ...可以创建剩余变量
console.log('创建剩余变量', anotherObj);
console.log('对象解构', na);
console.log('对象解构', ag);
// 属性重命名
var newName = stu.na, newAge = stu.ag;
console.log('属性重命名', newName);
console.log('属性重命名', newAge);
// 指定数据类型
var newNa = stu.na, newag = stu.ag;
// 指定默认值  默认值可以让属性为undefined时候是用默认值.
function keppWholeObject(wholeObject) {
    var na = wholeObject.na, _a = wholeObject.ag, ag = _a === void 0 ? 100 : _a;
    console.log('指定默认值', na);
    console.log('指定默认值', ag);
}
keppWholeObject({ na: '指定默认值 name' });
function typeFun(_a) {
    var a = _a.a, _b = _a.b, b = _b === void 0 ? 10 : _b;
    console.log('函数声明', a);
    console.log('函数声明', b);
}
var CParams = { a: 'name' };
typeFun(CParams);
/**
 * 展开
*/
// 展开操作符与解构正好相反,它允许将一个数组展开为另一个数组,一个对象展开为另一个对象
var newArr = [3, 4].concat([1, 2]);
console.log('展开数组', newArr);
// 对象的展开比数组的展开要复杂的多.像数组展开一样,它是从左至右进行处理,但结果仍为对象.这就意味着出现在展开对象后面的属性会覆盖前面的属性.
var newObj = __assign({ a: 'name', b: 'age' }, { c: '123' }, { a: '小明' });
console.log('展开对象', newObj); // 展开对象 { a: '小明', b: 'age', c: '123' }
