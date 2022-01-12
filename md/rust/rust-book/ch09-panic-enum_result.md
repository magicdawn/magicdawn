# `panic!`

- `panic!("some msg");`
- `RUST_BACKTRACE=1 cargo run` 可以看见堆栈

## `Result<T,E>`

```rust
enum Result<T, E> {
  Ok(T),
  Err(E),
}
```

## `unwrap` / `expect`

对于 `Result` 类型

- `reult.unwrap()` 可以取出其中的值, 如果有错误则 `panic!()`
- `reult.expect(msg)` 可以取出其中的值, 如果有错误则 `panic!(msg)`

只是 `expect` 可以定制 panic 消息

## 向上传递错误 `?`用法

直接看代码

```rust
fn read_username_from_file() -> Result<String, io::Error> {
	use std::fs::File;
	use std::io::Read;

	let f = File::open("hello.txt");
	let mut f = match f {
		Ok(file) => file,
		Err(e) => return Err(e), // 注意这里的 return 是函数的返回
	};

	let mut s = String::new();
	match f.read_to_string(&mut s) {
		Ok(_) => Ok(s),
		Err(e) => Err(e),
	}
}
```

```rust
fn read_username_from_file_short() -> Result<String, io::Error> {
	use std::fs::File;
	use std::io::Read;

	let mut f = File::open("hello.txt")?;
	let mut s = String::new();
	f.read_to_string(&mut s)?;
	Ok(s)
}
```

这俩方法是一样的, `?` 用法在于

- 可以用在返回值是 `Result<T,E>` 的函数体中
- 可以在返回 `Result<T,E>` 的 statement 后面跟 `?`, 表示遇到错误立马返回错误, 不继续后面

## `fn main` + `?`

```rust
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
  let f = File::open("hello.txt")?;

  Ok(())
}
```

- `Box<dyn Error>` any kind of error.

## panic 捕获

https://doc.rust-lang.org/std/panic/fn.catch_unwind.html

```rust
use std::panic;

let result = panic::catch_unwind(|| {
  println!("hello!");
});
assert!(result.is_ok());

let result = panic::catch_unwind(|| {
  panic!("oh no!");
});
assert!(result.is_err());
```
