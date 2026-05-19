# Product Brief (Context Summary)

> 从 `01_product_brief.md` 和 `07_technical_constraints.md` 提炼。不在此引入新事实，保持与核心文件一致。

## Identity

- 产品名：`StreamFab Fandango at Home Downloader for Browser`
- 类型：单站点浏览器插件
- 目标站点：`https://athome.fandango.com/`（兼容旧域 `vudu.com`）
- 服务地区：仅美国可用

## Capability Surface

- 输出格式：`MP4` / `MKV (FFmpeg)` / `MKV (MKVToolNix)`
- 视频编码可选：`H264` / `H265 - SDR` / `HDR10` / `Dolby Vision`
- 视频清晰度：up to `4K`（产品页承诺，实际上限以 CoApp 分析结果为准）
- 音频编码可选：`EAC3` / `AAC`
- 音频能力：`EAC3 5.1` / `AAC 2.0`
- 字幕：多语言；可保存为 `SRT` 或封装进视频；一个视频可同时下载多种语言字幕

## Platform

- Windows：当前发布优先级
- macOS：声明支持
- Linux：不在支持范围

## DRM 与协议

- 主协议：MPEG-DASH（`.mpd` manifest，CMAF / fMP4 分片）
- 加密：CENC，Widevine + PlayReady 双 DRM
- 4K HDR / Dolby Vision 命中需要 Widevine L1 / PlayReady SL3000 硬件级 DRM
