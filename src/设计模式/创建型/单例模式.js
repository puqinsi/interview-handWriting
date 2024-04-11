// 核心：实例只创建一次
// 优点: 唯一实例, 节约内存开销;
function Person() {
  if (!Person.instance) {
    this.age = 18;
    this.name = "puqinsi";
    Person.instance = this;
  }

  return Person.instance;
}

const person1 = new Person();
const person2 = new Person();

// 闭包
function PersonBase() {
  this.age = 18;
  this.name = "puqinsi";
}

const Person = (() => {
  let instance = null;
  return () => {
    if (!instance) {
      instance = new PersonBase();
    }

    return instance;
  };
})();

const person3 = new Person();
const person4 = new Person();

// es6
class Person {
  constructor(name, age) {
    this.age = age;
    this.name = name;
  }

  static instance = null;
  static getInstance() {
    if (!Person.instance) {
      Person.instance = new Person("puqinsi", 18);
    }

    return Person.instance;
  }
}

const person5 = Person.getInstance();
const person6 = Person.getInstance();
