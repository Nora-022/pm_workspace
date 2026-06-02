# U-NEXT — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 检测模式：**netflix_mode**
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/10_detection_modes.md`](../_common/10_detection_modes.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 双站点支持 | 单插件同时覆盖 U-NEXT（`video.unext.jp` / `u-next.com`）+ H-NEXT（`h-next.com`，成人内容附属订阅）；同一插件同一 CoApp 处理两站 | requirements/plugin_requirement.md § 网站信息 |
| 价格与权益 | 1M $59.99 / Lifetime $109.99（无 1Y 年付）；Trial 3 次 / **Premium 每日 100 + 每周 700**（产品页合规文案明确） | requirements/plugin_requirement.md § 价格与权益 |
| 视频画质 | 最高 4K（CoApp 分析结果决定）；Settings 预设上限 1080p | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 视频编码 | H.264 / H.265（无 VP9 / AV1） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 音频 | EAC3 5.1 / AAC 2.0（无 Atmos） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 地区 | 日本（站点 `.jp`） | requirements/site_research_notes.md |
| 跳转链接 slug | **`unext`**（无连字符，U-NEXT 命名例外，详见 `_common/FRAMEWORK.md` 命名规则节） | requirements/plugin_requirement.md § 跳转链接 |
| app id | `streamfab_for_browser_u-next`（service_name 含连字符，是 U-NEXT 例外保留连字符） | requirements/plugin_requirement.md § 产品信息 |
| pid | 659（Win）/ 1659（Mac） | requirements/plugin_requirement.md § 产品信息 |
| Banner 文案 | 强调 4K + EAC3 5.1 + 双站点（U-NEXT / H-NEXT） | requirements/plugin_requirement.md § Dashboard - Banner 文案 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 站点切换 / 识别 | 在 U-NEXT 与 H-NEXT 间切换不需要切换插件，同一 Detected 区域累计两站结果 | requirements/plugin_ui_requirement.md |
| License Info 文案 | 同时体现 U-NEXT + H-NEXT 双站点能力 | requirements/plugin_ui_requirement.md |

---

## 关键事实

- 产品页：`https://streamfab.com/unext-downloader.htm`
- 站点：`video.unext.jp` / `u-next.com` / `h-next.com`
- 视频画质上限：4K（站点级），Settings 预设 1080P
- 编码：`H.264` / `H.265`；不含 VP9 / AV1
- 音频：`EAC3 5.1` / `AAC 2.0`；无 Atmos
- 字幕：外部 SRT 或内嵌
- 输出格式：`MP4` / `MKV`
- 上线状态：**集成中**

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)
