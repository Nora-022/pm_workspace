# Settings Configuration Matrix

> 从 `requirements/plugin_requirement.md`、`04_interaction_details.md` 提炼。不在此引入新事实。

## Meta 分析下载配置项

| 字段 | 选项格式 | 备注 |
|---|---|---|
| Resolution | `{宽}x{高} - {码率} kbps - {文件大小}`，例 `1280x528 - 1158 kbps - 439.65 MB` | TV 类后续剧集可能不存在的分辨率以 `1920x1080 if available` 标注 |
| Audio Codec | `EAC3` / `AAC` | **非独立配置项**，是音轨筛选器；切换会联动影响 Language 选项 |
| Language | `{音频描述} {编码} {声道} - {码率} kbps`，例 `Deutsch EAC3 5.1 - 640 kbps` | 受当前 Audio Codec 选择联动 |
| Subtitle | `None` / `{语言} CC`，例 `English CC` | — |

## 下载进度展示标签

| 字段 | 来源 | 备注 |
|---|---|---|
| 任务标签 | 分辨率 / 视频 codec / 音频 codec | 三类标签固定展示 |
| 速度 | CoApp 实时上报 | — |
| 进度 | CoApp 实时上报 | — |
| 剩余时间 | 插件按速度 + 总大小推算 | — |
| 分片进度 | CoApp 上报 | 不可获取文件大小时退化为 `0 / 0 Segments` |

## Setting → Extension（按顺序）

| # | 字段 | 选项 | 子选项 |
|---|---|---|---|
| 1 | Language | `Same as UI Language` + 客户端 27 个语言 | — |
| 2 | Video Format | `MP4` / `MKV (FFmpeg)` / `MKV (MKVToolNix)` | — |
| 3 | Video Resolution | `Full HD - 1080p` / `HD - 720p` | — |
| 4 | Pre-select Audio Language | `Same as UI Language` + 客户端 27 个语言 | `Pre-select Description Audio if available`（默认不选） |
| 5 | Audio Channel | `Stereo (AAC)` / `Multi-Channel 5.1 (EAC3 / AC3)` | `Pre-select both 5.1 and 2.0 audios`（默认不选） |
| 6 | Pre-select Subtitle Language | `None` / `Same as UI Language` + 客户端 27 个语言 | `Always download the forced subtitle`（默认选中） |
| 7 | Subtitle Action | `Remux Into File` / `Extract to SRT File` / `Extract Original Format` | — |

## Fandango at Home 差异化追加项（追加在 #7 之后）

| # | 字段 | 选项 |
|---|---|---|
| 8 | Video Codec | `H264` / `H265 - SDR` / `HDR10` / `Dolby Vision` |
| 9 | Audio Codec | `EAC3` / `AAC` |

## 与 Netflix 基线插件的差异

- `Video Codec` 选项 —— Fandango at Home 追加，Netflix 基线无
- `Audio Codec` 选项 —— Fandango at Home 追加，Netflix 基线无
- Meta 分析配置项 Audio Codec 作为音轨筛选器联动 Language —— 这是 Fandango at Home 特有的联动逻辑，Netflix 基线无
- 其他 Setting → Extension 项目与 Netflix 1:1 共享
