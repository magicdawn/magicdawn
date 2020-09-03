# Image

## 自己理解

- encode: 图像 -> byte array
- decode: byte array -> 图像

## API

### byte array

- html5 `File`, `Blob`

### Blob

https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

> Blob object represents a file-like object of immutable, raw data

### ArrayBuffer

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer

> The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer.
> It is an array of bytes, often referred to in other languages as a "byte array"

fixed-length 我的理解就是, arrayBuffer.byteLength 只读, 不能直接改 ArrayBuffer 对象

### buffer

- node.js Buffer
- js ArrayBuffer / Typed arrays
- blob

之间的关系

- Buffer 基于 ArrayBuffer: node.js 从 v4 之后改了 Buffer 实现, buf.buffer instanceof ArrayBuffer / Buffer.from(arrayBuffer) 互转
- string 与 ArrayBuffer https://github.com/magicdawn/magicdawn/issues/33#issuecomment-223570350
- Typed Array / DataView 基于 ArrayBuffer https://github.com/magicdawn/magicdawn/issues/44#issuecomment-209729905
- blob.arrayBuffer(): Promise<ArrayBuffer>
- fetch Body.prototype.arrayBuffer(): Promise<ArrayBuffer>, 即 Request/Response 都可以这么调用

## 图像 API

### `ImageBitmap`

> represents a bitmap image which can be drawn to a <canvas> without undue latency

- https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap

### `ImageData`

> The ImageData interface represents the underlying pixel data of an area of a <canvas> element.

- https://developer.mozilla.org/en-US/docs/Web/API/ImageData
- `ImageData#data` 是一个 `Uint8ClampedArray`, 底层是 ArrayBuffer.
- `ImageData#data` one-dimensional array containing the data in the RGBA order, with integer values between 0 and 255 (inclusive).

### `createImageBitmap`

```ts
type Src = HTMLImageElement | Blob | ImageData
function createImageBitmap: ImageBitmap(src: Src) { /* */ }
```
