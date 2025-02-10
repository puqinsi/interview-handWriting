// 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足： 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。
const leftToRight = {
  "(": ")",
  "{": "}",
  "[": "]"
};

function isValid(str) {
  if (!str) return true;
  const stack = [];
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const char = str[i];
    if (Object.keys(leftToRight).includes(char)) {
      // 如果是左括号
      // 将其对应的有括号推入栈中
      stack.push(leftToRight[char]);
    } else {
      // 如果不是左括号，期待是右括号
      // 栈为空说明没有左括号，不符合要求
      // 如果栈顶元素与当前元素不一样，说明字符串不对称，不符合要求
      if (!stack.length || char !== stack.pop()) {
        return false;
      }
    }
  }
  // 如果栈为空，说明括号都匹配，符合要求
  return !stack.length;
}

// const str1 = "({})";
// const str2 = "{})";
// console.log("str1", isValid(str1));
// console.log("str2", isValid(str2));

/* 栈进阶-每日温度 */
// 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。

// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
// 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
function dailyTemperatures(tList) {
  const len = tList.length;
  // 温度递减的下标栈（递减栈）
  const stack = [];
  const res = new Array(len).fill(0);
  for (let i = 0; i < len; i++) {
    // 如果当前温度，比栈顶的温度高，栈顶元素出栈
    while (stack.length && tList[i] > tList[stack[stack.length - 1]]) {
      const top = stack.pop();
      res[top] = i - top;
    }

    stack.push(i);
  }

  return res;
}

// const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
// const result = dailyTemperatures(temperatures);
// console.log("temperatures", result);

/* 最小栈 */
// 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// push(x) —— 将元素 x 推入栈中。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。
class MinStack {
  constructor() {
    this.stack = [];
    // 递减栈
    this.decreaseStack = [];
  }

  push(val) {
    this.stack.push(val);
    const len = this.decreaseStack.length;
    if (!len || (len && val <= this.decreaseStack[len - 1])) {
      this.decreaseStack.push(val);
    }
  }

  pop() {
    if (
      this.decreaseStack[this.decreaseStack.length - 1] === this.stack.pop()
    ) {
      this.decreaseStack.pop();
    }
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  // 时间复杂度 O(1)
  getMin() {
    return this.decreaseStack[this.decreaseStack.length - 1];
  }
}

// const minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// console.log(minStack.getMin());
// minStack.pop();
// console.log(minStack.top());
// console.log(minStack.getMin());
