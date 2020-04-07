const {Parser} = require('./parser')
const calc = require('./calc')

const str = '(2+3)*3+2+3*3-10'
let ast
let result

const p = new Parser(str)
ast = p.parse()
// console.log(require('util').inspect(expr, {depth: null}))

result = calc(ast)
console.log(result)
