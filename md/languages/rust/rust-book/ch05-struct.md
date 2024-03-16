# Struct

## syntax

```rust
struct User {
  active: bool,
  username: String,
  email: String,
  sign_in_count: u64,
}
```

同 TS interface 语法

## 创建

```rust
let user1 = User {
  email: String::from("someone@example.com"),
  username: String::from("someusername123"),
  active: true,
  sign_in_count: 1,
};
```

### tuple struct

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

## method syntax

> All functions defined within an impl block are called associated functions because they’re associated with the type named after the impl.

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

## 静态函数

写在 impl block 中, 非方法函数

```rust
impl User {
  fn new() -> User {
    User {
      // ...
    }
  }
}

impl Rectangle {
  fn square(size: u32) -> Rectangle {
    Rectangle {
      width: size,
      height: size,
    }
  }
}

// 调用
User::new();
Rectangle::square(10u32);
```
