# Struct

## syntax

## 创建

## method syntax

- 第一个参数总是 `self`, 代表当前实例
- `&self` 是 `(self: &Self)` 的简写
- 可以 take ownership `self` / borrow mutable reference `self: &mut Self` 简写 `&mut self`

```rust
#[derive(Debug)]
struct Rectangle {
	width: u32,
	height: u32,
}

impl Rectangle {
	fn area(&self) -> u32 {
		return	self.width * self.height;
	}
}
```
