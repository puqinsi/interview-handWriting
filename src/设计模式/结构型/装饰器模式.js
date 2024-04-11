/* es6 实现 */
class Player {
  play() {
    console.log("唱歌");
  }
}

class Decorator {
  constructor(player) {
    this.player = player;
  }

  play() {
    this.player.play();
    this.dance();
  }

  dance() {
    console.log("跳舞");
  }
}

const player = new Player();
const decorator = new Decorator(player);
decorator.play();

/* es7 */
// target：被装饰者的原型对象，因为装饰器函数执行时，被装饰者的实例还不存在（装饰器函数则是在编译阶段就执行了）
// name：属性名
// descriptor：“属性描述对象”，修改 descriptor，就可以对目标方法的逻辑进行拓展了
// 1. 装饰类
function decorator1(target) {
  target.name = "表演者";
  return target;
}

@decorator1
class Player1 {
  play() {
    console.log("唱歌");
  }
}

console.log(Player1.name);

// 2. 处理 class 属性
function propertyDecorator(defaultValue) {
  return (target, name) => {
    // 不存在的属性设置默认值
    if (!target[name]) {
      target[name] = defaultValue;
    }
  };
}

class Person {
  @propertyDecorator("defaultValue")
  name;
}

// 3. 处理函数参数
function paramsDecorator(target, name, descriptor) {
  const oldValue = descriptor.value;
  descriptor.value = (...args) => {
    // 处理参数逻辑
    // ...
    return oldValue.apply(this, args);
  };
  return descriptor;
}

class Person {
  @paramsDecorator
  playBall(ballName) {
    console.log(ballName);
  }
}

// 4. 处理函数返回值
function returnValueDecorator(target, name, descriptor) {
  const oldValue = descriptor.value();
  descriptor.value = (...args) => {
    let result = oldValue.apply(this, args);
    // 处理返回值逻辑
    // ...
    return result;
  };
  return descriptor;
}

class Person {
  @returnValueDecorator
  playBall(ballName) {
    return ballName;
  }
}

// 5. 修改函数调用时机
function hookDescriptor(beforeCallBack, afterCallBack) {
  return (target, name, descriptor) => {
    const oldValue = descriptor.value;
    descriptor.value = (...args) => {
      // 前置钩子
      beforeCallBack();
      const result = oldValue.apply(this, args);
      // 后置钩子
      afterCallBack(result);
      return result;
    };

    return descriptor;
  };
}

class Person {
  @returnValueDecorator(
    () => {
      console.log("前置钩子");
    },
    result => {
      console.log(`后置钩子，函数结果${result}`);
    }
  )
  playBall(ballName) {
    return ballName;
  }
}
