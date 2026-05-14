# 技术限制（constraints/tech_limits）

## 协议范围

- 仅支持基于 MPD（MPEG-DASH manifest）的流媒体站点
- 内容须为受 Widevine（多数）/ PlayReady DRM 保护的视频

## 输出能力

| 维度 | 上限 / 选项 |
|---|---|
| 分辨率 | 1080p |
| 输出容器 | MP4 / MKV |
| 音频 | EAC3 / AC3 5.1 或 AAC 2.0 |
| 字幕 | SRT（独立文件）或嵌入视频 |

## 客户端最低硬件要求

- Windows 11 / 10（32 / 64 位）
- Intel i3 及以上
- 4 GB RAM
- 40 GB 可用硬盘
- 网络连接

## 调度限制

- 串行下载（并发 1）
- FIFO 队列
- Retry 回队头，按当前余量重新判断

## 配额限制

- Trial：3 个视频
- Premium：单日 100 / 单周 700（按每流媒体服务独立计算）
