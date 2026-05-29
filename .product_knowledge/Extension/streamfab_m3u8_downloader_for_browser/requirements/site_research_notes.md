# M3U8 站点调研笔记

> M3U8 是协议导向插件，不绑定具体站点。本文记录的是协议层与加密层调研，而非单站点的 DRM / CDN 调研。

## 协议覆盖

- **目标协议**：M3U8 / HTTP Live Streaming（HLS）
- **覆盖范围**：所有以 M3U8 playlist 为入口的视频内容（电影、剧集、直播录制等）
- **站点限制**：无；任意网站只要含 M3U8 流即在支持范围
- **登录要求**：不要求登录目标站点；仅需登录 StreamFab 账号 + 安装 CoApp

## 加密支持

| 类型 | 支持 | 说明 |
| --- | --- | --- |
| 明文 M3U8 | ✅ | 未加密 playlist 直接下载 |
| AES-128 | ✅ | CBC 模式，128-bit key |
| AES-256 | ✅ | CBC 模式，256-bit key |
| SAMPLE-AES | ✅ | 帧级加密 |
| Widevine | ❌ | DRM 体系，需 license server + CDM |
| PlayReady | ❌ | 同上 |
| FairPlay | ❌ | 同上 |

**核心判断标准**：
- key 可从 `#EXT-X-KEY` 标签从 playlist 直接提取 → 支持
- 需要 DRM 授权体系（license server / CDM）→ 不支持

**命名澄清**：app id `streamfab_for_browser_drm_m3u8` 中的 "drm" 字样为历史技术标识，产品显示名 `StreamFab M3U8 Downloader for Browser` 不含 DRM；License Info banner 文案已删除"DRM-protected"措辞。

## 协议层技术链路

- **插件层**：监听 `tab` / `url` / `response_data`，将浏览器线索透传给 CoApp
- **CoApp 层**：基于 URL 与网络线索判定页面是否可分析，分析 M3U8 playlist，处理 key 提取与解密，执行下载与 remux
- **分析等待**：CoApp 通过 `LoadingDialog` 接口回传进度，超时上限 **20 秒**

## 编码与封装

| 维度 | 取值 |
| --- | --- |
| 视频编码 | H.264 / H.265 |
| 音频编码 | EAC3 5.1 / AAC 2.0 |
| 输出格式 | MP4 / MKV |
| 字幕 | 多语言识别，支持外挂 SRT 或封装 |
| 画质上限 | 1080P（产品页口径） |

## 与基线（netflix_mode）的核心差异

| 维度 | netflix_mode | M3U8 变体 |
| --- | --- | --- |
| 检测前置 | URL 判断 → 直出分析 | 插件侧页面结构预判断 → CoApp 分析（20 秒超时） |
| 分析等待态 | 无 | 显式"检测中 → 分析中"进度态 |
| 不支持引导 | 单站点专属阻断 | 引导前往 StreamFab 客户端 |
| 站点范围 | 单站点 | 多站点 |
| Playlist 层级 | Season / Episode 保真 | 单视频粒度，无层级 |

## 信息来源

- 插件交互接口：`https://i6a1sqw3p2.feishu.cn/wiki/P1SXwRmxmityKjkgfPpcRJnanGh`
- 产品页：`https://streamfab.dvdfab.cn/m3u8-downloader-for-browser.htm`
- CHANGELOG：本目录 `../CHANGELOG.md`
