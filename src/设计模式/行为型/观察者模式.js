// 核心：定义好观察者的接收方法（本例：update），目标对象收集观察者，然后统一通知观察者（调用定义好的观察者接收方法）
// 对象和对象之间的关系
// 定义一个目标对象
class Publisher {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter(item => item !== observer);
  }

  notify(...args) {
    //通知所有观察者
    this.observers.forEach(observer => {
      // 调用接收通知的方法（相当于开放出去的接口）
      observer.update(...args);
    });
  }
}

//定义观察者对象
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(...args) {
    // 根据目标发送的通知做处理
    console.log(`${this.name} update`);
  }
}

let sub = new Publisher();
let obs1 = new Observer("observer1");
let obs2 = new Observer("observer2");
sub.add(obs1);
sub.add(obs2);
sub.notify();

/* Publisher 和 Observer 作为基类，实践中可以通过继承该基类，根据需求完善功能 */
