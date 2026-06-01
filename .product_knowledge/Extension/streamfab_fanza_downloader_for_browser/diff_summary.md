# FANZA — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 检测模式：**netflix_mode**
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 价格与权益 | **仅 Lifetime $69.99**（无 1M / 1Y 月年付）；Trial 3 次 / Premium 每日 100 | requirements/plugin_requirement.md § 价格与权益 |
| 平台支持 | **仅 Windows 10/11**；macOS 当前不支持（提示不可用） | requirements/plugin_requirement.md § 平台支持 |
| 视频画质 | 4K / 1080p，DRM 下载（产品定义范围内） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 音频 | AAC 2.0（无 EAC3 5.1，无 Atmos） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 视频下载配置参数 | **仅 1 项 `Video`**（FANZA 原生画质标签，CoApp 分析结果驱动）；无 Codec / Audio / Subtitle 配置项 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| Setting Extension 配置项 | 沿用通用 7 项，**无 FANZA 独有配置项** | requirements/plugin_requirement.md § Setting Extension 配置项 |
| 地区 | 日本 | requirements/site_research_notes.md |
| 跳转链接 slug | `fanza` | requirements/plugin_requirement.md § 跳转链接 |
| 内容边界 | 成人内容，不在 Always Free / 浏览器无 CoApp 路径放行 | requirements/site_research_notes.md |
| Banner 文案 | 4K / 1080p / High-speed batch / Lossless audio AAC 2.0 | requirements/plugin_requirement.md § Dashboard - Banner 文案 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| macOS 入口提示 | 当前显示不可用（macOS 未支持） | requirements/plugin_ui_requirement.md |
| 下载卡片配置区 | 极简，仅 1 项 Video（基线 Netflix 是 5 项） | requirements/plugin_ui_requirement.md |

---

## 关键事实

- 站点：`fanza.com`（日本，成人内容平台）
- 内容类型：含 VR、流媒体、Members、Doujin、电子书等多子内容（插件聚焦视频）
- 视频画质上限：4K / 1080p
- 音频：AAC 2.0
- 输出格式：MP4 / MKV
- 字幕：外部 SRT 或内嵌
- 上线状态：**集成中**
- 平台：仅 Windows（macOS 待规划）
- 价格唯一档：Lifetime $69.99

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)
