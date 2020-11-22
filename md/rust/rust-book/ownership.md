# ownership

https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html

## Ownership rules

- Each value in Rust has a variable that’s called its _owner_.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

小结

- 对于基本类型, 赋值操作可以通过浅克隆 (shallow copy) 完成, 那么值是赋值的, 没有 ownership 转移.
- 对于复杂数据类型, 如 (String), 浅克隆只能复制指针, 那么内存的 ownership 在赋值时完成了转移(move)
  - 转移之后, 之前的变量没有 ownership 了, 不能再被使用.

### [The Rules of References](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#the-rules-of-references)

Let’s recap what we’ve discussed about references:

- At any given time, you can have _either_ one mutable reference _or_ any number of immutable references.
- References must always be valid.

小结

- reference 不会获取 ownership, 表现为 `&Type` 例如 `&String`
- reference 只读, `&mut Type` 可写, 但同 scope 最多只能有一个 mutable reference, 而且有 mutable reference 时, 不能有 immutable reference
- 函数参数使用 reference, 这个过程称之为 borrow
