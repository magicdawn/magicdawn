## 关键术语

### Extension UIs

- browser actions
- page actions 

> Each extension can have at most one browser action or page action. Choose a browser action when the extension is relevant to most pages. Choose a page action when the extension's icon should be active or inactive (and grayed out), depending on the page.

browser actions 是页面不相关的, page actions 是页面相关的, 在某些页面激活使用。

#### `browser actions`
https://developer.chrome.com/extensions/browserAction



#### `page actions`
https://developer.chrome.com/extensions/pageAction


### `background`

> A common need for extensions is to have a single long-running script to manage some task or state. Background pages to the rescue.

就是有一些长期运行的任务, 可以放在 manifest.json background 字段里

可以这样

```json
// 这样会自动生成 background.html
// 包含所列的 scripts
background: {
  scripts: ['background.js']
}
```

也可以

```json
background: {
  page: "background.html"
}
```

#### `persistent background pages`

https://developer.chrome.com/extensions/background_pages

- 一直运行

#### `event pages`

https://developer.chrome.com/extensions/event_pages

- 按需加载



### `content script`

> Content scripts are JavaScript files that run in the context of web pages

https://developer.chrome.com/extensions/content_scripts



### 其他方式

- chrome context menu 右键菜单
- content script, 插入到页面去执行
- options page 选项设置页面

### incognito 匿名模式

`tab.incognito`







### background

