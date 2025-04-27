/* 防抖 */
// 在事件被触发后，等待一定时间再执行回调。如果在等待时间内事件又被触发，则重新计时。

function debounce(fn, delay = 500) {
  // 如果初始化为 0，第一次立即执行；
  // 如果初始化为 Date.now()，第一次不执行
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn.apply(this, args);
    }

    lastTime = now;
  };
}

// 第一次不立即执行
function debounce(fn, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apple(this, args);
      timer = null;
    }, delay);
  };
}
