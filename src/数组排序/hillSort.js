/* 希尔排序 */
// 核心：插入排序 + 间隔
// 插入排序的升级版，增加间隔，先把间隔范围的元素排好序，在一步一步缩小间隔，直到所有元素排好序。

function hillSort(arr) {
  let count = 0;
  const len = arr.length;
  let n = 1;
  // 计算间隔
  while (n < len / 3) {
    n = n * 3 + 1;
  }

  // 逐步缩小间隔
  while (n > 0) {
    // 插入排序
    for (let i = n; i < len; i++) {
      for (let j = i; j >= n; j -= n) {
        const current = arr[j];
        const previous = arr[j - n];
        count++;
        if (current > previous) {
          [arr[j - n], arr[j]] = [current, previous];
        } else {
          break;
        }
      }
    }

    n = (n - 1) / 3;
  }

  console.log("操作步数：", count);
  return arr;
}

const arr = [3, 5, 6, 4, 6, 7, 9, 8, 1];
hillSort(arr);
