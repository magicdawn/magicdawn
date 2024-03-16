# slice type

> Another data type that does not have ownership is the slice.

`References` 和 `Slice` 都不拥有 ownership

## String Slice

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

- 左闭右开, start inclusive, end exclusive
- 类型 `hello` & `world` 的类型可以用 `&str` 表示

## string literals 也是 `&str` 类型

```rust
let s: &str = "Hello World";
```

> The type of s here is &str: it’s a slice pointing to that specific point of the binary. This is also why string literals are immutable; &str is an immutable reference.

- `&str` 类型
- 是 `一块固定区域内存的` 的 `slice`
- string literals 是 immutable
- string slice 是 immutable reference

## 使用 `&str` 类型作为形参类型

- 实参可以传 `&str` / `&String` 类型的参数

其中过程叫: 隐式 deref 转换(implicit deref coercions)
