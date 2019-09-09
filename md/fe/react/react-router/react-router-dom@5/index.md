# react-router-dom@5

## Router

```js
import {BrowserRouter, HashRouter} from 'react-router-dom'
```

- BrowserRouter 基于 history
- HashRouter 基于 hash

## Route / Switch

```js
import {Route, Switch} from 'react-router-dom'
```

### Route

基于 `path` 与 `location.pathname` 匹配, 没有 `path` prop 总是匹配

route props

- `match`
- `location`
- `history`

route 渲染方式

- `<Route component={FooComponent} />`
- `<Route render={props => <div></div>} />`
- `<Route children={props => <div></div>} />`

`children` 与 `render` 区别: 当 match 为空时, children 还会被调用

### Switch

用于 group route, 会渲染第一个匹配的 `Route`, 否则会渲染所有匹配的 Route

## Navigation

```js
import {Link, NavLink} from 'react-router-dom'
```

### Link

`to` 表示 target

### NavLink

- `activeClassName` `to` 与 `location.pathname` 匹配的话, 会增加 activeClassName
