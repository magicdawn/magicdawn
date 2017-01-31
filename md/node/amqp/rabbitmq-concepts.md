## rabbitmq concepts

### prefetch

默认情况下, MQ 会将 nth message dispatch 给 nth consumer, 但是不是所有任务的权重耗时是一样的, 可能导致某些 consumer 比较空闲. 使用 `ch.prefetch(n)` 可以让 consumer 确保最多有 n 个未 ack 的 message, 在 ack 之前, broker 不会发送新的 message.



### Exchange

producer 不直接与 queue 打交道, producer 向 exchange 中 publish 消息. 默认的 sendToQueue 使用了默认的 `fanout` exchange

类型

- `fanout` 将消息 broadcast 给所有 bind 的 queue
- `direct` 支持简单的 routing key
- `routing` 支持通配符进行匹配
  - `*` (star) can substitute for exactly one word.
  - `#` (hash) can substitute for zero or more words.

