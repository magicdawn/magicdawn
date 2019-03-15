# ServiceWorker

之前一直以为这是一个 `Worker`, 类似于 `Thread` 之类的东西, 没太关注.
后在 GitHub Star 了一个组件库 https://nutui.jd.com/#/index
然后读了这篇文章 https://jdc.jd.com/archives/212962
发现 ServiceWorker 与 cache 有关.

## Links

- pwa-sw https://developers.google.cn/web/ilt/pwa/caching-files-with-service-worker
- offline-cookbook https://developers.google.cn/web/fundamentals/instant-and-offline/offline-cookbook/
- ServiceWorker mdn https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- workbox doc https://developers.google.cn/web/tools/workbox/guides/get-started
- taobaofed workbox guide http://taobaofed.org/blog/2018/08/08/workbox3/

## 简单理解

ServiceWorker 是一个 Request Agent, 甚至可以说是 Server on the Client.

- sw 在安装之后可以拦截到页面所有的请求, 包括同域名和其他域名, 文件/接口/cors 都可以.
- sw 可以使用 Network(fetch) / Cache API 去处理请求, 是通过网络, 还是走 cache, 还是请求完放进 cache, 下次走 cache.

## 生命周期

MDN 图
![](https://mdn.mozillademos.org/files/12636/sw-lifecycle.png)

简单来说就是几个事件

- `install` 安装时触发
- `activate` 激活时触发
- `fetch` 处理请求, 这里就是 workbox 处理路由的地方

使用 `event.waitUntil(p)` 就是 `p`这个 Promise 结束, 事件才算结束. 生命周期事件才会往下走.

### Tips

- 打开页面, 注册 sw, 则打开的页面初始是不受控制的, 下次才会生效.
- 更新 sw: 页面的 ServiceWorker 像是一个单例, 每次 `register` 会下载新的, 然后与当前的比较, 不一样, 走更新逻辑
