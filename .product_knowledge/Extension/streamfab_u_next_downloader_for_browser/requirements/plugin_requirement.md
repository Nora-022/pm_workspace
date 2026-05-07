# [StreamFab 浏览器插件] - [U-Next] - 需求文档

- 原型链接：http://axcloud.dvdfab.me/96EHKE?id=h1sujc&g=14
- 需求地址：https://project.feishu.cn/streamfab_browser_extension/story/detail/6922953725

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026/03/19 | 首次编辑 | — |
| 2026/04/29 | 优化内容 | 调整文档结构，为转换 MD 文件做准备 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab U-Next Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab U-Next Coapp |
| app id | — | streamfab_for_browser_u-next |
| pid | Win | 659 |
| pid | Mac | 1659 |
| option id | Win | 459 |
| option id | Mac | 1459 |
| client id — 主站 | 插件（发布）| 272 |
| client id — 主站 | CoApp Win x64 | 267 |
| client id — 主站 | CoApp Mac | 268 |
| client id — 品牌站 | 插件（发布）| 273 |
| client id — 品牌站 | CoApp Win x64 | 270 |
| client id — 品牌站 | CoApp Mac | 271 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-Next_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_U-Next_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-Next_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_U-Next_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-Next_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_U-Next_Coapp_for_Mac |

### 网站信息

支持 `U-NEXT` 和 `H-NEXT`。

**U-NEXT** 是日本最大的视频流媒体平台之一，主要面向日本市场，提供电影、剧集、动画、综艺、纪录片等多类型内容，涵盖日本国内及部分海外版权作品。

**H-NEXT** 为 U-NEXT 体系内的成人内容服务，同样面向日本市场，仅限成年用户访问。两者共用 U-NEXT 账号体系，但 H-NEXT 的内容权限独立于普通 U-NEXT 订阅，用户需在 U-NEXT 账号基础上额外开通对应的 H-NEXT 服务权限方可访问。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照 Netflix 插件。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab U-Next Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | U-Next |
| 跳转链接 | 产品页、What's New、订阅/升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | /（结构一致）|
| 用户权益 | — | /（结构一致）|
| 视频分析 | — | /（结构一致）|
| 视频检测 | — | /（结构一致）|
| 视频下载 | — | 下载配置项、下载进度显示标签 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 通用配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| 产品页 | 主站 | https://streamfab.dvdfab.cn/u-next-downloader-for-browser.htm |
| 产品页 | 独立站 | https://streamfab.com/u-next-downloader-for-browser.htm |
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=u-next-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=u-next-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=659 |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open=659 |

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution | `{宽}x{高} - {码率} kbps - {文件大小}` | `1280x720 - 2444 kbps - 1.46 GB` |
| Language | `{音频描述} {编码} {声道} - {码率} kbps` | `Default AAC 2.0 - 125 kbps` |

### 视频下载 — 下载进度显示

可获取文件大小，进度信息用 `0B / 0B` 展示，非 Segment。

### License Info — Banner 文案（定稿）

| 语言 | 文案 |
|---|---|
| EN | Download U-NEXT DRM Videos, Made Simple.<br>Save U-NEXT and H-NEXT videos offline in up to 4K with EAC3 5.1 or AAC 2.0 audio. |
| ZH | 轻松下载 U-NEXT DRM 视频。<br>将 U-NEXT 和 H-NEXT 视频以最高 4K 分辨率下载到本地，并支持 EAC3 5.1 或 AAC 2.0 音频格式。 |

License Info 产品名：`StreamFab U-Next Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。U-Next 无特殊配置项，按照 Common 配置来。

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
