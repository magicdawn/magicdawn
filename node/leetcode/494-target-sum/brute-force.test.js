const findTargetSumWays = require('./brute-force.js')

const tests = [
  // desc
  [[1, 1, 1, 1, 1], 3, 5],

  // case1
  [[1, 0], 1, 2],
]

describe('Brute force', function() {
  it('it works', function() {
    for (let t of tests) {
      const [nums, S, output] = t
      const result = findTargetSumWays(nums, S)
      result.should.equal(output)
    }
  })
})
