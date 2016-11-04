# log

## log4js

### cluster appender
https://github.com/nomiddlename/log4js-node/wiki/Clustered

### cluster with pm2
- https://github.com/nomiddlename/log4js-node/issues/265
- https://github.com/Unitech/pm2/issues/383

原因在于 pm2 的 cluster mode 没有地方可以配置 master 的配置

### cluster 写同一文件

要更换文件的时候, 多个实例会出现错乱

## pm2

### cluster
pm2 的 cluster, 日志由 master 来写, 输出到一个文件

### 