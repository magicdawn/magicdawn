# `useCallback` / `useMemo`

## Links

- https://reactjs.org/docs/hooks-reference.html#usememo
- https://zhuanlan.zhihu.com/p/56975681

## relationship

```js
useCallback(fn, dep) === useMemo(() => fn, dep)
```

## 解释 on the doc

`useCallback(fn, deps)`, 如果 deps 不变, fn 会保持不变.

意义:
不在于每次重新创建 inline function, 而在于能保持不变

看到知乎文章, 疑问点

```js
function Form() {
  const [text, updateText] = useState('')

  const handleSubmit = useCallback(
    () => {
      console.log(text)
    },
    [text]
  ) // 每次 text 变化时 handleSubmit 都会变

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} /> // 很重的组件，不优化会死的那种
    </>
  )
}
```

`handleSubmit` 写成这样行不行

```js
const handleSubmit = useCallback(() => {
  console.log(text)
}, [])
```

结论: 不行,

- 第一次调用 `Form`, `text` = `text-content-v1`, `useCallback(fn1, dep = [])`
  fn1 通过闭包引用的是 `text-content-v1`
- 第二次调用 `Form`, `text` = `text-content-v2`, `useCallback(fn2, dep = [])`
  fn2 通过闭包引用的事 `text-content-v2`

而 useCallback 在更新的时候的逻辑是: 如果 `dep` 浅比较相等, 则返回一样的内容,
即是: 在第二次调用的时候, `useCallback(fn2, dep = [])` 返回 `fn1`, 闭包引用 `text-content-v1`, log 出来也是 v1

## conclusion

不在于避免每次重新创建 inline function, 避免不了, `fn1` & `fn2`
而在于能保持不变, 第二次调用返回 `fn1`
