# `useSelector`

## Links

- https://react-redux.js.org/api/hooks#useselector

## API

```ts
const result : any = useSelector(selector : Function, equalityFn? : Function)
```

### equalityFn

为什么要有 equalityFn

> However, when an action is dispatched to the Redux store, useSelector() only forces a re-render if the selector result appears to be different than the last result

就是 dispatch 一个 action 的时候, 可能没有影响到 useSelector 的结果, 但是返回如果是一个 object,
useSelector() 的结果的 使用 `===`, 就会不等
