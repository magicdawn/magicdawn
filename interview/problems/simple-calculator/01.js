const input = "100+31*5/6-2+3*6";

function calc(s) {
  const nums = []
  const parts = s.split(/\b(?=[\+\-\*\/\d])/)
  
  let tempOperator
  for(let p of parts) {
    if(['*', '/'].includes(p)) {
      tempOperator = p
      continue
    }

    if(['+', '-'].includes(p)) {
      nums.push(p)
      tempOperator = null
      continue
    }

    if (/\d+/.test(parts)) {
      const n = Number(p)
      if(!tempOperator) {
        nums.push(n)
        continue
      } else {
        let v = nums.pop()
        v = tempOperator === '*'
          ? v * n
          : v / n
        nums.push(v)
        tempOperator = null
      }
    }
  }

  let ret = 0
  tempOperator = '+'
  for(let p of nums) {
    if(['+', '-'].includes(p)) {
      tempOperator = p
      continue
    }

    // num
    if(tempOperator === '+') {
      ret += p
      tempOperator = null
      continue
    }
    if (tempOperator === '-') {
      ret -= p
      tempOperator = null
      continue
    }
  }

  console.log(parts)
  console.log(nums)
  console.log(ret)
}

calc(input)