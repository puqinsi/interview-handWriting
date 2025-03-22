const array1 = [1, 2, 3, 3, 4];
const array2 = [1, 2, 3, 4, 5];

/* 去重 */
// set 去重
const filteredArray1 = [...new Set(array1)];
// filter + indexOf
// indexOf(item) 返回数组中第一个匹配项的索引。
const filteredArray2 = array1.filter(
  (item, index) => array1.indexOf(item) === index
);

/* 数组取交集 */
// 方法一：使用 includes 方法
const intersection1 = array1.filter(item => array2.includes(item));
// 方法二：使用 set 方法
const set1 = new Set(array1);
const intersection2 = array2.filter(item => set1.has(item));
