// ES6继承
class SuperType {
  constructor(name) {
    this.name = name;
    this.color = ["red", "green", "blue"];
  }

  sayName() {
    return this.name;
  }
}
class SubType extends SuperType {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayAge() {
    return this.age;
  }
}

// 1. 原型链继承
// 缺点: 如果原型对象中属性有引用类型,一个实例修改后,其他实例都收到影响,实例一般需要有属于自己的全部属性;（实例属性互相影响）
function Animal() {
  this.superValue = "animal";
  this.colors = ["red", "green", "blue"];
}
Animal.prototype.getSupervalue = function () {
  console.log(this.superValue);
};

function Cat() {
  this.subValue = "cat";
}
Cat.prototype = new Animal();
Cat.prototype.getSubValue = function () {
  console.log(this.subValue);
};

// 2. 借用构造函数继承
// 缺点: 同构造器函数模式,每个方法都要在每个实例上重新创建一个Function实例;
function Animal(name) {
  this.name = name;
  this.colors = ["red", "green", "blue"];
}
Animal.prototype.getName = function () {
  console.log(this.colors);
};

// 只继承构造函数的属性
function Cat(name) {
  Animal.call(this, name);
}

// 3. 组合继承
function Animal(name) {
  this.name = name;
  this.colors = ["red", "green", "blue"];
}
Animal.prototype.sayName = function () {
  return this.name;
};

function Cat(name, age) {
  Animal.call(this, name);
  this.age = age;
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
Cat.prototype.syAge = function () {
  return this.age;
};

// 4. 寄生组合继承（完善的）
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "green", "blue"];
}
SuperType.prototype.sayName = function () {
  return this.name;
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
  return this.age;
};
