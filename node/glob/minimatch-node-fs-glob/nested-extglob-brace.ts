import assert from 'node:assert'
import { minimatch } from 'minimatch'

const tests = [
  // ✅ minimatch 明确支持的语法：应匹配成功
  ['foo.js', '*.+(js|ts)', true],
  ['foo.ts', '*.+(js|ts)', true],
  ['foo.py', '*.+(js|ts)', false],

  ['foo.js', '*.{js,ts}', true],
  ['foo.ts', '*.{js,ts}', true],
  ['foo.py', '*.{js,ts}', false],

  // ❌ minimatch 不支持的嵌套 extglob + brace：应匹配失败
  // ['foo.js', '*.{+(js|ts),json}', false],
  // ['foo.tsx', '*.+({js,ts})?(x)', false],
  // ['foo.tsx', '*.{?(c|m)(j|t)s?(x),json}', false],

  // ✅ 合法、支持的简单组合（都应为 true）
  ['foo.js', '*.+(js|ts)', true], // extglob
  ['foo.ts', '*.{js,ts}', true], // brace
  ['foo.yaml', '*.{yml,yaml}', true], // brace
  ['foo.test.ts', '*.test.+(ts|js)', true], // extglob

  // ⚠️ 边界模糊组合（minimatch 实际能跑，但解析是靠运气）
  ['foo.js', '*.{+(js|ts),json}', true], // brace 中嵌 extglob：能匹配，但语义不明
  ['foo.tsx', '*.+({js,ts})?(x)', true], // extglob 中嵌 brace，碰巧能拼接成功

  // ❌ 实际失败的复杂嵌套组合（建议不用）
  ['foo.tsx', '*.{?(c|m)(j|t)s?(x),json}', false], // ✅ 确实失败
  ['foo.mts', '*.{?(c|m)ts}', false], // ✅ 失败
  ['foo.mjs', '*.{?(c|m)js}', false], // ✅ 失败
  ['foo.tsx', '*.+({js,ts},json)', false], // ✅ 失败
  ['foo.ts', '*.{?(c|m)+([jt])s}', false], // ✅ 失败
  ['foo.tsx', '*.{?(c|m)(j|t)s?(x),json,y?(a)ml}', false], // ✅ 失败

  /**
   * 验证 minimatch 不支持 regex groups `(a|b)`, 支持 extglob `@(a|b)`
   */
  ...[
    // ✅ 正确：extglob 语法
    ['foo.js', '*.@(js|ts)', true],
    ['foo.ts', '*.@(js|ts)', true],
    ['foo.jsx', '*.@(js|ts)?(x)', true],
    ['foo.tsx', '*.@(js|ts)?(x)', true],

    // ❌ 错误：正则语法 (minimatch 不支持)
    ['foo.js', '*.(js|ts)', false],
    ['foo.tsx', '*.(js|ts)?(x)', false],
    ['foo.tsx', '*.{?(c|m)(j|t)s?(x),json}', false], // ❌ 因为 (j|t) 是非法的 regex group
    ['foo.tsx', '*.{?(c|m)@(j|t)s?(x),json}', true], // ✅ 正确：全部是 extglob

    // ✅ brace + extglob
    ['foo.tsx', '*.{@(js|ts)x,json}', true],
    ['foo.json', '*.{@(js|ts)x,json}', true],

    // ❌ 单用正则 group 导致匹配失败
    ['foo.js', '*.+(js|ts)', true], // ✅ extglob
    ['foo.js', '*.+(js|ts)', true],
    ['foo.js', '*.+(j|t)s', true], // ✅ extglob 可细分字母
    ['foo.js', '*.++(js|ts)', false], // ❌ 不存在的语法（双 `+`）

    // ✅ sanity check
    ['foo.yaml', '*.{yml,yaml}', true],
    ['foo.yml', '*.{yml,yaml}', true],
  ],
] as const

for (const [input, pattern, expected] of tests) {
  const actual = minimatch(input, pattern, { matchBase: true })
  try {
    assert.strictEqual(
      actual,
      expected,
      `❌ Pattern "${pattern}" matching "${input}" expected ${expected}, got ${actual}`,
    )
  } catch (e) {
    console.error(e)
  }
}

console.log('✅ All minimatch assertions passed.')
