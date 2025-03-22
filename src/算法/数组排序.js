/* 排序：从小到大 */

const arr = [5, 1, 2, 4, 3];
/* 冒泡排序 */
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

/* 归并排序 */
// 时间复杂度 O(nlog(n))
function mergeSort(arr) {
  const len = arr.length;
  if (len === 1) {
    return arr;
  }

  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return mergeArr(mergeSort(left), mergeSort(right));
}

function mergeArr(arr1, arr2) {
  let i = 0,
    j = 0;
  const res = [];
  const len1 = arr1.length;
  const len2 = arr2.length;
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }

  if (i < len1) {
    return res.concat(arr1.slice(i));
  }

  if (j < len2) {
    return res.concat(arr2.slice(j));
  }

  return res;
}

// console.log("归并排序：", mergeSort(arr));

/* 快速排序1 */
// 平均时间复杂度 O(nlog(n))
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

/* 快速排序2 */
// 核心：把数组按照基准数，分成大于基准数和小于基准数的两个子序列，两个子序列里重复同样操作
// 最后把子序列拼成完整数组。
function quickSort2(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

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

  return [...quickSort2(left), base, ...quickSort2(right)];
}

console.log("快速排序2：", quickSort2(arr));

/* 内置方法 */
// 从小到大
arr.sort();
// arr.sort((x,y)=>x-y);

// 从大到小
arr.sort((x, y) => y - x);
