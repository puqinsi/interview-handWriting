/* 手写Promise */
type CallBack = (value: any) => void;
type Executor = (resolve?: CallBack, reject?: CallBack) => void;

// Promise 状态, 未处理：Pending（进行中）；已处理：FulFilled 已完成，Rejected 已失败；
const enum StateTypes {
  PENDING = "Pending",
  FulFilled = "Fulfilled",
  REJECTED = "Rejected",
}
// 回调函数类型，reject 失败回调；resolve 成功回调；
const enum CallBackTypes {
  RESOLVE = "resolve",
  REJECT = "reject",
}

export class MyPromise {
  private executor: Executor; // 执行器,用于创建未处理的 Promise
  private resolveValue: any; // 已完成的返回值，同步执行时 then 函数会调用
  private rejectValue: any; // 已失败的返回值，同步执行时 then 函数会调用
  private callBackMap: Map<string, any>; // 存储回调函数，异步时处理函数会调用
  private reProcess: any = {};
  private PromiseState: any; // Promise 状态 未处理：Pending（进行中）；已处理：FulFilled 已完成，Rejected 已失败；
  constructor(executor: Executor) {
    this.executor = executor;
    this.PromiseState = StateTypes.PENDING;
    this.callBackMap = new Map();

    try {
      this.executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error: any) {
      this.reject({ message: error.message });
    }
  }

  // 已完成-处理函数
  private resolve(value: any) {
    console.log("Promise resolve");
    if (this.PromiseState === StateTypes.PENDING) {
      this.PromiseState = StateTypes.FulFilled;
      this.resolveValue = value;

      triggerCallBack(CallBackTypes.RESOLVE, value, this);
    }
  }

  // 已失败-处理函数
  private reject(value: any) {
    console.log("Promise reject");
    if (this.PromiseState === StateTypes.PENDING) {
      this.PromiseState = StateTypes.REJECTED;
      this.rejectValue = value;

      triggerCallBack(CallBackTypes.REJECT, value, this);
    }
  }

  static resolve(value: any) {
    console.log("static resolve");
    const p = new MyPromise((resolve: any) => {
      resolve(value);
    });

    return p;
  }

  static reject(value: any) {
    console.log("static reject");
    const p = new MyPromise((resolve: any, reject: any) => {
      reject(value);
    });

    return p;
  }

  then(resolveCb?: any, rejectCb?: any) {
    console.log("Promise then");
    if (!resolveCb && !rejectCb) {
      console.warn("缺少 Promise then 的回调函数");
      return;
    }

    // 返回 新Promise，处理函数绑定到原来回调函数上，状态可以跟 原Promise 同步。
    const rp = createReturnPromise(this);

    if (resolveCb) {
      progressResolveCb(resolveCb, this);
    }

    if (rejectCb) {
      progressRejectCb(rejectCb, this);
    }

    return rp;
  }

  catch(rejectCb?: any) {
    console.log("Promise catch");
    if (!rejectCb) {
      console.warn("缺少 Promise catch 的回调");
      return;
    }

    const rp = createReturnPromise(this);

    progressRejectCb(rejectCb, this);

    return rp;
  }
}

function createReturnPromise(instance: any) {
  let p = new MyPromise((resolve: any, reject: any) => {
    instance.reProcess[CallBackTypes.RESOLVE] = (value: any) => {
      // 如果值是返回的 Promise
      if (value instanceof MyPromise) {
        const rePromise = value;
        rePromise.then(
          (reValue: any) => {
            resolve(reValue);
          },
          (reValue: any) => {
            reject(reValue);
          },
        );
      } else {
        resolve(value);
      }
    };

    instance.reProcess[CallBackTypes.REJECT] = (error: any) =>
      reject({ message: error.message });
  });
  return p;
}

function progressRejectCb(callBack: any, instance: any) {
  progressCallBack(CallBackTypes.REJECT, callBack, instance);
}

function progressResolveCb(callBack: any, instance: any) {
  progressCallBack(CallBackTypes.RESOLVE, callBack, instance);
}

// 回调函数处理
function progressCallBack(key: any, callBack: any, instance: any) {
  const { PromiseState, callBackMap, resolveValue, rejectValue, reProcess } =
    instance;

  let processedState, result;
  if (key === CallBackTypes.RESOLVE) {
    processedState = StateTypes.FulFilled;
    result = resolveValue;
  } else if (key === CallBackTypes.REJECT) {
    processedState = StateTypes.REJECTED;
    result = rejectValue;
  }

  // 根据 PromiseState 判断 执行器 是异步执行还是同步执行，然后对应做不同处理
  // 如果 Promise 状态是已处理状态，同步处理直接执行回调，否则异步处理把回调函数存起来在处理函数中执行
  if (PromiseState === processedState) {
    console.log("同步执行" + key);
    executeCallBack(callBack, result, reProcess, instance);
  } else {
    let callBackSet = callBackMap.get(key);
    if (!callBackSet) {
      callBackSet = new Set();
      callBackMap.set(key, callBackSet);
    }

    callBackSet.add(callBack);
  }
}

// 处理函数触发收集的回调函数
function triggerCallBack(key: any, result: any, instance: any) {
  const { callBackMap, reProcess } = instance;
  const callBackSet = callBackMap.get(key);
  if (callBackSet) {
    console.log("异步执行" + key);
    for (const cb of callBackSet) {
      executeCallBack(cb, result, reProcess, instance);
    }
  }
}

function executeCallBack(
  callBack: any,
  result: any,
  reProcess: any,
  instance: any,
) {
  try {
    const reValue: any = callBack(result);

    reProcess[CallBackTypes.RESOLVE](reValue ? reValue : instance.resolveValue);
  } catch (error) {
    reProcess[CallBackTypes.REJECT](error);
  }
}
