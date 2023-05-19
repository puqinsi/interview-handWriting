/* 目的：实现无脑传参 */

/* 方案 1 */
function VipMan() {
  this.identity = "vip";
  this.role = ["修改密码", "发布消息", "查看主页"];
}

function CommonMan() {
  this.identity = "common";
  this.role = ["查看主页"];
}
/* 劣：对变化部分和不变部分没有分离 */
function factory1(identity) {
  let user;
  switch (identity) {
    case "vip":
      user = new VipMan();
      break;
    case "common":
      user = new CommonMan();
      break;
    default:
      throw new Error("参数错误");
  }

  return user;
}

/* 方案 2 */
function User(identity, role) {
  this.identity = identity;
  this.role = role;
}
/* 优：更好的封装了变化和不变的部分 */
function factory(identity) {
  switch (identity) {
    case "vip":
      role = ["修改密码", "发布消息", "查看主页"];
      break;
    case "common":
      role = ["查看主页"];
      break;
    default:
      role = [];
      break;
  }

  return new User(identity, role);
}
