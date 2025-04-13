/* 手写Promise */
type CallBack = (value: any) => void;
type Executor = (resolve?: CallBack, reject?: CallBack) => void;

// Promise 状态：未处理：Pending（进行中）；已处理：FulFilled 已完成，Rejected 已失败；
const enum StateTypes {
  PENDING = "Pending",
  FULFILLED = "Fulfilled",
  REJECTED = "Rejected"
}
// 回调函数类型，reject 失败回调；resolve 成功回调；
const enum CallBackTypes {
  RESOLVE = StateTypes.FULFILLED,
  REJECT = StateTypes.REJECTED
}

class MyPromise {
  private settledValue: any; // 处理程序的返回值
  private callBackMap: Map<string, any>; // 存储回调函数，异步时处理函数会调用
  private promiseState: any; // Promise 状态 未处理：Pending（进行中）；已处理：FulFilled 已完成，Rejected 已失败；
  constructor(executor: Executor) {
    this.promiseState = StateTypes.PENDING;
    this.callBackMap = new Map();

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error: any) {
      this.reject(error);
    }
  }

  // 已完成-处理函数
  private resolve(value: any) {
    console.log("Promise resolve");
    handleSettleFn(value, StateTypes.FULFILLED, this);
  }

  // 已失败-处理函数
  private reject(value: any) {
    console.log("Promise reject");
    handleSettleFn(value, StateTypes.REJECTED, this);
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
    // 返回 新Promise，处理函数绑定到当前 Promise 上，状态可以跟 原Promise 同步。
    return createReturnPromise(resolveCb, rejectCb, this);
  }

  catch(rejectCb?: any) {
    console.log("Promise catch");
    return createReturnPromise(undefined, rejectCb, this);
  }
}

/* 处理 */
function handleSettleFn(value: any, state: StateTypes, instance: any) {
  const { promiseState } = instance;
  if (promiseState !== StateTypes.PENDING) return;

  instance.settledValue = value;
  instance.promiseState = state;
  // 把收集的处理程序，添加到微任务队列，异步执行（用setTimeout代替微任务）
  setTimeout(() => {
    triggerCallBack(instance);
  }, 0);
}

function handleMultiplePromise(allPromise: any[], settlePromise: any) {
  return new MyPromise((resolve: any, reject: any) => {
    if (!Array.isArray(allPromise)) {
      reject(new TypeError("Argument is not iterable"));
    } else {
      // 按顺序执行传入的 Promise，核心：利用串联的 Promise
      settlePromise(allPromise, resolve, reject);
    }
  });
}

function handleAllPromise(allPromise: any[], resolve: any, reject: any) {
  const len = allPromise.length;
  if (len === 0) return resolve([]);

  let count = 0;
  const result: any[] = [];
  allPromise.forEach((promise, index) => {
    promise.then(
      (value: any) => {
        result[index] = value;
        count++;
        if (count === len) {
          resolve(result);
        }
      },
      (value: any) => {
        reject(value);
      }
    );
  });
}

function handleRacePromise(allPromise: any[], resolve: any, reject: any) {
  const len = allPromise.length;
  if (len === 0) return;

  allPromise.forEach(promise => {
    promise.then(
      (value: any) => {
        resolve(value);
      },
      (value: any) => {
        reject(value);
      }
    );
  });
}

function createReturnPromise(resolveCb: any, rejectCb: any, instance: any) {
  const promise = new MyPromise((resolve: any, reject: any) => {
    if (resolveCb) {
      const callback = handleCallBack.bind(
        instance,
        resolveCb,
        resolve,
        reject
      );
      trackCallBack(CallBackTypes.RESOLVE, callback, instance);
    }

    if (rejectCb) {
      const callback = handleCallBack.bind(instance, rejectCb, resolve, reject);
      trackCallBack(CallBackTypes.REJECT, callback, instance);
    } else {
      // 注意：如果没有拒绝处理程序，把错误往下传递
      const callback = () => {
        const { settledValue } = instance;
        reject(settledValue);
      };
      trackCallBack(CallBackTypes.REJECT, callback, instance);
    }
  });

  return promise;
}

function handleCallBack(this: any, callBack: any, resolve: any, reject: any) {
  try {
    const { settledValue } = this;
    const value: any = callBack(settledValue);
    if (value instanceof MyPromise) {
      value.then(
        (reValue: any) => {
          resolve(reValue);
        },
        (reValue: any) => {
          reject(reValue);
        }
      );
    } else {
      resolve(value);
    }
  } catch (error) {
    reject(error);
  }
}

function trackCallBack(
  callBackType: CallBackTypes,
  callBack: any,
  instance: any
) {
  const { promiseState, callBackMap } = instance;

  // 如果 Promise 状态是已处理状态，直接添加到微任务队列等待执行，把处理程序回调收集起来
  if (promiseState === callBackType) {
    setTimeout(() => {
      callBack();
    }, 0);
  } else {
    let callBackSet = callBackMap.get(callBackType);
    if (!callBackSet) {
      callBackSet = new Set();
      callBackMap.set(callBackType, callBackSet);
    }

    callBackSet.add(callBack);
  }
}

// 触发收集的回调函数
function triggerCallBack(instance: any) {
  const { callBackMap, promiseState } = instance;
  const callBackSet = callBackMap.get(promiseState);

  if (callBackSet) {
    for (const cb of callBackSet) {
      cb();
    }

    callBackSet.clear();
  }
}

export default MyPromise;
