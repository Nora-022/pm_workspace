# 配置项矩阵（patterns/settings_configuration_matrix）

## 下载区配置项（动态生成）

由 CoApp 分析结果动态生成，不固定枚举。

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution | `width x height - {bitrate} kbps` | `1280x720 - 2338 kbps` |
| Language | `{语言} {音频编码}` | `English AAC` |
| Subtitles | meta 返回值 | `None` / `English` |

## Setting 配置项（通用，与 Netflix 一致）

Setting 结构分为 Extension 和 CoApp 两栏。配置项无差异化，按顺序复用通用：

| 顺序 | 配置项 | 选项 |
|---|---|---|
| 1 | Language | Same as UI Language / 客户端 27 个语言选项 |
| 2 | Video Format | MP4 / MKV (FFmpeg) / MKV (MKVToolNix) |
| 3 | Video Resolution | Full HD - 1080p / HD - 720p |
| 4 | Pre-select Audio Language | Same as UI Language / 客户端 27 个语言选项；子选项 Pre-select Description Audio if available（默认不选）|
| 5 | Audio Channel | Stereo (AAC) / Multi-Channel 5.1 (EAC3 / AC3)；子选项 Pre-select both 5.1 and 2.0 audios（默认不选）|
| 6 | Pre-select Subtitle Language | None / Same as UI Language / 客户端 27 个语言选项；子选项 Always download the forced subtitle（默认选中）|
| 7 | Subtitle Action | Remux Into File / Extract to SRT File / Extract Original Format |

## 与 Netflix 基线的差异

无 Setting 差异。仅产品名标识替换为 DRM MPD。
