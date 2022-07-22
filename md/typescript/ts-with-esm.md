# TS + ESM

## To read

- ts v4.7 发布说明, 正式引入 https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#type-in-package-json-and-new-extensions
- ts-node-esm
- node.js esm https://nodejs.org/api/esm.html#esm_interoperability_with_commonjs

## in ESM

对于 Node.js 项目, 需要设置

### `tsconfig.module` => `node16` or `nodenext`

不能根据 package.json type 字段写成 `CommonJS` or `ES2022`, 因为 `node16` or `nodenext` 是根据文件扩展名和文件文件位置动态决定的

- 扩展名, `.mts` 则认为是 ESM, `.cts` 则认为是 CommonJS
- `.ts` 向上查找 package.json, 找到 type 字段, 觉得它是 CommonJS | ESM

和 node.js 的机制一样.

### moduleResolution

moduleResolution TS 文档, 讲的是如何确定被导入的模块是哪个文件. (下面链接中只有 classic 和 node 的 resolve 过程, node16/nodenext 可能还在补充中
https://www.typescriptlang.org/docs/handbook/module-resolution.html#node

- `classic`: 早期 TypeScript resolve 模块逻辑
- `node`: Node.js 在 CommonJS 时代的 resolve 模块逻辑, 可以省略 index, 省略扩展 等等, TS Handbook & node.js 文档有详细过程.
- `node16` or `nodenext`: Node.js ESM 的 resolve 逻辑, 规范在这里 https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#resolver-algorithm-specification

未设置 `moduleResolution` 时的默认值

- 当 module = AMD, UMD, System or ES6/ES2015 时, moduleResolution 默认为 classic
- 当 module = node16 or nodenext 时, moduleResolution 为 node16 或者 nodenext
- 其他情况, 默认为 `node`

有个 issue, https://github.com/microsoft/TypeScript/issues/48854
module:nodenext + moduleResolution:node

### ts-node

需要使用 `ts-node-esm` / `ts-node --esm`, CommonJS 是注册 require.extensions 即可, esm 需要 spawn child_process `node --loader ts-node/esm`
使用 `ts-node some.mts` 不起作用, ts-node v10.9.1, 不够智能
或者使用 `tsconfig.json` `ts-node.esm = true`

```json
{
  "ts-node": {
    "esm": true
  }
}
```

#### paths

- 目前 tsconfig-paths 包不能处理 esm 的情况
- ts-node 在处理中 https://github.com/TypeStrong/ts-node/pull/1585
- esbuild-kit/tsx README 说能处理, 未尝试

### 写法

- 带扩展名 `import './index.js'`
- 引入 cjs

```ts
import pkg from './some/cjs-module.js'
const {namedExports} = pkg
```

注意: module.exports 使用 default export 总是可用, 某些情况下可以使用 namedExports, 我试了不太行,
官方文档是这样说的 https://nodejs.org/api/esm.html#esm_interoperability_with_commonjs

> When importing CommonJS modules, the module.exports object is provided as the default export.
> Named exports may be available, provided by static analysis as a convenience for better ecosystem compatibility.

通过静态分析出来的, 但 TypeScript 生成的 CommonJS node 可能分析不出来...
