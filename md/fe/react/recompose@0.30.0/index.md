# recompose

## props

- mapProps 直接覆盖 props
- withProps 添加 props

## performance

- shouldUpdate((props, nextProps) => { /_ boolean _/ }) 定义是否更新
- onlyUpdateForKeys(['key1', 'key2']) => 只为 key1 / key2 更新
- shallowEqual 就是 react 常说的 shallowEqual
