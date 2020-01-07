# `useCallback` / `useMemo`

## TLDR; 结论

```js
function useEventCallback(fn) {
  let ref = useRef()
  useLayoutEffect(() => {
    ref.current = fn
  })
  return useCallback((...args) => (0, ref.current)(...args), [])
}
```

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

## Update on 2020-01-07

react FAQ 里说了这个问题:
https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback

### 建议 `useEventCallback`

```js
function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useEffect(() => {
    ref.current = fn
  }, [fn, ...dependencies])

  return useCallback(() => {
    const fn = ref.current
    return fn()
  }, [ref])
}
```

### 我建议的 `useEventCallback`

```js
function useEventCallback(fn) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useEffect(() => {
    ref.current = fn
  })

  return useCallback(
    (...args) => {
      const fn = ref.current
      return fn(...args)
    },
    [ref]
  )
}
```

- 去掉 dependencies, 过于繁琐, 还需要想着 fn 里用到哪些变量, 而且只是更新 `ref.current` 可以接受
- useEffect(..., deps), 去掉 dependencies,即是 `[fn, ...dependencies]` -> `[fn]`, 只依赖 `[fn]`, 和不写依赖应该是一样的
- 关于 `useEffect` & `useLayoutEffect`, react docs 建议优先使用 `useEffect`, 有问题再使用 `useLayoutEffect`
- 然后，其实跟结论里是一样的，用结论里那个就 OK
