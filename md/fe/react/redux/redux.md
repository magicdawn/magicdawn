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




## enhancer

```flow
type StoreCreator = (reducer: Reducer, preloadedState: ?State) => Store
type StoreEnhancer = (next: StoreCreator) => StoreCreator
```

> A store enhancer is a higher-order function that composes a store creator to return a new, enhanced store creator. This is similar to middleware in that it allows you to alter the store interface in a composable way.

store enhancer 是一个高阶函数, 参数是一个 store creator, 返回一个 enhanced store creator. 和中间件类似, 这允许你以一个可组合的方式修改 store.

例如 `applyMiddlewares(arr)` 的结果就是一个 enhancer



## compose

http://redux.js.org/docs/api/compose.html

- Composes functions from right to left.

- > Each function is expected to accept a single parameter. Its return value will be provided as an argument to the function standing to the left, and so on. The exception is the right-most argument which can accept multiple parameters, as it will provide the signature for the resulting composed function.

  每一个函数都接收一个参数, 它的返回值会被提供给左边的函数的入参. 例外的是, 最右边的函数可以接收多个参数, 它会提供整个 compose 调用返回的函数的签名

```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

实例分析
```js
compose([
  fn1, fn2, fn3
])
```

1. a=fn1, b=fn2, ret1 = (...args) => fn1(fn2(...args))
2. a = ret1, b = fn3, ret2 = (...args) => ret1(fn3(...args))

相当于 (...args) => fn1(fn2(fn3(...args)))



## applyMiddleware

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```



## API

### createStore

```js
store = createStore(
  reduver,
  initialState,
  enchancer
)
```







