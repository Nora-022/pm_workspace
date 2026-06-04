# [StreamFab 浏览器插件] - [Hulu] - 需求文档

- 需求地址：<a href="https://project.feishu.cn/streamfab_browser_extension/story/detail/6928970573" target="_blank" rel="noopener noreferrer nofollow">Feature 新品 SF 插件 - Hulu</a>
- UI 需求说明：<a href="https://doc-viewer.specm8.work/s/vonrqrwe" target="_blank" rel="noopener noreferrer nofollow">https://doc-viewer.specm8.work/s/vonrqrwe</a>
- CoApp 接口文档：<a href="https://doc-viewer.specm8.work/s/g2u42k97" target="_blank" rel="noopener noreferrer nofollow">https://doc-viewer.specm8.work/s/g2u42k97</a>

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
| --- | --- | --- |
| 2026-05-08 | 首次编辑 | 从飞书需求文档同步至本地 md |
| 2026-06-04 | 更新 meta 分析结果配置项展示逻辑；补充 CoApp 协议约束 | 来源：客户端方案拆解 PDF、`hulu_coapp_api_documentation.md` |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
| --- | --- | --- |
| 插件产品名 | — | StreamFab Hulu Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Hulu Coapp |
| app id | — | streamfab_for_browser_hulu |
| pid | Win | 692 |
| pid | Mac | 1692 |
| option id | Win | 492 |
| option id | Mac | 1492 |
| client id — 主站 | 插件（发布） | 296 |
| client id — 主站 | CoApp Win x64 | 291 |
| client id — 主站 | CoApp Mac | 292 |
| client id — 品牌站 | 插件（发布） | 297 |
| client id — 品牌站 | CoApp Win x64 | 294 |
| client id — 品牌站 | CoApp Mac | 295 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
| --- | --- | --- | --- |
| 插件包 | — | 主站 | <a href="https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Downloader_for_Browser" target="_blank" rel="noopener noreferrer nofollow">https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Downloader_for_Browser</a> |
| 插件包 | — | 独立站 | <a href="https://streamfab.com/mlink?p=StreamFab_Hulu_Downloader_for_Browser" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.com/mlink?p=StreamFab_Hulu_Downloader_for_Browser</a> |
| CoApp | Win | 主站 | <a href="https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Coapp" target="_blank" rel="noopener noreferrer nofollow">https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Coapp</a> |
| CoApp | Win | 独立站 | <a href="https://streamfab.com/mlink?p=StreamFab_Hulu_Coapp" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.com/mlink?p=StreamFab_Hulu_Coapp</a> |
| CoApp | Mac | 主站 | <a href="https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Coapp_for_Mac" target="_blank" rel="noopener noreferrer nofollow">https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Hulu_Coapp_for_Mac</a> |
| CoApp | Mac | 独立站 | <a href="https://streamfab.com/mlink?p=StreamFab_Hulu_Coapp_for_Mac" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.com/mlink?p=StreamFab_Hulu_Coapp_for_Mac</a> |

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
| --- | --- |
| 产品名 | StreamFab Hulu Downloader for Browser |
| 安装器 | 界面 ui、替换 Logo |
| 流媒体服务名 | Hulu |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
| --- | --- | --- |
| 登录 & 授权 | — | /（结构一致） |
| 用户权益 | — | 试用 3 个视频；付费用户单日 100 个视频（展示结构沿用基线） |
| 视频分析/检测/下载 | — | 下载配置项、视频目录结构 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 按需差异化配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
| --- | --- | --- |
| 产品页 | 主站 | <a href="https://streamfab.dvdfab.cn/hulu-downloader-for-browser.htm" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.dvdfab.cn/hulu-downloader-for-browser.htm</a> |
| 产品页 | 独立站 | <a href="https://streamfab.com/hulu-downloader-for-browser.htm" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.com/hulu-downloader-for-browser.htm</a> |
| What's New | 主站 | <a href="https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=hulu-downloader" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=hulu-downloader</a> |
| What's New | 独立站 | <a href="https://streamfab.com/streamfab-for-browser-new.htm?pid=hulu-downloader" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.com/streamfab-for-browser-new.htm?pid=hulu-downloader</a> |
| 付费 / Upgrade | 主站 | <a href="https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=692" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=692</a> |
| 付费 / Upgrade | 独立站 | <a href="https://streamfab.com/streamfab-for-browser.htm?open=692" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.com/streamfab-for-browser.htm?open=692</a> |

### 安装器

参见 UI 需求说明文档。调整项：

- 安装器资源：见 (<a href="https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&amp;p=f&amp;m=dev" target="_blank" rel="noopener noreferrer nofollow">https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&p=f&m=dev</a>)
- 安装目录结构：见 <a href="https://i6a1sqw3p2.feishu.cn/docx/CfszdQRt2o91I7xX6IIc9rY0nVh" target="_blank" rel="noopener noreferrer nofollow">StreamFab 浏览器插件 - CoApp 目录结构设计</a>

### 视频下载 — 配置参数

配置项由 CoApp `analyze_result` 的 meta、`mediaConfig`、音轨和字幕轨道信息动态生成。客户端旧模式中“只有 Video 一个配置项”的逻辑已废弃；插件不再固定展示 `Video`，也不硬编码 Resolution / Codec / Audio / Subtitle 选项。

配置项展示规则

- 仅展示当前视频 meta 分析结果中可供用户选择的维度；某维度只有一个不可选择值或返回为空时，不展示对应配置项。
- `Resolution` 以当前视频返回的清晰度列表为准。用户默认设置中的清晰度在当前视频不可用时，不再弹出“当前剧集可能没有该分辨率”的提示。
- 选项文案按返回字段组合；有文件大小时展示 `{宽}x{高} - {码率} kbps - {大小}`，无文件大小时只展示当前可用字段。
- 发起下载时以用户在 meta 结果弹窗中的选择为准；未展示的维度沿用 CoApp 返回的默认值。

<!-- colwidth:17.7%,31.32%,50.98% -->
| 配置项 | 展示条件 / 数据来源 | 示例 / 说明 |
| --- | --- | --- |
| Video Codec | `data.mediaConfig.video.listCodecInfo` 存在多个可选 codec 时展示 | `H264`、`H265`；默认值始终为 `H264` |
| Resolution | 当前视频返回的分辨率、码率、文件大小列表 | `1920x1080 - 9373 kbps - 3.01 GB`；`640x480 - 1458 kbps - 234.90 MB` |
| Audio Codec | `data.mediaConfig.audio.lstSupportAudioCodec` 存在多个可选 codec 时展示 | `EAC3`、`AAC`；默认值始终为 `AAC` |
| Language | 当前视频返回的音轨列表 | `English AAC 2.0 - 130 kbps` |
| Subtitle | 当前视频返回的字幕轨道和字幕处理方式 | 展示字幕语言，并提供字幕处理方式选择Remux Into FileExtract to SRT FileExtract Original Format |

Hulu CoApp 协议约束

| 项目 | 需求口径 |
| --- | --- |
| `analyze_codec` / `analyze_codec_result` | Hulu 不支持该二次分析流程；不要在选择 codec 后再触发 codec 分析 |
| `data.mediaConfig.video.listCodecInfo` | Hulu 仅返回 `[H264]` 或 `[H264, H265]`；US movie 可能支持 H265，其余场景通常仅 H264 |
| `data.mediaConfig.audio.lstSupportAudioCodec` | Hulu 仅返回 `["AAC"]` 或 `["EAC3", "AAC"]`；US movie 可能支持 EAC3 |
| `data.mediaConfig.video.listBitrateAdaptionInfo` | 固定为空数组，不展示 CVBR / CBR 码率自适应配置 |
| `data.mediaConfig.video.supportMaxResolution` | 当前接口文档为 `EVideoResolution_1080p`；产品页 / Banner 的 4K 文案不应转化为固定 4K 选项，实际可选清晰度以 `analyze_result` 返回为准 |
| `data.mediaConfig.videoType` | `lstSupportVideoType` 为空；不要依赖 caption / dub 类型字段切换版本，字幕版 / 吹替版 / 预告等分流按视频目录树和标题分组处理 |

展示场景示例

- Meta 分析结果最全时，可展示：`Video Codec`、`Resolution`、`Audio Codec`、`Language`、`Subtitle`。
- Meta 分析结果只有基础可选项时，可仅展示：`Resolution`、`Language`、`Subtitle`。

### 视频下载 — 视频目录结构

继续遵循树结构处理方式（common 逻辑见 <a href="https://i6a1sqw3p2.feishu.cn/docx/HeUPdODCLobIV8xVZwncqK1pnSe" target="_blank" rel="noopener noreferrer nofollow">Amazon 需求文档</a>）。部分视频带有吹替版本、预告等视频流，都需单独成组，单独扣次数。

通用展示规则：

- Movie 不含花絮 / 预告片时，按单视频处理，不展示 `Select Episode`。
- Movie 含花絮 / 预告片时，`Main Movie` 展示主电影视频，`Bonus / Extras` 展示花絮视频，`Trailers` 展示预告片。
- TV Show 默认下载并解析当前剧集 MPD / M3U8 音视频信息；如 meta 分析阶段已获取 season 和 episode 信息，剧集名称显示为 `SXXEXX - XXXX`；如需下载阶段才可获取剧集信息，则显示为网站原始剧集名称。
- `Bonus / Extras`、`Trailers` 在 Movie 和 TV Show 中均需单独成组；字幕版、吹替版、预告等分流独立勾选、独立扣次数。

**Movie 示例**：<a href="https://www.hulu.jp/watch/100029277" target="_blank" rel="noopener noreferrer nofollow">https://www.hulu.jp/watch/100029277</a>

- 该视频界面展示 3 个视频，分别是：

  - 主视频字幕版
  - 主视频吹替版
  - 预告片
- 下载队列里都成组展示，结构如下：

  - エピソード(吹替)
  - (吹)新感染ファイナル·エクスプレス

**TV Show 示例**：<a href="https://www.hulu.jp/fire-country" target="_blank" rel="noopener noreferrer nofollow">https://www.hulu.jp/fire-country</a>

- 该 TV Show 有两个 season，每个 season 分别有字幕版和吹替版
- 字幕版和吹替版在下载队列单独成组，并列展示

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
| --- | --- |
| 不可获取文件大小 | `0 / 0 Segments`（分片数） |

下载中标签展示 `Resolution`、`Video Codec`、`Audio Codec`；进度展示同时包含百分比、下载速度和 segment 信息。

### License Info

License Info 产品名：`StreamFab Hulu Downloader for Browser`

| 语言 | 文案 |
| --- | --- |
| EN | Hulu in Up to 4K. One Click.<br>The simplest way to download Hulu shows and movies for offline viewing |
| ZH | Hulu 支持最高 4K 画质。一键下载。<br>下载 Hulu 剧集和电影以供离线观看的最简单方式 |

### Setting

Setting 结构不变，分为 Extension 和 CoApp。

Setting 用于用户默认偏好和预选项；实际下载前 meta 结果弹窗仍按当前视频 `analyze_result` 动态收敛，只展示可选维度。

通用配置项（按顺序）：

**1. Language**

**2. Video Format**

**3. Video Codec**

- H264
- H265

**4. Video Resolution**

- 选项以当前视频 `analyze_result` 返回为准，不固定 Full HD / HD 枚举

**5. Pre-select Audio Language**

**6. Audio Channel**

**7. Pre-select Subtitle Language**

**8. Subtitle Action**