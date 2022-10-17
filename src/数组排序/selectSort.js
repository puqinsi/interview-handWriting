/* 选择排序 */
// 核心：每个元素和后面其他元素依次做比较，交换数值，先排好第一位。
// 从数组开头位置，依次将每一项和后面其他元素比较，找到最小或最大元素，排在该元素位置。
// 例如：从大到小
function selectSort(arr) {
  let count = 0;
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const current = arr[i];
      const next = arr[j];
      count++;
      if (current < next) {
        [arr[i], arr[j]] = [next, current];
      }
    }
  }

  console.log("操作步数：", count);
  return arr;
}

const arr = [3, 5, 6, 4, 6, 7, 9, 8, 1];
selectSort(arr);
