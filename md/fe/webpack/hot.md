# hot

>  webpack 为 bundle 添加 HMR runtime, 并通过 singal or poll 的方式查询更改的文件, HMR runtime 接收到了更改的 module 之后, 会检查 module 是否可以 self accept, 如果不行, 会向上查询 require 了次 module 的 module 是否可 accept.

## webpack-dev-server

- `--hot` 此 flag 将会添加 `HotModuleReplacementPlugin`

### 自动刷新

#### inline

使用 `--inline` flag, 将会添加 `webpack-dev-server/client?http://<path>:<port>/` 到entry point

配合 `--hot` 使用, 还会自动添加 `webpack/hot/dev-server` 至 entry point

##### log信息

- `[HMR]` 是 `webpack/hot/dev-server`打印的
- `[WDS]` 是 `webpack-dev-server/client` 打印的

##### 浏览路径

http://localhost:8080/

#### iframe

##### 浏览路径

http://localhost:8080/webpack-dev-server/

----



## 配置

- entry 需要添加
  - webpack/hot/dev-server
  - webpack-dev-server/client?http://localhost:8080
- plugins 需要添加 `HotModuleReplacementPlugin`

对于 webpack-dev-server cli 来说, 使用

- `--hot` 会添加 `HotModuleReplacementPlugin`, `webpack.config.devServer.hot = true` 不起作用
- `--inline` 会添加 entry, `webpack.config.devServer.inline = true` 也可