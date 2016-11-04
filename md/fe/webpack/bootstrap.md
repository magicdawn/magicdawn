# webpack bootstrap

## 使用 `CommonsChunksPlugin` 提取后

### 配置

- vendor -> `lib.js`
- app.js

### 结果

#### `lib.js`

结构为

```js
(function(modules){
  // bootstrap 代码
})([
  // 一堆 module 定义
])
```

定义了一个全局函数 `webpackJsonp`

```js
function webpackJsonp(chunkIds, moreModules) {
  // 1. 将 moreModules 合并至 moudles
  
  // 2. require 此chunk 的第一个 module, moduleId = 0
}
```

定义了 module 内部的 `require` -> `__webpack_require__`

- `require.m` 所有的 modules

- `require.p` = `publicPath`

- `require.c` 所有modules 的 cache

  ```js
  require.c = installedModules = {
    [moduleId]: {
      exports: {},
      id: moduleId,
      loaded: true | false,
    }
  }
  ```

- `require.e` ensure 一个 chunk

