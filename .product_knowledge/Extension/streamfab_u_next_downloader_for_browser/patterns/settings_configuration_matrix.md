# Settings Configuration Matrix — StreamFab U-NEXT Downloader for Browser

## A. 视频下载区配置（In-Card Config）

发起下载时展示，由 CoApp 分析结果驱动：

| 配置项 | 说明 |
|---|---|
| Resolution | 分辨率 / 码率组合 |
| Language | 音轨语言 + 视频编码 |

适用场景：电影 / 剧集（单集 / 批量），无差异。

## B. Dashboard Settings 配置项（按顺序）

| 序号 | 配置项 | 附属子项 |
|---|---|---|
| 1 | Language | — |
| 2 | Video Format | — |
| 3 | Video Resolution | — |
| 4 | Pre-select Audio Language | Pre-select Description Audio |
| 5 | Audio Channel | Pre-select both 5.1 and 2.0 |
| 6 | Pre-select Subtitle Language | Always download forced subtitle |
| 7 | Subtitle Action | — |

## C. 与 Netflix 插件的差异

| 项目 | Netflix | U-NEXT |
|---|---|---|
| Video Codec | 有 | 无 |
| H264 Profile | 有 | 无 |
| Audio Codec | 有 | 无 |
| 其余配置项 | 一致 | 一致 |

U-NEXT 使用 common 配置，无差异化 Setting 项。
