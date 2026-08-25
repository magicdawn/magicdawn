## `ngModel`

### `$setViewValue(string value)`

设置作用域中的视图值

- 这个方法更新制控制器本地 `$viewValue`, 然后将值传递给每一个 `$parser` 函数
- 调用玩 `$parser` 后, 值会被赋给 `$modalValue`, 并且传递给指令中 `ng-model` 属性提供的表达式
- 最后 `$viewChangeListeners` 中的监听器都会被调用

> 单独调用`$setViewValue` 不会唤起一个新的 `$digest` 循环, 如果想更新指令, 需要在设置 `$viewValue` 后手动触发 `$digest`

### `ngModelController.props`

- `$viewValue`
- `$modalValue`
- `$parsers`
- `$formatters`
- `$viewChangeListeners`
- `$error`
- `$pristine` 用户是否对控件进行了修改
- `$dirty` 与 `$pristine` 相反
- `$valid`
- `$invalid`
