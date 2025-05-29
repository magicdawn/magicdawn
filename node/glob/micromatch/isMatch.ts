import mm from 'micromatch'

const str = '/a/b/c.d'
const patterns = ['*.d', '*.js', '!/a/**', '!/x/**']

console.log(mm.all(str, patterns)) // false
console.log(mm.isMatch(str, patterns)) // true
console.log(isMatch(str, patterns)) // false

console.log('---')
console.log(mm.all('index.js', patterns)) // false
console.log(mm.isMatch('index.js', patterns)) // true
console.log(isMatch('index.js', patterns)) // true

export function isMatch(str: string, patterns: string | string[]) {
  return !!mm([str], patterns).length
}
