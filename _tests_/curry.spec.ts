import { curry1, curry2, curry3 } from "../src/curry.js";

describe("curry", () => {
  it("certain lens of fn args", () => {
    function add(a: number, b: number, c: number) {
      return a + b + c;
    }
    const fn1 = curry1(add);
    const result1 = fn1(1)(2)(3);
    const fn2 = curry1(add);
    const result2 = fn2(1)(2, 3);
    const fn3 = curry1(add);
    const result3 = fn3(1, 2, 3);

    expect(result1).toBe(6);
    expect(result2).toBe(6);
    expect(result3).toBe(6);
  });

  it("not certain lens of fn args, but need no args call", () => {
    function add(...args: any[]) {
      return args.reduce((pre, current) => {
        return current + pre;
      });
    }
    const fn1 = curry2(add);
    const result1 = fn1(1)(2)(3)();
    const fn2 = curry2(add);
    const result2 = fn2(1)(2, 3)();
    const fn3 = curry2(add);
    const result3 = fn3(1, 2, 3)();

    expect(result1).toBe(6);
    expect(result2).toBe(6);
    expect(result3).toBe(6);
  });

  it("not certain lens of fn args and not need no args call", () => {
    function add(...args: any[]) {
      return args.reduce((pre, current) => {
        return pre + current;
      });
    }
    const fn1: any = curry3(add);
    const result1 = fn1(1)(2)(3);
    const fn2: any = curry3(add);
    const result2 = fn2(1)(2, 3);
    const fn3: any = curry3(add);
    const result3 = fn3(1, 2, 3);

    expect(result1 == 6).toBe(true);
    expect(result2 == 6).toBe(true);
    expect(result3 == 6).toBe(true);
  });
});
