# module & crate

## module

语法

```rust
mod front_of_house {
  mod hosting {
    fn add_to_waitlist() {}

    fn seat_at_table() {}
  }

  mod serving {
    fn take_order() {}

    fn serve_order() {}

    fn take_payment() {}
  }
}
```

使用 `::` 访问子成员, e.g `front_of_house::serving::take_order()`

## crate

crate 是一个默认的顶级 module, 比如上面的可以使用 `crate` 开头的绝对路径开头

> A path can take two forms:
>
> - An absolute path starts from a crate root by using a crate name or a literal crate.
> - A relative path starts from the current module and uses self, super, or an identifier in the current module.

- `crate::front_of_house::serving::take_order()`
- `self` & `super` 表示当前模块 & 上级模块, 因为可以使用 relative path, self 感觉用的不多, 没必要.

## use

```rust
// use value
use std::fmt::Result;

// use alias
use std::io::Result as IoResult;

// use glob
use std::io::*;
```

### use 合并

```rust
// orginal
use std::cmp::Ordering;
use std::io;

// 合并形式
use std::{io, cmp::Ordering};
```

```rust
// 使用 self 的例子
use std::io;
use std::io::Result;

// 合并
use std::io::{self, Result};
```

### legacy `extern crate xxx`

可以见到老代码

```rust
extern crate xxx;
```

参见
https://stackoverflow.com/questions/29403920/whats-the-difference-between-use-and-extern/29404692

说是之前需要手动标注外部依赖(extern crate), 使用 cargo.toml 管理之后不需要这样了(since 2018)

## `pub` 可见性控制

- `mod` / `fn` / `struct` / `enum` 都可以加 `pub`
- 默认不能在外部访问私有的物件
- `struct` 分为 `pub struct` 和 `pub field`, 分别控制 `struct` 和 `struct members` 的可见性
- `enum` 只需要标注整个 enum 为 `pub`, 所有成员自动成为 pub

### `pub use`

re-export, 先将 member `use` 到当前 `scope`, 在通过 `pub` 导出

## `module` 拆分成多个文件

Filename: src/lib.rs

```rust
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
  hosting::add_to_waitlist();
  hosting::add_to_waitlist();
  hosting::add_to_waitlist();
}
```

Filename: src/front_of_house.rs

```rust
pub mod hosting {
  pub fn add_to_waitlist() {}
}
```

- 空的 mod 语句(如 `mod front_of_house;`)表示从外部加载该模块
- 文件名会成为模块名, 最后 `add_to_waitlist` 访问路径为 `front_of_house::hosting::add_to_waitlist()`
