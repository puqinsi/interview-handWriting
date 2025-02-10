import { TreeNode } from "./基础-二叉树.js";

const root1 = new TreeNode(6);
const a1 = new TreeNode(4);
const b1 = new TreeNode(8);
const c1 = new TreeNode(3);
const d1 = new TreeNode(5);
const e1 = new TreeNode(7);
const f1 = new TreeNode(9);
const g1 = new TreeNode(2);
const h1 = new TreeNode(4);
root1.left = a1;
root1.right = b1;
a1.left = c1;
a1.right = d1;
b1.left = e1;
b1.right = f1;
c1.left = g1;
c1.right = h1;
//          6
//      4       8
//    3   5   7   9
//   2 4

// 1. 查找数据域为特定值的结点
function search(root, n) {
  if (!root) return root;

  if (root.value === n) {
    return root;
  } else if (root.value > n) {
    return search(root.left, n);
  } else if (root.value < n) {
    return search(root.right, n);
  }
}

console.log("搜索");
const result = search(root1, 8);
console.log(result);

// 2. 插入新节点
function insertIntoBST(root, n) {
  if (!root) {
    root = new TreeNode(n);
    return root;
  }

  if (root.value > n) {
    root.left = insertIntoBST(root.left, n);
  } else {
    root.right = insertIntoBST(root.right, n);
  }

  return root;
}

// console.log("插入");
// const insertedRoot = insertIntoBST(root1, 8);
// console.log(insertedRoot);

// 3. 删除指定结点
function deleteNode(root, n) {
  if (!root) return root;
  if (root.value === n) {
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      const maxLeft = findMax(root.left);
      root.value = maxLeft.value;
      root.left = deleteNode(root.left, maxLeft.value);
    } else {
      const minRight = findMin(root.right);
      root.value = minRight.value;
      root.right = deleteNode(root.right, minRight.value);
    }
  } else if (root.value < n) {
    root.right = deleteNode(root.right, n);
  } else {
    root.left = deleteNode(root.left, n);
  }

  return root;
}

function findMin(root) {
  while (root.left) {
    root = root.left;
  }

  return root;
}

function findMax(root) {
  while (root.right) {
    root = root.right;
  }

  return root;
}

// console.log("删除");
// const deletedRoot = deleteNode(root1, 4);
// console.log(deletedRoot);
