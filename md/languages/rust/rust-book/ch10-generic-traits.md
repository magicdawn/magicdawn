# generic

```rust
// struct
struct Point<T> {
  x: T,
  y: T,
}

// enum
enum Option<T> {
  Some(T),
  None,
}

// fn
impl<T> Point<T> {
  fn x(&self) -> &T {
    &self.x
  }

  // 函数 <U> 泛型参数
  fn mixup<U>(self, other: Point<U>) -> Point<T, U> {
      Point {
          x: self.x,
          y: other.y,
      }
  }
}
```

# traits

类似 TypeScript `interface`, 但 rust 中只能包含方法

```rust
// 定义 trait
pub trait Summary {
  fn summarize(&self) -> String;
}

struct Weibo {
  author: String,
  title: String,
  content: String,
  time: String,
}

// 实现 trait 中的方法
impl Summary for Weibo {
  fn summarize(&self) -> String {
    format!("{} post {}-{} at {}",
      self.author, self.title, self.content, self.time
    );
  }
}
```

- trait 中可以有默认实现

## `Traits` as Parameters / Return Type

- `impl Summary` 可以作为类型, 作为形参的类型
- `impl Summary` 可以作为类型, 作为返回类型

```rust
pub fn notify(item: &impl Summary) {
  println!("Breaking news! {}", item.summarize());
}

pub fn new_weibo() -> &impl Summary {
  Weibo {
    // ... construct weibo
  }
}
```

# `generic` + `trait`

```rust
// 作为泛型类型约束的时候, 不用 `impl`
pub fn notify<T: Summary>(item: &T) {
  println!("Breaking news! {}", item.summarize());
}

// 多个限制, 使用 `+` 连接, 联合类型
pub fn notify<T: Summary + Copy>(item: &T) {
  println!("Breaking news! {}", item.summarize());
}

// where 语句, 将约束写在最后(也在返回值之后)
pub fn notify<T>(item: &T) -> Option<()>
  where T: Summary + Copy
{
  println!("Breaking news! {}", item.summarize());
  Ok(());
}
```
