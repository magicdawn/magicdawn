'use strict'
/* eslint semi: off */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const addStrings = function(num1, num2) {
  num1 = num1.split('').reverse().map(Number)
  num2 = num2.split('').reverse().map(Number)

  let i = 0
  let pre = 0
  let cur
  let final = []
  while (pre || i < num1.length || i < num2.length) {
    const tmp = (num1[i] || 0) + (num2[i] || 0) + pre
    cur = tmp % 10
    pre = Math.floor(tmp / 10)
    final.push(cur)
    i++
  }

  return final.reverse().join('') || '0'
}
