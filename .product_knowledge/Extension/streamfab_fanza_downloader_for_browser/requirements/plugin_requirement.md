# [StreamFab 浏览器插件] - [FANZA] - 需求文档

- 原型链接：http://axcloud.dvdfab.me/EF2U8C?id=nh8wpu&g=14
- 需求地址：
- UI 需求说明：

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-05-06 | 首次编辑 | |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab FANZA Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab FANZA Coapp |
| app id | — | streamfab_for_browser_fanza |
| pid | Win | 658 |
| pid | Mac | 1658 |
| option id | Win | 458 |
| option id | Mac | 1458 |
| client id — 主站 | 插件（发布）| 248 |
| client id — 主站 | CoApp Win x64 | 243 |
| client id — 主站 | CoApp Mac | 244 |
| client id — 品牌站 | 插件（发布）| 249 |
| client id — 品牌站 | CoApp Win x64 | 246 |
| client id — 品牌站 | CoApp Mac | 247 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fanza_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fanza_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fanza_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fanza_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fanza_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fanza_Coapp_for_Mac |

### 网站信息

FANZA 是品牌，DMM 是宿主平台，www.dmm.co.jp 和 video.dmm.co.jp 是同一业务体系下的不同官方入口与承载层。

- FANZA 网站有两个入口，可定义为 Host 主入口，分别是：
  - 官方综合入口 host：https://www.dmm.co.jp/
  - 官方视频业务 host：https://video.dmm.co.jp/
- Host 拼接参数也可定位到成人内容页，比如：
  - https://www.dmm.co.jp/top/
  - https://video.dmm.co.jp/av/

FANZA 内容以成人为主，视频形态包含単片 / 月額 / VR / TV。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab FANZA Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | FANZA |
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
| Dashboard | Setting | 通用 Setting，无单独配置 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| 产品页 | 主站 | https://streamfab.dvdfab.cn/fanza-downloader-for-browser.htm |
| 产品页 | 独立站 | https://streamfab.com/fanza-downloader-for-browser.htm |
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=fanza-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=fanza-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=658 |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open=658 |

### 安装器

参见 UI 需求说明文档。调整项：
- 安装器资源：参见 Figma 设计文件
- 安装目录结构：参见「[StreamFab 浏览器插件] - CoApp 目录结构设计」

### 视频下载 — 配置参数

下载区域只有 **1 项 Video**，可选项为 FANZA 原生画质标签，按画质从高到低依序排列，共 7 档，格式分两类：

**技术规格格式**（分辨率 + 帧率，高画质档）：
- `4K (2160p60)`
- `FullHD (1080p60)`
- `HD (720p60)`

**画质等级格式**（日文等级词 + 分辨率，无显式帧率，标清及以下档）：
- `高画質(576p)`
- `中画質(432p)`
- `中画質(288p)`
- `低画質(144p)`

### 视频下载 — 任务状态展示

| 任务状态 | 展示内容 |
|---|---|
| 待下载（Pending） | Video 所选项（完整显示） |
| 排队中 / 下载中 / 下载失败 | 仅展示分辨率（不展示画质等级、帧率） |
| 下载完成（Downloaded） | 分辨率 + 音频编码 |

### 视频下载 — 下载进度显示

| 指标 | 格式 |
|---|---|
| 进度 | `0 / 0 Segments`（分片数）|
| 其他 | 速度 / 进度百分比 |

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN | FANZA Videos, Downloaded Simply. / Enjoy FANZA offline in up to 4K with clean AAC audio. |
| ZH | FANZA视频，轻松下载。/ 离线畅享FANZA，最高支持4K画质，搭配纯净AAC音频。|

License Info 产品名：`StreamFab FANZA Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。

Extension 共 7 项（通用结构，无 FANZA 单独配置项）：

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
