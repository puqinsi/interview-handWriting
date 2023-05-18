// 核心：定义好观察者的接收方法（本例：update），目标对象收集观察者，然后统一通知观察者（调用定义好的观察者接收方法）
// 对象和对象之间的关系
// 定义一个目标对象
class Subject {
  constructor() {
    this.observerList = [];
  }

  add(observer) {
    this.observerList.push(observer);
  }

  remove(observer) {
    this.observerList = this.observerList.filter(item => item !== observer);
  }

  notify(...args) {
    //通知所有观察者
    this.observerList.forEach(item => {
      // 调用接收通知的方法（相当于开放出去的接口）
      item.update(...args);
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
    console.log(`my name is:${this.name}`);
  }
}

let sub = new Subject();
let obs1 = new Observer("observer1");
let obs2 = new Observer("observer2");
sub.add(obs1);
sub.add(obs2);
sub.notify();
