## Models

### def

- `attributes`
  - `{ type, columnName, defaultsTo }`
- `tableName`
- `connection` 使用哪个数据库连接
- `autoCreatedAt` / `autoUpdatedAt` : 默认 `true`

### methods

`FooModel.`

- `create`
- `find`
- `update`
- `destroy`

### `attribute methods` or `instance methods`

- `toJSON`
- `save`
- `destroy`
- `validate`

同时可定义其他 `attribute methods`, 可引用 `this.id` 等 `attribute`

### query

http://sailsjs.org/documentation/concepts/models-and-orm/query-language

```
Model.find({
	where: {
  	name: 'foo'
  },
  limit: 10,
  skip: 0,
  sort: 'id'
})
```

当没有限制条件时, 可直接将 `para.where` 作为 `para` 传参

- key-pairs `{ name: 'foo' }`
- in / not in `{ name: ['foo', 'bar'] }` / `{ name: { '!': ['foo', 'bar'] } }`
- modified pairs `{ name: { contains: 'abc' } }`

modifiers

- `<` / `lessThan`
- `<=` / `lessThanOrEqual`
- `>` / `greaterThan`
- `>=` / `greaterThanOrEqual`
- `!` / `not`
- `like`
- `contains`
- `startsWith`
- `endsWith`
