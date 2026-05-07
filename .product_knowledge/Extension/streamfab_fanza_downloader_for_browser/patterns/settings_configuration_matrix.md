# Fanza Settings Configuration Matrix

适用范围：`streamfab_fanza_downloader_for_browser`

## 总体原则
- 下载区域配置项：只展示 `meta` 返回能力。
- Dashboard 的 Settings：承载通用策略配置（非 meta）。
- Setting 结构保持两层：`Extension` + `CoApp`。
- 客户端路径：
  - `VIP Services -> Preferred Settings`
  - `VIP Services -> Preferred Settings - Fanza`

## A. 视频下载区域配置（In-Card Config）

配置项只有 **1 项 Video**，该项是视频质量的总括，选项由"画质等级"与"技术规格"组成。

### 选项格式

**画质等级格式**（无显式帧率）：
- 高画質(576p)
- 中画質(432p)
- 中画質(288p)
- 低画質(144p)

**技术规格格式**（含分辨率，部分含帧率）：
- 4K (2160p60)
- FullHD (1080p60)
- HD (720p60)

### 下载任务状态展示规则

| 任务状态 | 展示内容 |
|---|---|
| 待下载（Pending） | Video 所选项（完整显示） |
| 排队中 / 下载中 / 下载失败 | 仅展示分辨率（不展示画质等级、帧率） |
| 下载完成（Downloaded） | 分辨率 + 音频编码 |

## B. Dashboard Settings — Extension 配置项

Extension 共 **7 项**（通用结构，FANZA 无单独差异化配置项）：

1. Language
   - Same as UI Language
   - 其他语言复用客户端 27 个选项

2. Video Format
   - MP4
   - MKV (FFmpeg)
   - MKV (MKVToolNix)

3. Video Resolution
   - Full HD - 1080p
   - HD - 720p

4. Pre-select Audio Language
   - Same as UI Language
   - 其他语言复用客户端 27 个选项
   - Pre-select Description Audio if available（默认不选）

5. Audio Channel
   - Stereo (AAC)
   - Multi-Channel 5.1 (EAC3 / AC3)
   - Pre-select both 5.1 and 2.0 audios（默认不选）

6. Pre-select Subtitle Language
   - None
   - Same as UI Language
   - 其他语言复用客户端 27 个选项
   - Always download the forced subtitle（默认选中）

7. Subtitle Action
   - Remux Into File
   - Extract to SRT File
   - Extract Original Format

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

## D. 与 ytdlp 差异说明

- 下载配置：FANZA 只有 1 项 Video（FANZA 原生画质标签），ytdlp 为多项 meta 驱动配置
- Extension Setting：FANZA 与通用 7 项结构一致，无单独差异化配置项
- 剧集弹窗新增 Season 层级，默认 S1E1，剧集项仅显示时长

## E. 联动边界
- 业务配额规则：见 `06_business_rules.md`
- 前置条件（Fanza 站点/登录/播放）：见 `04_interaction_details.md`
- Setting 生效范围：仅对新创建任务生效
