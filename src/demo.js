/* 快速排序 */
function quickSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  const base = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < len; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), base, ...quickSort(right)];
}

/* 归并排序 */
function mergeSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return mergeArr(mergeSort(left), mergeSort(right));
}

function mergeArr(leftArr, rightArr) {
  let i = 0,
    j = 0;
  const result = [];
  const leftLen = leftArr.length;
  const rightLen = rightArr.length;

  while (i < leftLen && j < rightLen) {
    if (leftArr[i] < rightArr[j]) {
      result.push(leftArr[i]);
      i++;
    } else {
      result.push(rightArr[j]);
      j++;
    }
  }

  return result.concat(leftArr.slice(i)).concat(rightArr.slice(j));
}

/* 插入排序 */
function insertSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;
  for (let i = 1; i < len; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      j--;
    }
  }

  return arr;
}

/* 两数求和 */
function twoSum(arr, target) {
  const result = [];
  const map = new Map();
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const num1 = arr[i];
    map.set(num1, i);
    const num2 = target - num1;
    if (map.has(num2)) {
      result.push([i, map.get(num2)]);
    }
  }

  return result;
}

/* 实现 assign */
Object.defineProperty(Object, "myAssign", {
  value(...args) {
    const obj = new Object();
    args.forEach(item => {
      if (item !== null) {
        for (const key in item) {
          if (item.hasOwnProperty(key)) obj[key] = item[key];
        }
      }
    });

    return obj;
  }
});

console.log(Object.myAssign({ a: 1 }, { b: 2 }));

/* call */
Function.prototype.myCall = function (context, ...args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

/* apply */
Function.prototype.myApply = function (context, args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

/* bind */
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  const myBind = function (...currentArgs) {
    return fn.apply(context, args.concat(currentArgs));
  };

  return myBind;
};

const fn = function (a) {
  return this.count + a;
};

const obj = { count: 2 };
const fn1 = fn.myBind(obj, 2);
console.log(fn1());

/* create */
Object.defineProperty(Object, "myCreate", {
  value(proto, ...args) {
    const obj = new Object(...args);
    Object.setPrototypeOf(obj, proto);
    return obj;
  }
});

function Foo() {}
const foo = new Foo();

console.log(Foo.prototype.isPrototypeOf(foo)); // true
console.log(Function.prototype.isPrototypeOf(Foo)); // true
console.log(Object.prototype.isPrototypeOf(Function)); // true
console.log(Object.prototype.isPrototypeOf(Foo.prototype)); // true
console.log(Object.prototype.isPrototypeOf(Function.prototype)); // true

/* curry */
// 将多个参数的函数改造成一系列单参数的函数
// 1. 接收一个函数，返回一个函数
// 2. 接收单个参数
// 3. 最后以不传参调用结束

// 定长
function curry(fn) {
  return function next(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return next.bind(null, ...args);
    }
  };
}

// 不定长，需要最后调用
function curry(fn) {
  const argArr = [];
  return function next(...args) {
    if (args.length) {
      argArr.push(args);
      return next;
    } else {
      return fn(...argArr);
    }
  };
}

/* 防抖 */
function debounce(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn.apply(this, args);
    }

    lastTime = now;
  };
}

/* 节流 */
function throttle(fn, delay = 500) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

/* 深拷贝 */
const isObject = obj => typeof obj === "object" && obj !== null;
function deepCopy(source) {
  if (!isObject(source)) return source;
  const result = Array.isArray(source) ? [] : {};
  for (let key in source) {
    const value = source[key];
    result[key] = isObject(value) ? deepCopy(value) : value;
  }
  return result;
}

/* 扁平化 */
function flatten(arr) {
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  });

  return result;
}

/* new */
// 1. 创建一个新对象，新对象的原型是构造函数的prototype
// 2. 执行构造函数，this 指向新对象，并添加属性和方法
// 3. 返回新对象
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);
  return res instanceof Object ? res : obj;
}

/* typeof */
function myTypeof(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

/* Promise */
function promiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;
    promiseArr.forEach((promise, index) => {
      promise
        .then(res => {
          result[index] = res;
          count++;
          if (count === promiseArr.length) {
            resolve(result);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}

function promiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(promise => {
      promise
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}
