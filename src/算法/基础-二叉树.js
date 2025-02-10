/* 实现 */
export class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = this.right = null;
  }
}

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

// console.log("root", root);
//     root
//   a       b
// c   d   e   f

// 1. 先序遍历-递归
function preTraverse1(root) {
  if (!root) {
    return;
  }
  console.log("当前节点：", root.value);

  preTraverse1(root.left);
  preTraverse1(root.right);
}

// console.log("先序遍历");
// preTraverse1(root);

// 1. 先序遍历-迭代-栈 结果：root->left->right
// root 特殊处理，push 出栈：left->right 入栈：right->left
function preTraverse2(root) {
  const result = [];
  if (!root) return result;
  const stack = [];
  // 先把根结点入栈
  stack.push(root);
  while (stack.length) {
    // 出栈
    const current = stack.pop();
    // 先序根结点在前面，所以用 push
    result.push(current.value);

    // 入栈（与出栈顺序相反）
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }

  return result;
}

// console.log("先序遍历迭代");
// console.log(preTraverse2(root));

// 2. 中序遍历-递归
function midTraverse1(root) {
  if (!root) {
    return;
  }

  midTraverse1(root.left);
  console.log("当前节点：", root.value);
  midTraverse1(root.right);
}

// console.log("中序遍历");
// midTraverse1(root);

// 2. 中序遍历-迭代 结果：left->root->right
// 中序遍历的迭代顺序与先后序遍历的迭代顺序不一样，先、后序遍历是从上到下（父到子），中序遍历是从下到上（子到父）回溯。
function minTraverse2(root) {
  const result = [];
  if (!root) return result;
  const stack = [];
  let current = root;
  // 两个条件都需要
  while (current || stack.length) {
    // 不断将左子结点入栈，直到最左子结点，然后再回溯
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // 出栈：左子结点->父结点->右子结点
    current = stack.pop();
    result.push(current.value);
    // 处理右结点
    current = current.right;
  }

  return result;
}

// console.log("中序遍历迭代");
// console.log(minTraverse2(root));

// 3. 后序遍历-递归
function postTraverse1(root) {
  if (!root) {
    return;
  }

  postTraverse1(root.left);
  postTraverse1(root.right);
  console.log("当前节点：", root.value);
}

// console.log("后序遍历");
// postTraverse1(root);

// 3. 后序遍历-迭代-栈 结果：left->right->root
// root 特殊处理，unshift 出栈: right->left  入栈: left->right
function postTraverse2(root) {
  const result = [];
  if (!root) return result;
  const stack = [];
  // 入栈
  stack.push(root);
  while (stack.length) {
    // 出栈
    const current = stack.pop();
    // 后序根结点在后面所以用 unshift
    result.unshift(current.value);

    // 入栈
    if (current.left) {
      stack.push(current.left);
    }
    if (current.right) {
      stack.push(current.right);
    }
  }

  return result;
}

// console.log("后序遍历迭代");
// console.log(postTraverse2(root));

/* BFS 队列 */
// 4. 层次遍历
function BFS(root) {
  if (!root) return;
  // 队列
  const queue = [];
  queue.push(root);

  while (queue.length) {
    const top = queue.shift();
    console.log("当前节点：", top.value);

    if (top.left) {
      queue.push(top.left);
    }

    if (top.right) {
      queue.push(top.right);
    }
  }
}

// console.log("层次遍历");
// BFS(root);

/* 翻转二叉树 */
function invertTree(root) {
  if (!root) return root;

  const right = invertTree(root.right);
  const left = invertTree(root.left);
  root.left = right;
  root.right = left;

  return root;
}

// console.log("翻转二叉树");
// const newRoot = invertTree(root);
// console.log(newRoot);
