# react-router

https://github.com/ReactTraining/react-router



## IndexRoute / IndexLink / IndexRedirect

https://github.com/ReactTraining/react-router/blob/master/docs/guides/IndexRoutes.md



- `IndexRoute` 在匹配不到的时候, 采取的默认值
- `<IndexLink />`  = `<Link onlyActiveOnIndex={true}>`
  - `<Link to={'/'}>` 会在所有 `/`开头的path active
  - `<IndexLink to={'/'}>` 只在 `path = '/'`  active
- `<IndexRedirect />` 同 `<IndexRoute>` , 只在匹配不到的时候去做跳转



## History

https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md



## withRouter

```js
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  // blabla
}
```

- `withRouter` 在前在后都可以从 `this.props.router` 中获取, withRouter 从 context 中获取 router, 然后作为 props 传递到 WrappedComponent
- `connect` 是必要的, 内部会 subscribe 到 store, 并在 dispatch action 的时候 setState('storeState' ... )