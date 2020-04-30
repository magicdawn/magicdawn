# vue composition api

https://vue-composition-api-rfc.netlify.app/#summary

## Drawbacks

https://vue-composition-api-rfc.netlify.app/#drawbacks

- 需要自己区分 plain value 与 ref value
- 操作 ref, 需要指定 `value`

### Ref vs. Reactive

- reactive 的返回值类似一个大 ref, 如果解构(deconstruct) 的话, 就会 lose reactivity
- 需要 toRefs(), 全部变成 ref value

### More Flexibility Requires More Discipline

- The gain in the upper bound far outweighs the loss in the lower bound.

  提高上限比降低下限收益高~hhhhhha
