// 核心：根据不同的条件，返回不同的对象
// 优点: 让对象的调用者和对象创建过程分离，当对象调用者需要对象时，直接向工厂请求即可。
let factory = function (role) {
  function superman() {
    this.name = "超级管理员";
    this.role = ["修改密码", "发布消息", "查看主页"];
  }

  function commonMan() {
    this.name = "普通游客";
    this.role = ["查看主页"];
  }

  let person;
  switch (role) {
    case "superman":
      person = new superman();
      break;
    case "man":
      person = new commonMan();
      break;
    default:
      throw new Error("参数错误");
  }

  return person;
};
