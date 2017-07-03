# react-router-redux@4.1.1

主要组件

- ConnectedRouter
- redux middleware
- redux reducer


## actions

对外暴露的方法, push replace go goBack goForward, 内部就是

```js
store.dispatch({
  type: '@@router/CALL_HISTORY_METHOD',
  payload: {
    method,
    args,
  }
})
```

## middleware

处理 action.type === '@@router/CALL_HISTORY_METHOD'
配合前面 dispatch 的 actions, 取调用 history 上的对应方法

## redux reducer

处理 action.type === '@@router/LOCATION_CHANGE'
将新的 location 放到 store 上, 一般都是

```js
export default combineReducer({
  ...,
  routing: routerReducer,
})
```

即是将 `@@router/LOCATION_CHANGE` 传过来的 `location` 放到 `store.getState().routing` 中

## ConnectedRouter

处理之前的 `syncHistoryWithStore` 逻辑, 产生 `@@router/LOCATION_CHANGE` action,
现在封装成一个组件了

### example usage

```js
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

// using `history` to create redux middleware
// const middleware = require('react-router-redux').routerMiddleware(history)

const render = () => {
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
    </ConnectedRouter>
  </ReduxProvider>
}
```

### 作用

在 `componentWillMount` 里, 使用

```js
unsubscribe = history.listen(location => {
  store.dispatch({
    type: '@@router/LOCATION_CHANGE',
    payload: location
  })
})
```

在 `componentWillUnmount` 里调用 `unsubscribe()`