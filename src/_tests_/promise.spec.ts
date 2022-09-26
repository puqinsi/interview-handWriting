import { describe, expect, it, vi } from "vitest";
import { MyPromise } from "../promise";

describe("Basic Function", () => {
  // 1. 创建一个 MyPromise 类
  it("happy path", () => {
    const p = new MyPromise(() => {});

    expect(p).toBeInstanceOf(MyPromise);
  });

  // 2. 实现 then 方法
  it.skip("then function", () => {
    const p = new MyPromise((resolve: any, reject: any) => {
      resolve("resolve");
      reject("reject");
    });

    let result, reject;
    // 第一个参数 resolve 回调
    p.then((resolveVal: any) => {
      result = resolveVal;
    });

    expect(result).toBe("resolve");

    // 第二个参数 reject 回调
    p.then(null, (rejectVal: any) => {
      reject = rejectVal;
    });

    expect(reject).toBe("reject");

    // 第二个参数 reject 回调
    p.then(
      (resolveVal: any) => {
        result = resolveVal;
      },
      (rejectVal: any) => {
        reject = rejectVal;
      },
    );

    expect(result).toBe("resolve");
    expect(reject).toBe("reject");
  });

  // 3. then 方法只会执行先完成的处理函数的回调
  it("then cb only run one", () => {
    const p = new MyPromise((resolve: any, reject: any) => {
      resolve("resolve");
      reject("reject");
    });

    let result, reject;
    const resoleCb = vi.fn((resolveVal: any) => {
      result = resolveVal;
    });
    const rejectCb = vi.fn((rejectVal: any) => {
      reject = rejectVal;
    });
    p.then(resoleCb, rejectCb);

    expect(result).toBe("resolve");
    expect(reject).toBe(undefined);
    expect(resoleCb).toHaveBeenCalled();
    expect(rejectCb).not.toHaveBeenCalled();
  });

  // 4. then 方法等 Promise 状态变为已处理才执行
});
