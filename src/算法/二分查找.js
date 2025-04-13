/* 二分查找：前提数组是排好序的 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid];

    if (midValue < target) {
      left = mid + 1;
    } else if (midValue > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

console.log(binarySearch([1, 4, 5, 7, 8], 1));
console.log(binarySearch([1, 4, 5, 7, 8], 4));
console.log(binarySearch([1, 4, 5, 7, 8], 5));
console.log(binarySearch([1, 4, 5, 7, 8], 7));
console.log(binarySearch([1, 4, 5, 7, 8], 8));
