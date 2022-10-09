/* 手写Promise */
type CallBack = (value: any) => void;
type Executor = (resolve?: CallBack, reject?: CallBack) => void;

// Promise 状态, 未处理：Pending（进行中）；已处理：FulFilled 已完成，Rejected 已失败；
const enum StateTypes {
  PENDING = "Pending",
  FULFILLED = "Fulfilled",
  REJECTED = "Rejected",
}
// 回调函数类型，reject 失败回调；resolve 成功回调；
const enum CallBackTypes {
  RESOLVE = "resolve",
  REJECT = "reject",
}

class MyPromise {
  private executor: Executor; // 执行器,用于创建未处理的 Promise
  private resolveValue: any; // 已完成的返回值，同步执行时 then 函数会调用
  private rejectValue: any; // 已失败的返回值，同步执行时 catch 函数会调用
  private callBackMap: Map<string, any>; // 存储回调函数，异步时处理函数会调用
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
    handleSettleFn(value, CallBackTypes.RESOLVE, this);
  }

  // 已失败-处理函数
  private reject(value: any) {
    console.log("Promise reject");
    handleSettleFn(value, CallBackTypes.REJECT, this);
  }

  static resolve(value: any) {
    console.log("static resolve");
    const promise = new MyPromise((resolve: any) => {
      resolve(value);
    });

    return promise;
  }

  static reject(value: any) {
    console.log("static reject");
    const promise = new MyPromise((resolve: any, reject: any) => {
      reject(value);
    });

    return promise;
  }

  static all(allPromise: any[]) {
    const promise = handleMultiplePromise(allPromise, handleAllPromise);

    return promise;
  }

  static race(allPromise: any[]) {
    const promise = handleMultiplePromise(allPromise, handleRacePromise);

    return promise;
  }

  then(resolveCb?: any, rejectCb?: any) {
    console.log("Promise then");
    if (!resolveCb && !rejectCb) {
      console.warn("缺少 Promise then 的回调函数");
      return;
    }

    // 返回 新Promise，处理函数绑定到当前 Promise 上，状态可以跟 原Promise 同步。
    const promise = createReturnPromise(resolveCb, rejectCb);

    if (resolveCb) {
      handleResolveCb(resolveCb, this);
    }

    if (rejectCb) {
      handleRejectCb(rejectCb, this);
    }

    return promise;
  }

  catch(rejectCb?: any) {
    console.log("Promise catch");
    if (!rejectCb) {
      console.warn("缺少 Promise catch 的回调");
      return;
    }

    const promise = createReturnPromise(undefined, rejectCb);

    handleRejectCb(rejectCb, this);

    return promise;
  }
}

/* 处理 */
function handleSettleFn(value: any, callBackType: string, instance: any) {
  const { PromiseState } = instance;
  if (PromiseState === StateTypes.PENDING) {
    let stateType;

    if (callBackType === CallBackTypes.RESOLVE) {
      stateType = StateTypes.FULFILLED;
      instance.resolveValue = value;
    } else {
      stateType = StateTypes.REJECTED;
      instance.rejectValue = value;
    }

    instance.PromiseState = stateType;

    triggerCallBack(callBackType, value, instance);
  }
}

function handleMultiplePromise(allPromise: any[], settlePromise: any) {
  return new MyPromise((resolve: any, reject: any) => {
    if (!allPromise || !Array.isArray(allPromise)) {
      throw new Error(`${allPromise} is not iterable`);
    } else {
      if (allPromise.length === 0) {
        resolve([]);
      } else {
        // 按顺序执行传入的 Promise，核心：利用串联的 Promise
        settlePromise(allPromise, resolve, reject);
      }
    }
  });
}

function handleRacePromise(allPromise: any[], resolve: any, reject: any) {
  let isSettled = false;

  for (let i = 0; i < allPromise.length; i++) {
    allPromise[i].then(
      (value: any) => {
        if (isSettled) return;
        resolve(value);
        isSettled = true;
      },
      (value: any) => {
        if (isSettled) return;
        reject(value);
        isSettled = true;
      },
    );
    if (isSettled) break;
  }
}

function handleAllPromise(allPromise: any[], resolve: any, reject: any) {
  const len = allPromise.length;
  let allRejected = false;

  // 判断是否全处理完成
  const allValue: any[] = [];
  let promise: any = allPromise[0];
  for (let i = 1; i <= len; i++) {
    promise = promise.then((value: any) => {
      if (allRejected) return;
      allValue.push(value);
      if (i < len) {
        return allPromise[i];
      } else {
        resolve(allValue);
      }
    });
    if (allRejected) break;
  }

  // 判断是否有处理失败
  for (let i = 0; i < len; i++) {
    const promise = allPromise[i];
    promise.catch((value: any) => {
      if (allRejected) return;
      reject(value);
      allRejected = true;
    });
    if (allRejected) break;
  }
}

function createReturnPromise(resolveCb: any, rejectCb: any) {
  const reProcess: any = {};
  let promise = new MyPromise((resolve: any, reject: any) => {
    reProcess[CallBackTypes.RESOLVE] = (value: any) => {
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

    reProcess[CallBackTypes.REJECT] = (error: any) =>
      reject({ message: error.message });
  });

  // 把返回 Promise 的处理函数绑定到当前回调函数上，保证执行时机一致
  if (resolveCb) resolveCb.reProcess = reProcess;
  if (rejectCb) rejectCb.reProcess = reProcess;

  return promise;
}

function handleRejectCb(callBack: any, instance: any) {
  handleCallBack(CallBackTypes.REJECT, callBack, instance);
}

function handleResolveCb(callBack: any, instance: any) {
  handleCallBack(CallBackTypes.RESOLVE, callBack, instance);
}

function handleCallBack(key: any, callBack: any, instance: any) {
  const { PromiseState, callBackMap, resolveValue, rejectValue } = instance;

  let processedState, result;
  if (key === CallBackTypes.RESOLVE) {
    processedState = StateTypes.FULFILLED;
    result = resolveValue;
  } else if (key === CallBackTypes.REJECT) {
    processedState = StateTypes.REJECTED;
    result = rejectValue;
  }

  // 根据 PromiseState 判断 执行器 是异步执行还是同步执行，然后对应做不同处理
  // 如果 Promise 状态是已处理状态，同步处理直接执行回调，否则异步处理把回调函数存起来在处理函数中执行
  if (PromiseState === processedState) {
    console.log("同步执行" + key);
    executeCallBack(callBack, result, instance);
  } else {
    let callBackSet = callBackMap.get(key);
    if (!callBackSet) {
      callBackSet = new Set();
      callBackMap.set(key, callBackSet);
    }

    callBackSet.add(callBack);
  }
}

// 触发收集的回调函数
function triggerCallBack(callBackType: any, value: any, instance: any) {
  const { callBackMap } = instance;
  const callBackSet = callBackMap.get(callBackType);

  if (callBackSet) {
    console.log("异步执行" + callBackType);
    for (const cb of callBackSet) {
      executeCallBack(cb, value, instance);
    }
  }
}

function executeCallBack(callBack: any, value: any, instance: any) {
  const { resolveValue } = instance;
  const { reProcess } = callBack;

  try {
    const reValue: any = callBack(value);

    if (reProcess)
      reProcess[CallBackTypes.RESOLVE](reValue ? reValue : resolveValue);
  } catch (error) {
    if (reProcess) reProcess[CallBackTypes.REJECT](error);
  }
}

export default MyPromise;
