# gopl

https://docs.ruanjiadeng.com/gopl-zh/index.html

## ch2

### 指针

- `p := &x` 取地址
- `*p` 解构

在 golang 中, 返回函数中的局部变量地址也是安全的

```go
func fn() *int {
  v := 1
  return &v
}
```

局部变量 `v` 从函数作用域中逃逸了

### 赋值

```go
x = 1
*p = true
```

- `+=` / `-=` / `*=` / `\=` 在 golang 中可用
- `x++` 是一个 statement, 而不是一个 expression

元组赋值
`x,y = y,x` 先计算赋值表达式右边的值, 再赋值给左边

### 类型 `type`

```go
type 类型名字 底层类型
```

- 如果底层类型相同, 例如 `type A int; type B int` A & B 不能混用, 使用
  - A(b_value) 转为 A 类型值
  - B(a_value) 转为 B 类型值

### 包和文件

- 一个包保存在一个或多个 go 文件中
- 包导入的名称通常是`basename(path)`, 例如导入 `/github.com/magicdawn/goco` 包应为 `goco`

#### 包初始化

```go
package foo

var z = y + 1
var y = x + 2
var x = 3
```

- 也是可以的, 包初始化会找出合适的执行顺序
- 包可以有多个 `init` 函数

## ch3

### 整形

- int8 / int16 / int32 / int64
- uint8 / uint16 / uint32 / uint64
- `int` 32 or 64 bit
- `rune` = `int32` 可以表示一个 Unicode 码点
- `byte` = `uint8`

二元运算符优先级

```go
*      /      %      <<       >>     &       &^
+      -      |      ^
==     !=     <      <=       >      >=
&&
||
```

#### 打印格式

| 格式        | 说明                                                       |
| ----------- | ---------------------------------------------------------- |
| `%d`        | 输出 10 进制                                               |
| `%b`        | 输出 2 进制                                                |
| `%o`        | 输出 8 进制                                                |
| `%x` / `%X` | 输出 16 进制                                               |
| `%[1]d`     | 还是使用第一个格式化输入                                   |
| `%#x`       | 输出 `0x`, 8 进制输出头部 `0`, `x`输出 `0x`, `X` 输出 `0X` |

其他

- `%c` 输出单个字符
- `%q` 输出带 `""`

### 浮点数

`float32` / `float64`

- float32 & float64 能表示从很小到很大的数, 但是 float32 能表示的正整数并不是很大(float32 有效的 bit 位只有 23 个, `2 << 24` 赋值给 float32 值, 计算就不精确了)

- 使用 `%g` / `%e` / `%f` 打印浮点数, 例如 `%8.3f` 总长度 8, 小数点后保留 3 位小数

### 复数

go 提供

- `complex64` / `complex128` 类型
- `complex(real, imag)` / `real(x)` / `imag(x)` 内置函数

### 字符串

包

- `unicode`
- `unicode/utf8`
- `bytes`
- `strings`
- `strconv`

Note:

- 字符串一旦生成, 不可改变了.
- `len(s)` 返回的是字节数目, 并不是字符个数
- `s[index]` 返回字节值, index 超出 len, 则会 panic
- `utf8.RuneCountInString(s)` 返回字符个数
- `utf8.DecodeRuneInString` 从字节数组中解码 rune 字符
  ```go
  for i := 0; i < len(s); {
    r, size := utf8.DecodeRuneInString(s[i:])
    fmt.Printf("%d\t%c\n", i, r)
    i += size
  }
  ```
- `for index,c := range "Hello, 世界" { //blabla }` range 可以自动解码
- `[]rune(str)` 将 string 转为 rune 数组
- `string(codepoint int32)` 进行 utf8 编码, 如果码点无效, 则使用 `\uFFFD` 代替
- `byte[](s)` 转换会分配新的字节数组用于字符串数据的拷贝

#### helper

`Contains` / `Join` / `Index` / `HasPrefix` ... 等 helper

`bytes` 包 & `strings` 包都提供这些 helper, 输入参数不同.

#### 转换

- `strconv.Itoa`: `int` to `string`
- `strconv.FormatInt`: `int` to `string`
- `fmt.Sprintf(format, inputs)`
- `strconv.Atoi`: `string` to `int`
- `strconv.ParseInt(s string, 进制 int, size int)`: parseInt

### 常量

常量表达式的值在编译期计算

#### 无类型常量

许多常量没有一个确定的基础类型. 编译器为无明确基础类型的数字提供比基础类型更高精度的算数运算.

```go
// TODO: 无类型常量, 不是很懂
```

#### `iota`

`iota` 表示自增

```
const (
  Mon = iota // = 0
  Tue
  Wed
  Thu
  Fri
  Sat
  Sun
)
```

也可以

```go
const (
  Mon = iota + 1 // = 0 + 1
  Tue
  ...
)
```

## ch4

### 数组

- 因为长度固定, 很少使用数组, 而是使用 slice 切片

```go
// 固定长度
arr := [3]int{ 1,2,3 }

// `...` 使用内容决定长度
arr := [...]int{
  1,2,3,4,5
}

// 使用 index: val
// arr[1], arr[9] = 1, 9; 其余为 0
arr := [...]int{
  1: 1,
  9: 9
}
```

#### 比较

数组是可以使用 `==` / `!=` 进行比较的, 当内部每个元素都相等时, 数组相等

### slice

- slice 没有固定长度
- 多个 slice 可以共享底层数组存储
- `len` 返回 slice 长度
- `cap` 返回 slice 容量
- 初始化 slice 时, 不指定长度, 编译器会为 slice 创建合适的存储
- slice 不能使用 `==` 比较, 对于 `byte[]` 可以使用 `bytes.Equal` 进行比较
- slice 是间接引用, 一个固定的 slice 在不同的时间可能包含不同的元素, 因为底层数组的元素可能被修改
- `slice != nil` 是唯一合法的相等比较
- `make([]T, len, cap)`

#### append 函数

`append(slice, value...)`

append 值可能会导致 slice 重新分配内存, 增大 capacity

### map

- map 是哈希表的一个引用, 可写为 `map[K]V`
- K 类型必须支持 `==` 比较, 判断 key 是否存在
- 可以使用 `make(map[K]V)` / `map[k]V{ key: val }` 创建
- get/set `map[k]` / `map[k] = v`
- del `delete(map, k)`
- `for k,v := range map` 迭代顺序每次都会变, 防止你依赖 :joy

#### get

> 通过 key 作为索引下标来访问 map 将产生一个 value。如果 key 在 map 中是存在的，那么将得到与 key 对应的 value；如果 key 不存在，那么将得到 value 对应类型的零值

```go
v, ok := map[k] // 这样才对, v 不会为 nil, k 不存在, ok 为 false
```

### struct

#### syntax

```go
type Foo struct {
	ID		Int
	Name	String
}

var foo Foo = Foo{}
var pf *Foo = &foo
```

- 相同类型的字段可以合并
- `foo.prop` & `pf.prop` 均可以, 即指针也可以直接使用 `.` 操作符
- 一个名为 `S` 的 struct 不能再包括一个 `S` 类型的成员, 但是可以包含 `*S` 类型的成员
- `Foo{ val1, val2, ... }` 给定所有属性值
- `Foo{ prop: val }` 给定某些属性
- 使用 `%#v` 打印结构体, 会打印每一个字段

#### 比较

> 如果结构体成员全部是可以比较的, 那么结构体也是可以比较的. 使用 `==` 比较结构体, 将比较两个结构体的所有成员.

由于可以比较, 结构体也可以作为 map 的 key

#### 结构体嵌入

```go
type Circle struct {
  x,y,radius int
}

type Wheel struct {
  Circle
  other int
}
```

这样 `Circle` 嵌入到了 `Wheel` 中, 这样

- `w.Circle.x` & `w.x` 均可以访问

- 使用 `Circle` 初始化 `Wheel` 的时候, 必须使用

  ```go
  w := Wheel{
    Circle: Circle{ 1,2 },
    other: 3
  }
  ```

  ​

### JSON

```go
type Movie struct {
    Title  string
    Year   int  `json:"released"`
    Color  bool `json:"color,omitempty"`
    Actors []string
}
```

- `json.Marshal()` / `json.MarshalIndent()` 只有可导出的成员才会出现在导出值中.
- `json:"导出字段"` tag 可以设置导出字段
- `json:"导出ziduan, omitempty"` 忽略空值
- `json.Unmarshal(json_string, 结构体)`

### text & template

```go
t := template
	.New('t')
	.Funcs(template.FuncMap{
      foo: funcFoo
	})
	.Parse(template_string)

t.Execute(os.Stdout, data)
```

## ch5 函数

### 多返回值

```
func fn() (int, error) {
	return 1, nil
}
```

### 错误

常用错误处理策略

- 传播错误, 函数 body 中某个 function call 返回的 error, 变成这个函数的 error
- 忽略错误, 进行重试 / 只打印错误信息 / 完全忽略
- 输出错误信息, 并退出. 可以使用 `log.Fatalf` 达到目的

### 闭包

像 js 一样, 在循环中, 如果引用迭代变量, 最后值是迭代退出的值, 例如

```go
fns := []func() int{}
for _, v := range []int{1,2,3,4,5} {
  fns = append(fns, func(i int){
    return v
  })
}

// 这样最后 return 都是最后的值.
// 可以使用
for _, v := range []int{1,2,3,4,5} {
  v := v // 使用迭代变量v 初始化内部变量v
  // 或者像 js 一样, 使用自执行函数
}
```

### 可变参数

```go
func add(values ...int) (ret int) {
  for _, v := range values {
    ret += v
  }
  return
}

ints := []int{ 1,2,3,4 }
add(ints...) // 使用 spread
```

### `defer` / `panic` / `recover`

- defer 在 `return` 之后执行, 甚至可以用来修改返回值
- `defer fn1(); defer fn2()` : `fn2()` -> `fn1()` 顺序执行
- panic / recover 一般表示严重错误, 一般 API 都是返回 error, `Must` 开头 API, 表示遇到 error panic

## ch6 方法

```go
type Point struct {
  radius int
}

func (this Point) Area() {
  return math.PI * this.radius * this.radius
}
```

- 这里的 `this` 叫做 receiver
- `p.Area` 被赋值给一个 `fn` 变量后, `this` 还是指向 `p`, 没有 js 里 `call` / `apply` 一说
- 无论 receiver 形参 是 `T` / `*T`, 无论实参是 `T` / `*T`, 均可以调用
- 嵌入的结构体的方法可以直接使用

## ch7 接口

```go
type Writer interface {
  Write(p []byte) (n int, err error)
}
```

- 接口是合约, 只要实现了接口里所有的方法, 就可认为实现了接口

- 接口也可以像 struct 一样进行嵌入, 输出接口会包含被嵌入接口所定义的方法

- 表达一个类型属于某个接口只要这个类型实现这个接口

  ```go
  var w Writer
  w = Foo{} // Foo 有 Write 方法即可

  type ReadWriter{
    Writer
    Read() []byte
  }
  var rw ReadWriter
  w = rw // OK. rw.Write Exists
  rw = w // error, w.Read not Exists
  ```

### 接口值

https://docs.ruanjiadeng.com/gopl-zh/ch7/ch7-05.html

```go
package main

import (
	"bytes"
	"fmt"
	"io"
)

// 一个具体类型值a 转换成接口值b 时
// 这时接口
//  - 动态类型为a的类型, 即 *bytes.Buffer
//  - 动态值为 nil
// 但是 b != nil
func main() {
	var a *bytes.Buffer
	fmt.Printf("a is nil: %v\n", a == nil) // true

	b := io.Writer(a)
	fmt.Printf("b is nil: %v\n", b == nil) // false

	a = new(bytes.Buffer)
	fmt.Printf("a is nil: %v\n", a == nil) // false
}
```

### 常用接口

- `sort.Interface`

  - `Len`
  - `Less`
  - `Swap`

- `http.Handler` : `http.ListenAndServe(address, handler)`

  - `ServeHTTP(w ResponseWriter, r *Request)`

- `http.NewServeMux()` 一个 `ServerMux` 类似 `router` , 然后

  - `http.HandleFunc` 将一个 `func(ResponseWrite, *Request)` 转换为一个 `http.Handle`

  - `mux.Handle(path string, handler http.Handler)` 于是一般

    ```go
    mux.Handle('/hello', http.HandlerFunc(func(w ResponseWriter, r *Request) {
      // blabla
    }))

    // 需要手动将一个函数转换为 http.Handler 接口类型值
    // 注意是 `http.HandlerFunc`
    ```

  - `mux.HandleFunc("/hello", func(w ResponseWriter, r *Request){ })`

  - `http.HandleFunc()` / `http.DefaultServeMux` / `http.ListenAndServe(address, nil)` 使用内置的默认 mux

- `error`

  - `Error() string`
  - `errors.New(message)`
  - `fmt.Errorf(format, args)`

### 类型断言

```go
var w io.Writer
w = os.Stdout
f := w.(*os.File)      // success: f == os.Stdout
c := w.(*bytes.Buffer) // panic: interface holds *os.File, not *bytes.Buffer
```

## ch8

```go
ch = make(chan int)    // unbuffered channel
ch = make(chan int, 0) // unbuffered channel
ch = make(chan int, 3) // buffered channel with capacity 3

close(ch) // 关闭

ch <- data 	// send
d := <- ch 	// receive
<- ch 		// 丢弃
```

### 不带缓存的 channel

发送将导致发送者阻塞, 直至接收者接收值

### 带缓存的 channel

- 发送往队列队尾添加数据, 没超过队列容量时, 可以无阻塞添加
- 接收从队列对首删除数据, 当没有数据可以被删除时, 接收阻塞

### 单方向 channel

- `func(ch chan<-int)` 表示只能往 `ch <- int` 发送 int
- `func(ch <-chan int)` 标示只能用于接收 `d := <-ch `

### `select`

```go
select{
case <- ch1:
	//
case <- ch2:
	//
case <- time.After(10 * time.Second):
	// 超时
default:
	//
}
```

## ch9 锁

### `sync.Mutex` 互斥锁

- 使用 `defer mu.Unlock()` 来保证锁被释放

### `sync.RWMutex` 读写锁

> 允许多个只读操作并行执行，但写操作会完全互斥。这种锁叫作“多读单写”锁(multiple readers, single writer lock)，Go 语言提供的这样的锁是 sync.RWMutex

- mu.RLock / mu.RUnlock

### 内存同步

编译器可以随意修改指令顺序, 不同的 goroutine 顺序不能保证, 编译器只需保证同一线程 / goroutine 是有序的即可

### 单例

```go
mu : sync.Mutex{}
if instance == nil {
  mu.Lock()
  if instance == nil {
    // create instance
  }
  defer mu.Unlock()
}
```

### `sync.Once`

```go
var o sync.Once

func instance(){
  o.Do(createInstance)
  return instance
}
```

### 竞态条件检测

```sh
$ go build/run/test -race
```

## ch10 包

工具

- `go get [-u] url`
  - `url` 的返回内容 `<meta name="go-import" content="golang.org/x/net git https://go.googlesource.com/net">` 即可定义真正的 get path
  - `-u` 表示确保是最新的
- `go build` 编译
- `go install` 保存编译结果, 而不是丢弃
- `go run`
- `go list <导入路径>` 列出包
  - 使用 `...` 表示任意路径, 如 `go list ...xml...` 列出包含 `xml` 的包
  - 使用 `-json` 表示输出 son
- `go doc`

## ch11 测试

> 在包目录内, 所有以 `_test.go` 为后缀名的源文件并不是 go build 构建包的一部分, 它们是 `go test` 测试的一部分.

有三种类型的测试函数

- 测试函数: 以 `Test` 为函数名前缀, 用于测试函数的逻辑行为是否正确
- 基准测试函数: 以 `Benchmark` 为函数名前缀, 用于衡量一些函数的性能, go test 会多次运行基准函数以计算一个平均的执行时间.
- 示例函数: 以 `Example` 为函数名前缀, 提供一个由编译器保证正确性的示例文档.

### 测试函数

```go
func TestName(t *testing.T) {
    // ...
}
```

- `go test` 命令如果没有指定包, 那么将采用当前目录对应的包,
- `go test -v` 打印每个测试函数的名称和运行时间
- `-run="foo|bar"` 对应一个正则表达式, 只有匹配的测试函数才会被运行

### 扩展测试包

```go
package foo 		// 逻辑
package foo_test	// 用于测试
```

### 测试覆盖率

```sh
# 生成 coverage
$ go test -coverprofile=c.out
# 生成 html
$ go tool cover -html=c.out
```

### 基准测试

```go
import "testing"

func BenchmarkIsPalindrome(b *testing.B) {
    for i := 0; i < b.N; i++ {
        IsPalindrome("A man, a plan, a canal: Panama")
    }
}
```

- 参数类型是 `*testing.B`
- `go test -bench="正则"`
- `-benchmem` 包含内存信息

### profile

```sh
# 采集数据
$ go test -cpuprofile=cpu.out
$ go test -blockprofile=block.out
$ go test -memprofile=mem.out
```

```sh
# 运行 profile
$ go tool pprof -text -nodecount=10 ./http.test cpu.log
```

### 示例函数

```go
func ExampleIsPalindrome() {
    fmt.Println(IsPalindrome("A man, a plan, a canal: Panama"))
    fmt.Println(IsPalindrome("palindrome"))
    // Output:
    // true
    // false
}
```

- 主要作为文档
- `go test` 会运行示例函数, 会检测该函数的标准输出是否与注释匹配
- 提供 playground
