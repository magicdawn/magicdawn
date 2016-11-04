'use strict';

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
  coins = coins.sort((a, b) => b - a);
  console.log(coins);
  return resolve(coins, amount);
};

const resolve = function (coins, amount, stack) {
  stack = stack || [];

  // 特殊
  if (amount === 0) return 0;

  for (let c of coins) {
    // add the biggest
    var tmp = stack.concat(c);

    // check
    var sum = tmp.reduce((result, cur) => result + cur, 0);

    if (sum > amount) { // 大了
      // 试小一点的
      continue;
    } else if (sum < amount) { // 小了

      console.log("tmp = %s", tmp);

      // 继续试
      var ret = resolve(coins, amount, tmp);
      if (ret === -1) {
        continue;
      } else {
        return ret;
      }
    } else { // 找到了
      return tmp.length;
    }
  }

  return -1;
}

let result;

// // [1,2,5], 11 -> 3
// result = coinChange([1,2,5], 11);
// console.log(result);

// // [2], 3 -> -1
// result = coinChange([2], 3);
// console.log(result);

result = coinChange([186,419,83,408], 6249);
console.log(result);