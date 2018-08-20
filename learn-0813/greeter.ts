// 类型注解
{
  // 指定参数类型
  function greeter(persion: string) {
    return `hello ${persion}`;
  }

  let user = 'Bob';

  document.body.innerHTML = greeter(user);
}

// 接口
{
  // 使用接口来描述一个对象
  interface Persion {
    firstName: string;
    lastName: string;
  }

  function greeters(persion: Persion) {
    return `hello ${persion.firstName} ${persion.lastName}`
  }

  let users = { firstName: 'Kobe', lastName: 'Bryant' }

  document.body.innerHTML = greeters(users);
}

// 类
{
  class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
      this.fullName = `${firstName} ${middleInitial}.${lastName}`
    }
  }

  interface Persion {
    firstName: string;
    middleInitial: string;
    lastName: string;
  }

  function greeterz(persion: Persion) {
    return `hello ${persion.firstName} ${persion.middleInitial} ${persion.lastName}`
  }

  let userz = new Student('Jane', 'M', 'user');

  document.body.innerHTML = greeterz(userz);

}