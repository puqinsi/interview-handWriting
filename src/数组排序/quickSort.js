/* 快速排序 */
// 核心：把数组按照基准数，分成大于基准数和小于基准数的两个子序列，两个子序列里重复同样操作
// 最后把子序列拼成完整数组。
let count = 0;
function quickSort(arr) {
  const len = arr.length;
  if (!len) {
    return [];
  }

  const left = [];
  const right = [];
  const base = arr[0];
  // 注意从 1 开始
  for (let i = 1; i < len; i++) {
    const current = arr[i];
    count++;
    if (current >= base) {
      left.push(current);
    } else {
      right.push(current);
    }
  }

  return quickSort(left).concat(base, quickSort(right));
}

const arr = [3, 5, 6, 4, 6, 7, 9, 8, 1];
quickSort(arr);
console.log("操作步数：", count);
