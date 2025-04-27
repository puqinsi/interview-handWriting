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
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatten2(item));
    } else {
      result.push(item);
    }
  });

  return result;
}

console.log(flatten2(arr));

// 3. 递归+reduce
function flatten3(arr, result = []) {
  return arr.reduce((brr, current) => {
    if (Array.isArray(current)) {
      flatten3(current, brr);
    } else {
      brr.push(current);
    }
    return brr;
  }, result);
}

console.log(flatten3(arr));
