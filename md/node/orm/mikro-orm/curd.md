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
