# WASI

## 介绍
https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/

## 2020-01-14 23:27:59 文章写的很好

WASI  = WebAssembly System Interface
POSIX = Portable Operating System Interface, 即多个操作系统由一样的 sys API 实现

WASI 规范只是指定一个方法名, 由 WASI runtime 去实现这些个方法.
比如 rust 的 Open 方法, target 到 wasm 的时候, wasm (text format) 里会有 `__wasi_path_open`
然后这个方法应该由 wasi-core 去实现, 挂到 runtime, 在运行的时候可以被调用.
或者通过 importObject 传进 wasm 里去

### WASI 模块化

不是说什么模块化规范, 是 WASI 目标是 POSIX, 但是不可能全部实现.
于是分模块 
- wasi-core 处理 file, network, socket 啥的
- wasi-crypto 处理加密一些的
- wasi-threads 包含 posix `fork` 类似的
- ...

全部实现不太现实, 可以选择需要的模块实现, 比如实现了 wasi-core 就可以处理文件和网络了.
原文
> This way, we can get good standardization coverage while still allowing niche platforms to use only the parts of WASI that make sense for them.

栗子
https://github.com/bytecodealliance/wasmtime/blob/master/docs/WASI-tutorial.md#web-assembly-text-example

写一个wat, 调用 `importObject.wasi_unstable.fd_write`
然后使用实现 wasi 规范的 wasmtime 去运行, 就会提供上面这个方法