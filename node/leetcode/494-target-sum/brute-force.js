/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */

// 时间复杂度 2^n
var findTargetSumWays = function(nums, S) {
  const cur = nums[0]
  const rest = nums.slice(1)

  // 剪枝
  if (nums.length === 0) {
    if (S === 0) return 1
    else return 0
  }

  // 剪枝
  // if (nums.length === 1) {
  //   // S = cur = 0, 返回 2, because +0 / -0 不影响
  //   let rate = 0
  //   if (cur === S) rate++
  //   if (cur === -S) rate++
  //   return rate
  // }

  // 其他
  const positive = findTargetSumWays(rest, S - cur) // +cur + rest = S
  const negative = findTargetSumWays(rest, S + cur) // -cur + rest = S
  return positive + negative
}

module.exports = findTargetSumWays
