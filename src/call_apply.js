/* call */
// 1. 第一个参数，调用该函数的对象，null时，this 指向 window
// 2. 后续的所有参数,都会传给被调用的函数
Function.prototype.myCall = function (context, ...args) {
  if (!context) context = window;

  context.fn = this;
  const result = context.fn(...args);

  delete context.fn;

  return result;
};

// 1. 第一个参数，修改调用对象
// var count = 1;
// const fn = function () {
//   return this.count;
// };

// const obj = { count: 2 };
// const result1 = fn();
// const result2 = fn.myCall(null);
// const result3 = fn.myCall(obj);

// console.log(result1); // 1
// console.log(result2); // 1
// console.log(result3); // 2

// // 2. 剩余参数，传入被调用的函数
// const fn1 = function (num1, num2) {
//   return this.count + num1 + num2;
// };

// const obj1 = { count: 2 };
// const result4 = fn1(1, 2);
// const result5 = fn1.myCall(null, 1, 2);
// const result6 = fn1.myCall(obj, 1, 2);

// console.log(result4); // 4
// console.log(result5); // 4
// console.log(result6); // 5

/* apply */
// 1. 第一个参数，调用该函数的对象，null时，this 指向 window
// 2. 第二个参数以数组形式提供,都会传给被调用的函数
Function.prototype.myApply = function (context, args) {
  if (!context) context = window;

  context.fn = this;
  const result = context.fn(...args);

  delete context.fn;

  return result;
};

// 1. 第一个参数，修改调用对象
var count = 1;
const fn = function () {
  return this.count;
};

const obj = { count: 2 };
const result1 = fn();
const result2 = fn.myCall(null);
const result3 = fn.myCall(obj);

console.log(result1); // 1
console.log(result2); // 1
console.log(result3); // 2

// 2. 剩余参数，传入被调用的函数
const fn1 = function (num1, num2) {
  return this.count + num1 + num2;
};

const obj1 = { count: 2 };
const result4 = fn1(1, 2);
const result5 = fn1.myCall(null, 1, 2);
const result6 = fn1.myCall(obj, 1, 2);

console.log(result4); // 4
console.log(result5); // 4
console.log(result6); // 5
