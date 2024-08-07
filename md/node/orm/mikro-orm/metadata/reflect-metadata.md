# reflect-metadata

## 限制

### Explicit types

需要始终显式指定类型

#### 例外

> Since v6, the type is inferred automatically based on the runtime default value, as long as it is possible to instantiate the entity without passing any constructor arguments. As long as you keep your constructors aware of that, this limitation does not apply.

### Optional properties

需要显式设置 `nullable` 属性, `@Property({ nullable: true })`

### Collection properties and Identified references

需要在 `@OneToMany` 和 `@ManyToMany`装饰器中提供目标实体类型

### Enums

> By default, enum is considered as numeric type. For string enums, we need to explicitly provide one of:

- `@Enum(() => UserRole)`
- `@Enum({ type: 'UserRole' })`
- `@Enum({ items: ['a', 'b', 'c'] })`

### Circular dependencies

`@ManyToOne` and `@OneToOne` Entity 循环依赖时, 需要使用 `{entity: () => TheEntity}`
