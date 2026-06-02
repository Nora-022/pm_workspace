# Hulu — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 检测模式：**netflix_mode**
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/10_detection_modes.md`](../_common/10_detection_modes.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 双地区双站点 | 单插件同时覆盖 `hulu.com`（美国）+ `hulu.jp`（日本），但两站点内容库与套餐独立 | requirements/site_research_notes.md |
| 价格与权益 | 1M $59.99 / Lifetime $109.99；Trial 3 次 / Premium 每日 100 | requirements/plugin_requirement.md § 价格与权益 |
| 视频画质 | 最高 1080p / 4K（产品页口径） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 视频编码 | H.264 / H.265 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 音频 | **EAC3 5.1**（产品页明确口径，与多数 netflix_mode 插件不同） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 输出格式 | MP4 / MKV | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Playlist 结构 | Season / Episode 树 + **字幕版 / 配音版分流**（同一 Episode 有 subtitled / dubbed / extras / bonus / trailers 多变体） | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| 配额扣减 | **每个分流变体独立扣点**（subtitled / dubbed / bonus / extras / trailers 选中即各算 1） | requirements/plugin_requirement.md § 价格与权益 |
| 平台支持 | 当前发布 Windows；macOS 已声明但未交付 | requirements/plugin_requirement.md § 平台支持 |
| 跳转链接 slug | `hulu-downloader` | requirements/plugin_requirement.md § 跳转链接 |
| 内容边界 | hulu.com 含 location-sensitive / live-TV / service-bundle 限制；hulu.jp 含 TVOD / store-related 内容；区域差异影响可解析范围 | requirements/site_research_notes.md |
| metadata 保留 | `title` / `season` / `episode` / `cast` / `poster` 供 Plex / Kodi / PlayerFab 下游使用 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 右侧面板配置项 | 当前仅暴露 Video Quality（不含 codec / audio / subtitle 配置项） | requirements/plugin_ui_requirement.md |
| Playlist 选集弹窗 | Season / Episode 之外有版本（字幕 / 配音 / 花絮）选择层 | requirements/plugin_ui_requirement.md |

---

## 关键事实

- 产品页：`https://streamfab.com/hulu-downloader.htm`
- 站点：`hulu.com`（美国）+ `hulu.jp`（日本）
- 视频画质上限：1080p / 4K
- 编码：H.264 / H.265
- 音频：EAC3 5.1
- 输出格式：MP4 / MKV
- 内容结构：Season / Episode + 字幕版 / 配音版 / Extras / Bonus / Trailers
- region-agnostic：用户有权限的任意区域内容
- 上线状态：**待研发**

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)
