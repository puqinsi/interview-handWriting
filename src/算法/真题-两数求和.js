// 给定一个整数数组 array 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
const array = [2, 3, 6, 7, 11, 15];
const target = 9;

// 1. 最基础的两层遍历
// 时间复杂度 O(n^2);
function twoSum1(array, target) {
  const result = [];
  const len = array.length;
  for (let i = 0; i < len; i++) {
    const num1 = array[i];
    for (let j = i + 1; j < len; j++) {
      const num2 = array[j];
      if (num1 + num2 === target) {
        result.push([num1, num2]);
      }
    }
  }

  return result;
}

console.log("基础求和：", twoSum1(array, target));

// 2. 空间换时间 & 求和->求差
// 时间复杂度 O(n);
function twoSum2(array, target) {
  const result = [];
  const valueToKeyMap = new Map();
  const len = array.length;
  for (let i = 0; i < len; i++) {
    const num1 = array[i];
    valueToKeyMap.set(num1, i);
    const num2 = target - num1; //
    if (valueToKeyMap.has(num2)) {
      result.push([num1, num2]);
    }
  }

  return result;
}

console.log("空间换时间：", twoSum2(array, target));

// 总结：
// 1. 代码里有两层循环时，先反思一下，能不能用空间换时间，优化成一层循环。
// 2. 几乎所有的求和问题，都可以转化为求差问题。
