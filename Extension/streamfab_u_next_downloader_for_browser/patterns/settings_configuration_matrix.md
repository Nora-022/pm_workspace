# U-NEXT Settings Configuration Matrix

适用范围：`streamfab_u_next_downloader_for_browser`

## 总体原则
- 下载区域配置项：仅记录 U-NEXT 已确认的 `meta` 返回能力。
- Dashboard 的 Settings：承载通用策略配置（非 meta）。
- Setting 结构默认保持两层：`Extension` + `CoApp`。
- 客户端路径先按基线记录：
  - `VIP Services -> Preferred Settings`
  - `VIP Services -> Preferred Settings - U-NEXT`

## A. 视频下载区域配置（In-Card Config）

以下配置项用于记录 U-NEXT 插件视频下载区域配置矩阵，具体字段待确认：

1. Resolution
- 是否展示分辨率 / 码率 / 文件大小组合，待确认

2. Video Codec
- 候选项待确认

3. Audio Codec
- 候选项待确认

4. Language
- 是否由 meta 驱动，待确认

5. Subtitles
- 字幕轨道能力与输出方式待确认

## B. Dashboard Settings（通用配置，非 meta）

### 配置项顺序（U-NEXT）
1. Language
2. Video Format
3. Video Codec
4. H264 Profile
5. Video Resolution
6. Audio Codec
7. Pre-select Audio Language
8. Audio Channel
9. Pre-select Subtitle Language
10. Subtitle Action

## D. 插件差异说明（vs ytdlp）
- `Audio Quality` 是否保留，待确认。
- 剧集层级、默认选中项、内容卡展示结构待确认。

## E. 联动边界
- 业务配额规则：见 `06_business_rules.md`。
- 前置条件（U-NEXT 站点 / 登录 / 播放）：见 `04_interaction_details.md`。
- Setting 生效范围：待确认。
