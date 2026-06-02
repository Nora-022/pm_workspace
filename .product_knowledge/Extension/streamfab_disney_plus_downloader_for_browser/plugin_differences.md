# Disney Plus — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 详细规格见引用的具体文档章节。
> 检测模式：**netflix_mode**（标准模式，无变体）
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/10_detection_modes.md`](../_common/10_detection_modes.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 价格与权益 | Trial 3 次 / Premium 每日 100（同基线）/ 1M $59.99 / 1Y $89.99 / Lifetime $109.99 | requirements/plugin_requirement.md § 价格与权益 |
| 视频下载配置参数 | 字段集：`Video Codec` / `Resolution` / `Audio Codec` / `Language` / `Subtitle`，全部由 meta 驱动；不固定枚举 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Video Codec 取值 | `H264` / `H265 - SDR` / `HDR10` / `Dolby Vision`（无 VP9 / AV1，无 H264 Profile 拆分） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Audio Codec 取值 | `Atmos` / `EAC3` / `AAC` 三档 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 文件大小不可获取 | Disney+ 无法获取文件大小，视频卡片不展示"文件大小"标签 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 下载进度显示 | 无文件大小时用 `Segment` 表达，进度标签格式 `0 / 0 Segments` | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| Playlist Extras 结构 | 部分视频含 Extras（花絮），形成 `Main Movie` / `Extras` / `extra item` 三级结构；Downloads 内主视频与 Extras 各自独立任务，不成组 | requirements/plugin_requirement.md § 视频下载 - 花絮结构 |
| Banner 文案 | EN：`Pro-Quality Disney Plus Downloads, One Click.` / `up to 1080p, MP4/MKV, multi-track where available.`；ZH：`Disney Plus 专业品质下载，一键搞定。` / `支持 1080p 高清，MP4/MKV 格式，含多音轨（如有）。` | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| Setting Extension 配置项 | 在通用 7 项基础上：`Video Codec` 取值改 4 档（无 VP9/AV1）；**去掉 `H264 Profile`** 整项；`Pre-select Subtitle Language` 新增 `None` 选项 | requirements/plugin_requirement.md § Setting Extension 配置项 |
| 跳转链接 | 主站 slug `disney-plus-downloader`；What's New 同名；产品页 `https://streamfab.dvdfab.cn/disney-plus-downloader.htm` | requirements/plugin_requirement.md § 跳转链接 |
| 浏览器分辨率上限 | Chrome / Firefox 受 Widevine L3 限制，浏览器侧最高 720p；Edge / Safari 理论支持 4K 但需设备认证；插件实际承诺口径以 `1080P` 为主 Banner 文案锚点 | requirements/site_research_notes.md |
| Basic 计划限制 | 含广告 Basic 套餐站点侧无 Atmos / 无 IMAX Enhanced / 无下载；用户权限不足时按内容能力降级而非插件层阻断 | requirements/site_research_notes.md |
| 地区差异 | 2025 年 10 月起国际版 Star 综合娱乐层更名为 Hulu（日本除外）；含广告套餐分地区逐步推开 | requirements/site_research_notes.md |
| 协议栈 | HLS（M3U8）+ CMAF 封装，可同时携带 Widevine / PlayReady 初始化数据；插件协议处理由 CoApp 完成，业务侧不感知 | requirements/site_research_notes.md |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 商店配图 | 替换为 Disney Plus 官网背景图、Disney Plus 内容封面、Disney Plus 插件 / CoApp logo；License Info banner 使用 Disney Plus 1080P 多音轨文案 | requirements/plugin_ui_requirement.md |
| Playlist 弹窗 | 三级层级（Main Movie / Extras / extra item），不预先压平 | requirements/plugin_ui_requirement.md |
| Downloads 列表 | Extras 与主视频拆开独立展示（1 主 + 2 花絮 = 列表 3 条） | requirements/plugin_ui_requirement.md |
| 进度区域 | 文件大小标签可缺省；缺失时用 `0 / 0 Segments` 代替体积进度 | requirements/plugin_ui_requirement.md |

---

## 关键事实（来自产品页 + 站点调研）

- 产品页：`https://streamfab.dvdfab.cn/disney-plus-downloader.htm`
- 站点：`https://www.disneyplus.com/`
- 协议：HLS（M3U8）+ CMAF；非苹果生态走 DASH 路径
- DRM：Widevine（Chrome / Firefox / Android）/ PlayReady（Edge / Xbox）/ FairPlay（Safari / macOS / iOS）
- 视频画质：浏览器侧 Chrome / Firefox 上限 720p（Widevine L3），插件 Banner 锚定 `1080P`；正文卖点提到 `4K + HDR10 + Dolby Vision` 但属于官方 App 口径
- 编码：`H.264` / `H.265 (HDR10 / Dolby Vision)`
- 音频：`Atmos`（Premium 套餐）/ `EAC3 5.1` / `AAC 2.0`；Basic 套餐无 Atmos
- 字幕：多语言 SRT 可外挂或封装；源端格式 WebVTT / TTML / IMSC
- 输出：`MP4` / `MKV`
- 内容来源：Disney / Pixar / Marvel / Star Wars / National Geographic / 20th Century Studios 等
- 订阅：Basic（含广告，720p）/ Premium（无广告，4K App 端），全套餐浏览器侧均受 Widevine L3 限制
- 公开边界：保存内容须在有效订阅期内、符合 Disney+ 使用条款与版权法

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)
