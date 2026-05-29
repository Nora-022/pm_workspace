# Amazon — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 详细规格见引用的具体文档章节。
> 检测模式：**netflix_mode**（标准 netflix_mode，无变体）
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 价格与权益 | Trial 3 次（标准 netflix_mode）/ Premium 每日 100 / 1M $54.99 / 1Y $79.99 / Lifetime $99.99（与基线一致，无独有套餐） | requirements/plugin_requirement.md § 价格与权益 |
| 视频下载配置参数 | 独有完整字段集：`Mode` / `Video Codec` / `Bitrate Adaption` / `Resolution` / `Audio Codec` / `Language` / `Subtitle` / `Subtitle Action`；Codec 仅 `H264` / `H265`（无 HDR / Dolby Vision / VP9 / AV1） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Mode 维度 | 独有 `Full Download` / `Audio Only` / `Subtitle Only`；切换 Audio Only 仅保留 `Audio Codec` + `Language`；切换 Subtitle Only 仅保留 `Subtitle` + `Subtitle Action`；其他字段置灰不删除 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Bitrate Adaption | 独有 `CVBR` / `CBR`（默认 CVBR）；当前 codec 下无可用 CBR 流时隐藏 CBR 选项；不支持 setting 预设 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Codec 切换行为 | 切换 `Video Codec` 触发 CoApp 重新分析（独立加载态），刷新 `Resolution` 和 `Language` 候选；切换中跳到新视频则结果以新分析为准 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Audio Codec / Language 联动 | `Audio Codec → Language` 单向联动；Language 展示格式 `Language + Track Type + Audio Codec + Audio Bitrate`（如 `English Dialogue Boost: High EAC3 5.1 - 640 kbps`）；无 Track Type 时降为 `Language + Audio Codec + Audio Bitrate` | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 音轨 Track Type | 独有 `Audio Description` 和 `Dialogue Boost`（含 High / Medium / Low 强度）；同时开启 Description Audio + Dialogue Boost 时默认选中 3 个音轨（主 + 描述 + 对话增强） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Subtitle Action 选项 | 独有 `Remux Into File (SRT)` / `Extract to SRT File` / `Extract Original Format` 三选项；Subtitle 与 Subtitle Action 是逻辑组，不合并为单下拉 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Playlist 内容结构 | 独有 `Main Movie` / `Bonus / Extras` / `Trailers`（Movie 场景）与 `Season / Episode / Bonus / Extras / Trailers`（TV 场景）；默认只展开第一组树结构，其余折叠；主视频与 Extras 在 Downloads 中独立任务展示，不保留树层级 | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| Playlist 首集分析限制 | 独有限制：Playlist 仅分析第一集，后续剧集 codec / bitrate / resolution 可能不同；插件用非阻断常驻提示，不弹阻断 modal | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| H265 + CBR 兼容性提示 | 独有常驻提示文案（位于 `Bitrate Adaption` 右侧）：EN `If CBR isn't available for this episode, we'll still try other episodes in CBR.` / ZH `如果本集没有 CBR 格式，我们仍会尝试下载其他集的 CBR 格式。` | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Resolution fallback | `Codec + Bitrate` 不可用时，Resolution 走固定列表：`Best Quality` / `1920x1080 if available` / `1280x720 if available` / `960x540 if available` / `640x480 if available`，选中项由 setting 预设决定 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 分析阶段反馈 | 比基线多一段 `分析中` 阶段（区别于 `检测中`），分析进度由 CoApp 实际接口驱动，不模拟假状态；分析失败有 toast / 空态两条分支 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 分析失败文案 | 独有：EN `Analysis Failed. Please retry or contact us for help.` / ZH `分析失败，请重试或联系我们获得帮助。`；提供 Contact us 链接 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 下载进度展示 | `Mode = Audio Only / Subtitle Only` 时，待下载 / 排队 / 下载中 / 下载成功**均不展示分辨率**，只展示 `Audio Only` 或 `Subtitle Only` | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| Banner 文案 | Amazon 专属，强调 `1080p` + `MP4 / MKV` + `AAC 2.0 / EAC3 5.1`，不写 4K / HDR / Dolby Vision | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| Setting Extension 配置项 | 通用 7 项基础上：新增 `Video Codec`、`Pre-Select Dialogue Boost Audio`（含 `Dialogue boost audio only` / `Normal and dialogue boost audio` / `Dialogue Boost: High / Medium / Low`）、`Pre-select Description Audio`；明确**去掉** `Amazon Prime Video Region` | requirements/plugin_requirement.md § Setting Extension 配置项 |
| 跳转链接 | 主站 slug `amazon-downloader`；What's New 链接同名（`streamfab-for-browser-new.htm?pid=amazon-downloader`） | requirements/plugin_requirement.md § 跳转链接 |
| 权益类型识别 | 独有多权益并存：`Prime included` / `Rent` / `Buy` / `Channel entitlement`（如 Paramount+ / Showtime）/ `Free with Ads` / 区域或设备限制；不同状态走不同阻断与文案，不合并为统一"不可下载" | requirements/plugin_requirement.md § 价格与权益 |
| 不支持内容边界 | `Sports` / `Live TV` 站内可见但不进入正常下载链路，识别后明确反馈不支持，不静默失败 | requirements/plugin_requirement.md § 价格与权益 |
| 画质上限限制 | 浏览器 Widevine L3 限制下最高 `1080p`；4K / HDR / HDR10+ / Dolby Vision 仅专用 App（Fire TV / Windows App）可达，本插件不承载 | requirements/site_research_notes.md |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 商店配图 | License Info banner 使用 Amazon `1080p` + `EAC3 5.1 / AAC 2.0` 文案；第 3 张体现画质相关配置；浏览器背景截图替换为 Prime Video 页面；不使用 Sports / Live 相关素材 | requirements/plugin_ui_requirement.md |
| Detected 配置区结构 | 字段密度高于基线：需容纳 `Mode` / `Bitrate Adaption` 等独有字段，允许置灰态展示、字段下方附备注、`Bitrate Adaption` 右侧容纳 playlist 兼容提示 | requirements/plugin_ui_requirement.md |
| Playlist 弹窗 | 不新增壳层，但内容结构容纳 Main Movie / Extras / Trailers / Season / Episode 多类型并存 | requirements/plugin_ui_requirement.md |

---

## 关键事实（来自产品页 + 站点调研）

- 产品页：`https://streamfab.dvdfab.cn/amazon-downloader.htm`
- 目标站点：`https://www.primevideo.com/`
- Chrome 扩展 ID：`hklfhiaihmmnodbbckgcleegglapjlfk`（已发布）
- 视频画质上限：`1080p`（Widevine L3 浏览器降级限制）
- 支持编码：`H.264` / `H.265`
- 音频：`EAC3 5.1` / `AAC 2.0`（不含 Atmos / EAC3 JOC，浏览器侧无）
- 字幕：TTML / IMSC1 → 多语言 SRT，可外挂或封装（`Remux Into File` / `Extract to SRT` / `Extract Original Format`）
- 输出格式：`MP4` / `MKV`（另可导出 `MP3` 音频）
- 流媒体协议：MPEG-DASH（主）+ HLS（少数 Safari / iOS 路径），CMAF 封装
- DRM：浏览器走 Widevine（L3）；PlayReady SL3000 / FairPlay 仅专用 App 路径
- CDN：Akamai（主）+ Amazon CloudFront（备）
- 公开边界：仅处理用户有权限观看的 Amazon 内容（Prime / Rent / Buy / Channel 实际授权）；地区差异显著（US / UK / JP 内容库与字幕格式独立）
- 站内特殊形态：`Sports` / `Live TV` 不进入下载链路，仅作识别

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)
