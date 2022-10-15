/* 柯里化 */
// 1. 处理函数 fn 的参数长度固定。核心：判断参数长度，参数累加
// export function curry1(fn: any, ...args: any[]) {
//   // 处理函数参数定长
//   if (args.length >= fn.length) {
//     return fn(...args);
//   } else {
//     return (...args1: any[]) => curry1(fn, ...args.concat(args1));
//   }
// }

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

  next.toString = () => result;
  next.valueOf = () => result;

  return next;
}
