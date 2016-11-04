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
