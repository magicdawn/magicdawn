# html 优化

## Links

- 雅虎规则 https://developer.yahoo.com/performance/rules.html#js_bottom
- 浏览器工作原理 <https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#css>
- <https://mp.weixin.qq.com/s/C2Zx3KPNPkgj-aHnOY43Iw>

## 解析顺序

1. html parsing + css OM
2. 这俩好了之后, 就可以进行渲染

所以

- css 放在前面 head 中, 尽快下载
- script 放在 body 最后, 不阻塞解析 html
  - script defer 属性标识, 不包含 `document.write` 指令, 不 block `html parsing` 阶段
  - script async 表示可以使用另外的 thread 下载执行

## prefetch / preload

```html
<link rel="preload" href="some-url" as="style" />
<link rel="preload" href="some-url" as="script" />
<link rel="preload" href="some-url" as="font" />
```

可以在解析到的时候, 发起下载

相关插件

- <https://github.com/vuejs/preload-webpack-plugin>
- <https://github.com/GoogleChromeLabs/preload-webpack-plugin>

Read

- spec <https://w3c.github.io/preload/>

- <https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/>
