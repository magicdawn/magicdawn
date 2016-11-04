## Module & namespace

### module

同 ES2015 module, 使用现有的 CommonJS `module.exports` 方案时, 要使用

```js
import identifier = require('foo');
```

使用 `export =` map到 `module.exports = obj`

估计 Node.js 中允许ES2015 module 的时候, CommonJS 模块与 ES2015 module 模块交互, 应该也类似, 拭目以待...


### namespace

就是加一个 namespace

```js
namespace X {
  class Y { }
  interface Z { }
}
```