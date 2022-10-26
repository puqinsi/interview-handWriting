const arr = [1, 2, [3, 4], [5, [6, [7]]]];
// 1. es6
function flatten(arr) {
  arr = arr.flat();
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr = flatten(arr);
      break;
    }
  }
  return arr;
}
console.log(flatten(arr));

// 2. 递归
function flatten2(arr) {
  let brr = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      brr = brr.concat(flatten2(item));
    } else {
      brr.push(item);
    }
  }

  return brr;
}

console.log(flatten2(arr));

// 3. reduce
function flatten3(arr, result = []) {
  return arr.reduce((brr, current) => {
    if (Array.isArray(current)) {
      brr.concat(flatten3(current, brr));
    } else {
      brr.push(current);
    }
    return brr;
  }, result);
}

console.log(flatten3(arr));
