/* 插入排序 */
// 核心：先前面的元素局部排序，后面的元素再与前面的排好序的元素作比较（局部向前冒泡），插入到相应位置。
// 例：从大到小
function insertSort(arr) {
  let count = 0;
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      const current = arr[j];
      const previous = arr[j - 1];
      count++;
      if (current > previous) {
        [arr[j], arr[j - 1]] = [previous, current];
      } else {
        // 优化项，如果当前判断不满足，前面判断也不会满足，因为前面是排好序的。
        break;
      }
    }
  }

  console.log("操作步数：", count);
  return arr;
}

const arr = [3, 5, 6, 4, 6, 7, 9, 8, 1];
insertSort(arr);
