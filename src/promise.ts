/* 手写Promise */
type cb = (value: any) => void;
type Executor = (resolve?: cb, reject?: cb) => void;

export class MyPromise {
  private executor: Executor;
  private resolveValue: any;
  private rejectValue: any;
  private PromiseState: string;
  constructor(executor: Executor) {
    this.executor = executor;
    this.PromiseState = "Pending";
    this.executor(this.resolve.bind(this), this.reject.bind(this));
  }

  private resolve(value: any) {
    if (this.PromiseState === "Pending") {
      this.PromiseState = "FulFilled";
      this.resolveValue = value;
    }
  }

  private reject(value: any) {
    if (this.PromiseState === "Pending") {
      this.PromiseState = "Rejected";
      this.rejectValue = value;
    }
  }

  then(resolveCb?: cb | null, rejectCb?: cb | null) {
    if (!resolveCb && !rejectCb) {
      console.warn("缺少 Promise 处理的回调");
    }
    if (this.PromiseState === "FulFilled" && resolveCb) {
      resolveCb(this.resolveValue);
    }
    if (this.PromiseState === "Rejected" && rejectCb) {
      rejectCb(this.rejectValue);
    }
  }
}
