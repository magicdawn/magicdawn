# reslect

https://github.com/reduxjs/reselect#reselect

## Motivation

https://github.com/reduxjs/reselect#motivation-for-memoized-selectors

```js
import {createSelector} from 'reselect'

const someSelector = createSelector(
  [selectState1, selectState2],
  (state1, state2) => {
    // the transform function
  }
)
```

就是每次 `mapStateToProps` 再 store.state 变化之后都要计算, 对性能影响很大
将 selector 拆开, `createSelector([selectFunction1, selectFunction2], transformFunction)`,

- input selector: 只选择 state, 不做转换, 这个很快
- transform function: 对 state 进行 transform, 说是这个是 expensive 的, 如果 arguments 不变, 结果就不变, 这里就是 memoized selector

## selector 共享

https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances

1. 创建一个 selector
2. 在 mapStateToProps 里手动调用 `selector(state, props)`

这样在多个组件之间公用的话, `props` 会一直得到变化, 没有起到 memoize 的效果,
所以改成 mapStateToProps 第一个参数返回一个函数, 即是 selector, 作为真正的 mapStateToProps

```js
import {connect} from 'react-redux'
connect(() => {
  return createSelector(/* bla bla */)
})
```

## `createStructuredSelector({ key1: selector1, key2: selector2 })`

等同于

```js
createSelector(
  [selector1, selector2],
  (val1, val2) => ({
    key1: val1,
    key2: val2,
  })
)
```

就是 resultFunc 很简单

## 源码

100+行特别简单.

### `defaultMemorize`

```js
// defaultMemorize
function defaultMemorize(fn) {
  // 上次调用的参数和结果
  let lastArgs
  let lastResult

  return (...args) => {
    // args 与 lastArgs 相等
    // shadowEqual 则是遍历 args, 每一项用 defaultEqualityChech 比较, 就是 `===` 比较
    if (shadowEqual(args, lastArgs)) {
      return lastResult // 避免计算
    }

    // recompute
    const result = fn(...args)

    // save
    lastArgs = args
    lastResult = result

    // return
    return lastResult
  }
}
```

### `createSelector`

等于

```js
;`createSelectorCreator(defaultMemorize)`
```

### `createSelectorCreator`

```js
export function createSelectorCreator(memoize, ...memoizeOptions) {
  return (...funcs) => {
    let recomputations = 0
    const resultFunc = funcs.pop()

    // NOTE: 这里是 input selectors
    const dependencies = getDependencies(funcs)

    // NOTE: 这一层 memoize 目的
    // 如果 input selector 的返回值, 即 resultFunc 的参数不变,
    // 不重新计算 resultFunc
    const memoizedResultFunc = memoize(function() {
      recomputations++
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments)
    }, ...memoizeOptions)

    // NOTE: 这一层 memoize 目的
    // 如果 selector 参数 (state, props) 不变, 不重新跑整个 selector
    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    const selector = memoize(function() {
      const params = []
      const length = dependencies.length

      for (let i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments))
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params)
    })

    selector.resultFunc = resultFunc
    selector.dependencies = dependencies
    selector.recomputations = () => recomputations
    selector.resetRecomputations = () => (recomputations = 0)
    return selector
  }
}
```
