function ajaxGet(url, callback, data) {
  let ajax = null;
  ajax = new XMLHttpRequest();

  url = data ? url + "?" + data : url;
  // 和服务器链接
  ajax.open("get", url);
  // 向服务器发送数据
  ajax.send();
  // 接收响应
  ajax.onreadystatechange = () => {
    if (ajax.readystate == 4 && ajax.status == 200) {
      callback(ajax.responseText);
    }
  };
}

function ajaxPost(url, callback, data) {
  let ajax = null;
  ajax = new XMLHttpRequest();

  // 和服务器链接
  ajax.open("post", url);
  // 设置请求头
  ajax.setRequestHeader("Content-Type");
  // 向服务器发送数据
  ajax.send(data);
  // 接收响应
  ajax.onreadystatechange = () => {
    if (ajax.readystate == 4 && ajax.status == 200) {
      callback(ajax.responseText);
    }
  };
}
