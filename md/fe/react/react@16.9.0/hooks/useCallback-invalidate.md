# `useCallback` / `useMemo`

## Links

- https://zhuanlan.zhihu.com/p/56975681
- https://github.com/facebook/react/issues/14099

### `useEventCallback`

```js
function useEventCallback(fn) {
  let ref = useRef()
  ref.current = fn
  return useCallback((...args) => (0, ref.current)(...args), [])
}
```

- 在 render 阶段改变 ref, 会有危险...
- 在 concurrent mode 下, last render 不是可能最新的 props

### `useEventCallback` with `useLayoutEffect`

```js
function useEventCallback(fn) {
  let ref = useRef()
  useLayoutEffect(() => {
    ref.current = fn
  })
  return useCallback((...args) => (0, ref.current)(...args), [])
}
```

- 使用 `useLayoutEffect` 避免在 render 阶段改变 ref
