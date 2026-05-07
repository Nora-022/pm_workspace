# [StreamFab 浏览器插件] - [Netflix] - 需求文档

- 原型链接：
- 需求地址：
- UI 需求说明：[StreamFab 浏览器插件] - [Netflix] - UI 需求说明

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-04-29 | 按新模版归档 | 基于历史飞书需求文档整理 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab Netflix Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Netflix Coapp |
| app id | — | |
| pid | Win | |
| pid | Mac | |
| option id | Win | |
| option id | Mac | |
| client id — 主站 | 插件（发布）| |
| client id — 主站 | CoApp Win x64 | |
| client id — 主站 | CoApp Mac | |
| client id — 品牌站 | 插件（发布）| |
| client id — 品牌站 | CoApp Win x64 | |
| client id — 品牌站 | CoApp Mac | |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Netflix_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Netflix_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Netflix_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Netflix_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Netflix_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Netflix_Coapp_for_Mac |

### 网站信息

Netflix（netflix.com），全球流媒体平台，主要服务地区为美国、欧洲、亚太、拉美等。内容类型涵盖电影、剧集、纪录片、动画。账号体系为 Netflix 账号，需登录后才能使用插件功能。支持个人、家庭等多种订阅计划。

---

## 变更说明

Netflix 是浏览器插件产品线的基线插件（baseline），所有后续单站点插件均以 Netflix 为参照。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Netflix Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | Netflix |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | Netflix 登录提示；中途退出账号停止检测 |
| 用户权益 | — | Trial 3次、Premium 每日 100 次 |
| 视频分析 | — | /（结构一致）|
| 视频检测 | — | /（结构一致）|
| 视频下载 | — | 下载配置项（Video Codec、Audio Codec、Subtitle 多选）|
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 差异化配置项（Video Codec、H264 Profile、Audio Codec）|

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=netflix-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=netflix-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open={pid} |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open={pid} |

### 安装器

参见 UI 需求说明文档。调整项：
- 安装器资源：参见 Figma 设计文件
- 安装目录结构：参见「[StreamFab 浏览器插件] - CoApp 目录结构设计」

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution | `{宽}x{高} - {码率} kbps - {文件大小}` | `1280x720 - 2444 kbps - 1.46 GB` |
| Language | `{音频描述} {编码} {声道} - {码率} kbps` | `Default AAC 2.0 - 125 kbps` |

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
|---|---|
| 可获取文件大小 | `0B / 0B`（文件大小） |

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN | Pro Quality. One Click. The simplest way to download Netflix in 1080p & multi-track audio. |
| ZH | 专业品质下载，一键搞定。以最简单的方式下载 Netflix 的 1080p 视频及多音轨音频。 |

License Info 产品名：`StreamFab Netflix Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。Netflix 在通用配置项基础上增加了 Video Codec、H264 Profile 和 Audio Codec。配置项顺序如下：

1. Language
2. Video Format（MP4 / MKV (FFmpeg) / MKV (MKVToolNix)）
3. Video Codec（H264 / H265 - HDR10 / H265 - Dolby Vision / VP9 / AV1）
4. H264 Profile（High / Main）
5. Video Resolution（Full HD - 1080p / HD - 720p）
6. Audio Codec（Atmos / EAC3 / AAC）
7. Pre-select Audio Language（Same as UI Language + 27 个语言选项）
   - 子选项：Pre-select Description Audio if available（默认不选）
8. Audio Channel（Stereo (AAC) / Multi-Channel 5.1 (EAC3 / AC3)）
   - 子选项：Pre-select both 5.1 and 2.0 audios（默认不选）
9. Pre-select Subtitle Language（Same as UI Language + 27 个语言选项）
   - 子选项：Always download the forced subtitle（默认选中）
10. Subtitle Action（Remux Into File / Extract to SRT File / Extract Original Format）
