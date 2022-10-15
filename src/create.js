/* Object.create */

// 1. 创建一个对象，并把第一个参数设为该对象的原型
// 2. 后续参数作为 该对象的属性

Object.defineProperty(Object, "myCreate", {
  value(proto, ...args) {
    if (proto) {
      // 1
      const obj = new Object(...args);
      // 2
      Object.setPrototypeOf(obj, proto);
      // 3
      return obj;
    } else {
      return new Object();
    }
  },
});
