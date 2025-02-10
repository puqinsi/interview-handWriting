/* 合并 */
// 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
// 示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4

import { ListNode } from "./基础-链表.js";

function mergeTwoLists(list1, list2) {
  const head = new ListNode();
  let current = head;
  while (list1 && list2) {
    if (list1.value <= list2.value) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 ? list1 : list2;

  return head.next;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(4);
// node1.next = node2;
// node2.next = node3;

// const node4 = new ListNode(1);
// const node5 = new ListNode(3);
// const node6 = new ListNode(4);
// node4.next = node5;
// node5.next = node6;

// const mergedList = mergeTwoLists(node1, node4);
// console.log("合并：", mergedList);

/* 删除 */
// 真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

// 示例 1:
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3

// 注意判断条件，很容易混乱
function deleteDuplicates(head) {
  let current = head;
  while (current && current.next) {
    if (current.value === current.next.value) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(1);
// const node3 = new ListNode(2);
// const node4 = new ListNode(3);
// const node5 = new ListNode(3);
// const node6 = new ListNode(3);
// const node7 = new ListNode(4);
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;
// node5.next = node6;
// node6.next = node7;

// const resultList = deleteDuplicates(node1);
// console.log("delete:", resultList);

/* 删除 */
// 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
// 示例 1:
// 输入: 1->2->3->3->4->4->5
// 输出: 1->2->5
// 示例 2:
// 输入: 1->1->1->2->3
// 输出: 2->3

function deleteAllDuplicates(head) {
  // 加入一个假节点作为首节点，因为传入的链表第一个节点也可能被删除。
  const dummy = new ListNode();
  dummy.next = head;

  let current = dummy;
  while (current.next && current.next.next) {
    if (current.next.value === current.next.next.value) {
      const value = current.next.value;
      current.next = current.next.next.next;
      while (current.next && value === current.next.value) {
        current.next = current.next.next;
      }
    } else {
      current = current.next;
    }
  }

  return dummy.next;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(1);
// const node3 = new ListNode(2);
// const node4 = new ListNode(3);
// const node5 = new ListNode(3);
// const node6 = new ListNode(3);
// const node7 = new ListNode(4);
// const node8 = new ListNode(4);
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;
// node5.next = node6;
// node6.next = node7;
// node7.next = node8;
// const resultList = deleteAllDuplicates(node1);
// console.log("delete:", resultList);

/* 删除链表倒数第n个节点-快慢指针 */
// 真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 示例： 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个结点后，链表变为 1->2->3->5.
// 说明： 给定的 n 保证是有效的。

// 分析：
// 倒数第 n 个，正数第 len-n+1 个。因为删除要在前一个节点操作，所以操作的是第 len-n+1-1 = len - n 个
// 所以快指针走到最后 len 步时，慢指针走到第 len-n 步，慢指针比快指针晚 n 步。

// 写法一
function removeNthFromEnd1(head, n) {
  const dummy = new ListNode();
  dummy.next = head;

  let slowNode = dummy;
  let fastNode = dummy;

  while (n !== 0) {
    fastNode = fastNode.next;
    n--;
  }

  while (fastNode.next) {
    fastNode = fastNode.next;
    slowNode = slowNode.next;
  }

  slowNode.next = slowNode.next.next;
  return dummy.next;
}

// 写法二
function removeNthFromEnd2(head, n) {
  const dummy = new ListNode();
  dummy.next = head;

  let slowNode = dummy;
  let fastNode = dummy;

  let count = 0;
  while (fastNode.next) {
    fastNode = fastNode.next;
    count++;
    if (count > n) {
      slowNode = slowNode.next;
    }
  }

  slowNode.next = slowNode.next.next;
  return dummy.next;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);
// const node4 = new ListNode(4);
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;

// const result = removeNthFromEnd2(node1, 2); // 1、2、4
// console.log("倒数：", result);

/* 反转-多指针 */
// 真题描述：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。

// 示例:
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

// 遍历
function reverseList1(head) {
  let pre = null;
  let current = head;
  while (current) {
    // 先把当前指针指向的节点存起来
    let next = current.next;
    // 把当前指针反转，指向之前的节点
    current.next = pre;
    // 把之前的节点前进，更新之前的节点
    pre = current;
    // 当前节点前进
    current = next;
  }

  return pre;
}

// 递归
function reverseList2(head, pre) {
  if (!pre) pre = null;
  if (head) {
    // 先把当前指针指向的节点存起来
    const next = head.next;
    // 把当前指针反转，指向之前的节点
    head.next = pre;
    // 把之前的节点前进，更新之前的节点
    pre = head;
    // 当前节点前进
    return reverseList2(next, pre);
  }

  return pre;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);
// const node4 = new ListNode(4);
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// const result = reverseList2(node1);
// console.log("反转", result);

/* 局部反转 */
// 真题描述：反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

// 说明: 1 ≤ m ≤ n ≤ 链表长度。

// 示例:
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL

function localReverseList(head, m, n) {
  const dummy = new ListNode();
  dummy.next = head;
  let current = dummy;
  let basePre, first, pre;

  let count = 0;
  while (count <= n) {
    let next = current.next;
    if (count === m - 1) {
      basePre = current;
      first = next;
      pre = next;
    }

    if (count > m) {
      current.next = pre;
      pre = current;
    }
    current = next;
    count++;
  }

  basePre.next = pre;
  first.next = current;

  return basePre;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);
// const node4 = new ListNode(4);
// const node5 = new ListNode(5);
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;
// const result = localReverseList(node1, 1, 4);
// console.log("局部反转", result);

/* 成环 */
// 真题描述：给定一个链表，判断链表中是否有环。
// 判断是否成环
function hasCycle(head) {
  while (head) {
    if (head.flag) {
      return true;
    } else {
      head.flag = true;
      head = head.next;
    }
  }

  return false;
}

// 快慢指针，快指针是慢指针的两倍
function hasCycle2(head) {
  let slow = head;
  let fast = head.next;

  while (slow && fast) {
    if (slow === fast) {
      return true;
    }
    slow = slow.next;
    fast = fast.next ? fast.next.next : null;
  }

  return false;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// node1.next = node2;
// node2.next = node1;
// const result = hasCycle2(node1);
// console.log("hasCycle: ", result);

// 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。
// 判断成环起点
function detectCycle(head) {
  while (head) {
    if (head.flag) {
      return head;
    } else {
      head.flag = true;
      head = head.next;
    }
  }

  return null;
}

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);
// const node4 = new ListNode(4);
// node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node2;
// const result = detectCycle(node1);
// console.log("detectCycle: ", result);
