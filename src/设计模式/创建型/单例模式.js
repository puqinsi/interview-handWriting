// 核心：实例只创建一次
// 优点: 唯一实例, 节约内存开销;
function Person() {
  if (Person.instance) {
    return Person.instance;
  }

  this.age = 18;
  this.name = "puqinsi";
  Person.instance = this;

  return Person.instance;
}

const person = new Person();
const person2 = new Person();
