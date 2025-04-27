/* bind */
// 1. 第一个参数是绑定对象，把函数绑定到该对象；
// 2. 其余参数，随着 this 一起被绑定
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("caller must be a function!");
  }

  const fn = this;
  // 返回一个新函数
  return (...currentArgs) => {
    return fn.apply(context, args.concat(currentArgs));
  };
};

/* demo */
// 1. 第一个参数是绑定对象，把函数绑定到该对象；
var count = 1;
const fn = function () {
  return this.count;
};

const obj = { count: 2 };
const fn1 = fn.myBind(obj);

const result1 = fn();
const result2 = fn1();

console.log(result1); // 1
console.log(result2); // 2

// 2. 其余参数，随着 this 一起被绑定
const fn2 = function (num1, num2, num3) {
  return this.count + num1 + num2 + num3;
};
const fn3 = fn2.myBind(obj, 1, 2);

const result3 = fn3(3);

console.log(result3); // 8
