/* new */
// 1. 创建一个新对象，新对象的原型设为构造函数的 prototype
// 2. 执行构造函数，this 指向这个新对象
// 3. 为新对象添加属性和方法
// 4. 返回新对象
//  在使用new操作符的时候，会对构造函数的返回值做一些判断：
//    - 如果返回值是基础数据类型，则忽略返回值；
//    - 如果返回值是引用数据类型，则使用构造函数return 的返回值，也就是new操作符无效。

function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);

  return res instanceof Object ? res : obj;
}

function Person1(name) {
  this.name = name;
}

const person1 = myNew(Person1, "puqinsi");
console.log(person1);

//
function Person2(name) {
  this.name = name;

  return { name, age: 20 };
}

const person2 = myNew(Person2, "puqinsi");
console.log(person2);
