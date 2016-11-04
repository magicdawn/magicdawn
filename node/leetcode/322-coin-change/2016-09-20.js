'use strict';

const coinChange = function(coins, amount) {
  let ret;
  // coins = coins.sort((a, b) => b - a);

  // 自底向上
  // ret = coinChangeToTop(coins, amount);

  // 自顶向下
  ret = coinChangeToBottom(coins, amount, new Array(amount + 1));

  return ret;
};

// 自底向上
const coinChangeToTop = function(coins, amount) {
  const arr = new Array(amount + 1);
  arr[0] = 0;
  for (let i = 1; i <= amount; i++) arr[i] = amount + 1;

  for (let i = 1; i <= amount; i++) {
    for (let c of coins) {
      if (c <= i) {
        // F(S) = min[
        //  F(S - c1) + 1,
        //  F(S - c2) + 1,
        //  ...
        // ]
        arr[i] = Math.min(arr[i], arr[i - c] + 1);
      }
    }
  }

  if (arr[amount] > amount) {
    return -1;
  } else {
    return arr[amount];
  }
};

// 自顶向下
const coinChangeToBottom = function(coins, amount, arr) {
  if (amount < 0) return -1;
  if (amount === 0) return 0;

  // 存在
  if (arr[amount]) return arr[amount];

  let min = Infinity;
  for (let c of coins) {
    const cur = coinChangeToBottom(coins, amount - c, arr);
    if (cur >= 0 && cur < min) {
      min = cur + 1;
    }
  }

  arr[amount] = min > amount ? -1 : min;
  return arr[amount];
};


let result;

// // [1,2,5], 11 -> 3
result = coinChange([1, 2, 5], 11);
console.log(result);

// [2], 3 -> -1
result = coinChange([2], 3);
console.log(result);

result = coinChange([186, 419, 83, 408], 6249);
console.log(result);