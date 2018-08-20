// 类型注解
{
    // 指定参数类型
    function greeter(persion) {
        return "hello " + persion;
    }
    var user = 'Bob';
    document.body.innerHTML = greeter(user);
}
// 接口
{
    function greeters(persion) {
        return "hello " + persion.firstName + " " + persion.lastName;
    }
    var users = { firstName: 'Kobe', lastName: 'Bryant' };
    document.body.innerHTML = greeters(users);
}
// 类
{
    var Student = /** @class */ (function () {
        function Student(firstName, middleInitial, lastName) {
            this.firstName = firstName;
            this.middleInitial = middleInitial;
            this.lastName = lastName;
            this.fullName = firstName + " " + middleInitial + "." + lastName;
        }
        return Student;
    }());
    function greeterz(persion) {
        return "hello " + persion.firstName + " " + persion.middleInitial + " " + persion.lastName;
    }
    var userz = new Student('Jane', 'M', 'user');
    document.body.innerHTML = greeterz(userz);
}
