# FUM = frequent used methods

## `std::Result map_err`

将 `Result<T, E1>` 映射成 `Result<T, E2>` 类型

```rs
let mut x = Result(()).map_err(|err| { napi::Error::from_reason("") })
```

## `Option.ok_or` / `Option.ok_or_else`

将 Option 转换成 Result
