/* 手写Promise */
type CallBack = (value: any) => void;
type Executor = (resolve?: CallBack, reject?: CallBack) => void;

export class MyPromise {
  private executor: Executor; // 执行器,用于创建未处理的 Promise
  private resolveValue: any; // 已完成的返回值，同步执行时 then 函数会调用
  private rejectValue: any; // 已失败的返回值，同步执行时 then 函数会调用
  private PromiseState: string; // Promise 状态 未处理：Pending（进行中）；已处理：FulFilled 已完成，Rejected 已失败；
  private thenMap: Map<string, any>; // 存储 then 的回调函数，异步时处理函数会调用
  constructor(executor: Executor) {
    this.executor = executor;
    this.PromiseState = "Pending"; //
    this.thenMap = new Map();
    this.executor(this.resolve.bind(this), this.reject.bind(this));
  }

  // 已完成-处理函数
  private resolve(value: any) {
    console.log("Promise resolve");
    if (this.PromiseState === "Pending") {
      this.PromiseState = "FulFilled";
      this.resolveValue = value;

      triggerThenCb(this.thenMap, "resolve", value);
    }
  }

  // 已失败-处理函数
  private reject(value: any) {
    console.log("Promise reject");
    if (this.PromiseState === "Pending") {
      this.PromiseState = "Rejected";
      this.rejectValue = value;

      triggerThenCb(this.thenMap, "reject", value);
    }
  }

  then(resolveCb?: CallBack | null, rejectCb?: CallBack | null) {
    console.log("Promise then");
    if (!resolveCb && !rejectCb) {
      console.warn("缺少 Promise then 的回调函数");
    }

    const PromiseState = this.PromiseState;
    const thenMap = this.thenMap;
    if (resolveCb) {
      progressThen(
        PromiseState,
        "FulFilled",
        "resolve",
        resolveCb,
        this.resolveValue,
        thenMap,
      );
    }

    if (rejectCb) {
      progressThen(
        PromiseState,
        "Rejected",
        "reject",
        rejectCb,
        this.rejectValue,
        thenMap,
      );
    }

    return this;
  }
}

// then 函数处理
function progressThen(
  promiseState: string,
  processedState: string,
  key: string,
  callBack: CallBack,
  result: any,
  thenMap: Map<string, any>,
) {
  // 根据 PromiseState 判断 执行器 是异步执行还是同步执行，然后对应做不同处理
  // 如果 Promise 状态是已处理状态，同步处理直接执行回调，否则异步处理把回调函数存起来在处理函数中执行
  if (promiseState === processedState) {
    console.log("同步执行" + key);
    callBack(result);
  } else {
    let cbSet = thenMap.get(key);
    if (!cbSet) {
      cbSet = new Set();
      thenMap.set(key, cbSet);
    }

    cbSet.add(callBack);
  }
}

// 处理函数触发 then 回调
function triggerThenCb(thenMap: Map<string, any>, key: string, result: any) {
  const cbSet = thenMap.get(key);
  if (cbSet) {
    console.log("异步执行" + key);
    for (const cb of cbSet) {
      cb(result);
    }
  }
}
