# react-router-redux

> **Keep your router in sync with application state**

https://github.com/reactjs/react-router-redux#api



## routerReducer

作为 `state.routing` 的 reducer

```js
Redux.combineReducer({
  ...otherReducers,
  routing: ReactRouterRedux.routerReducer,
});
```



## `syncHistoryWithStore(history, store)`

```jsx
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

<Router history={history}>
  ...
</Router>
```

