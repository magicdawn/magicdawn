## amqplib readme notes

### flow control

> Channels act like [`stream.Writable`](https://nodejs.org/api/stream.html#stream_class_stream_writable) when you call `publish` or `sendToQueue`: they return either `true`, meaning "keep sending", or `false`, meaning "please wait for a 'drain' event".
>
> Those methods, along with `ack`, `ackAll`, `nack`, `nackAll`, and `reject`, do not have responses from the server. This means they *do not return a promise* in the promises API. The `ConfirmChannel` *does* accept a callback in *both* APIs, called when the server confirms the message; as well as returning a boolean.

- `publish` & `sendToQueue` 像 `stream.Writable` 一样, 返回 true 表示下游处理的过来, 继续发送, 返回 `false` 则需要等待 `drain` 事件
- `ack` / `ackAll` / `nack` / `nackAll` / `rehect` 服务器不会有返回
- 这些方法不反回 promise



### Channels

> Channels are multiplexed over connections, and represent something like a session, in that most operations (and thereby most errors) are scoped to channels.



### Queues

#### options

| name         | default | explaination                             |
| ------------ | ------- | ---------------------------------------- |
| `exclusive`  | `false` | scopes the queue to the connection       |
| `durable`    | true    | Message Broker 重启之后能自动恢复, 覆盖了 `exclusive` & `autoDelete` 的效果 |
| `autoDelete` | `false` | 当 consumer 数量减少到 0 时, 自动删除 queue         |



### Message

#### options

| name                      | default | explaination                             |
| ------------------------- | ------- | ---------------------------------------- |
| rabbitmq & consumer 使用的选项 |         |                                          |
| `expiration`              |         | 提供了超时的话, 消息在 MQ 中超时后会被丢弃                 |
| ` userId`                 |         | 如果提供, MQ会对 connection 的 UserId 对比, reject 掉不匹配的 |
| `CC`                      |         | 额外的 routingjey                           |
| ` persistent`             |         | 持久化, 该选项会覆盖 `delivery`                   |
| ` deliveryMode`           |         | 1 or falsy: none persistent; 2 or truthy: persistent |

