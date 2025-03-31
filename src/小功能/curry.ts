/* 柯里化 */
// 一种将多参数函数转换为一系列单参数函数的技术。
// 通过柯里化，可以将一个接收多个参数的函数分解为多个接收单个参数的函数，每次调用返回一个新的函数，直到所有参数都被传递完毕，最终返回结果。

// 1. 处理函数 fn 的参数长度固定。核心：判断参数长度，参数累加
export function curry1(fn: any) {
  return function next(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return next.bind(null, ...args);
    }
  };
}

// export function curry1(fn: any) {
//   const argArr: any[] = [];
//   return function next(...args: any[]): any {
//     argArr.push(...args);
//     if (argArr.length >= fn.length) {
//       return fn(...argArr);
//     } else {
//       return next;
//     }
//   };
// }

// 2. 不定长，但是需要最后一步无参数调用。核心：收集参数
export function curry2(fn: any) {
  const argArr: any[] = [];

  return function next(...args: any[]) {
    if (args.length) {
      argArr.push(...args);
      return next;
    } else {
      return fn(...argArr);
    }
  };
}

// 3. 不定长，也不需要最后一步调用，但只适用于判断。核心：toString
export function curry3(fn: any) {
  let result: any;
  function next(...args: any[]) {
    if (result) {
      result += fn(...args);
    } else {
      result = fn(...args);
    }

    return next;
  }

  // 两个都可以，借助取值，来返回结果
  next.toString = () => result;
  // next.valueOf = () => result;

  return next;
}
