# worker_threads



## MessageChannel

一个 channel 有 port1 & port2, 都可以 onmessage & postMessage



### `postMessage`

https://nodejs.org/dist/latest-v12.x/docs/api/worker_threads.html#worker_threads_port_postmessage_value_transferlist

```js
postMessage(value, transferList)
```

- 你可以 transfer 一个 ArrayBuffer, value 里包含的 ArrayBuffer 就不用 clone 了, 但是发送方不能继续使用 ArrayBuffer.
- 我的理解, worker 可以 postMessage 再 transfer 回来, 这样这个 ArrayBuffer 流程是 mainThread -> worker -> mainThread



## Worker

https://nodejs.org/dist/latest-v12.x/docs/api/worker_threads.html#worker_threads_new_worker_filename_options



### global channel

- main-thread: worker.onmessage / worker.postMessage
- Worker-thread:  使用`require('worker_threads').parentPort` 的 `onmessage` / `postMessage`



### custom channel

自己使用 postMessage 将 `port`  transfer 到 Worker



## Addon

https://nodejs.org/api/addons.html#addons_worker_support

### N-API thread-safe function
https://github.com/nodejs/node-addon-api/blob/master/doc/threadsafe_function.md

used when (native threads use Napi::Env / Value etc)