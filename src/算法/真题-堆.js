/* 优先队列 */
// 题目描述：在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 示例 1:
// 输入: [3,2,1,5,6,4] 和 k = 2
// 输出: 5

// 示例 2: 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
// 输出: 4

// 说明:
// 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

function findKthLargest(nums, k) {
  const heap = [];
  const len = nums.length;

  function createHeap() {
    for (let i = 0; i < k; i++) {
      heap[i] = nums[i];
      upSmallHeap(0, i);
    }
  }

  function updateHeap() {
    for (let i = k; i < len; i++) {
      if (nums[i] > heap[0]) {
        heap[0] = nums[i];
        downSmallHeap(0, k);
      }
    }
  }

  function downSmallHeap(low, high) {
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

  function upSmallHeap(low, high) {
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

  createHeap();
  updateHeap();

  return heap;
}
