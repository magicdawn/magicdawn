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

## Error Boundaries

## hooks API
