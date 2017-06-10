# react-router@4 

https://reacttraining.com/react-router/web/guides/quick-start



1. 可以继续使用 `react-router.Router history={history}`
   1. 使用 `history/createBrowserHistory` 创建 history
2. 也可以使用 `import { BrowserRouter, HashRouter } from 'react-router-dom'` 包



## Route

route 现在变为 component

- exact 能完全匹配上才算匹配, 例如 `/` 如果不谢 exact, 那么任意路径都能匹配上
- Route 现在是组件了, 在 react devtool 中可以看到



## Switch 

只渲染第一个匹配成功的组件



## Code Spliting

https://reacttraining.com/react-router/web/guides/code-splitting

```js
import React from 'react'
import { Route as DomRoute, Link } from 'react-router-dom'

export default class Route extends React.Component {
  state = {
    component: null,
  }

  componentWillMount() {
    this.handle(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.component !== nextProps.component) {
      this.handle(nextProps)
    }
  }

  handle(props) {
    const lazy = typeof props.component === 'function'
    this.setState({ lazy })
    if (!lazy) return

    // fn
    props.component().then(C => {
      this.setState({
        component: C.default || C,
      })
    })
  }

  render() {
    if (!this.state.lazy) {
      return <DomRoute {...this.props} />
    }

    // lazy load
    if (this.state.component) {
      return <DomRoute {...this.props} component={this.state.component} />
    } else {
      return <div>loading</div>
    }
  }
}
```

