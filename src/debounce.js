/* 防抖 */
// 间隔时间内只执行一次，并且间隔时间内再点击重新计时
// 第一次不立即执行
function debounce(fn, delay = 500) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// 第一次基本上立即执行
function debounce(fn, delay = 500) {
  let previous = new Date().getTime();
  return (...args) => {
    const now = new Date().getTime();
    if (now - previous > delay) {
      fn(...args);
    }

    previous = now;
  };
}
