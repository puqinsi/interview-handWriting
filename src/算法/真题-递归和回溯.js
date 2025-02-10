/* 递归 */

/* 全排列 */
// 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。

// 方法一： 递归边界是第几项
// 不变的是每个排列的数字个数，变化的是数字的顺序
function permute(list) {
  const result = [];
  const current = [];
  const visited = {};
  const len = list.length;

  dfs(0);
  // 每次递归处理当前层（坑位）的所有排列
  function dfs(nth) {
    // 递归边界
    if (nth === len) {
      // 递归结束后，坑位都填满
      // 注意要返回一个新数组，因为 current 会改变
      result.push(current.slice());
      return;
    }

    // 递归式
    for (let i = 0; i < len; i++) {
      const value = list[i];
      // 因为遍历是所有元素，所以需要一个 visited 数组，记录已添加的元素
      if (visited[value]) return;

      visited[value] = 1;
      current.push(value);
      dfs(nth + 1);
      // 注意：（出坑）用过后要清掉，因为是同层遍历，应该互不干扰
      current.pop();
      visited[value] = 0;
    }
  }

  return result;
}

// 方法二：递归边界是数组长度
function permute2(list) {
  const result = [];
  const len = list.length;
  // 递归边界
  if (!len) return result;

  // 递归式
  for (let i = 0; i < len; i++) {
    const value = list[i];
    // 注意返回值的结构
    const nextResult = permute2(list.filter((_, index) => index !== i));
    const nextLen = nextResult.length;
    if (nextLen) {
      for (let j = 0; j < nextLen; j++) {
        result.push([value, ...nextResult[j]]);
      }
    } else {
      result.push([value]);
    }
  }

  return result;
}

// const list = [1, 2, 3];
// const result1 = permute(list);
// const result2 = permute2(list);
// console.log(result1, result2);

/* 组合 */
// 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。

// 方法一 实现简单，思维巧妙
// 不变的是可以组合的数字，变化的是每个数字是否存在
function subsets(list) {
  const result = [];
  const subset = [];
  const len = list.length;

  dfs(0);
  function dfs(index) {
    // 递归边界
    if (index === len) return;
    // 递归式
    // 1.当前数字在组合中存在
    subset.push(list[index]);
    // 组合变化，存入结果中
    result.push(subset.slice());
    dfs(index + 1);

    // 2.当前数字在组合中不存在
    subset.pop();
    dfs(index + 1);
  }

  return result;
}

// 方法二  逻辑清晰，实现过程复杂
// 相当于把长数组不断缩短，把结果拼起来
function subsets2(list) {
  const result = [];
  const len = list.length;
  if (!len) return result;

  const nextResult = subsets2(list.slice(1));
  const nextLen = nextResult.length;

  // 每个数字都有两种情况：1.存在 2.不存在
  const value = list[0];
  if (nextLen) {
    for (let j = 0; j < nextLen; j++) {
      result.push([value, ...nextResult[j]]);
      result.push([...nextResult[j]]);
    }
  } else {
    result.push([value]);
    result.push([]);
  }

  return result;
}

// const list = [1, 2, 3];
// const result1 = subsets(list);
// const result2 = subsets2(list);
// console.log(result1);
// console.log(result2);

/* 限定组合：及时回溯，即为剪枝 */
// 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
// 不变的是可以组合的数字，变化的是每个数字在规定的组合内是否存在
function combine(n, k) {
  const result = [];
  const subset = [];

  dfs(1);
  function dfs(index) {
    // 递归边界
    if (index > n) return;

    // 递归式
    // 1. 当前数在组合中存在
    subset.push(index);
    // 限定个数
    if (subset.length === k) {
      result.push(subset.slice());
    } else {
      dfs(index + 1);
    }

    // 2. 当前数在组合中不存在
    subset.pop();
    dfs(index + 1);
  }

  return result;
}
const result = combine(4, 2);
console.log(result);
