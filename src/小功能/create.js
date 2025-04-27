/* Object.create */

// 1. 创建一个对象，并把第一个参数设为该对象的原型
// 2. 后续参数作为 该对象的属性

Object.defineProperty(Object, "myCreate", {
  value(proto, ...args) {
    if (proto) {
      // 1 创建一个新对象
      const obj = new Object(...args);
      // 2 设置对象原型
      Object.setPrototypeOf(obj, proto);
      // 3 返回对象
      return obj;
    } else {
      return new Object();
    }
  }
});
