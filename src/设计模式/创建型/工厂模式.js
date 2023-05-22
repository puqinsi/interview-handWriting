/* 目的：实现无脑传参 */

/* 简单工厂 */
// 方案 1，劣：对变化部分和不变部分没有分离
function VipMan() {
  this.identity = "vip";
  this.role = ["修改密码", "发布消息", "查看主页"];
}

function CommonMan() {
  this.identity = "common";
  this.role = ["查看主页"];
}

function factory1(identity) {
  let user;
  switch (identity) {
    case "vip":
      user = new VipMan();
      break;
    case "common":
      user = new CommonMan();
      break;
    default:
      throw new Error("参数错误");
  }

  return user;
}

// 方案 2，优：更好的封装了变化和不变的部分
function User(identity, role) {
  this.identity = identity;
  this.role = role;
}

function factory(identity) {
  switch (identity) {
    case "vip":
      role = ["修改密码", "发布消息", "查看主页"];
      break;
    case "common":
      role = ["查看主页"];
      break;
    default:
      role = [];
      break;
  }

  return new User(identity, role);
}

/* 抽象工厂 */
// 抽象工厂
class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
  // 提供硬件的接口
  createHardWare() {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}

// 具体工厂
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
    return new AndroidOS();
  }

  createHardWare() {
    return new QualcommHardWare();
  }
}

// 定义操作系统这类产品的抽象产品类
class OS {
  controlHardWare() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
  controlHardWare() {
    console.log("我会用安卓的方式去操作硬件");
  }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
    throw new Error("抽象产品方法不允许直接调用，你需要将我重写！");
  }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log("我会用高通的方式去运转");
  }
}

// 我的手机
const myPhone = new FakeStarFactory();
// 拥有操作系统
const myOS = myPhone.createOS();
// 拥有硬件
const myHardWare = myPhone.createHardWare();
// 启动操作系统
myOS.controlHardWare();
// 运行硬件
myHardWare.operateByOrder();
