import { MyPromise } from "../src/promise";

describe("Promise Basic", () => {
  // 1. 创建一个 MyPromise 类
  it("happy path", () => {
    const p = new MyPromise(() => {});

    expect(p).toBeInstanceOf(MyPromise);
  });

  // 2. then 方法
  describe("then", () => {
    // 2.1 实现 then basic
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

    // 2.2 then 方法只会执行先完成的处理函数的回调
    it("then cb only run one", () => {
      const p = new MyPromise((resolve: any, reject: any) => {
        resolve("resolve");
        reject("reject");
      });

      let resolve, reject;
      const resolveCb = vi.fn((resolveVal: any) => {
        resolve = resolveVal;
      });
      const rejectCb = vi.fn((rejectVal: any) => {
        reject = rejectVal;
      });
      p.then(resolveCb, rejectCb);

      expect(resolve).toBe("resolve");
      expect(reject).toBe(undefined);
      expect(resolveCb).toHaveBeenCalled();
      expect(rejectCb).not.toHaveBeenCalled();
    });

    // 2.3. then 的回调方法等 Promise 状态变为已处理才执行
    it("then async", async () => {
      vi.useFakeTimers();

      const p = new MyPromise((resolve: any, reject: any) => {
        setTimeout(() => {
          resolve("resolve");
          reject("reject");
        }, 500);
      });

      let resolve, reject;
      const resolveCb = vi.fn((resolveVal: any) => {
        resolve = resolveVal;
      });
      const rejectCb = vi.fn((rejectVal: any) => {
        reject = rejectVal;
      });
      p.then(resolveCb, rejectCb);

      vi.advanceTimersByTime(500);
      expect(resolve).toBe("resolve");
      expect(reject).toBe(undefined);
      expect(resolveCb).toHaveBeenCalled();
      expect(rejectCb).not.toHaveBeenCalled();
    });
  });

  // 3. catch 方法
  describe("catch", () => {
    // 3.1 catch basic
    it("catch basic", () => {
      // 第一个参数 resolve 回调
      const p1 = new MyPromise((resolve, reject: any) => {
        reject("reject");
      });

      let result;
      p1.catch((rejectVal: any) => {
        result = rejectVal;
      });
      expect(result).toBe("reject");
    });

    // 3.2 catch async
    it("catch async", () => {
      vi.useFakeTimers();

      // 第一个参数 resolve 回调
      const p1 = new MyPromise((resolve, reject: any) => {
        setTimeout(() => {
          reject("reject");
        }, 500);
      });

      let result;
      p1.catch((rejectVal: any) => {
        result = rejectVal;
      });

      vi.advanceTimersByTime(500);
      expect(result).toBe("reject");
    });
  });

  // 4. 创建已处理的 promise
  describe("create processed state", () => {
    it("create FulFilled state", () => {
      const p = MyPromise.resolve("resolve");

      let result;
      p.then((resolveVal: any) => {
        result = resolveVal;
      });

      expect(result).toBe("resolve");
    });

    it("create Rejected state", () => {
      const p = MyPromise.reject("reject");

      let result;
      const resolveCb = vi.fn((value: any) => {
        result = value;
      });
      const rejectCb = vi.fn((value: any) => {
        result = value;
      });
      p.then(resolveCb, rejectCb);

      let reject;
      const rejectCb1 = vi.fn((value: any) => {
        reject = value;
      });
      p.catch(rejectCb1);

      expect(result).toBe("reject");
      expect(reject).toBe("reject");
      expect(resolveCb).not.toHaveBeenCalled();
      expect(rejectCb).toHaveBeenCalled();
      expect(rejectCb1).toHaveBeenCalled();
    });
  });

  // 5. 捕获执行器错误
  test("catch executor error", () => {
    const p = new MyPromise((resolve: any, reject: any) => {
      throw new Error("something error");
    });

    let result: any;
    p.catch(value => {
      result = value;
    });

    expect(result.message).toBe("something error");
  });
});
