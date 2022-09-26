import { describe, expect, it, vi } from "vitest";
import { MyPromise } from "../promise";

describe("Promise Basic", () => {
  // 1. 创建一个 MyPromise 类
  it("happy path", () => {
    const p = new MyPromise(() => {});

    expect(p).toBeInstanceOf(MyPromise);
  });

  // 2. 实现 then basic
  it("then basic", () => {
    // 第一个参数 resolve 回调
    const p1 = new MyPromise((resolve: any) => {
      resolve("resolve");
    });

    let result;
    p1.then((resolveVal: any) => {
      result = resolveVal;
    });
    expect(result).toBe("resolve");

    // 第二个参数 reject 回调
    const p2 = new MyPromise((resolve, reject: any) => {
      reject("reject");
    });

    let reject;
    p2.then(null, (rejectVal: any) => {
      reject = rejectVal;
    });
    expect(reject).toBe("reject");
  });

  // 3. then 方法只会执行先完成的处理函数的回调
  it("then cb only run one", () => {
    const p = new MyPromise((resolve: any, reject: any) => {
      resolve("resolve");
      reject("reject");
    });

    let resolve, reject;
    const resoleCb = vi.fn((resolveVal: any) => {
      resolve = resolveVal;
    });
    const rejectCb = vi.fn((rejectVal: any) => {
      reject = rejectVal;
    });
    p.then(resoleCb, rejectCb);

    expect(resolve).toBe("resolve");
    expect(reject).toBe(undefined);
    expect(resoleCb).toHaveBeenCalled();
    expect(rejectCb).not.toHaveBeenCalled();
  });

  // 4. then 的回调方法等 Promise 状态变为已处理才执行
  it.only("then async", async () => {
    vi.useFakeTimers();

    const p = new MyPromise((resolve: any, reject: any) => {
      setTimeout(() => {
        resolve("resolve");
        reject("reject");
      }, 500);
    });

    let resolve, reject;
    const resoleCb = vi.fn((resolveVal: any) => {
      resolve = resolveVal;
    });
    const rejectCb = vi.fn((rejectVal: any) => {
      reject = rejectVal;
    });
    p.then(resoleCb, rejectCb);

    vi.advanceTimersByTime(500);
    expect(resolve).toBe("resolve");
    expect(reject).toBe(undefined);
    expect(resoleCb).toHaveBeenCalled();
    expect(rejectCb).not.toHaveBeenCalled();
  });
});
