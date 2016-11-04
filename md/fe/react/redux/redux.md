# Redux



## Action

- action creator, 创建 action 的函数

- `Redux.bindActionCreators({ a: creataA, b: createB }, dispatch)`  返回

  ```
  {
    a: createAAndDispatch
    b: createBAndDispatch
  }

  // 相当于
  Redux.bindActionCreators = (obj, dispatch) => _.mapValues(obj, (v,k) => {
    return (...args) => dispatch(v(...args));
  });
  ```

  ​

## Reducer

- 不要修改 state, 遇到无法处理的情况, 即 default 返回传入的 state

- `Redux.combineReducers({ a: reducerA, b: reducerB })`

  ```js
  // 相当于 a & b 都只处理自己的 key
  // 一个 action 过来, 最后的 state = 
  {
    a: reducerA(state.a, action),
    b: reducerB(state.b, action),
  }
  ```

## Store

职责

- `store.getState()` 维系应用的 state
- `store.dispatch(action)`
- `cancelHandler = store.subscribe(listener)`


### `Redux.createStore(reducer, initialState)`



## 数据流

> 这意味着应用中所有的数据都遵循相同的生命周期，这样可以让应用变得更加可预测且容易理解。同时也鼓励做数据范式化，这样可以避免使用多个且独立的无法相互引用的重复数据。



1. `store.diapatch(action)`
2. redux store 将 action 传入 reducer
3. store 得到新的 state, 并更新 UI




## 中间件

处理方式

```js
const applyMiddleware = (store, middlewares) {
  middlewares = middlewares.reverse();
  
  let dispatch = store.dispatch;
  middlewares.forEach(mid => {
    dispatch = mid(store)(dispatch)
  });
  
  return Object.assign({}, store, { dispatch })
}
```



middleware 示例

```js

const mid = store => next => action => {
  // next 即是下一个中间件
  // store.dispatch != next, 使用 store.dispatch 从新开始 dispatch
}
```



### redux-thunk

1. 使用 middleware

   ```js
   const store = createStore(
     reducer,
     applyMiddleware([
       thunkMiddleware
     ])
   )
   ```

2. `dispatch` 一个 `fn = dispatch => { ... }`

