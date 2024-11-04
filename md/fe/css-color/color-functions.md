## `hsl()`

### 文档

- MDN https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl
- W3C https://www.w3.org/TR/css-color-4/#the-hsl-notation

### 特点

> A disadvantage of HSL over Oklch is that hue manipulation changes the visual lightness,
> and that hues are not evenly spaced apart.

> 与 Oklch 相比，HSL 的缺点是色调操作会改变视觉亮度，并且色调间隔不均匀。

### 范围

- h: 0 ~ 360
- s: percentage (0% - 100%) 或 number (0 - 100)
- l: percentage (0% - 100%) 或 number (0 - 100). 0% = black, 50% = normal, 100% = white

W3C 说是 `s` & `l` 可以使用 number, 而 MDN 说明里只有 percentage 类型

### relative color 范围

在使用 relative colors 时:

- `h`: number (0 - 360)
- `s`: number (0 - 100)
- `l`: number (0 - 100)
- `alpha`: number (0 - 1 inclusive)

使用 `hsl(from #abc h s calc(l + 10))` +10% lightness 需要使用 `calc(l + 10)`

## `oklch()`

hue chroma lightness

### 文档

- MDN https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
- W3C https://www.w3.org/TR/css-color-4/#the-oklch-notation

### 范围

- l: percentage (0% - 100%) 或 number (0 - 1) 或 `none`
- c: percentage 或 number, `chroma`, number 理论上是无上限的, 但实际不超过 `0.5`, 100% = `0.4`
- h: 0 ~ 360, 应该是 hue 的表达形式一样, 可以使用 `10deg` / `10` / `10turn` 等形式

### relative color 范围

在使用 relative colors 时:

- `l`: number (0 - 1 inclusive)
- `c`: number (0 - 0.4 inclusive)
- `h`: number (0 - 360)
- `alpha`: number (0 - 1 inclusive)

<!-- prettier-ignore -->
> [!CAUTION]
> `oklch` lightness 是 `0-1`, `hsl` lightness 是 `0-100`

### 工具

- 取色器 + 可视化 https://oklch.com
