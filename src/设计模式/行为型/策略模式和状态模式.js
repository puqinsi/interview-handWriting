/* 使用策略模式进行代码重构 */

// demo：一个发奖金函数
function bonus(type, base) {
  if (type === "普通员工") {
    return base * 3;
  } else if (type === "组长") {
    return base * 2;
  } else if (type === "经理") {
    return base;
  }
}

// 重构demo
// 单一职责原则：对象中每一项可以根据其复杂程度进行封装，满足
// 开闭原则：在该映射对象中去拓展，优化了代码结构，也使其可拓展，不会原逻辑中不断增加 if-else
const typeToBonusMap = {
  普通员工: base => base * 3,
  组长: base => base * 1,
  经理: base => base
};

function newBonus(type, base) {
  return typeToBonusMap[type](base);
}

/* 状态模式 */
// 例子摘自掘金小册《JavaScript 设计模式核心原理与应用实践》
class CoffeeMaker {
  constructor() {
    /*这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑*/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
    // 初始化牛奶的存储量
    this.leftMilk = "500ml";
  }

  // 该映射对象和策略模式中映射对象类似，不同的是状态模式中的行为函数与对象实例相关联
  stateToProcessor = {
    that: this, // 核心：保存对象实例，与其方法关联
    american() {
      // 尝试在行为函数里拿到咖啡机实例的信息并输出
      console.log("咖啡机现在的牛奶存储量是:", this.that.leftMilk);
      console.log("我只吐黑咖啡");
    },
    latte() {
      this.american();
      console.log("加点奶");
    },
    vanillaLatte() {
      this.latte();
      console.log("再加香草糖浆");
    },
    mocha() {
      this.latte();
      console.log("再加巧克力");
    }
  };

  // 关注咖啡机状态切换函数
  changeState(state) {
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    }
    this.stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");
