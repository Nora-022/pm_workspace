# Netflix Settings Configuration Matrix

适用范围：`streamfab_netflix_downloader_for_browser`

## 总体原则
- 下载区域配置项：只展示 `meta` 返回能力。
- Dashboard 的 Settings：承载通用策略配置（非 meta）。
- Setting 结构保持两层：`Extension` + `CoApp`。
- 客户端路径：
  - `VIP Services -> Preferred Settings`
  - `VIP Services -> Preferred Settings - Netflix`

## A. 视频下载区域配置（In-Card Config）

以下 5 项共同构成 Netflix 插件视频下载区域配置，且必须由 `meta` 驱动：

1. Resolution
- 结构：`[分辨率] - [视频码率] - [预估文件大小]`
- 示例：`1920x1080 - 2387 kbps - 790.54 MB`
- 说明：候选项完全来自当前视频 meta。

2. Video Codec
- 说明：下载区域展示形态可包含 profile（如 `H264 - High Profile`）。
- 候选项由 meta 返回。

3. Audio Codec
- 候选项由 meta 返回。

4. Language
- 含义：音轨语言选择（Audio Language）。
- 说明：语言列表由 meta 返回。

5. Subtitles
- 含义：字幕轨道选择（Subtitle Tracks）。
- 说明：字幕列表由 meta 返回。

## B. Dashboard Settings（通用配置，非 meta）

### 变更后的配置项顺序（Netflix）
1. Language
2. Video Format
- `MP4`
- `MKV (FFmpeg)`
- `MKV (MKVToolNix)`

3. Video Codec
- `H264`
- `H265 - HDR10`
- `H265 - Dolby Vision`
- `VP9`
- `AV1`

4. H264 Profile
- `High`
- `Main`
- 展示规则：在下载配置下拉可组合为 `H264 - High Profile` / `H264 - Main Profile`

5. Video Resolution
- `Full HD - 1080p`
- `HD - 720p`

6. Audio Codec
- `Atmos`
- `EAC3`
- `AAC`

7. Pre-select Audio Language
- `Same as UI Language`
- 其它语言：复用客户端语言选项
- `Pre-select Description Audio if available`：默认不选

8. Audio Channel
- `Stereo (AAC)`
- `Multi-Channel 5.1 (EAC3 / AC3)`
- `Pre-select both 5.1 and 2.0 audios`：默认不选

9. Pre-select Subtitle Language
- `Same as UI Language`
- 其它语言：复用客户端语言选项
- `Always download the forced subtitle`：默认选中

10. Subtitle Action
- `Remux Into File`
- `Extract to SRT File`
- `Extract Original Format`

## C. 具体语言选项（客户端复用）
- `Same as UI Language`
- `(المملكة العربية السعودية)العربية`
- `Български`
- `Català(Espanya)`
- `简体中文`
- `繁體中文`
- `Čeština`
- `Dansk`
- `Nederlands(Nederland)`
- `Nederlands(Belgian)`
- `English (United States)`
- `Suomi`
- `Français`
- `Deutsch`
- `Eλληνικά`
- `Hrvatski(Hrvatska)`
- `Magyar`
- `Italiano(Italia)`
- `日本語`
- `한국어`
- `Norsk`
- `Polski(Polska)`
- `Português(Brasil)`
- `Português(Portugal)`
- `Romanian`
- `Pусский`
- `Slovenčina`
- `Español`
- `Svenska`
- `Türkçe`

## D. 插件差异说明（vs ytdlp）
- `Audio Quality`：在 Netflix 插件中移除。
- 剧集弹窗新增 Season 层级，默认 S1E1，剧集项仅显示时长。

## E. 联动边界
- 业务配额规则：见 `06_business_rules.md`。
- 前置条件（Netflix 站点/登录/播放）：见 `04_interaction_details.md`。
- Setting 生效范围：仅对新创建任务生效。
