// 题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注：n 为正整数

/* 解法一：递归-自顶向下 */
const f = [];
function climbStairs1(n) {
  // 已知状态
  if (n === 1) {
    return 1;
  }
  // 已知状态
  if (n === 2) {
    return 2;
  }

  // 状态关系
  if (f[n] === undefined) f[n] = climbStairs1(n - 1) + climbStairs1(n - 2);

  return f[n];
}

/* 解法二：动态规划-自下向顶 */
function climbStairs2(n) {
  // 初始化状态数组
  const f = [];
  // 初始化已知状态
  f[1] = 1;
  f[2] = 2;

  for (let i = 3; i <= n; i++) {
    // 状态转移方程
    f[i] = f[i - 1] + f[i - 2];
  }

  // 返回目结果
  return f[n];
}

// 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。
// 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
// 示例1：
// 输入: coins = [1, 2, 5], amount = 11
// 输出: 3
// 解释: 11 = 5 + 5 + 1

// 示例2：
// 输入: coins = [2], amount = 3
// 输出: -1

/* 解法一：动态规划-把所有解都列出来 */
function coinChange1(coins, amount) {
  // 保存每个目标总额对应的最小硬币个数
  const f = [];
  // 初始化已知状态
  f[0] = 0;

  const len = coins.length;
  for (let i = 1; i <= amount; i++) {
    f[i] = Infinity;
    for (let j = 0; j < len; j++) {
      if (coins[j] <= i) {
        // 状态转移方程
        f[i] = Math.min(f[i], f[i - coins[j]] + 1);
      }
    }
  }

  return f[amount] === Infinity ? -1 : f[amount];
}

console.log(coinChange1([1, 2, 5], 11));

/* 解法二：递归-自己理解 */
const f1 = [];
function coinChange2(coins, amount) {
  if (amount === 0) return 0;

  if (f1[amount] === undefined) {
    const len = coins.length;
    for (let i = 0; i < len; i++) {
      if (coins[i] <= amount) {
        const result = coinChange2(coins, amount - coins[i]);
        if (result !== -1) {
          // 状态转移方程
          f1[amount] =
            f1[amount] === undefined
              ? result + 1
              : Math.min(f1[amount], result + 1);
        }
      }
    }
  }

  return f1[amount] === undefined ? -1 : f1[amount];
}

console.log(coinChange2([1, 2, 5], 11));
