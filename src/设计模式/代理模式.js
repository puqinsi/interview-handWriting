// 核心：代理者在被代理者上包一层，代理者主要实现基于被代理者的功能的附加条件
// 优点: 分解主体职责, 单一职责原则;
// 解决本体暂时性无法处理一些请求, 节约性能;
function Start() {
  this.film = function () {
    拍电影;
  };
  this.music = function () {
    开音乐会;
  };
}

// 代理者相当于，在代理者的功能上套了一层
function StarProxy() {
  this.master = new Start(); //被代理者

  this.film = function (money) {
    if (money > 3000000) {
      this.master.film(); //告诉被代理者  可以拍电影了
    }
  };

  this.music = function (money, addr) {
    if (money > 500000 && addr == "北京") {
      this.master.music();
    }
  };
}
