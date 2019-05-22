# koa2-connect

https://github.com/cyrilluce/koa2-connect/blob/master/index.js

## 流程

- 返回一个 koa middleware
- 内部执行 connect middleware

## 注意点

- `dummyRes`, 为了在 connect middleware 执行结束将默认的 404 statusCode 切换到 200
- koa middleware 的 goNext, 只有在 connect middleware 执行 `next(err)` or `next()` 为 true
- readme 上说 connect middleware 必须执行 `next`, 如果 connect middleware 参数数量 >=3, 必须调用 next, 否则工作不正常
