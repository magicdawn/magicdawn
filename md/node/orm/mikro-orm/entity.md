# Define Entity

## Conventions

- filename: `entities/user.entity.ts`

## decorators

- on class
  - `@Entity`
  - `@Embeddable`
- on class field
  - `@Property` 定义列
  - `@PrimaryKey` 定义主键
  - `@Embeded` 对应 `@Embeddable`

## `field!: Type` 语法

例如 `@Property() role!: Role`

这是为了避免在编译时出现像“`Property 'role' has no initializer and is not definitely assigned in the constructor`”这样的错误。

## `Opt` type

> Note that we use the Opt type to intersect with the property type to tell the ORM (on type level) that the property should be considered optional for input types (e.g. in em.create()), but will be present for managed entities (e.g. EntityDTO type).

use `string & Opt` or `Opt<string>`

- the property should be considered optional for input types (e.g. in em.create())
- but will be present for managed entities (e.g. EntityDTO type).

## Features

### Embeddable

将多个列映射为一个 object field

### Custom Types

TODO

### Lazy Property

```ts
@Property({ columnType: 'text', lazy: true })
text: string;
```

如果不显示指定 `{ populate: ['text'] }` , 则默认不 select 该列

### Using custom base entity

- 默认 `@Entity` 是不用 extends
- 如果有一些公用的, 可以抽出来
