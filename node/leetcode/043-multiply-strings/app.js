'use strict'

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const multiply = function(num1, num2) {
  if (num1.length < num2.length) {
    const tmp = num1
    num1 = num2
    num2 = tmp
  }
  num1 = num1.split('').reverse().map(Number)
  num2 = num2.split('').reverse().map(Number)
  const arr = []

  for (let i = 0; i < num2.length; i++) {
    const cur = segment(num1, num2[i], i)
    arr.push(cur)
  }

  let i = 0
  let pre = 0
  let cur
  const maxlen = arr.reduce((ret, item) => Math.max(ret, item.length), 0)
  let final = []

  while (i < maxlen || pre) {
    const tmp = pre + arr.reduce((total, item) => total + (item[i] || 0), 0)
    cur = tmp % 10
    pre = Math.floor(tmp / 10)
    final.push(cur)
    i++
  }

  let str = final.reverse().join('')
  while (str[0] === '0' && str.length > 1) {
    str = str.substring(1)
  }
  return str
}

function segment(arr, b, pad) {
  let pre = 0
  let cur
  let i = 0
  const ret = []

  while (pad > 0) {
    ret.push(0)
    pad--
  }

  while ((i < arr.length) || pre) {
    const d = arr[i] || 0
    const temp = d * b + pre
    cur = temp % 10
    pre = Math.floor(temp / 10)
    ret.push(cur)
    i++
  }

  return ret
}

// -------------
// case
// -------------

// const seg = segment([1, 2, 3, 4, 5], 2, 1)
// console.log(seg)
// console.log('54321 * 2 = %s', 54321 * 2)

const a = '12343'
const b = '456'
const ab = multiply(a, b)
console.log(ab)