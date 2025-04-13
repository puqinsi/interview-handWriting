/* 节流 */
// 在一定时间间隔内，只执行一次回调函数。

// 第一次会立即执行
function throttle(fn, delay = 500) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
