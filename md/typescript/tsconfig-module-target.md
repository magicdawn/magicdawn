# tsconfig.module

https://www.typescriptlang.org/tsconfig#module

## `module: node16`

这个时候 module 是动态的, 根据 package.json type 取值来定, 要么是 `CommonJS` | `ES2020`

## `ES2015` / `ES2020` / `ES2022` / `ESNext` 区别

see https://github.com/microsoft/TypeScript/issues/24082

- es2015
  - `import` / `export`
- es2020:
  - `import()`
  - `import.meta`
- es2022 v4.5 支持
  - top level await
- esnext ?

# tsconfig.target

https://www.typescriptlang.org/tsconfig#target

target 的修改主要影响 lib
https://www.typescriptlang.org/tsconfig#high-level-libraries

## target = ES2022

v4.6 支持, 包含以下内容

- `Array.prototype.at`
- `Object.hasOwn`
- `Error.prototype.cause`
