/* 创建一个迭代器 */
// 1. 返回一个迭代器，调用 next 方法执行一次，返回 {value: x, done: false}
// 2. 最后 返回 {value: undefined, done: true}

// es5
function createIterator(items) {
  let i = 0;
  const len = items.length;
  return {
    next() {
      const done = i >= len;
      const value = done ? undefined : items[i];
      i++;

      return {
        value,
        done,
      };
    },
  };
}

// es6
function* createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
