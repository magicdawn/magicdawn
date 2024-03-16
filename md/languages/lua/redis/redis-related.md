# redis & lua

## `eval`

```sh
redis-cli> eval "return redis.call('GET', KEYS[1])" 1 hello
```

命令

```
eval lua-script numberOfKeys key1 key2 argv1 argv2
```

`KEYS` & `ARGV` 存放着要操作的 keys 和 参数

## `evalsha`

使用 sha 签名代表要执行的脚本

## `script load`

加载 script, 返回 sha1

### `script exists `

判断 script 是否存在

### `script flush`

清除

### `script kill `

强制终止
