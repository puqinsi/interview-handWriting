/* 冒泡排序 */
// 核心：相邻两个元素依次做比较，交换数值，先排好最后一位。
// 内层遍历一次，可以把最小的值，通过相邻两个比较，依次交换到最后一位。
// 外层遍历一次，就可以排好所有元素。
// 例如：从大到小
function bubbleSort(arr) {
  let count = 0;
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const current = arr[j];
      const next = arr[j + 1];
      count++;
      if (current < next) {
        [arr[j], arr[j + 1]] = [next, current];
      }
    }
  }

  console.log("操作步数：", count);
  return arr;
}

const arr = [3, 5, 6, 4, 6, 7, 9, 8, 1];
bubbleSort(arr);
