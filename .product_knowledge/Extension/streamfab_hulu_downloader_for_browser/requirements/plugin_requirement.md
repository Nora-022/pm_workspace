# [StreamFab 浏览器插件] - [Hulu] - 需求文档

- 原型链接：http://axcloud.dvdfab.me/NUMOB6?id=n01130&g=14
- 需求地址：[Feature 新品 SF 插件 - Hulu](https://project.feishu.cn/streamfab_browser_extension/story/detail/6928970573)
- UI 需求说明：[StreamFab 浏览器插件 - Hulu - UI 需求说明](https://i6a1sqw3p2.feishu.cn/docx/XZtGdMMhjo00ubxJyCCcZXpYnnc)

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-05-08 | 首次编辑 | 从飞书需求文档同步至本地 md |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab Hulu Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Hulu Coapp |
| app id | — | streamfab_for_browser_hulu |
| pid | Win | 692 |
| pid | Mac | 1692 |
| option id | Win | 492 |
| option id | Mac | 1492 |
| client id — 主站 | 插件（发布）| 296 |
| client id — 主站 | CoApp Win x64 | 291 |
| client id — 主站 | CoApp Mac | 292 |
| client id — 品牌站 | 插件（发布）| 297 |
| client id — 品牌站 | CoApp Win x64 | 294 |
| client id — 品牌站 | CoApp Mac | 295 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Hulu_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Hulu_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Hulu_Coapp_for_Mac |

### 网站信息

Hulu 是华特迪士尼公司旗下的视频流媒体平台，覆盖美国（hulu.com）和日本（hulu.jp）两个独立运营的站点。

- **服务地区**：美国和日本，两个站点账号体系不互通；其余地区受地区封锁。界面语言：美国站英文，日本站日文。
- **内容类型**：电影、剧集、综艺、动漫、纪录片以及平台原创内容。日本站常见同一标题分字幕版与吹替版双版本上架，以及预告片单独成项。
- **账号体系**：邮箱注册或第三方登录；订阅制按月或按年付费，不同套餐对应不同分辨率上限和广告策略。
- **访问限制**：DRM 保护、强制登录、地区封锁；播放页可访问的清晰度受套餐和设备 DRM 等级限制。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Hulu Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | Hulu |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | /（结构一致）|
| 用户权益 | — | /（结构一致）|
| 视频分析 | — | 下载配置项、视频目录结构 |
| 视频检测 | — | 下载配置项、视频目录结构 |
| 视频下载 | — | 下载配置项、视频目录结构 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 按需差异化配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| 产品页 | 主站 | https://streamfab.dvdfab.cn/hulu-downloader-for-browser.htm |
| 产品页 | 独立站 | https://streamfab.com/hulu-downloader-for-browser.htm |
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=hulu-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=hulu-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=692 |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open=692 |

### 安装器

参见 UI 需求说明文档。调整项：
- 安装器资源：参见 Figma 设计文件
- 安装目录结构：参见 [StreamFab 浏览器插件 - CoApp 目录结构设计](https://i6a1sqw3p2.feishu.cn/docx/CfszdQRt2o91I7xX6IIc9rY0nVh)

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。Hulu 当前可配置选项只有 Video，选项值构成：

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution（Bitrate） | `{宽} × {高} (Bitrate {码率} kbps)` | `1920 × 1080 (Bitrate 4000 kbps)` |

### 视频下载 — 视频目录结构

继续遵循树结构处理方式（common 逻辑见 [Amazon 需求文档](https://i6a1sqw3p2.feishu.cn/docx/HeUPdODCLobIV8xVZwncqK1pnSe)）。部分视频带有吹替版本、预告等视频流，都需单独成组，单独扣次数。

**Movie 示例**：https://www.hulu.jp/watch/100029277

- 该视频界面展示 3 个视频，分别是：
  - 主视频字幕版
  - 主视频吹替版
  - 预告片
- 下载队列里都成组展示，结构如下：
  - エピソード(吹替)
  - (吹)新感染ファイナル·エクスプレス

**TV Show 示例**：https://www.hulu.jp/fire-country

- 该 TV Show 有两个 season，每个 season 分别有字幕版和吹替版
- 字幕版和吹替版在下载队列单独成组，并列展示

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
|---|---|
| 不可获取文件大小 | `0 / 0 Segments`（分片数） |

进度展示同时包含百分比和下载速度。

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN | Hulu in Up to 4K. One Click.<br>The simplest way to download Hulu shows and movies for offline viewing |
| ZH | Hulu 支持最高 4K 画质。一键下载。<br>下载 Hulu 剧集和电影以供离线观看的最简单方式 |

License Info 产品名：`StreamFab Hulu Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。

通用配置项（按顺序）：

**1. Language**
- Same as UI Language
- 其他语言复用客户端 27 个选项

**2. Video Format**
- MP4
- MKV (FFmpeg)
- MKV (MKVToolNix)

**3. Video Resolution**
- Full HD - 1080p
- HD - 720p

**4. Pre-select Audio Language**
- Same as UI Language
- 其他语言复用客户端 27 个选项
- 子选项：Pre-select Description Audio if available（默认不选）

**5. Audio Channel**
- Stereo (AAC)
- Multi-Channel 5.1 (EAC3 / AC3)
- 子选项：Pre-select both 5.1 and 2.0 audios（默认不选）

**6. Pre-select Subtitle Language**
- None
- Same as UI Language
- 其他语言复用客户端 27 个选项
- 子选项：Always download the forced subtitle（默认选中）

**7. Subtitle Action**
- Remux Into File
- Extract to SRT File
- Extract Original Format

Hulu 差异化追加项：

**8. Video Codec**
- H264
- H265
