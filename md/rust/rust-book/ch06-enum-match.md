# enum

## 常规 enum

```rust
enum IpAddrKind {
  V4,
  V6,
}

// 使用
let k: IpAddrKind = IpAddrKind::V4;
```

## enum type+data

- 类似于 TypeScript 联合类型
- enum 除了类型(如 V4/V6), 还可以携带数据

```rust
enum IpAddr {
  V4(i32, i32, i32, i32),
  V6(String),
}

// 创建
let addr1 = IpAddr::V4(127, 0, 0, 1);
let addr2 = IpAddr::V6(String::from("::1"));
```

相当于函数来用, 也可以用复杂类型做参数

```rust
struct Ipv4Addr {
  // --snip--
}

struct Ipv6Addr {
  // --snip--
}

enum IpAddr {
  V4(Ipv4Addr),
  V6(Ipv6Addr),
}
```

## enum 方法

```rust
impl IpAddr {
  fn print() {
    // print it
  }
}

// 作为方法调用
IpAddr::V6(String::from("::1")).print();
```

# match

## syntax

```rust
match val {
  val1 => expr1,
  val2 => { expr2 },
}
```

### 带值的 enum

```rust
#[derive(Debug)] // so we can inspect the state in a minute
enum UsState {
  Alabama,
  Alaska,
}

enum Coin {
  Penny,
  Nickel,
  Dime,
  Quarter(UsState),
}

fn use_coin(c: Coin) {
  match c {
    Penny => { println!("Penny") },
    Nickel => { println!("Nickel") },
    Dime => { println!("Dime") },
    Quarter(state) => {
      //
      // 注意这里将 Quarter(val) 中的 `val` 取出来了
      //
      println!("Quarter: inner usState = {}", state)
    },
  }
}

```

## 规则

- `match` 必须穷尽所有可能, 如 `Option` 需要写 `Some` & `None` 对应的处理
- `match` 最后可以有个其他的情况 `other`, 通常使用 `_` 代替, 不需要你面的值了

# `if let`

```rust
let config_max = Some(3u8);
if let Some(val) = config_max {
  println!("The maximum is conf`igured to be {}", val);
}

// none
else if let None = config_max {
  //
}
```

- `if let Enum::Kind(val) = a_enum_instance` 顺序不能变, 类似于 match 解构
- 给了除 `match` 外另一种处理 enum 的方法

# 常用 enum

## Option<T>

```rust
enum Option<T> {
  None,
  Some(T),
}
```

- `Option` / `Some` / `None` 全局可用, 不用写 `Option::Some(val)`
-

## Result<T, E>
