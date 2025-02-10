// 题目描述：使用栈实现队列的下列操作：
// push(x) -- 将一个元素放入队列的尾部。
// pop() -- 从队列首部移除元素。
// peek() -- 返回队列首部的元素。
// empty() -- 返回队列是否为空。

// 示例: const queue = new MyQueue();
// queue.push(1);
// queue.push(2);
// queue.peek(); // 返回 1
// queue.pop(); // 返回 1
// queue.empty(); // 返回 false

// 说明:
// 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
// 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
// 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

// 思路：用栈实现队列，就是想办法让栈底的元素首先被取出，也就是让出栈序列被逆序。
class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  push(val) {
    this.stack1.push(val);
  }

  pop() {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }

    return this.stack2.pop();
  }

  peek() {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }

    const len = this.stack2.length;
    return len && this.stack2[len - 1];
  }

  empty() {
    return !this.stack1.length && !this.stack2.length;
  }
}

// const queue = new MyQueue();
// queue.push(1);
// queue.push(2);
// console.log(queue.peek()); // 返回 1
// console.log(queue.pop()); // 返回 1
// console.log(queue.empty()); // 返回 false

/* 滑动窗口 */
// 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

// 示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]

// 解释: 滑动窗口的位置
// ---------------
// [1 3 -1] -3 5 3 6 7
// 1 [3 -1 -3] 5 3 6 7
// 1 3 [-1 -3 5] 3 6 7
// 1 3 -1 [-3 5 3] 6 7
// 1 3 -1 -3 [5 3 6] 7
// 1 3 -1 -3 5 [3 6 7]

// 最大值分别对应：
// 3 3 5 5 6 7

// 提示：你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。

// 方法一：遍历
// 复杂度 O(kn);（n-k+1)*k = kn-k^2+k
function maxSlidingWindow(list, k) {
  const len = list.length;
  const maxList = [];
  for (let i = 0; i < len - k + 1; i++) {
    const slidingList = list.slice(i, k + i);
    for (let j = 0; j < k; j++) {
      const current = slidingList[j];
      const max = maxList[i];
      if (!max || (max && max < current)) {
        maxList[i] = current;
      }
    }
  }

  return maxList;
}

// 方法二：双指针
// 复杂度也是  O(kn)
function maxSlidingWindow2(list, k) {
  const len = list.length;
  const maxList = [];
  let leftIndex = 0;
  let rightIndex = k - 1;
  while (rightIndex < len) {
    const max = callMax(list, leftIndex, rightIndex);
    maxList.push(max);
    leftIndex++;
    rightIndex++;
  }

  return maxList;
}

function callMax(arr, left, right) {
  if (!arr || !arr.length) return;
  let max = arr[left];
  for (let i = left; i <= right; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// 方法三：双端队列
// 时间复杂度 O(n)
function maxSlidingWindow3(list, k) {
  const len = list.length;
  const maxList = [];
  const deque = [];
  for (let i = 0; i < len; i++) {
    const current = list[i];
    // 保持双端队列是一个递减队列，这样就可以保持队列头部是最大值
    while (deque.length && list[deque[deque.length - 1]] < current) {
      deque.pop();
    }
    deque.push(i);

    // 如果队列头部元素属于上一个窗口，从队列头部删除
    if (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }

    // 从第 k 个（第一个窗口的最后一个）开始记录
    if (i >= k - 1) {
      maxList.push(list[deque[0]]);
    }
  }
  return maxList;
}

const list = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
const result = maxSlidingWindow(list, k);
const result2 = maxSlidingWindow2(list, k);
const result3 = maxSlidingWindow3(list, k);
console.log(result, result2, result3);
