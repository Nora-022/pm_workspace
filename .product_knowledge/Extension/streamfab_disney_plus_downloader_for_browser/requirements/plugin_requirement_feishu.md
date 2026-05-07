# [StreamFab 浏览器插件] - [Disney Plus] - 需求文档

- 原型链接：http://axcloud.dvdfab.me/WYLP9E?id=zrk14b&g=14
- 需求地址：
- UI 需求说明：[StreamFab 浏览器插件] - [Disney Plus] - UI 需求说明

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-04-29 | 按新模版归档，从飞书需求文档同步 | Banner 文案、Setting、下载进度均已确认 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab Disney Plus Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Disney Plus Coapp |
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
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Disney_Plus_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Disney_Plus_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Disney_Plus_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Disney_Plus_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Disney_Plus_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Disney_Plus_Coapp_for_Mac |

### 网站信息

Disney Plus（disneyplus.com），全球流媒体平台，主要服务地区为北美、欧洲、亚太及部分拉美地区。内容类型以 Disney、Marvel、Star Wars、Pixar、National Geographic 为主，并有独占原创内容。账号体系为 Disney Plus 账号，需登录后才能使用插件功能。支持 Standard 和 Premium 订阅计划。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Disney Plus Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | Disney Plus |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | /（结构一致）|
| 用户权益 | — | /（结构一致）|
| 视频分析 | — | 下载配置项；视频目录结构（含花絮两级结构）|
| 视频检测 | — | 下载配置项；视频目录结构（含花絮两级结构）|
| 视频下载 | — | 下载配置项；任务列表花絮独立展示；下载进度用 Segment 代替文件大小 |
| Dashboard | — | Banner 文案、产品名、Trial Status 字段调整 |
| Dashboard | Setting | Video Codec 选项调整、去掉 H264 Profile、Subtitle Language 增加 None |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=disney-plus-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=disney-plus-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=655 |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open=655 |

### 安装器

参见 UI 需求说明文档。调整项：
- 安装器资源：参见 UI 需求说明文档
- 安装目录结构：参见「[StreamFab 浏览器插件] - CoApp 目录结构设计」

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。

Audio Codec 与 Language 存在级联关系：选择 Audio Codec 后 Language 选项跟随变化，反之不成立。

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution | `{宽}x{高} - {码率} kbps` | `1920x1080 - 4010 kbps` |
| Language | `{音频描述} {编码} {声道} - {码率} kbps` | `Default AAC 2.0 - 125 kbps` |

注：Disney Plus 无法获取文件大小，视频卡片上的"文件大小"标签不展示。

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
|---|---|
| 不可获取文件大小 | `0 / 0 Segments`（分片数）|

### 视频下载 — 花絮（Extras）结构

- 部分视频含花絮，花絮为两级结构
- 任务列表中花絮独立展示，不与主视频成组；例：1 个主视频 + 2 个花絮 → 任务列表最外层展示 3 条数据

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN（行1）| Pro-Quality Disney Plus Downloads, One Click. |
| EN（行2）| up to 1080p, MP4/MKV, multi-track where available. |
| ZH（行1）| Disney Plus 专业品质下载，一键搞定。 |
| ZH（行2）| 支持 1080p 高清，MP4/MKV 格式，含多音轨（如有）。 |

License Info 产品名：`StreamFab Disney Plus Downloader for Browser`

Trial Status 字段：
- Active：30 天有效期内
- Expired：过期

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。默认选中第一个选项（如无特殊说明）。

Disney Plus 与 Netflix 的 Setting 差异：Video Codec 选项调整、去掉 H264 Profile、Pre-select Subtitle Language 增加 None。

配置项顺序如下：

1. Language（Same as UI Language + 27 个语言选项）
2. Video Format（MP4 / MKV (FFmpeg) / MKV (MKVToolNix)）
3. Video Codec（H264 / H265 - SDR / HDR10 / Dolby Vision）
4. Video Resolution（Full HD - 1080p / HD - 720p）
5. Audio Codec（Atmos / EAC3 / AAC）
6. Pre-select Audio Language（Same as UI Language + 27 个语言选项）
   - 子选项：Pre-select Description Audio if available（默认不选）
7. Audio Channel（Stereo (AAC) / Multi-Channel 5.1 (EAC3 / AC3)）
   - 子选项：Pre-select both 5.1 and 2.0 audios（默认不选）
8. Pre-select Subtitle Language（None / Same as UI Language + 27 个语言选项）
   - 子选项：Always download the forced subtitle（默认选中）
9. Subtitle Action（Remux Into File / Extract to SRT File / Extract Original Format）
