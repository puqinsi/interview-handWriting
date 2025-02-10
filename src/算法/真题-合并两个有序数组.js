// 真题描述：给你两个有序整数数组 array1 和 array2，请你将 array2 合并到 array1 中，使 array1 成为一个有序数组。
const array1 = [1, 2, 3];
const array2 = [2, 5, 6];

// 1. 双指针
// 时间复杂度 O(n)
function mergeTowArray1(arr1, arr2) {
  const mergedArray = [...arr1];
  let arr1Index = arr1.length - 1;
  let arr2Index = arr2.length - 1;
  let mergeIndex = arr1.length + arr2.length - 1;

  while (arr1Index >= 0 && arr2Index >= 0) {
    const num1 = arr1[arr1Index];
    const num2 = arr2[arr2Index];
    if (num1 > num2) {
      mergedArray[mergeIndex] = num1;
      mergeIndex--;
      arr1Index--;
    } else {
      mergedArray[mergeIndex] = num2;
      mergeIndex--;
      arr2Index--;
    }
  }

  // 因为一开始把 arr1 赋给 mergedArray 了，所以 arr1 多出来的数据就是正确的位置，不需要处理
  // 但 arr2 多出来的数据需要放到前去
  while (arr2Index >= 0) {
    mergedArray[mergeIndex] = arr2[arr2Index];
    mergeIndex--;
    arr2Index--;
  }

  return mergedArray;
}

const mergedArr1 = mergeTowArray1(array1, array2);
console.log(mergedArr1);

// 2. 数组原生方法
function mergeTowArray2(arr1, arr2) {
  const mergedArr = arr1.concat(arr2);
  return mergedArr.sort((a, b) => a - b);
}

const mergedArr2 = mergeTowArray2(array1, array2);
console.log(mergedArr2);
