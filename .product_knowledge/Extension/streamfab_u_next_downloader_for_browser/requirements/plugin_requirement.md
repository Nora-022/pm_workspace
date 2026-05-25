# [StreamFab 浏览器插件] - [U-NEXT] - 需求文档

- 原型链接：[http://axcloud.dvdfab.me/96EHKE?id=h1sujc&g=14](http://axcloud.dvdfab.me/96EHKE?id=h1sujc&g=14)
- 需求地址：[https://project.feishu.cn/streamfab_browser_extension/story/detail/6922953725](https://project.feishu.cn/streamfab_browser_extension/story/detail/6922953725)

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
| --- | --- | --- |
| 2026/03/19 | 首次编辑 | — |
| 2026/04/29 | 优化内容 | 调整文档结构，为转换 MD 文件做准备 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
| --- | --- | --- |
| 插件产品名 | — | StreamFab U-NEXT Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab U-NEXT Coapp |
| app id | — | streamfab_for_browser_u-next |
| pid | Win | 659 |
| pid | Mac | 1659 |
| option id | Win | 459 |
| option id | Mac | 1459 |
| client id — 主站 | 插件（发布） | 272 |
| client id — 主站 | CoApp Win x64 | 267 |
| client id — 主站 | CoApp Mac | 268 |
| client id — 品牌站 | 插件（发布） | 273 |
| client id — 品牌站 | CoApp Win x64 | 270 |
| client id — 品牌站 | CoApp Mac | 271 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
| --- | --- | --- | --- |
| 插件包 | — | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-NEXT_Downloader_for_Browser](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-NEXT_Downloader_for_Browser) |
| 插件包 | — | 独立站 | [https://streamfab.com/mlink?p=StreamFab_U-NEXT_Downloader_for_Browser](https://streamfab.com/mlink?p=StreamFab_U-NEXT_Downloader_for_Browser) |
| CoApp | Win | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-NEXT_Coapp](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-NEXT_Coapp) |
| CoApp | Win | 独立站 | [https://streamfab.com/mlink?p=StreamFab_U-NEXT_Coapp](https://streamfab.com/mlink?p=StreamFab_U-NEXT_Coapp) |
| CoApp | Mac | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-NEXT_Coapp_for_Mac](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U-NEXT_Coapp_for_Mac) |
| CoApp | Mac | 独立站 | [https://streamfab.com/mlink?p=StreamFab_U-NEXT_Coapp_for_Mac](https://streamfab.com/mlink?p=StreamFab_U-NEXT_Coapp_for_Mac) |

### 网站信息

支持 `U-NEXT` 和 `H-NEXT`。

**U-NEXT** 是日本最大的视频流媒体平台之一，主要面向日本市场，提供电影、剧集、动画、综艺、纪录片等多类型内容，涵盖日本国内及部分海外版权作品。

**H-NEXT** 为 U-NEXT 体系内的成人内容服务，同样面向日本市场，仅限成年用户访问。两者共用 U-NEXT 账号体系，但 H-NEXT 的内容权限独立于普通 U-NEXT 订阅，用户需在 U-NEXT 账号基础上额外开通对应的 H-NEXT 服务权限方可访问。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照 Netflix 插件。

### 全局变更

| 一级模块 | 变更点 |
| --- | --- |
| 产品名 | StreamFab U-NEXT Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | U-NEXT |
| 跳转链接 | 产品页、What's New、订阅/升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
| --- | --- | --- |
| 登录 & 授权 | — | /（结构一致） |
| 用户权益 | — | /（结构一致） |
| 视频分析 | — | /（结构一致） |
| 视频检测 | — | /（结构一致） |
| 视频下载 | — | 下载配置项、下载进度显示标签 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 通用配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
| --- | --- | --- |
| 产品页 | 主站 | [https://streamfab.dvdfab.cn/unext-downloader-for-browser.htm](https://streamfab.dvdfab.cn/unext-downloader-for-browser.htm) |
| 产品页 | 独立站 | [https://streamfab.com/unext-downloader-for-browser.htm](https://streamfab.com/unext-downloader-for-browser.htm) |
| What's New | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=unext-downloader](https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=unext-downloader) |
| What's New | 独立站 | [https://streamfab.com/streamfab-for-browser-new.htm?pid=unext-downloader](https://streamfab.com/streamfab-for-browser-new.htm?pid=unext-downloader) |
| 付费 / Upgrade | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=659](https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=659) |
| 付费 / Upgrade | 独立站 | [https://streamfab.com/streamfab-for-browser.htm?open=659](https://streamfab.com/streamfab-for-browser.htm?open=659) |

### 视频下载 — 配置参数

配置项与配置项选项均由 CoApp 分析结果动态生成，不固定枚举。U-NEXT 下载配置需按当前视频 meta 返回结果动态展示。

展示规则：

- `Video Codec`：当 CoApp 分析结果支持选择 codec 时展示；不支持 codec 选择时不展示。
- `Video Version`：当 CoApp 分析结果返回版本维度时展示。可选项包含 `Subbed`（字幕版）与 `Dubbed`（配音版）；部分视频可能仅存在其中一个版本，仅展示实际返回的版本选项。
- `Resolution`、`Audio Codec`、`Language`：按 CoApp 分析结果展示。
- 字段展示顺序：`Codec` -> `Video Version` -> `Resolution` -> `Audio Codec` -> `Language`。未返回的字段直接跳过，剩余字段保持相对顺序不变。

| 配置项 | 展示条件 | 选项格式 / 来源 | 示例 |
| --- | --- | --- | --- |
| Video Codec | CoApp 返回 Video codec 可选维度时展示 | `{视频编码}`，具体选项以 CoApp 返回为准 | `H264` |
| Video Version | CoApp 返回版本维度时展示 | `Subbed` / `Dubbed`，按 CoApp 返回结果动态展示 | `Subbed` |
| Resolution | CoApp 返回分辨率维度时展示 | `{宽}x{高} - {码率} kbps - {文件大小}` | `1280x720 - 2444 kbps - 1.46 GB` |
| Audio Codec | CoApp 返回音频编码维度时展示 | `{音频编码} {声道}`，具体选项以 CoApp 返回为准 | `AAC` |
| Language | CoApp 返回音轨语言维度时展示 | 音轨语言 / 音轨描述文案以 CoApp 返回为准，插件不固定枚举 | `Default AAC 2.0 - 125 kbps` |

补充：

支持所有配置项的视频 url [https://video.unext.jp/play/SID0017988/ED00075257?ps=2](https://video.unext.jp/play/SID0017988/ED00075257?ps=2)
支持 video version、resolution、audio codec、language 配置的视频 url [https://video.unext.jp/play/SID0020807/ED00098629](https://video.unext.jp/play/SID0020807/ED00098629)
支持 video version、resolution、language 配置的视频 url [https://video.unext.jp/play/SID0021252/ED00100711](https://video.unext.jp/play/SID0021252/ED00100711)
只支持 resolution、language 配置的视频 url [https://video.unext.jp/play/SID0028826/ED00155129](https://video.unext.jp/play/SID0028826/ED00155129)

### 视频下载 — 下载进度显示

可获取文件大小，进度信息用 `0B / 0B` 展示，非 Segment。

### License Info — Banner 文案（定稿）

| 语言 | 文案 |
| --- | --- |
| EN | Download U-NEXT DRM Videos, Made Simple.<br>Save U-NEXT and H-NEXT videos offline in up to 4K with EAC3 5.1 or AAC 2.0 audio. |
| ZH | 轻松下载 U-NEXT DRM 视频。<br>将 U-NEXT 和 H-NEXT 视频以最高 4K 分辨率下载到本地，并支持 EAC3 5.1 或 AAC 2.0 音频格式。 |

License Info 产品名：`StreamFab U-NEXT Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。保留下方默认 7 项通用配置项顺序，不修改。

通用配置项（按顺序）：

**1. Language**

**2. Video Format**

**3. Video Resolution**

**4. Pre-select Audio Language**

**5. Audio Channel**

**6. Pre-select Subtitle Language**

**7. Subtitle Action**