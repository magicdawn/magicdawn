const simpleCalc = require('./02.js').calc

const input = "((100+31)*5-2)/6-2+3*6";
const val = calc(input);
console.log(val);

function calc(s) {
  let parts = s.split(/(\d+|[\(\)\+\-\*\/]+?)/).filter(Boolean);
  let stack = []
  let stackLast = () => stack[stack.length - 1]

  // remove brace
  for(let p of parts) {
    if(p === ')') {
      const temp = []
      while(stackLast() !== '(') {
        temp.unshift(stack.pop())
      }

      stack.pop() // remove `(`
      let val = simpleCalc(temp.join(""));
      stack.push(val)
    } else {
      stack.push(p)
    }
  }

  return simpleCalc(stack.join(''))
}