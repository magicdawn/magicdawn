# react-redux

文档 https://github.com/reactjs/react-redux/blob/master/docs/api.md

## `<Provider>`

使用

```jsx
import { render } from 'react'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
```

> 这使得 store 能够为下面的组件所使用, 通过 [context 特性](https://facebook.github.io/react/docs/context.html) 实现



## `connect`

函数签名

```js
WrappedApp = connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(App)
```

示例

```js
class App extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
      	...
      </div>
    );
  }
}

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return _.pick(state, 'some_state');
};

export default connect()(App)
```



参数

- `mapStateToProps(state, ownProps) : stateProps`  此参数省略, 则不会 subscribe 到 store
- `mapDispatchToProps(dispatch, ownProps): dispatchProps`  
  - 此参数省略, 则会默认 inject `dispatch`
  - 如果此参数是 function, 参数是 `(dispatch, ownProps)`
  - 如果此参数是 object, 则会任务每一个 key 都是 action creator, 然后调用 `Redux.bindActionCreators`
- `mergeProps(stateProps, dispatchProps, ownProps): props` 就是指定一个方法如何合并, 默认 `Object.assign({}, ownProps, stateProps, dispatchProps)`
- `options`
  - `options.pure` 
  - `options.withRef`



