const {Parser} = require('./parser')
const calc = require('./calc')

function calculator(str) {
  const p = new Parser(str)
  const ast = p.parse()
  const result = calc(ast)
  return result
}

const str1 = '(2+3)*3+2+3*3-10'
const str2 = '(2+3)*3+ 2+3*3-10'

console.log(calculator(str1))
console.log(calculator(str2))
