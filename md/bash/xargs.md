## xargs

http://man.linuxde.net/xargs



```sh
xargs [options] [command]
```



command 默认是 `echo`

options

- `-n` 几项换行, 默认不换行, 使用 `echo /bin/*.sh | xargs -n x ` 尝试

- `-I $` 指定 `$` 为循环变量, 在后续命令中可以使用

  ```sh
  # 例如
  ls -1 projects/iya/*.* | xargs -I $ cp $ /tmp/test/
  ```
