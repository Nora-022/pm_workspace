# 配置项矩阵

## 下载区配置（由 CoApp 分析结果驱动）

| 配置项 | 选项说明 | 备注 |
|---|---|---|
| Resolution | width × height-bitrate | 来自 analyze_result |
| Language | Language + video codec | 来自 analyze_result |
| Subtitles | None / English | 来自 analyze_result |

规则：
- 空列表或无效字段对应控件隐藏，不灰显占位
- 配置项在分析完成前不展示

## Dashboard Setting - Extension 配置项

| 顺序 | 配置项 |
|---|---|
| 1 | Language |
| 2 | Video Format |
| 3 | Video Resolution |
| 4 | Pre-select Audio Language |
| 5 | Audio Channel |
| 6 | Pre-select Subtitle Language |
| 7 | Subtitle Action |

## 与 Netflix 的差异

Netflix Setting - Extension 有以下配置项，M3U8 **没有**：

- Video Codec
- H264 Profile
- Audio Codec

原因：M3U8 的编码信息由 CoApp 分析结果决定，不在 Setting 层面提供全局预设。
