# CURD 操作

## create

- create `Entity` instance
  - or `em.create()`
  - or `const e = new Entity()`
  - or `entityRepository.create({ ...values })` 注意不用 await, 还没执行
- mark (only new instance required)
  - `em.persist(entity)`
- flush
  - `await em.flush()`

## update

```ts
const article = await db.article.findOneOrFail(+params.id)
wrap(article).assign(request.body as Article)
await db.em.flush()
```

> For updating we use wrap(article).assign(), a helper method which will map the data to entity graph correctly. It will transform foreign keys into entity references automatically.

> Alternatively, you can use `em.assign()`, which will also work for not managed entities.

- `assign` 是为了方便 association, 比如 `user!: User` association, 需要写成 `entity.user = em.getReference(User, userId)` , 为了避免使用 `getReference`, 可以使用 `assign({ user: userId })`

- `wrap` : 因为 assign 是 `WrappedEntity` 上的方法, 所以需要将 `Entity` 转成 `WrappedEntity`, 也可以定义 Entity 的时候从 `BaseEntity` 继承, 就可以直接使用 `entity.assign({ user: userId })`

## delete

可以直接删除

```ts
await db.article.nativeDelete(+params.id)
```

先 find, 后 remove + flush

```ts
const article = await db.article.findOne(+params.id)
if (!article) return {notFound: true}
await db.em.remove(article).flush()
```

## select / query

https://mikro-orm.io/docs/query-conditions
