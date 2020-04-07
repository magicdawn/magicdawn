/**
const str = '(2+3)*3+2+3*3-10'

{
  type: 'expr-l1',
  nodes: [
    {
      type: 'expr-l2',
      nodes: [
        {
          type: 'expr-l1',
          nodes: [
            {
              type: 'expr-l2',
              nodes: [ { type: 'num', val: 2, nodes: [] } ]
            },
            { type: 'operator', val: '+', lineno: 1, pos: 2 },
            {
              type: 'expr-l2',
              nodes: [ { type: 'num', val: 3, nodes: [] } ]
            }
          ]
        },
        { type: 'operator', val: '*', lineno: 1, pos: 5 },
        { type: 'num', val: 3, nodes: [] }
      ]
    },
    { type: 'operator', val: '+', lineno: 1, pos: 7 },
    { type: 'expr-l2', nodes: [ { type: 'num', val: 2, nodes: [] } ] },
    { type: 'operator', val: '+', lineno: 1, pos: 9 },
    {
      type: 'expr-l2',
      nodes: [
        { type: 'num', val: 3, nodes: [] },
        { type: 'operator', val: '*', lineno: 1, pos: 11 },
        { type: 'num', val: 3, nodes: [] }
      ]
    },
    { type: 'operator', val: '-', lineno: 1, pos: 13 },
    { type: 'expr-l2', nodes: [ { type: 'num', val: 10, nodes: [] } ] }
  ]
}

*/

module.exports = function(expr) {
  return calc(expr)
}

function calc(node) {
  if (!node) return

  const {type, nodes, val} = node

  // 数字
  if (type === 'num') {
    return val
  }

  if (type === 'expr-l2') {
    return calcExprL12(nodes)
  }
  if (type === 'expr-l1') {
    return calcExprL12(nodes)
  }

  throw new Error('unsupported')
}

// {
//   type: 'expr-l2',
//   nodes: [ { type: 'num', val: 2, nodes: [] } ]
// },
function calcExprL12(nodes) {
  nodes = nodes.map(node => {
    const {type, val} = node
    if (type === 'operator') return val
    return calc(node)
  })

  let op
  const ret = nodes.reduce((ret, cur) => {
    if (['+', '-', '*', '/'].includes(cur)) {
      op = cur
      return ret
    }

    if (op === '+') ret += cur
    if (op === '-') ret -= cur
    if (op === '*') ret *= cur
    if (op === '/') ret /= cur
    return ret
  })

  return ret
}
