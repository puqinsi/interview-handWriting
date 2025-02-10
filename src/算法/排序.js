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

console.log("归并排序：", mergeSort(arr));

/* 插入排序 */
