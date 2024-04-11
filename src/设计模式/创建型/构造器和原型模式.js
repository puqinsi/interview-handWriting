/* 目的：抽象每个对象实例的变与不变 */

/* 构造器模式 */
function Person1(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = () => console.log(`my name is ${this.name}`);
}

const a = new Person1("a", 18);
a.sayName();

/* 原型模式 */
function Person2() {}

Person2.prototype.name = "b";
Person2.prototype.age = 18;
Person2.prototype.sayName = function () {
  console.log(`my name is ${this.name}`);
};

const b = new Person2();
b.sayName();

const c = new Person2();
c.sayName();

/* 混合模式 */
function Person3(name, age) {
  this.name = name;
  this.age = age;
}
Person3.prototype.sayName = function () {
  console.log(`my name is ${this.name}`);
};

const d = new Person3("d", 18);
d.sayName();
