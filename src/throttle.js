/* 节流 */
// 固定时长执行一次
// 第一次不立即执行
function throttle(fn, delay = 500) {
  let flag = true;
  return (...args) => {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
        fn(...args);
      }, delay);
    }
  };
}

// 第一次基本会立即执行
function throttle(fn, delay = 500) {
  let previous = new Date().getTime();
  return (...args) => {
    const current = new Date().getTime();
    if (current - previous >= delay) {
      fn(...args);
      previous = current;
    }
  };
}
