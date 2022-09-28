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
  private PromiseState: any; // Promise 状态 未处理：Pending（进行中）；已处理：FulFilled 已完成，Rejected 已失败；
  private callBackMap: Map<string, any>; // 存储回调函数，异步时处理函数会调用
  constructor(executor: Executor) {
    this.executor = executor;
    this.PromiseState = StateTypes.PENDING;
    this.callBackMap = new Map();
    this.executor(this.resolve.bind(this), this.reject.bind(this));
  }

  // 已完成-处理函数
  private resolve(value: any) {
    console.log("Promise resolve");
    if (this.PromiseState === StateTypes.PENDING) {
      this.PromiseState = StateTypes.FulFilled;
      this.resolveValue = value;

      triggerCallBack(this.callBackMap, CallBackTypes.RESOLVE, value);
    }
  }

  // 已失败-处理函数
  private reject(value: any) {
    console.log("Promise reject");
    if (this.PromiseState === StateTypes.PENDING) {
      this.PromiseState = StateTypes.REJECTED;
      this.rejectValue = value;

      triggerCallBack(this.callBackMap, CallBackTypes.REJECT, value);
    }
  }

  then(resolveCb?: CallBack | null, rejectCb?: CallBack | null) {
    console.log("Promise then");
    if (!resolveCb && !rejectCb) {
      console.warn("缺少 Promise then 的回调函数");
      return;
    }

    if (resolveCb) {
      progressResolveCb(this, resolveCb);
    }

    if (rejectCb) {
      progressRejectCb(this, rejectCb);
    }

    return this;
  }

  catch(rejectCb?: CallBack | null) {
    if (!rejectCb) {
      console.warn("缺少 Promise catch 的回调");
      return;
    }

    progressRejectCb(this, rejectCb);

    return this;
  }
}

function progressRejectCb(instance: any, callBack: CallBack) {
  progressCallBack(instance, CallBackTypes.REJECT, callBack);
}

function progressResolveCb(instance: any, callBack: CallBack) {
  progressCallBack(instance, CallBackTypes.RESOLVE, callBack);
}

// 回调函数处理
function progressCallBack(instance: any, key: any, callBack: CallBack) {
  const { PromiseState, callBackMap, resolveValue, rejectValue } = instance;

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
    callBack(result);
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
function triggerCallBack(callBackMap: Map<string, any>, key: any, result: any) {
  const callBackSet = callBackMap.get(key);
  if (callBackSet) {
    console.log("异步执行" + key);
    for (const cb of callBackSet) {
      cb(result);
    }
  }
}
