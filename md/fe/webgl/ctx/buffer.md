# gl Buffer 相关

- `createBuffer` / `deleteBuffer`
- `bindBuffer`
- `bufferData`



## bindBuffer

https://stackoverflow.com/questions/27148273/what-is-the-logic-of-binding-buffers-in-webgl

gl.ARRAY_BUFFER 像是一个 switch flag,  



gl.bindBuffer(flag, arg), 如果 flag = gl.ARRAY_BUFFER, 则内部变量 arrayBuffer = arg


gl.bufferData(gl.ARRAY_BUFFER, …) 相当于给 arg 填充数据 



## Attribute

- `gl.getAttribLocation(‘attribute_name') `

- `gl.enableVertexAttribArray(location) `

- `gl.vertexAttribPointer(location, size, type, normalized, stried, offset)` 这里会用内部 arrayBuffer 填充 attribute



## VertexArrayObject

```js
// create VertexArrayObject
const vao = gl.createVertexArray()

// bind it
gl.bindVertexArray(vao)
```

VertexArrayObject 即是 StackOverflow 代码中的 vertexArray 对象

