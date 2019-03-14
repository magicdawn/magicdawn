exports.calc = function calc(s) {
  let parts = s.split(/\b(?=[\+\-\*\/\d])/);
  let stack = []
  let stackLast = () => stack[stack.length -1]

  const handle = (cur) => {
    const math = {
      '+': (a,b) => a + b,
      '-': (a,b) => a - b,
      '*': (a,b) => a * b,
      '/': (a,b) => a / b,
    }

    const op = stackLast()
    if(!math[op]) return

    stack.pop() // remove op
    let val = stack.pop() // left
    val = math[op](val, cur) // do math(left, right)
    stack.push(val)
  }
  

  for (let p of parts) {
    if (['*', '/', '+', '-'].includes(p)) {
      stack.push(p)
      continue
    }

    if (/\d+/.test(parts)) {
      const n = Number(p)
      if(['*', '/'].includes(stackLast())) {
        handle(n)
        continue
      } else {
        stack.push(n)
      }
    }
  }

  parts = stack
  stack = []
  stackLast = () => stack[stack.length - 1]
  for (let p of parts) {
    if (['+', '-'].includes(p)) {
      stack.push(p)
      continue
    }

    if (/\d+/.test(parts)) {
      const n = Number(p)
      if (['+', '-'].includes(stackLast())) {
        handle(n)
        continue
      } else {
        stack.push(n)
      }
    }
  }

  const val = stack.pop()
  return val
}

if (require.main === module) {
  const input = "100+31*5/6-2+3*6";
  const val = exports.calc(input);
  console.log(val)
}