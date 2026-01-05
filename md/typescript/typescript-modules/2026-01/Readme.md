# 背景

- date: 2026-01-05; TypeScript latest: v5.9.3;
- Node.js 支持 require(esm) 了, 库作者只用考虑 esm 了. 感谢 joyeecheung
- Nest.js 成最大赢家, https://github.com/nestjs/nest/issues/13319, 让我想起了 "不要闹, 一切会慢慢变好" 的笑话

## 先说 `--moduleResolution`, 可选性比较少

- `node16` = `nodenext`; 但 nodenext 是扩展目标, 即未来如果有 node32, nodenext 会对齐到 node32
- `bundler`
  - 需要 `--module` 设置为 `es序列`, 如 `esnext`
  - 支持 `node16` 规则
  - 但执行更宽松的 esm 规则: 可以不带后缀名
  - 但执行更宽松的模块路径: dir module, dir index module
  - 因为宽松, TypeScript 将 `--moduleResolution bundler` 描述为 `infectious (传染性)`: 使用 tsc + `--moduleResolution bundler` 编译的库只能在 `--moduleResolution bundler` 的 App 环境中使用

### Legacy `--moduleResolution`

- `classic`
- `node10` = `node`; `node` deprecated

### 结论

- `node` deprecated 后面会移除
- `classic` 和 `node10` 也不再推荐使用
- 能用到的会是 `node16`=`nodenext`, `bundler`

## `--module`

- es序列: `es2015` / `es2020` / `es2022` / `esnext`
- node系列: `node16` / `node18` / `node20` / `nodenext`
- `preserve`
- `commonjs`
- system amd umd 省略

### `--module es序列`

版本

- es6 = es2015
- es2020: adds support for `import.meta` properties.
- es2022: adds support for top-level await.
- esnext: is a moving target that may include support for Stage 3 proposals to ECMAScript modules.

Note:

- 数字版本 es6 = es2015. es2022 = es23, 数字太大且没有意义, 这种方式逐渐淘汰了!
- Q: 为什么 module 没有 es2024 es2023
  A: 这些版本没有 module 相关更改

### `--module node序列`

`node16` / `node18` / `node20` / `nodenext`

| `module`           | target        | moduleResolution | import assertions | import attributes | JSON imports      | require(esm) |
| ------------------ | ------------- | ---------------- | ----------------- | ----------------- | ----------------- | ------------ |
| node16             | es2022        | node16           | ❌                | ❌                | N/A               | ❌           |
| node18             | es2022        | node16           | ✅                | ✅                | needs type "json" | ❌           |
| node20             | ?(未找到文档) | node16           | ❌                | ✅                | needs type "json" | ✅           |
| nodenext (@2026.1) | esnext        | nodenext         | ❌                | ✅                | needs type "json" | ✅           |

#### Changelog

- node16: since TypeScript 4.7
- node18: since TypeScript 5.8, adds support for `import attributes`
- node20: adds support for require(ESM).

#### 实例

```ts
/* eslint-disable import/no-duplicates */

import pkgAssertion from '../package.json' assert { type: 'json' }
import pkgAttribute from '../package.json' with { type: 'json' }
console.log(pkgAssertion, pkgAttribute)

// `--module node16`
// Import assertions are only supported when the '--module' option is set to 'esnext', 'node18', 'node20', 'nodenext', or 'preserve'.
// Import attributes are only supported when the '--module' option is set to 'esnext', 'node18', 'node20', 'nodenext', or 'preserve'.

// `--module node18`
// Cannot find module '../package.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.

// `--module node20`
// Import assertions have been replaced by import attributes. Use 'with' instead of 'assert'.

// `--module nodenext`
// Import assertions have been replaced by import attributes. Use 'with' instead of 'assert'.
```

#### Notes

- import assertions 是 import attributes 的曾用名
- `moduleResolution = node16 / nodenext`, 现在 `--moduleResolution node16` = `--moduleResolution nodenext`
- `node20` & `nodenext` 还隐含了 `--resolveJsonModule`
- Q: 都是 esm 模块规范, 有的体现在了 `node16` `node18`, 有些体现在了 `es2020` `es2022` ?
  A: 可能是还没完成规范
  - https://github.com/tc39/proposal-import-attributes
  - https://github.com/tc39/ecma262/pull/3057
  - 合并进了规范, 尚未发布, 预计 es2026

#### `--module node序列` 意义在哪?

- `--module commonjs` & `--module es序列` 有明确的语义, 代表: cjs & esm
- `--module node序列`, 需要根据 package.json type 决定 emit 类型, 这是 Node.js 使用的规则, 故起名为 `node序列`
- node.js or V8 支持了一些还没有进入 es 规范的特性, TypeScript 使用 `--module node序列` 表示这个暂时的状态

### `--module preserve`

> 不改变模块语法, 交给 bundler 处理

Implies:

- `--moduleResolution bundler`
- `--esModuleInterop`

## 组合

| `--moduleResolution` 条件                    | `--module` 结论                                                     |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `--moduleResolution bundler` 时              | `--module` 只能为 `preserve` or `es2015` `es2020` `es2022` `esnext` |
| `--moduleResolution node16` 或 `nodenext` 时 | `--module` 只能为 `node16` or `node18` or `node20` or `nodenext`    |

## 决策树

新代码只使用 esm, 这里只讨论 esm 的情况

![longshot20260105224202.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/810678a3322b4ca19823846ec4314837~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbWFnaWNkYXduX2do:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTQzMzQxODg5MTAwMjQ1NSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1768229454&x-orig-sign=8K%2BvnxU7NSpgtvJyXnqKZ3pPQvE%3D)

非常短的版本: 不用管 `moduleResolution`, 用设置的 `module` 值所决定的默认值即可

- bundler: `module: preserve`
- 非 bundler: `module: nodenext`

## TotalTypeScript TsConfig Cheatsheet

https://www.totaltypescript.com/tsconfig-cheat-sheet
and https://github.com/total-typescript/tsconfig/blob/main/bundler/no-dom.json
