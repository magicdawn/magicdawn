# API

## 概览

- setup 函数
- 数据 `ref` / `reactive` / `computed` / `readonly`
- watch: `watchEffect` / `watch`
- lifecycle hook `onMounted` / `onUpdated` / `onUnmounted`
- context `provide` / `inject`

## import

```js
import {h, ref, reactive, computed} from 'vue'
```

## `ref`

和 `React.createRef` 一样, vue 这里使用 `ref.value`, React 里是 `ref.current`

## `reactive`

```
const state = reactive({
  name: ref('default_name'),
  fullName: computed(() => { return `name-${state.name}`})
})
```
