/* 实现接口串联，一些列请求，下一个请求依赖上一个请求结果 */

const requestArr = [
  res => {
    console.log(res);
    return Promise.resolve(1);
  },
  res => {
    console.log(res);
    return Promise.resolve(2);
  },
  res => {
    console.log(res);
    return Promise.resolve(3);
  }
];

// 方法一：reduce
function getRequestResult(arr) {
  return arr.reduce(async (prev, current) => {
    const result = await prev;
    return current(result);
  }, Promise.resolve("第一次请求参数"));
}

// getRequestResult(requestArr)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// 方法二：for of
async function getRequestResult1(arr) {
  let result = "第一次请求参数";
  for (const request of arr) {
    result = await request(result);
  }
  return result;
}

// getRequestResult1(requestArr)
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
