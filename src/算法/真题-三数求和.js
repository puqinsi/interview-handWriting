// 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
const nums = [-1, 0, 1, 2, -1, -4];
const target = 0;

// 1. 有序数组
// 2. 双指针->该题为“对撞指针”
function threeSum(nums, target) {
  const result = [];
  // 转换成有序数组
  nums = nums.sort((a, b) => a - b);

  const len = nums.length;
  // 固定值后面采用双指针，所以 i 到倒数第三项就行
  for (let i = 0; i < len - 2; i++) {
    const num = nums[i];
    let leftIndex = i + 1;
    let rightIndex = len - 1;

    // 去掉固定值重复项
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // 移动双指针，查找满足条件的数据
    while (leftIndex < rightIndex) {
      const leftNum = nums[leftIndex];
      const rightNum = nums[rightIndex];
      const sum = num + leftNum + rightNum;

      if (sum < target) {
        leftIndex++;
        // 去掉左指针重复项
        while (
          leftIndex < rightIndex &&
          nums[leftIndex] === nums[leftIndex - 1]
        ) {
          leftIndex++;
        }
      } else if (sum > target) {
        rightIndex--;
        // 去掉右指针重复项
        while (
          leftIndex < rightIndex &&
          nums[rightIndex] === nums[rightIndex + 1]
        ) {
          rightIndex--;
        }
      } else {
        result.push([num, leftNum, rightNum]);
        leftIndex++;
        rightIndex--;

        // 去掉左指针重复项
        while (
          leftIndex < rightIndex &&
          nums[leftIndex] === nums[leftIndex - 1]
        ) {
          leftIndex++;
        }

        // 去掉右指针重复项
        while (
          leftIndex < rightIndex &&
          nums[rightIndex] === nums[rightIndex + 1]
        ) {
          rightIndex--;
        }
      }
    }
  }

  return result;
}

const result = threeSum(nums, target);
console.log("三数求和：", result);

// 总结：
// 面对有序数组，先想到双指针，如果普通双指针不行，就要想到对撞指针
