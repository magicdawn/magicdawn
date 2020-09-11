# stream

## Links

- https://github.com/zoubin/streamify-your-node-program

### Readable

需要实现 `_read`

```js
new Readable({
  _read() {
    this.push(Buffer.from('hello'))
    this.push(null) // end
  },
})
```

### Writable

// TODO

生命周期

成功写完数据

- end()
- finish event
- close event

destroy(err)

- error event
- close event

destroy()

- close event

### Transform & Duplex

- Duplex 的双通道, 可读可写, 但是可读 与 可写是分离的, 比如 socket, 写进去的内容与读到的内容是不相关的.
- Transform 可读可写, 仅对内容做转换

```js
new Transform({
  _transform(chunk, encoding, callback) {
    // use callback pass transformed data
    callback(null, data)

    // or use push pass transformed data
    this.push(data)
    callback()
  }

  _flush() {
    // more data on end
    // optional
  }
})
```

### `static stream.pipeline`

- 在 stream 结束的时候, 最后的 callback 才会被调用
- `pipeline` 会处理各个 stream 的 error 事件, 而 `Stream#pipe` 不会

stream.pipeline() will call stream.destroy(err) on all streams except:

- Readable streams which have emitted 'end' or 'close'.
- Writable streams which have emitted 'finish' or 'close'.

stream.pipeline() leaves dangling event listeners on the streams after the callback has been invoked.
In the case of reuse of streams after failure, this can cause event listener leaks and swallowed errors.

### `fs.WriteStream`

- `options.autoClose = true`, 自动监听 `finish` or `error`, 将 fd 关闭.
- `options.emitClise = false`, 关闭之后触发 `close` 事件, Writable 默认会 emit close, fs.WriteStream 默认不会

### error / destroy

Readable & Writable 共有

- new options.autoDestroy 在碰到 error 的时候自动 destroy
- `destroy(err?: Error)` destroy 这个 stream

### `#pipe`

`readable.pipe(destination[, options])`

By default, stream.end() is called on the destination Writable stream when the source Readable stream emits 'end', so that the destination is no longer writable. To disable this default behavior, the end option can be passed as false, causing the destination stream to remain open:
