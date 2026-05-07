# [StreamFab 浏览器插件] - [Video] - 需求文档

- 原型链接：
- 需求地址：
- UI 需求说明：[StreamFab 浏览器插件] - [Video] - UI 需求说明

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-04-29 | 按新模版归档 | 基于知识库内容整理 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab Video Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Video Coapp |
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
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Video_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Video_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Video_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Video_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Video_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Video_Coapp_for_Mac |

### 网站信息

多站点通用插件，基于 yt-dlp 支持的所有视频站点（YouTube、Vimeo、Dailymotion 等）。主要使用场景为非 DRM 保护的公开视频下载。Chrome 版本不做 YouTube 下载。不支持 DRM 视频下载。

---

## 变更说明

Video Downloader 是浏览器插件产品线的通用基础款，同时也是所有单站点插件沿用的产品框架原型。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Video Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | 多站点 |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | 不需要登录目标站点 |
| 用户权益 | — | 含 Lifetime Free Access（YouTube 720p）|
| 视频分析 | — | /（结构一致）|
| 视频检测 | — | /（结构一致）|
| 视频下载 | — | /（结构一致）|
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 通用配置项（无差异化）|

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=video-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=video-downloader |
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
| 不可获取文件大小 | `0 / 0 Segments`（分片数）|

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN | |
| ZH | |

License Info 产品名：`StreamFab Video Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。通用配置项（按顺序）：

1. Language
2. Video Format（MP4 / MKV (FFmpeg) / MKV (MKVToolNix)）
3. Video Resolution（Full HD - 1080p / HD - 720p）
4. Pre-select Audio Language（Same as UI Language + 27 个语言选项）
   - 子选项：Pre-select Description Audio if available（默认不选）
5. Audio Channel（Stereo (AAC) / Multi-Channel 5.1 (EAC3 / AC3)）
   - 子选项：Pre-select both 5.1 and 2.0 audios（默认不选）
6. Pre-select Subtitle Language（Same as UI Language + 27 个语言选项）
   - 子选项：Always download the forced subtitle（默认选中）
7. Subtitle Action（Remux Into File / Extract to SRT File / Extract Original Format）
