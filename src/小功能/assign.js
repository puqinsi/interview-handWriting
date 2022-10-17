/* Object.assign */

Object.defineProperty(Object, "myAssign", {
  value(...args) {
    // 1
    const obj = new Object();
    // 2 遍历参数
    for (let i = 0; i < args.length; i++) {
      const current = args[i];
      if (current !== null) {
        // 3 遍历对象的 key
        for (const key in current) {
          if (current.hasOwnProperty(key)) obj[key] = current[key];
        }
      }
    }

    // 4
    return obj;
  },
  writable: false,
  configurable: false,
  enumerable: false,
});

Object.myAssign({ a: 1 }, { b: 2 }); // { a: 1, b: 2 };
