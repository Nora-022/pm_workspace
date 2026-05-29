# Netflix — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 详细规格见引用的具体文档章节。
> 检测模式：**netflix_mode**（基线本身的活样例）
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 价格与权益 | Trial 3 次（标准 netflix_mode）/ Premium 每日 100 / 1M $54.99 / 1Y $79.99 / Lifetime $99.99 | requirements/plugin_requirement.md § 价格与权益 |
| 视频下载配置参数 | 完整字段集：`Video Codec` / `Resolution` / `Audio Codec` / `Language` / `Subtitles`；Codec 6 种（`H264 High` / `H264 Main` / `H265 HDR10` / `H265 Dolby Vision` / `VP9` / `AV1`） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Codec 切换行为 | 切换 `Video Codec` 触发 CoApp 重新分析，带独立加载态；切换中跳到新视频则取消并回退最近稳定结果 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Playlist 结构 | Season → Episode 层级保真，即使只有一季也保留；默认选中 `S1 / E1`；Episode 仅展示时长，不展示文件大小；Downloads 按 Season 维度分卡片 | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| Banner 文案 | Netflix 专属，强调 `1080P with HDR and Dolby Vision`、`Atmos / EAC3 5.1` | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| Setting Extension 配置项 | 在通用 7 项外有 `Video Codec`、`H264 Profile`；默认值约束：`Always download the forced subtitle` 选中 / `Pre-select Description Audio if available` 不选 / `Pre-select both 5.1 and 2.0 audios` 不选 | requirements/plugin_requirement.md § Setting Extension 配置项 |
| 跳转链接 | 主站 slug `netflix-downloader`；What's New 链接同名 | requirements/plugin_requirement.md § 跳转链接 |
| 站点专属错误码 | **Error 330**：最近两个月缓存 key 视频对 Trial 用户受限。固定文案走多语言包，**失败不扣次**，不再额外弹"最近两个月限制下载"旧阻断弹窗 | requirements/plugin_requirement.md § Error Codes |
| HDR / Dolby Vision 限制 | HDR 与 Dolby Vision 内容仅限 Netflix premium package 订阅者访问（站点限制，非插件限制） | requirements/site_research_notes.md |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 商店配图 | License Info banner 使用 Netflix 1080P + HDR + Dolby Vision 文案 | requirements/plugin_ui_requirement.md |
| 用户授权信息模块 | 订阅类型展示 `LeftTime / Annual / Fab365` | requirements/plugin_ui_requirement.md |

---

## 关键事实（来自产品页 + 站点调研）

- 产品页：`https://streamfab.dvdfab.cn/netflix-downloader.htm`
- 视频画质上限：`1080P`（受 Widevine L3 浏览器降级限制）
- 支持编码：`H264` / `H265 (HDR10 / Dolby Vision only)` / `VP9` / `AV1`
- 音频：`Atmos` / `EAC3 5.1` / `AAC 2.0`
- 字幕：多语言 SRT，可外挂或封装
- 输出格式：`MP4` / `MKV`
- 公开边界：保存内容须在有效订阅期内，符合 Netflix 使用条款与版权法

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)
