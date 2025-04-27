/* 排序：从小到大 */

const arr = [5, 1, 2, 4, 3];
/* 冒泡排序 */
// 核心：相邻两个元素依次做比较，交换数值，先排好最后一位。
// 最小时间复杂度：O(n)，平均时间复杂度：O(n^2)
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    // 判断是否是排好序的
    let isSorted = true;
    // 后面 i 个是已经排好顺序的，所以不用再比较了
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isSorted = false;
      }
    }
    // 如果是排好序的，直接返回
    if (isSorted) return arr;
  }

  return arr;
}

// console.log(bubbleSort(arr));

/* 选择排序 */
// 核心：每个元素和后面其他元素依次做比较，交换数值，先排好第一位。
// 时间复杂度 O(n^2)
function selectSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

// console.log(selectSort(arr));

/* 插入排序 */
// 核心：先前面的元素局部排序，后面的元素再与前面的排好序的元素作比较（局部向前冒泡），插入到相应位置。
// 最小时间复杂度 O(n)，平均时间复杂度 O(n^2);
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }

  return arr;
}

// console.log("插入排序：", insertSort(arr));

/* 希尔排序 */
// 核心：插入排序 + 间隔
function hillSort(arr) {
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
        if (current < previous) {
          [arr[j - n], arr[j]] = [current, previous];
        } else {
          break;
        }
      }
    }

    n = (n - 1) / 3;
  }
  return arr;
}

/* 归并排序 */
// 核心：把数组分成左右两半，左右两半再递归，把左右两半通过大小对比合并到一起。
// 时间复杂度 O(nlog(n))
function mergeSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return mergeArr(mergeSort(left), mergeSort(right));
}

function mergeArr(leftArr, rightArr) {
  let i = 0,
    j = 0;
  const result = [];
  const leftLen = leftArr.length;
  const rightLen = rightArr.length;

  while (i < leftLen && j < rightLen) {
    if (leftArr[i] < rightArr[j]) {
      result.push(leftArr[i]);
      i++;
    } else {
      result.push(rightArr[j]);
      j++;
    }
  }

  return result.concat(leftArr.slice(i)).concat(rightArr.slice(j));
}

// console.log("归并排序：", mergeSort(arr));

/* 快速排序：原地交换 */
// 平均时间复杂度 O(nlog(n)) 空间复杂度 O(log(n))
function quickSort1(arr, left = 0, right = arr.length - 1) {
  if (arr.length <= 1) return arr;
  const lineIndex = partition(arr, left, right);
  if (left < lineIndex - 1) {
    quickSort1(arr, left, lineIndex - 1);
  }

  if (lineIndex < right) {
    quickSort1(arr, lineIndex, right);
  }

  return arr;
}

function partition(arr, left, right) {
  const baseIndex = Math.floor((left + right) / 2);
  const baseValue = arr[baseIndex];
  let i = left;
  let j = right;
  while (i <= j) {
    while (arr[i] < baseValue) {
      i++;
    }
    while (arr[j] > baseValue) {
      j--;
    }

    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }

  return i;
}

console.log("快速排序1：", quickSort1(arr));

/* 快速排序：非原地实现 */
// 核心：把数组按照基准数，分成大于基准数和小于基准数的两个子序列，两个子序列里重复同样操作，最后把子序列拼成完整数组。
// 平均时间复杂度 O(nlog(n)) 空间复杂度 O(n)
function quickSort2(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  const left = [];
  const right = [];
  const base = arr[0];
  // 注意从 1 开始
  for (let i = 1; i < len; i++) {
    const current = arr[i];
    if (current <= base) {
      left.push(current);
    } else {
      right.push(current);
    }
  }

  return [...quickSort2(left), base, ...quickSort2(right)];
}

console.log("快速排序2：", quickSort2(arr));

/* 内置方法 */
// 从小到大
arr.sort();
// arr.sort((x,y)=>x-y);

// 从大到小
arr.sort((x, y) => y - x);
