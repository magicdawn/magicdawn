## syntax via `Redis入门指南`

## 数据类型

| 类型         | 取值                                       |
| ---------- | ---------------------------------------- |
| `nil`      | `nil`, 只有 `nil` & `false` 在 条件判断中为 `false` |
| `boolean`  | `true` & `false`                         |
| `number`   | 整数 & 浮点数                                 |
| `string`   | `'single quote'` & `"double quote"` 均可   |
| `table`    | 是Lua中唯一的数据结构, 类js 中 `Object` + `Array`   |
| `function` | 类js, 是first-class-value                  |

### 类型转换

- `tonumber(s, 进制)`  和js `parseInt` 一样
- `tostring(num)`

## 变量

```lua
a = 1 -- 全局变量
local l = 10 -- 局部变量
```

> 删除全局变量的方法是赋值为 nil, 全局变量没有声明 & 未声明的区别, 只有 `非nil` & `nil` 的区别



## 注释

```lua
-- 单行注释
--[[
  多行注释
]]
```

## 操作符

- `==` / `~=`
- `>` / `<` / `>=` / `<=`

### 逻辑操作符

- `and`
- `or`
- `not`

 ## 控制流

### `if`

```lua
if 条件表达式 then
  -- foo
elseif 条件 then
  -- bar
else
  -- baz
end
```

### `while`

```lua
while condition do
  -- foo-bar-baz
end
```

### `repeat`

```lua
repeat
  -- foo-bar-baz
until condition
```

### `for`

- ```lua
  for i = 0, 100, 1 do
    -- i from 0 to 100, step = 1
    -- 步长可以省略, 默认1
  end
  ```

- ```lua
  for index, value in 迭代器 do
    -- foo-bar-baz
  end
  ```

## 表类型

### object

````lua
local t1 = {}
t1.name = 'foo'
t1.age = 18

local t2 = {
  name = 'bar'
}
t2['age'] = 19
````

- 使用 `for key, value in pairs(t1)` 遍历, `pairs` 会遍历到每一个值不为 `nil` 的索引

### array

```lua
local t1 = {}
t1[1] = 1
t2[2] = 2

local t2 = {11, 12}
```

- key为整形时, 可以当做 array 使用
- index值从 `1` 开始
- 可以使用 `#t1` 获取数组长度
- 使用 `for i,v in ipairs(t1)` 遍历, `ipairs` 会遍历到最后一个值不为 `nil` 的整数索引

## `function` 

```lua
local function fn () {
  -- ...
}
  
local fn = function () {
  -- ...
}
    
-- 两种形式等价
```

### 变长参数

```lua
local fn = function (...) {
  local argv = {...}
  return unpack(argv)
}
```

- 代码中的 `...` 即是具体形式
- `unpack` 将参数解开, 相当于 `return argv1, argv2, argv3`

## 标准库

### `string`

- `string.len(s)` 返回字符串长度
- `string.lower` / `string.upper` 大小写
- `string.sub(s, start[, end])` 子串

### `table`

- `.concat(t)` : `Array.prototype.join` in js
- `.insert` 插入元素
- `.remove` 移除元素

### `math`

常规数学函数

### `cjson` in redis

- `.encode` 序列化成 string
- `.decode` 反序列化

### `cmsgpack` in redis

- `.pack` 序列化
- `.unpack` 反序列化