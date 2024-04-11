/* 事件代理 */
//  dom 的点击事件，给父节点添加点击事件监听，从而给每个子节点都绑定点击事件。
// 获取父元素
const father = document.getElementById("father");
// 给父元素安装一次监听函数
father.addEventListener("click", e => {
  // 识别是否是目标子元素
  if (e.target.tagName === "A") {
    // 以下是监听函数的函数体
    e.preventDefault();
    // 处理逻辑
  }
});

/* 虚拟代理 */
// 1. 图片预加载案例
// 真实 dom 操作
class PreloadImage {
  constructor(imgNode) {
    this.imgNode = imgNode;
  }

  setSrc(imgUrl) {
    this.imgNode.src = imgUrl;
  }
}
// 代理图片预加载
class ProxyImage {
  static loadingUrl = "预加载图片";
  constructor(targetImage) {
    this.targetImage = targetImage;
  }

  setSrc(targetUrl) {
    this.targetImage.setSrc(ProxyImage.loadingUrl);

    const virtualImage = new Image();
    virtualImage.onload = () => {
      this.targetImage.setSrc(targetUrl);
    };
    virtualImage.src = targetUrl;
  }
}

// 2. Vue 中的虚拟 dom

/* 缓存代理 */
function sum(array) {
  return array.reduce((result, item) => (result += item));
}

const proxySum = (() => {
  const sumMap = new Map();
  return array => {
    const key = array.join("-");
    if (sumMap.has(key)) {
      return sumMap.get(key);
    } else {
      const result = sum(array);
      sumMap.set(key, result);
      return result;
    }
  };
})();

/* 保护代理 */
// es6 Proxy 例：vue3 响应系统
class Star {
  film() {
    console.log("拍电影");
  }
  music() {
    console.log("开音乐会");
  }
}

const starProxy = new Proxy(new Star(), {
  get(target, key) {
    // console.log("get", key);
    if (key === "film") {
      return money => {
        if (money > 3000) {
          return target[key]();
        } else {
          console.log("不够拍电影出场费");
          return;
        }
      };
    } else if (key === "music") {
      return money => {
        if (money > 2000) {
          return target[key]();
        } else {
          console.log("不够拍演唱会出场费");
          return;
        }
      };
    }
  },
  set(target, key, value) {
    // console.log("set", key, value);
  }
});
