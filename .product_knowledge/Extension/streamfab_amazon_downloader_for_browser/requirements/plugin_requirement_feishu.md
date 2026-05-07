# [StreamFab 浏览器插件] - [Amazon] - 需求文档

- 原型链接：
- 需求地址：
- UI 需求说明：[StreamFab 浏览器插件] - [Amazon] - UI 需求说明

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-04-07 | 初始化 | 基于产品页和 Prime Video 公开站点调研 |
| 2026-04-15 | 整理归档版本 | 清理草稿口径 |
| 2026-04-29 | 按新模版归档 | 从 plugin_requirement.md 迁移 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab Amazon Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Amazon Coapp |
| app id | — | streamfab_for_browser |
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
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Amazon_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Amazon_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Amazon_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Amazon_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Amazon_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Amazon_Coapp_for_Mac |

### 网站信息

Prime Video（primevideo.com / amazon.com/video），亚马逊旗下流媒体平台，主要服务地区为北美、欧洲、日本、印度及其他亚太地区。内容类型涵盖电影、剧集、原创内容，并支持 Prime 频道（Channels）订阅。账号体系为 Amazon 账号，内容权益分为 Prime 包含内容、频道订阅内容和单片租买（Rental / Purchase）三类。内容访问受地区限制，部分内容仅限特定地区。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Amazon Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | Amazon / Prime Video |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | 区分未登录、无 Prime、rental-only、channel-gated 等状态 |
| 用户权益 | — | 权益不能按单一状态处理（Prime / rental / channel 分类）|
| 视频分析 | — | 标题类型、CTA、字幕 / 音频元数据、权益类型均属于分析范围 |
| 视频检测 | — | 以详情页、播放页、标题卡片等页面结构归档 |
| 视频下载 | — | 失败态需体现权益、地区、内容类型等原因 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 按需填写差异化配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=amazon-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=amazon-downloader |
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
| EN | Amazon Videos in Up to 1080p. One Click. |
| ZH | Amazon 视频一键下载，轻松离线观看。 |

License Info 产品名：`StreamFab Amazon Downloader for Browser`

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
