# OnlyFans — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 详细规格见引用的具体文档章节。
> 检测模式：**netflix_mode**（标准 netflix_mode，无变体）
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/10_detection_modes.md`](../_common/10_detection_modes.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 内容类型与覆盖范围 | 同时覆盖 **Message videos**（私信付费解锁，权限隔离更严）与 **DRM video**（创作者级 DRM 开关），以及普通 Post 视频；按创作者订阅而非平台统一订阅 | requirements/plugin_requirement.md § 网站信息 |
| 价格与权益 | Trial 3 次（标准 netflix_mode）/ Premium 每日 100、每周 700 / 售价 $54.99；无特殊套餐 | requirements/plugin_requirement.md § 价格与权益 |
| 视频下载配置参数 | 下载卡片**仅 1 项 Video**（候选 `Original` / `720p` / `480p`，由 meta 驱动）；无 Codec / Audio / Language / Subtitle 配置项 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 下载进度显示 | 展示分辨率标签、codec 标签、速度、进度、文件大小；**不展示剩余时间** | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| 内容结构 | UGC 单视频，**无 Season / Episode 层级**，无剧集分组弹窗；Downloads 按单视频维度分卡片 | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| 定时 / 自动下载 | 站点专属：支持按天 / 按周自动下载新内容（其他 netflix_mode 插件未明确该能力） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Banner 文案 | OnlyFans 专属：强调 `Creator Videos` / `1080p` / `clean AAC audio`；不提 HDR / Dolby Vision / 多 Codec | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| Setting Extension 配置项 | 相对 Netflix 删去 `Video Codec`、`H264 Profile`、`Audio Codec`；`Pre-select Subtitle Language` 多一个 `None` 选项；默认值：`Always download the forced subtitle` 选中 / `Pre-select Description Audio if available` 不选 / `Pre-select both 5.1 and 2.0 audios` 不选 | requirements/plugin_requirement.md § Setting Extension 配置项 |
| 跳转链接 | 主站 slug `onlyfans-downloader`；What's New 链接同名 | requirements/plugin_requirement.md § 跳转链接 |
| 平台支持 | Windows 11 / 10 已支持；**macOS 计划支持，当前版本暂只做 Windows** | requirements/plugin_requirement.md § 安装器 |
| 站点专属约束 | DRM 为创作者级开关（非全站强制）；Token 短有效期 + 频繁轮换，需 CoApp 实时跟踪；Message videos 的 license 路径与 Post 视频不同，需单独处理 | requirements/site_research_notes.md |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 商店配图 | License Info banner 使用 OnlyFans `Creator Videos, Downloaded Simply.` / `Enjoy OnlyFans offline in up to 1080p with clean AAC audio` 文案 | requirements/plugin_ui_requirement.md |

---

## 关键事实（来自产品页 + 站点调研）

- 产品页：`https://streamfab.dvdfab.cn/onlyfans-downloader.htm`
- 视频画质上限：`1080P`（平台侧实际上限，浏览器 Widevine L3 下 OnlyFans 允许到 1080p，与 Netflix L3 限 720p 不同）
- 支持编码：`H.264`（主流），部分内容支持更新编码
- 音频：`AAC 2.0`（官网确认）/ `EAC3 5.1`（Setting 候选）
- 流媒体协议：HLS（M3U8）为主，分片 fMP4 / CMAF；部分场景并行 MPEG-DASH
- DRM：Widevine（Chrome/Firefox L3）/ PlayReady（Edge/Windows）/ FairPlay（Safari）；CENC 加密
- 输出格式：`MP4` / `MKV (FFmpeg)` / `MKV (MKVToolNix)`
- 订阅模型：**创作者级订阅**（无平台统一会员），按订阅 / 单次购买 / Tips 解锁
- 公开边界：保存内容须在有效订阅 / 购买期内，符合 OnlyFans 使用条款与版权法

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)
