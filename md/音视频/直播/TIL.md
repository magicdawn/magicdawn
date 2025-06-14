## 名词

- m3u: mp3 url playlist
- m3u8: m3u UTF-8 版本, 早期 m3u 可能是其他编码, m3u8 一定是 UTF-8
- HLS: Apple 推出的标准 HTTP Live Streaming, 也就是 .m3u8 + .ts 的组合
- rtmp/rtsp: real time messaging protocol, Adobe 推出基于 Flash/flv, 使用 TCP 传输 flv tag
- http-flv: 将 rtmp 封包成 http flv, 使用 http 长连接, chunked encoding, 输出 flv tag

## flv / ts / mp4

### mp4

mp4 是结构化文件 —— 写完才能播

MP4 是基于 ISO BMFF 结构，需要在结尾写入 moov 元数据（索引表）：

- 下载未完成前，moov 不存在；
- 播放器（VLC、浏览器等）读不到索引，不知道从哪解码；
- 解决方案：需要 -movflags +faststart + 下载完整 + 手动触发索引写入；
- 对于直播流（无限长），基本不可能。

### flv

.flv 虽然理论上支持边播，但 ffmpeg 默认不会写 FLV header + metadata 直到结束

- ffmpeg 在写 FLV 文件时，必须知道是否有音频、是否有视频、编码格式等，这通常需要解析一定数据之后才能决定；
- 如果输入是直播流，直到 ffmpeg 缓冲到足够内容，才会写入 FLV header 和 metadata；
- 导致早期生成的 out.flv 是不完整的头 + 没有索引 + 播放器无法识别格式；
- 即便写入了，某些播放器仍然无法边下边播（如 ffplay），除非开启 stream-aware 模式。

### ts

TS 是 “Transport Stream” 的缩写，全称是：

> MPEG-2 Transport Stream

这是 MPEG 标准（特别是 MPEG-2）中定义的一种 容错性强、面向广播传输的媒体封装格式，扩展名通常是 .ts。

🧱 为什么叫 Transport Stream？

背后理念：面向**“传输”（Transport）**设计

它的核心目标是：

✅ 在不稳定的传输环境（如卫星广播、地面数字电视、网络 UDP）下，也能持续解码并播放音视频内容

## aac: `adts` | `asc`

- ADTS: Audio Data Transport Stream, 用于流式传输
- ASC: Audio Specific Config, 用于 mp4 等容器

```sh
# ❌ 错误用法, 不能有 -bsf:a aac_adtstoasc
ffmpeg -i https://some-stream -c copy -bsf:a aac_adtstoasc out.ts

# ✅ 正确用法, mp4 可以有 -bsf:a aac_adtstoasc
#     Q: 为什么是可以有
#     A: 不带 -bsf:a aac_adtstoasc 的情况下，ffmpeg 识别到 mp4 容器, 会自动添加; 使用 `-v verbose` 输出详细日志
ffmpeg -i https://some-stream -c copy -bsf:a aac_adtstoasc out.mp4
```

- .ts 文件本身就是使用 ADTS 封装 AAC 音频，如果你对音频使用了 aac_adtstoasc，结果就会变成不兼容的音频流，播放器无法正确解析，就出现了“刺耳”的声音。
- `aac_adtstoasc` 是针对 .mp4 这类容器的。如果你是输出 .mp4 文件，那使用它是正确的。
- .ts 文件需要 AAC 保持 ADTS 格式，不需要也不能使用 aac_adtstoasc。
