# objc reference counting

## objc 内存管理分为 MRC(manual) 和 ARC(Automatic)

区别

- mrc 使用 `retain` / `release` / `autorelease` 方法手动管理内存
- arc 则禁止手动调用这些方法, 由编译器插入这些方法的调用

注意 `autorelease` 的 auto 还是手动管理, 只是交给了 autoreleasepool 来释放

## `NSAutoReleasePool` & `@autoreleasepool`

作用一样, 但是 `@autoreleasepool` 更高效, `NSAutoReleasePool` 需要手动 `alloc` + `init`, 结束手动 `drain`

有了 `Pool` 之后还是需要调用 `[obj autorelease]` 才能起作用

## rust `objc_id::Id`

https://docs.rs/objc_id/latest/objc_id/struct.Id.html

- `objc_id::Id` 包含一个 `objc::rc::StrongPtr`
- 利用 rust 的变量出作用域后会调用 `(impl Drop).drop` 方法, 在 drop 方法里调用 objc `release`

```rust
impl Drop for StrongPtr {
  fn drop(&mut self) {
    unsafe {
      runtime::objc_release(self.0);
    }
  }
}
```

### `from_ptr` / `from_retained_ptr`

```rust
/// Constructs an `Id` from a pointer to an unretained object and
/// retains it. Panics if the pointer is null.
/// Unsafe because the pointer must be to a valid object and
/// the caller must ensure the ownership is correct.
pub unsafe fn from_ptr(ptr: *mut T) -> Id<T, O> {
  assert!(!ptr.is_null(), "Attempted to construct an Id from a null pointer");
  Id::new(StrongPtr::retain(ptr as *mut Object))
}

/// Constructs an `Id` from a pointer to a retained object; this won't
/// retain the pointer, so the caller must ensure the object has a +1
/// retain count. Panics if the pointer is null.
/// Unsafe because the pointer must be to a valid object and
/// the caller must ensure the ownership is correct.
pub unsafe fn from_retained_ptr(ptr: *mut T) -> Id<T, O> {
  assert!(!ptr.is_null(), "Attempted to construct an Id from a null pointer");
  Id::new(StrongPtr::new(ptr as *mut Object))
}
```

#### `from_retained_ptr`

- `from_retained_ptr` 比 `from_ptr` 少调用一次 `retain`
- 对于已经 retained 的数据, 使用 `from_retained_ptr`, 比如经过 `alloc` / `new` / `copy` 方法生成的数据

https://hit-alibaba.github.io/interview/iOS/ObjC-Basic/MM.html#%E5%AF%B9%E8%B1%A1%E6%93%8D%E4%BD%9C%E7%9A%84%E5%9B%9B%E4%B8%AA%E7%B1%BB%E5%88%AB

我的理解目前只有 alloc_init 出来的对象需搭配 `from_retained_ptr`,
其他地方用 `from_ptr`

## rust objc `autoreleasepool(|| { /* code */ })`

```rust
objc::rc::autoreleasepool(|| {
  // Autorelease consumes the StrongPtr, but won't
  // actually release until the end of an autoreleasepool
  obj.autorelease();
});
```
