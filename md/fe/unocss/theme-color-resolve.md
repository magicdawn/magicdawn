# `theme.colors` 解析步骤

代码在 [packages-presets/preset-mini/src/\_utils/utilities.ts](https://github.com/unocss/unocss/blob/main/packages-presets/preset-mini/src/_utils/utilities.ts)

- parseColor
- getThemeColorForKey

## 步骤

```js
// 1. 使用 `[main]` 传入 `getThemeColor`
const colorData = getThemeColor(theme, [main], themeKey)

// 2. 使用 keys
let keys = main.replace(/([a-z])(\d)/g, '$1-$2').split(/-/g)
if (/^\d+$/.test(keys.at(-1))) {
  keys = colors.slice(0, -1)
}
getThemeColor(theme, keys, themeKey)
```

## example

### `color-gate-bgLv2`

- try `[gate-bgLv2]`, 即 `theme.colors.gateBgLv2`
- main: `gate-bgLv2` => `gate-bgLv-2`
- keys: `main.split(/-/g)` => `[gate,bgLv,2]` => `[gate,bgLv]`

## 结论

unocss 对数字有特殊处理, `/[a-z](\d)/` 中间会加一个 `-`, 然后按 `-` split, 会被分开
