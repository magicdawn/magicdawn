import { minimatch } from 'minimatch'

console.log(minimatch('foo.tsx', '*.{?(c|m)@(j|t)s?(x),json,y?(a)ml}', { matchBase: true })) // log => true
console.log(minimatch('foo.tsx', '*.{?(c|m)(j|t)s?(x),json,y?(a)ml}', { matchBase: true })) // log => false
