import MyPromise from "../src/promise";

describe("Promise", () => {
  /* 基础功能 */
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
        vi.useFakeTimers();
        // 第一个参数 resolve 回调
        const p1 = new MyPromise((resolve: any) => {
          resolve("resolve");
        });

        let result;
        p1.then((resolveVal: any) => {
          result = resolveVal;
        });

        vi.advanceTimersByTime(0);
        expect(result).toBe("resolve");

        // 第二个参数 reject 回调
        const p2 = new MyPromise((resolve, reject: any) => {
          reject("reject");
        });

        let reject;
        p2.then(null, (rejectVal: any) => {
          reject = rejectVal;
        });

        vi.advanceTimersByTime(0);
        expect(reject).toBe("reject");
      });

      // 2.2 then 方法只会执行先完成的处理函数的回调
      it("then cb only run one", () => {
        vi.useFakeTimers();
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

        vi.advanceTimersByTime(0);
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

        vi.advanceTimersByTime(501);
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
        vi.useFakeTimers();
        // 第一个参数 resolve 回调
        const p1 = new MyPromise((resolve, reject: any) => {
          reject("reject");
        });

        let result;
        p1.catch((rejectVal: any) => {
          result = rejectVal;
        });

        vi.advanceTimersByTime(0);
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

        vi.advanceTimersByTime(501);
        expect(result).toBe("reject");
      });
    });

    // 4. 创建已处理的 promise
    describe("create processed state", () => {
      it("create FulFilled state", () => {
        vi.useFakeTimers();
        const p = MyPromise.resolve("resolve");

        let result;
        p.then((resolveVal: any) => {
          result = resolveVal;
        });

        vi.advanceTimersByTime(0);
        expect(result).toBe("resolve");
      });

      it("create Rejected state", () => {
        vi.useFakeTimers();
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

        vi.advanceTimersByTime(0);
        expect(result).toBe("reject");
        expect(reject).toBe("reject");
        expect(resolveCb).not.toHaveBeenCalled();
        expect(rejectCb).toHaveBeenCalled();
        expect(rejectCb1).toHaveBeenCalled();
      });
    });

    // 5. 捕获执行器错误
    test("catch executor error", () => {
      vi.useFakeTimers();
      const p = new MyPromise((resolve: any, reject: any) => {
        throw new Error("something error");
      });

      let result: any;
      p.catch((value: any) => {
        result = value;
      });

      vi.advanceTimersByTime(0);
      expect(result.message).toBe("something error");
    });
  });

  /* 复合功能 */
  // 串联的 Promise
  describe("series Promise", () => {
    vi.useFakeTimers();
    // 串联 & 无返回
    describe("series basic", () => {
      // 1. then -> then
      it("happy path", () => {
        const p: any = new MyPromise((resolve: any) => {
          resolve();
        });

        let result1, result2;
        p.then(() => {
          result1 = "result1";
        }).then(() => {
          result2 = "result2";
        });

        vi.advanceTimersByTime(1);
        expect(result1).toBe("result1");
        expect(result2).toBe("result2");
      });

      // 1.1 async then -> then
      it("async then chain then", async () => {
        vi.useFakeTimers();

        const p: any = new MyPromise((resolve: any) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });

        let result1, result2;
        p.then(() => {
          result1 = "result1";
        }).then(() => {
          result2 = "result2";
        });

        vi.advanceTimersByTime(502);
        expect(result1).toBe("result1");
        expect(result2).toBe("result2");
      });

      // 1.2 async multiple then -> then
      it("async multiple then chain then", async () => {
        vi.useFakeTimers();

        const p: any = new MyPromise((resolve: any) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });

        let result1, result2;
        p.then(() => {
          return "result1";
        }).then((value: any) => {
          console.log("1--------", value);
          result1 = value;
        });

        p.then(() => {
          return "result2";
        }).then((value: any) => {
          console.log("2--------", value);
          result2 = value;
        });

        vi.advanceTimersByTime(502);
        expect(result1).toBe("result1");
        expect(result2).toBe("result2");
      });

      // 2. catch -> then
      it("catch chain then", () => {
        vi.useFakeTimers();
        const p: any = new MyPromise((resolve: any, reject: any) => {
          reject();
        });

        let result1, result2;
        p.catch(() => {
          result1 = "error";
        }).then(() => {
          result2 = "resolve";
        });

        vi.advanceTimersByTime(1);
        expect(result1).toBe("error");
        expect(result2).toBe("resolve");
      });

      // 2+. catch -> catch
      it("catch chain catch", () => {
        vi.useFakeTimers();
        const p: any = new MyPromise((resolve: any, reject: any) => {
          reject();
        });

        let result1, result2;
        p.catch(() => {
          result1 = "error";
        }).catch(() => {
          result2 = "resolve";
        });

        vi.advanceTimersByTime(1);
        expect(result1).toBe("error");
        expect(result2).toBe(undefined);
      });

      // 2++. then no error -> catch
      it("catch thenProcess no error", () => {
        vi.useFakeTimers();
        const p: any = new MyPromise((resolve: any, reject: any) => {
          reject("error");
        });

        let result1, result2: any;
        const p1 = p
          .then(() => {
            result1 = "result1";
          })
          .catch((err: any) => {
            result2 = err;
          });

        vi.advanceTimersByTime(1);
        expect(result1).toBe(undefined);
        expect(result2).toBe("error");
        expect(p).not.toBe(p1);
      });

      // 3. then error -> catch
      it("catch thenProcess error", () => {
        vi.useFakeTimers();
        const p: any = new MyPromise((resolve: any) => {
          resolve();
        });

        let result1, result2: any;
        const p1 = p
          .then(() => {
            result1 = "result1";
            throw new Error("2");
          })
          .catch((err: any) => {
            result2 = err;
          });

        vi.advanceTimersByTime(1);
        expect(result1).toBe("result1");
        expect(result2.message).toBe("2");
        expect(p).not.toBe(p1);
      });

      // 4. catch error -> catch
      it("catch catchProcess error", () => {
        vi.useFakeTimers();
        const p1: any = new MyPromise((resolve: any, reject: any) => {
          reject();
        });

        let result1, result2: any;
        const p2 = p1
          .catch(() => {
            result1 = "error1";
            throw new Error("error2");
          })
          .catch((err: any) => {
            result2 = err;
          });

        vi.advanceTimersByTime(1);
        expect(result1).toBe("error1");
        expect(result2.message).toBe("error2");
        expect(p1).not.toBe(p2);
      });
    });

    // 串联 && 返回
    describe("series and return", () => {
      // 1. then 返回值
      it("happy path", () => {
        const p: any = new MyPromise((resolve: any) => {
          resolve(1);
        });

        let result1, result2: any;
        p.then((value: any) => {
          result1 = value;
          return value + 1;
        }).then((value: any) => {
          result2 = value;
        });

        vi.advanceTimersByTime(1);
        expect(result1).toBe(1);
        expect(result2).toBe(2);
      });

      // 2. catch 返回值
      it("then return value", () => {
        const p: any = new MyPromise((resolve: any, reject: any) => {
          reject(1);
        });

        let result1, result2: any;
        p.catch((value: any) => {
          result1 = value;
          return value + 1;
        }).then((value: any) => {
          result2 = value;
        });

        vi.advanceTimersByTime(1);
        expect(result1).toBe(1);
        expect(result2).toBe(2);
      });

      // 3. then 返回 已完成的 promise
      it("then return Fulfilled Promise", () => {
        const p1: any = new MyPromise((resolve: any, reject: any) => {
          resolve(1);
        });

        const p2: any = new MyPromise((resolve: any, reject: any) => {
          resolve(2);
        });

        let result1, result2: any;
        p1.then((value: any) => {
          result1 = value;
          return p2;
        }).then((value: any) => {
          console.log("then-------", value);
          result2 = value;
        });

        vi.advanceTimersByTime(1);
        expect(result1).toBe(1);
        vi.advanceTimersByTime(1);
        expect(result2).toBe(2);
      });

      // 4. then 返回 已失败的 promise
      it("then return Rejected Promise", () => {
        const p1: any = new MyPromise((resolve: any, reject: any) => {
          resolve(1);
        });

        const p2: any = new MyPromise((resolve: any, reject: any) => {
          reject(2);
        });

        let result1, result2: any;
        p1.then((value: any) => {
          result1 = value;
          return p2;
        }).catch((value: any) => {
          result2 = value;
        });

        vi.advanceTimersByTime(1);
        expect(result1).toBe(1);
        vi.advanceTimersByTime(1);
        expect(result2).toBe(2);
      });
    });
  });

  // 响应多个 Promise
  describe("react multiple promise", () => {
    vi.useFakeTimers();
    describe("all", () => {
      it("all watched promise Fulfilled return resolved", () => {
        const p1 = new MyPromise((resolve: any, reject: any) => {
          resolve(1);
        });

        const p2 = new MyPromise((resolve: any, reject: any) => {
          resolve(2);
        });

        const p3 = new MyPromise((resolve: any, reject: any) => {
          resolve(3);
        });

        const p4: any = MyPromise.all([p1, p2, p3]);

        let result;
        p4.then((value: any[]) => {
          result = value;
        });

        vi.advanceTimersByTime(1);
        expect(result).toStrictEqual([1, 2, 3]);
      });

      it("all watched async promise Fulfilled return resolved", () => {
        const p1 = new MyPromise((resolve: any, reject: any) => {
          resolve(1);
        });

        const p2 = new MyPromise((resolve: any, reject: any) => {
          setTimeout(() => {
            resolve(2);
          }, 500);
        });

        const p3 = new MyPromise((resolve: any, reject: any) => {
          resolve(3);
        });

        const p4: any = MyPromise.all([p1, p2, p3]);

        let result;
        p4.then((value: any[]) => {
          result = value;
        });

        vi.advanceTimersByTime(510);
        expect(result).toStrictEqual([1, 2, 3]);
      });

      it("one watched promise Rejected return rejected", () => {
        const p1 = new MyPromise((resolve: any, reject: any) => {
          resolve(1);
        });

        const p2 = new MyPromise((resolve: any, reject: any) => {
          resolve(2);
        });

        const p3 = new MyPromise((resolve: any, reject: any) => {
          reject(3);
        });

        const p4: any = MyPromise.all([p1, p2, p3]);

        let result;
        p4.catch((value: any) => {
          result = value;
        });

        vi.advanceTimersByTime(1);
        expect(result).toStrictEqual(3);
      });

      it("multiple watched promise Rejected return the fast rejected", () => {
        vi.useFakeTimers();
        const p1 = new MyPromise((resolve: any, reject: any) => {
          setTimeout(() => {
            resolve(1);
          }, 500);
        });

        const p2 = new MyPromise((resolve: any, reject: any) => {
          setTimeout(() => {
            reject(2);
          }, 500);
        });

        const p3 = new MyPromise((resolve: any, reject: any) => {
          reject(3);
        });

        const p4: any = MyPromise.all([p1, p2, p3]);

        let result;
        p4.catch((value: any) => {
          result = value;
        });

        vi.advanceTimersByTime(501);
        expect(result).toStrictEqual(3);
      });
    });

    // one promise settled return the fast settled value
    describe("race", () => {
      it("Fulfilled first", () => {
        const p1 = MyPromise.resolve(1);

        const p2 = new MyPromise((resolve: any, reject: any) => {
          reject(2);
        });

        const p3 = new MyPromise((resolve: any, reject: any) => {
          resolve(3);
        });

        const p4 = new MyPromise((resolve: any, reject: any) => {
          reject(4);
        });

        const p5: any = MyPromise.race([p1, p2, p3, p4]);

        let resolveValue;
        let rejectValue;
        p5.then(
          (value: any) => {
            resolveValue = value;
          },
          (value: any) => {
            rejectValue = value;
          }
        );

        vi.advanceTimersByTime(1);
        expect(resolveValue).toStrictEqual(1);
        expect(rejectValue).toStrictEqual(undefined);
      });

      it("Rejected first", () => {
        const p1 = new MyPromise((resolve: any, reject: any) => {
          reject(1);
        });

        const p2 = MyPromise.resolve(2);

        const p3 = new MyPromise((resolve: any, reject: any) => {
          resolve(3);
        });

        const p4 = new MyPromise((resolve: any, reject: any) => {
          reject(4);
        });

        const p5: any = MyPromise.race([p1, p2, p3, p4]);

        let resolveValue;
        let rejectValue;
        p5.then(
          (value: any) => {
            resolveValue = value;
          },
          (value: any) => {
            rejectValue = value;
          }
        );

        vi.advanceTimersByTime(1);
        expect(resolveValue).toStrictEqual(undefined);
        expect(rejectValue).toStrictEqual(1);
      });

      it("async", async () => {
        vi.useFakeTimers();
        const p1 = new MyPromise((resolve: any, reject: any) => {
          setTimeout(() => {
            reject(1);
          }, 500);
        });

        const p2 = MyPromise.resolve(2);

        const p3 = new MyPromise((resolve: any, reject: any) => {
          resolve(3);
        });

        const p4 = new MyPromise((resolve: any, reject: any) => {
          reject(4);
        });

        const p5: any = MyPromise.race([p1, p2, p3, p4]);

        let resolveValue;
        let rejectValue;
        p5.then(
          (value: any) => {
            resolveValue = value;
          },
          (value: any) => {
            rejectValue = value;
          }
        );

        vi.advanceTimersByTime(502);
        expect(resolveValue).toStrictEqual(2);
        expect(rejectValue).toStrictEqual(undefined);
      });
    });
  });
});
