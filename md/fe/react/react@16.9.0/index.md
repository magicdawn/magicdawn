# react 16.9.0 2019-09-09

## 生命周期

## context API

```js
const MyContext = React.createContext(defaultValue)

// setup value
<MyContext.Provider value={/* some value */}>
</MyContext.Provider>

// use value
<MyContext.Consumer>
  {value => (
    <div>
      value = {value}
    </div>
  )}
</MyContext.Consumer>

// or set ClassComponent.contextType = MyContext
// & use this.context to reference `value`
// 只能使用一个 context
```

## ref API

### `createRef`

```jsx
var ref = React.createRef()
var dom = <div ref={ref} />

// use `ref.current` 引用 dom
```

### `ref={callback}`

```jsx
var dom = <div ref={el => (this.divEl = el)} />
```

### `forwardRef`

因为 `ref` 不是一个 props, `ref` 会被 React 特殊处理, 使用 `React.forwardRef` 取出 `ref={xxx}`

```js
const {createRef, forwardRef} = require('react')

const FooComponent = props => {
  return <div ref={props.theref}>the FooComponent</div>
}

const wrappedFooComponent = forwardRef((props, ref) => {
  return <FooComponent theref={ref} {...props} />
})

const r = createRef()
ReactDOM.render(<wrappedFooComponent ref={r} />)
```

中间使用了 `props.theref` 做中转, 在 FooComponent 这里也可以 forwardRef, 避免 `theref` 取名
改造后:

```js
const {createRef, forwardRef} = require('react')

const FooComponent = forwardRef((props, ref) => {
  return <div ref={ref}>the FooComponent</div>
})

const wrappedFooComponent = forwardRef((props, ref) => {
  return <FooComponent ref={ref} {...props} />
})

const r = createRef()
ReactDOM.render(<wrappedFooComponent ref={r} />)
```

## Error Boundaries

## hooks API
