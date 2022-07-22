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

### `tsconfig.moduleResolution = nodenext`

moduleResolution = nodenext, 其他可选 'node' | 'classic', 新的 nodenext 没有文档

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
