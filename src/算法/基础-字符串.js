/* 反转 */
function reverseStr(str) {
  return str.split("").reverse().join("");
}

// const str1 = "abc";
// console.log("reverseStr: ", reverseStr(str1));

/* 判断回文 */
// 方法 1 反转前后相等
export function isPalindrome(str) {
  const reversedStr = reverseStr(str);
  return str === reversedStr;
}

// console.log("isPalindrome1: ", isPalindrome("abc"));
// console.log("isPalindrome1: ", isPalindrome("aba"));

// 方法 2 首尾对称
function isPalindrome2(str) {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }

  return true;
}

// console.log("isPalindrome2: ", isPalindrome2("abc"));
// console.log("isPalindrome2: ", isPalindrome2("aba"));
