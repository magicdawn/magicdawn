/**

Algorithm

It can be easily observed that in the last approach,
a lot of redundant function calls could be made with the same value of ii as the current index
and the same value of sumsum as the current sum, since the same values could be obtained through multiple paths in the recursion tree.
In order to remove this redundancy, we make use of memoization as well to store the results which have been calculated earlier.

Thus, for every call to calculate(nums, i, sum, S),
we store the result obtained in memo[i][sum + 1000]memo[i][sum+1000].
The factor of 1000 has been added as an offset to the sumsum value to map all the sumsums possible to positive integer range.
By making use of memoization, we can prune the search space to a good extent.

*/

/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */

var findTargetSumWays = function(nums, S, memo) {
  if (!memo) memo = {}

  const cur = nums[0]
  const rest = nums.slice(1)

  // 剪枝
  if (nums.length === 0) {
    if (S === 0) return 1
    else return 0
  }

  // cache hit
  if (memo[nums.length] && typeof memo[nums.length][S] === 'number') {
    return memo[nums.length][S]
  }

  // 其他
  const positive = findTargetSumWays(rest, S - cur, memo) // +cur + rest = S
  const negative = findTargetSumWays(rest, S + cur, memo) // -cur + rest = S
  const ret = positive + negative

  // save cache
  if (!memo[nums.length]) memo[nums.length] = {}
  memo[nums.length][S] = ret

  return ret
}

module.exports = findTargetSumWays
