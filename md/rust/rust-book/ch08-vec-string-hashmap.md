# common collections

# `Vector`

`Vector` 用于在连续的内存中存储多个类型相同的值.

## 创建

### `new()`

```rust
let v: Vec<u8> = Vector::new();
```

这种方法需要标注类型.

### `vec!`

```rust
let v = vec![1,2,3];
```

## 修改

```rust
let mut v = vec![1,2,3];

// 增
v.push(4);
v.pop(); // Option<T>
```

## 读取

- `&v[index]` 使用 index 访问
- `v.get(index) -> Option<&T>` 使用 `get` 方法

## 遍历

```rust
let mut v = vec![1,2,3];

for i in &v {
  println!("i = {}", i)
}

for i in &mut v {
  *i += 1; // 修改值
  println!("i = {}", i)
}
```

# `String`

- rust core language 只有 `str` 类型, aka `string slice`
- `std:String` 由标准库提供
- 上述两种类型都是 UTF-8 编码的字符串

## 常用方法

- `"hello world"` 子串串字面是 `&str` 类型
- `String::from(&str) -> String`
- `&str.to_string() -> String`
- `fn add(self, s: &str) -> String` String 实例方法, 用于子串串连接

### 字符串 `+`

```rust
let s1 = String::from("hello");
let s2 = String::from("World")
let sentence = String.from("") + &s1 + " " + &s2;
```

最前面的那个 `String.from("")` 在第三句中取得 ownership, 所以新创建了一个空的

### `format!`

```rust
let s1 = String::from("hello");
let s2 = String::from("World")
let sentence = format!("{} {}", s1, s2);
```

## 遍历

- String 不能使用 `[index]` 访问, 这样访问到的是 `bytes[index]`
- `for c in s.chars()` 遍历字符
- `for b in s.bytes()` 遍历字节, 同 `[index]` 访问

# `HashMap`

```rust
use std::collections::HashMap;

// 创建的时候, 可以不标注类型 `HashMap<K,V>`
// 在第一次 insert 的时候推断类型
let mut scores = HashMap::new();

// 插入 & 更新
scores.insert(String::from("zhangsan"), 60);

// 获取
scores.get(&String::from("zhangsan"));
```

- `map.get(&K) -> Option<&V>`
- `map.entry(&K).or_insert(&V) -> &mut V` 当 entry 不存在的时候, 就新插入一项
