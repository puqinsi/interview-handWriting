/* 节流 */
// 在一定时间间隔内，只执行一次回调函数。

function throttle(fn, delay = 500) {
  // 如果初始化为 0，第一次立即执行；
  // 如果初始化为 Date.now()，第一次不执行
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
