# [StreamFab 浏览器插件] - [Fandango at Home] - 需求文档

- 原型链接：
- 需求地址：
- UI 需求说明：`plugin_ui_requirement.md`

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-05-18 | 按 common 模板重建需求文档并回填 pid / client id | SiteName=`Fandango at Home`；mlink 产品片段=`Fandango_at_Home`；跳转 slug=`fandango-at-home` |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab Fandango at Home Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Fandango at Home Coapp |
| app id | — | streamfab_for_browser_fandango_at_home |
| pid | Win | 693 |
| pid | Mac | 1693 |
| option id | Win | 493 |
| option id | Mac | 1493 |
| client id — 主站 | 插件（发布）| 326 |
| client id — 主站 | CoApp Win x64 | 321 |
| client id — 主站 | CoApp Mac | 322 |
| client id — 品牌站 | 插件（发布）| 327 |
| client id — 品牌站 | CoApp Win x64 | 324 |
| client id — 品牌站 | CoApp Mac | 325 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Coapp_for_Mac |

### 网站信息

Fandango at Home 是面向影视点播内容的流媒体服务。本插件需求围绕 Fandango at Home movies 和 shows 的浏览、分析、下载与离线观看场景展开。

- **服务地区**：知识库索引按美国站点插件维护；产品页文案同时包含全球范围下载表述。具体账号、地区和内容可访问性以用户在 Fandango at Home 的有效访问权限为准。
- **内容类型**：movies 和 shows。
- **账号体系**：需要用户具备 Fandango at Home 的有效内容访问权限；下载范围限定为符合条件的内容。
- **访问限制**：产品页明确包含 `eligible`、`personal offline viewing`、`valid access period` 等限制条件，需求中必须保留这些边界。
- **输出能力**：产品页确认支持 up to 4K、HDR10、Dolby Vision、EAC3 5.1、AAC 2.0、MP4 / MKV、多语言字幕、SRT 字幕文件和字幕封装。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Fandango at Home Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | Fandango at Home |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | /（结构一致）|
| 用户权益 | — | /（结构一致）|
| 视频分析 | — | /（结构一致）|
| 视频检测 | — | /（结构一致）|
| 视频下载 | — | 支持 up to 4K、HDR10、Dolby Vision、EAC3 5.1、AAC 2.0、MP4 / MKV、多语言字幕、SRT 字幕文件和字幕封装；支持批量下载、自动 / 定时下载、去广告处理 |
| Dashboard | — | Banner 文案、产品名：StreamFab Fandango at Home Downloader for Browser |
| Dashboard | Setting | 按 common 配置项结构承接；站点差异项后续追加 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| 产品页 | 主站 | https://streamfab.dvdfab.cn/fandango-at-home-downloader-for-browser.htm |
| 产品页 | 独立站 | https://streamfab.com/fandango-at-home-downloader-for-browser.htm |
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=fandango-at-home-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=fandango-at-home-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=693 |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open=693 |

### 安装器

参见 UI 需求说明文档。调整项：
- 安装器资源：(https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&p=f&m=dev)
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
| 不可获取文件大小 | `0 / 0 Segments`（分片数） |

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN | Fandango at Home Videos in Up to 4K. One Click.<br>The simplest way to download Fandango at Home movies and shows for offline viewing. |
| ZH | Fandango at Home 视频最高支持 4K 画质。一键下载。<br>下载 Fandango at Home 电影和剧集以供离线观看的最简单方式。 |

License Info 产品名：`StreamFab Fandango at Home Downloader for Browser`

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
