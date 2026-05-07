# 技术限制

## 加密支持范围

| 类型 | 支持 | 说明 |
|---|---|---|
| 明文（无加密） | ✅ | 直接下载 |
| AES-128 | ✅ | key 从 `#EXT-X-KEY` 提取 |
| AES-256 | ✅ | key 从 `#EXT-X-KEY` 提取 |
| SAMPLE-AES | ✅ | key 从 `#EXT-X-KEY` 提取 |
| Widevine | ❌ | DRM，需 license server |
| PlayReady | ❌ | DRM，需 license server |
| FairPlay | ❌ | DRM，需 license server |

判断标准：key 可从 playlist 直接提取 → 支持；需要 DRM 授权体系 → 不支持。

## 分析超时

- CoApp 分析超时上限：**20 秒**
- 超时后 CoApp 返回不支持，插件引导前往 StreamFab 客户端

## 结构限制

- 无 Season / Playlist 选集结构（不同于 Netflix / Disney）
- 配置项由每次分析结果驱动，不支持跨视频的全局编码预设

## 其他

- app id（`streamfab_for_browser_drm_m3u8`）含 "drm" 为历史技术标识，产品显示名已更新为 StreamFab M3U8 Downloader
- CoApp 必须已安装，插件不独立执行下载、解密、remux
