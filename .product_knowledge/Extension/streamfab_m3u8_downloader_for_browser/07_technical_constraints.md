# 07 技术限制与约束（Technical Constraints）

## 当前状态
- 本文件处于初始化版本。

## 当前已确认规则
- 技术边界、平台差异、协议支持范围与系统要求待后续输入确认。
- 未确认的系统支持、浏览器差异、协议限制与能力边界不提前写入公开知识库。
- 当前已确认的接口链路依赖插件持续上报 `tab`、`url` 与 `response_data`，CoApp 不直接驻留在浏览器页面中采集线索。
- URL 判断是进入后续分析链路的第一轮筛选，不等于最终已检测到视频。

## 加密支持范围（已确认）

- 产品**同时支持**明文（未加密）M3U8 和加密 M3U8 的下载。
- 支持通过 `#EXT-X-KEY` 标签从 playlist 提取 key URI 并请求 key 的加密方式，包括：
  - **AES-128**（CBC 模式，128-bit key）
  - **AES-256**（CBC 模式，256-bit key）
  - **SAMPLE-AES**（帧级加密）
- **不支持** Widevine、PlayReady、FairPlay 等 DRM 加密视频。app id（`streamfab_for_browser_drm_m3u8`）中含有 "drm" 字样属于历史技术标识，产品显示名称已更新为 StreamFab M3U8 Downloader，不含 DRM。
- 核心判断标准：key 可从 playlist 直接提取 → 支持；需要 DRM 授权体系（license server、CDM）→ 不支持。

## 后续补充方向
- 协议与资源类型边界
- 系统与浏览器支持范围
- 与 CoApp 的依赖关系
- 合规与平台限制
- 性能与稳定性约束
