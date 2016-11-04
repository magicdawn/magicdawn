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



