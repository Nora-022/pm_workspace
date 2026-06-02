# 07 技术约束（Technical Constraints）

## 系统与浏览器

| 项 | 支持范围 |
| --- | --- |
| Windows | 10 / 11，推荐 64 位 |
| macOS | 11.0+ |
| 浏览器 | Google Chrome / Microsoft Edge 最新稳定版 |
| 不支持 | Linux / Android / iOS |

## CoApp 依赖

- 插件通过 Native Messaging 与 StreamFab CoApp 通信。
- 未安装或未运行 CoApp 时，插件无法执行实际下载。
- `StreamFab Video Coapp` 服务于 ytdlp_mode。
- `StreamFab <SiteName> Coapp` 服务于 netflix_mode 各站点。

## DRM 边界

| 模式 | DRM 下载 |
| --- | --- |
| netflix_mode | 在站点和 CoApp 支持范围内可用 |
| ytdlp_mode | 不支持 DRM 下载，统一引导桌面客户端 |

插件层不处理 key；Widevine / PlayReady / FairPlay 等由各站点 CoApp 处理。

## 并发与队列

| 维度 | netflix_mode | ytdlp_mode |
| --- | --- | --- |
| 最大并发下载 | 1 | 5 |
| Detected 上限 | 50（单 Origin） | 受面板高度约束，多 Origin 隔离 |
| Downloaded 历史 | 不限 | 20，超出移除旧记录但保留磁盘文件 |

## 超时与重试

- 网络错误支持手动 Retry。
- 授权硬限制直接失败提示。
- M3U8 变体 CoApp 分析超时为 20 秒，超时后引导客户端。

## 视频能力上限

- ytdlp_mode 视频最高 8K HDR，音频最高 320 kbps。
- netflix_mode 的画质、编码、字幕和特殊限制由站点决定，写入插件差异文件。

## 详细来源

- [14_platform_and_technical_limits.md](14_platform_and_technical_limits.md)
- [10_detection_modes.md](10_detection_modes.md)
