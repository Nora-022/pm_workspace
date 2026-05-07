# [StreamFab 浏览器插件] - [M3U8] - 需求文档

- 原型链接：http://axcloud.dvdfab.me/AFZKNR?id=6xh3eu&g=14
- 需求地址：
- UI 需求说明：[StreamFab 浏览器插件] - [DRM M3U8] - UI 需求说明（飞书 wiki）

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-04-29 | 按新模版归档 | 基于飞书需求文档整理 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab M3U8 Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab M3U8 Coapp |
| app id | — | streamfab_for_browser_drm_m3u8 |
| pid | Win | 652 |
| pid | Mac | 1652 |
| option id | Win | 452 |
| option id | Mac | 1452 |
| client id — 主站 | 插件（发布）| 256 |
| client id — 主站 | CoApp Win x64 | 251 |
| client id — 主站 | CoApp Mac | 252 |
| client id — 品牌站 | 插件（发布）| 257 |
| client id — 品牌站 | CoApp Win x64 | 254 |
| client id — 品牌站 | CoApp Mac | 255 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_M3U8_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_M3U8_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_M3U8_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_M3U8_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_M3U8_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_M3U8_Coapp_for_Mac |

### 网站信息

多站点通用插件，凡含 M3U8 流的视频站点均在支持范围内。不绑定特定平台或地区，也不要求用户登录目标站点账号。内容类型覆盖电影、剧集、直播录制等所有使用 M3U8 协议的视频内容。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab M3U8 Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | M3U8（多站点支持） |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | /（结构一致）|
| 用户权益 | — | /（结构一致）|
| 视频分析 | — | 检测、分析流程；下载配置项；视频目录结构 |
| 视频检测 | — | 检测、分析流程；下载配置项；视频目录结构 |
| 视频下载 | — | 下载配置项；任务状态展示字段 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 通用配置项（无差异化配置）|

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| 产品页 | 主站 | https://streamfab.dvdfab.cn/m3u8-downloader-for-browser.htm |
| 产品页 | 独立站 | https://streamfab.com/m3u8-downloader-for-browser.htm |
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=drm-m3u8-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=drm-m3u8-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=652 |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open=655 |

### 安装器

参见 UI 需求说明文档。调整项：
- 安装器资源：参见飞书原文 — 变更信息 > 安装器
- 安装目录结构：参见「[StreamFab 浏览器插件] - CoApp 目录结构设计」

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution | `{宽}x{高}-{码率}` | `1280x720-2444` |
| Language | `{语言} {视频编码}` | `Default H264` |
| Subtitles | 固定选项 | `None` / `English` |

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
|---|---|
| 可获取文件大小 | `0B / 0B`（文件大小） |

### 检测、分析流程

背景：M3U8 分析流程与 VIP 站点存在差异，需先对视频流进行分析，再返回是否支持下载及 meta 分析结果，等待时间较长。

**视频是否支持下载**

- 现行 common 逻辑：在视频进入分析前，通过 URL 判断是否支持
- M3U8 判断逻辑后置（需等待流分析完才得知）：
  - 支持下载 → 直接在插件弹窗展示待下载视频卡片
  - 不支持下载：
    - 插件内已有检测到的视频 → toast 提示
    - 插件内没有检测到的视频 → 全局提示

**分析失败 Toast 文案**

- EN: Analysis Failed. Please retry or contact us for help.
- ZH: 分析失败，请重试或联系我们获得帮助。
- Contact us：主站 https://www.dvdfab.cn/contact.htm / 独立站 https://streamfab.com/contact.htm

**下载中 & 下载完成任务状态**

- 待下载 / 下载成功：展示 分辨率、音频编码、文件大小
- 排队下载 / 下载中 / 下载失败：只展示 分辨率

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN | M3U8 Videos, Downloaded Simply. Save M3U8 streams for offline viewing in up to 1080p with clear AAC audio. |
| ZH | M3U8 视频，轻松下载。将 M3U8 流媒体保存下来，以最高 1080p 分辨率和清晰的 AAC 音频进行离线观看。 |

License Info 产品名：`StreamFab M3U8 Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。通用配置项（按顺序）：

1. Language
2. Video Format（MP4 / MKV (FFmpeg) / MKV (MKVToolNix)）
3. Video Resolution（Full HD - 1080p / HD - 720p）
4. Pre-select Audio Language（Same as UI Language + 27 个语言选项）
   - 子选项：Pre-select Description Audio if available（默认不选）
5. Audio Channel（Stereo (AAC) / Multi-Channel 5.1 (EAC3 / AC3)）
   - 子选项：Pre-select both 5.1 and 2.0 audios（默认不选）
6. Pre-select Subtitle Language（None / Same as UI Language + 27 个语言选项）
   - 子选项：Always download the forced subtitle（默认选中）
7. Subtitle Action（Remux Into File / Extract to SRT File / Extract Original Format）
