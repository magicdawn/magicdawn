const bruteForce = require('./brute-force.js')
const withMemo = require('./02-with-memo.js')

const tests = [
  // desc
  [[1, 1, 1, 1, 1], 3, 5],

  // case1
  [[1, 0], 1, 2],
]

describe('Brute force', function() {
  // Runtime: 3488 ms
  // Memory Usage: 41.5 MB
  it('brute force', function() {
    for (let t of tests) {
      const [nums, S, output] = t
      const result = bruteForce(nums, S)
      result.should.equal(output)
    }
  })

  // Runtime: 228 ms, faster than 76.01% of JavaScript online submissions for Target Sum.
  // Memory Usage: 51.5 MB, less than 13.53% of JavaScript online submissions for Target Sum.
  it('with memo', function() {
    for (let t of tests) {
      const [nums, S, output] = t
      const result = withMemo(nums, S)
      result.should.equal(output)
    }
  })
})
