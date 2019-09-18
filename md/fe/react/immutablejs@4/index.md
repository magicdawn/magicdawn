# Immutable

https://immutable-js.github.io/immutable-js/docs/#/

## Record

`Record` 只能接收有限的 key

```js
import {Record} from 'immutable'
const SomeTypeRecord = Record({key1: 'val1', key2: 'val2'})
const someRecord = SomeTypeRecord({key1: 'val3', key3: 'val3'})
```

SomeTypeRecord 是一个 record factory, 只能接收 `key1` & `key2`
