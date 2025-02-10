import { TreeNode } from "./基础-二叉树.js";

const root = new TreeNode("root");
const a = new TreeNode("a");
const b = new TreeNode("b");
const c = new TreeNode("c");
const d = new TreeNode("d");
const e = new TreeNode("e");
const f = new TreeNode("f");
root.left = a;
a.left = c;
a.right = d;

root.right = b;
b.left = e;
b.right = f;

/* 层序遍历衍生问题 */
// 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）

function levelOrder(root) {
  const result = [];
  if (!root) return result;

  const queue = [];
  queue.push(root);

  // 每次遍历的都是同一层的结点
  while (queue.length) {
    const level = [];

    // 每次遍历把一层的都取完，这样把层次分开了
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      // 取队头元素
      const top = queue.shift();
      level.push(top.value);

      if (top.left) {
        queue.push(top.left);
      }
      if (top.right) {
        queue.push(top.right);
      }
    }

    result.push(level);
  }

  return result;
}

console.log("层次遍历衍生");
console.log(levelOrder(root));

/* 二叉搜索树 */
// 验证
// 题目描述：给定一个二叉树，判断其是否是一个有效的二叉搜索树。
// 假设一个二叉搜索树具有如下特征：
// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。

function isValidBST(root) {
  function dfs(root, minVal, maxVal) {
    if (!root) {
      return true;
    }

    const rootVal = root.value;
    if (rootVal <= minVal || rootVal >= maxVal) {
      return false;
    }
    // 巧妙的把最大值和最小值往左右子树传递下去了
    return dfs(root.left, minVal, rootVal) && dfs(root.right, rootVal, maxVal);
  }

  return dfs(root, -Infinity, Infinity);
}

//    5
//  4    6
//      3  7

// 题目描述：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1
// 示例: 给定有序数组: [-10,-3,0,5,9],
// 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

function sortedArrayToBST(nums) {
  if (nums.length === 0) return null;

  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));

  return root;
}

//     0
//  -3   5
// -10    9

/* 平衡二叉树 */
// 判定
// 题目描述：给定一个二叉树，判断它是否是高度平衡的二叉树。
// 本题中，一棵高度平衡二叉树定义为： 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
// 示例 1: 给定二叉树 [3,9,20,null,null,15,7]
// 示例 2: 给定二叉树 [1,2,2,3,3,null,null,4,4]

function isBalanced(root) {
  let flag = true;

  // 判断每个结点的左右子树的高度
  const dfs = root => {
    if (!root || !flag) return 0;

    const leftHeight = dfs(root.left);
    const rightHeight = dfs(root.right);
    if (Math.abs(leftHeight - rightHeight) > 1) flag = false;

    return Math.max(leftHeight, rightHeight) + 1;
  };

  dfs(root);
  return flag;
}

// 构造
// 题目描述：给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
// 如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是平衡的。
// 如果有多种构造方法，请你返回任意一种。

function balanceBst(root) {
  if (!root) return root;
  const array = [];

  function transformBSTToArray(root) {
    if (!root) return;
    transformBSTToArray(root.left);
    array.push(root.val);
    transformBSTToArray(root.right);
  }

  transformBSTToArray(root);
  return sortedArrayToBST(arr);
}
