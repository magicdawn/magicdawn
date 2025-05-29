## 相关库

[lib-esm](https://www.npmjs.com/package/lib-esm)

用于生成 esm 胶水代码

```js
const M = require('electron')
export const clipboard = M.clipboard
// more...
```

## vite-plugin-electron-render

### builtin

- 通过 alias 设置 custom resolver, resolve 到 snippet 文件, 如 `node:path` -> `node_modules/.vite-plugin-electron-render/path.js`
- 内容为 esm 胶水代码

### Third Party Deps

```js
plugins: [
  vitePluginElectronRender({
    resolve: {
      'fs-extra': { type: 'cjs' },
    },
  }),
]
```

- `'fs-extra': {type: 'cjs'}`: 不要被名称误导, `type: cjs`, 会生成 esm 胶水代码, 在运行时 `require('fs-extra')`
- `'fs-extra': {type: 'esm'}`: 不要被名称误导, `type: esm`, 会将 `fs-extra` esbuild bundle 成 `fs-extra.cjs`, 然后胶水代码在运行时 `require('some/path/fs-extra.cjs')`
