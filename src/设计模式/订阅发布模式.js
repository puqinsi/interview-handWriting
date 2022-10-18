// 核心：跟观察者模式本质上一样的，收集再通知
// 事件和方法之间的关系，这里可以订阅不同类型的消息，并且发布消息的时候直接触发方法
class EventBus {
  constructor() {
    this.list = new Map();
  }

  // 收集订阅者
  subscribe(type, fn) {
    let set = this.list.get(type);
    if (!set) {
      set = new Set();
      this.list.set(type, set);
    }

    set.add(fn);
  }

  unsubscribe(type, fn) {
    let set = this.list.get(type);
    if (set.has(fn)) {
      set.delete(fn);
    }
  }

  // 发布消息给订阅者
  publish(type, ...args) {
    var fnSet = this.list.get(type);

    // 如果该类消息没有订阅者
    if (!fnSet) return;

    for (const fn of fnSet) {
      fn(...args);
    }
  }
}
