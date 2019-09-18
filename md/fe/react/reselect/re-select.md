# re-select

https://github.com/bearyinnovative/re-select/blob/master/src/index.js

## usage

```js
import {is} from 'immutable'
import {createMemoizor, createSelectorCreator} from 're-select'

const createSelector = createSelectorCreator(createMemoizor(is))
export default createSelector
```

## 与 `reslect` 的区别: nested selector

https://github.com/bearyinnovative/re-select#nested-selector

- `createSelector` 可以支持嵌套 selector, 例子

```js
createSelector(
  [someSelector1, someSelector2],
  (someSelector1Val, someSelector2Val) => {}
)

someSelector1 = [
  [getVal1, getVal2],
  (val1, val2) => {
    /* get some value */
  },
]
```

## Rules

- `createSelector` 的每一个参数都是一个数组, 不是数组会变成数组
- 第一个参数有两个 input
- 第二个参数有三个 transform, 每个 transform 的参数是 input1 & input2 的结果
- 第三个参数, 每一项都有三个参数, 因为第二个参数有 3 个 transform, 会产生 3 个结果

```js
createSelector(
  [input1, input2],
  [transform1(val1, val2), transform2(val1, val2), transform3(val1, val2)],
  (val1, val2, val3) => {
    /* get the final value */
  }
)
```

## 源码

https://github.com/bearyinnovative/re-select#nested-selector

- `normalizeSelector` 将 selectors 全都变成数组

```js
function makeDependenciesFn(fns, next) {
  fns = Array.isArray(fns) ? fns : [fns]
  return function() {
    const params = fns.map(fn => fn.apply(null, arguments))
    return next.apply(null, params)
  }
}

function createNestedSelectors(selectors, next) {
  return selectors.map(fn => (isFunction(fn) ? fn : next(fn)))
}

export const createSelectorCreator = memoize => {
  function createSelector(selector) {
    const selectorNormalized = normalizeSelector(
      isFunction(selector) ? [selector, identity] : selector
    )

    return selectorNormalized.reduceRight(function(next, cur) {
      const dependenciesFn = makeDependenciesFn(
        createNestedSelectors(cur, createSelector),
        next
      )
      return memoize(dependenciesFn)
    }, identity)
  }

  return createSelector
}
```

按照上面的例子, selectorNormalized 变成

```js
;[
  //
  [input1, input2],
  [transform1, transform2, transform3],
  [final1],
]
```

reduceRight

- 第一次, next = identity = `a=>a`, cur = [final1], 返回一个函数 fn3, 内部调用 [final1], 并把结果传给 next, 返回 next 调用结果
- 第二次, next = fn3, cur = [transform1, transform2, transform3], 返回一个函数 fn2, 内部调用 [transform1, transform2, transform3], 并把结果传给 next
- 第三次, next = fn2, cur = [input1, input2], 返回一个函数 fn1, 内部调用 [input1, input2], 并把结果传给 next

reduceRight 用的比较好, 其实就是 comose

### 一个数组, 最后产生一个值

最后一个 next 为 identity, `a=>a`,
`identity.apply(null, params)`, 只会取到第一个, 就是最后的 resultFunc, 如果是数组, 值也会丢

## compose

```js
import compose from 'recompose/compose'

// compose
comose(a, b, c)(Comp)

// 等同于
a(b(c(Comp)))
```

comose 可以简单实现为

```js
function compose(fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}
```

这里可以实现为

```js
function createSelector(selector) {
  // first normalize to all array
  return function(...args) {
    let nextParams = args
    for (let arr of selector) {
      nextParams = arr.map(fn => fn(...nextParams))
    }

    // 取 nextParams 的第一个
    // 最后一个参数 array.lenght 必须为 1
    return nextParams[0]
  }
}
```
