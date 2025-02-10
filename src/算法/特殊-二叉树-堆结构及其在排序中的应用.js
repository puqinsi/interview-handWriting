/* 堆：完全二叉树特例 */
// 删除堆顶元素
// 思路：删除堆顶元素后，用最后一位补到堆顶，然后用新堆顶元素不断和左右孩子结点比较和交换。
const heap = [9, 8, 6, 3, 1];

// 大顶堆
export function downBigHeap(low, high) {
  let i = low;
  let j = 2 * i + 1;
  while (j <= high) {
    if (j + 1 <= high && heap[j] < heap[j + 1]) {
      j = j + 1;
    }

    if (heap[i] < heap[j]) {
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
      i = j;
      j = 2 * i + 1;
    } else {
      break;
    }
  }
}

// 小顶堆
export function downSmallHeap(low, high) {
  let i = low;
  let j = 2 * i + 1;
  while (j <= high) {
    if (j + 1 <= high && heap[j] > heap[j + 1]) {
      j = j + 1;
    }

    if (heap[i] > heap[j]) {
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
      i = j;
      j = 2 * i + 1;
    } else {
      break;
    }
  }
}

// 往堆里追加元素（大顶堆为例，小顶堆同理）
// 思路：把新元素加入到堆底，然后用堆底元素和父结点比较和交换。

// 大顶堆
export function upBigHeap(low, high) {
  let i = high;
  let j = Math.floor((i - 1) / 2);

  while (j >= low) {
    if (heap[i] > heap[j]) {
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
      i = j;
      j = Math.floor((i - 1) / 2);
    } else {
      break;
    }
  }
}

// 小顶堆
export function upSmallHeap(low, high) {
  let i = high;
  let j = Math.floor((i - 1) / 2);

  while (j >= low) {
    if (heap[i] < heap[j]) {
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;
      i = j;
      j = Math.floor((i - 1) / 2);
    } else {
      break;
    }
  }
}
