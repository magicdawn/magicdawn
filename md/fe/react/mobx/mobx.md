# mobx

## Links

- https://github.com/mobxjs/mobx
- https://github.com/mobxjs/mobx-react

## 原理

1. 使用 `mobx.obserable` 创建属性值, 类似 Vue 中的 data, 会使用 getter / sertter 拦截属性值, state 即是 store 的 class property
2. 使用 `mobx.action` 创建 action, 也就是这些 action 可以更改 @obserable 的值
3. 使用 reaction 取监听 store 的变化, 提供了自带的
  - `mobx.autorun(callback)` 来响应 store 的变化
  - `mobx-react.observer` <del>这是 React HoC</del>, 打了这个 decorator 的 Component 会响应 store 里值的变化


## mobx-react

### `observer`

- 内部会 patch 掉 Component 上的方法 https://github.com/mobxjs/mobx-react/blob/4.1.8/src/observer.js#L105

### `Provider` / `inject`
https://github.com/mobxjs/mobx-react/blob/4.1.8/src/inject.js#L91

App.jsx
```js
<Provider store1={store1} store2={store2}>
</Provider>
```

someComponent.jsx
```js
@inject('store1', 'store2')
@observer
export default class UI extends React.Component {
  constructor(props) {
    this.props.store1 // blabla
    this.props.store2 // blabla
  }
}
```

- provider 提供 context
- inject 从 context 中获取 store, 并注入到 props 中
- 先 inject, 后 observer 的顺序不能更改, observer 会更改 Component 的生命周期方法