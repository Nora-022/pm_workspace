# OnlyFans Settings Configuration Matrix

## 总体原则
- 下载卡片配置项：仅 Video，取决于当前视频 meta 分析结果。
- Dashboard Settings：承载通用策略配置（非 meta）。
- Setting 结构：Extension + CoApp 两 tab，结构不变。
- 除本文档列出的差异外，其余逻辑均参照 Netflix 插件。

---

## A. 视频下载卡片配置（In-Card Config）

OnlyFans 下载卡片**仅有 Video 一项**，与 Netflix 差异显著：

| 配置项 | 选项 | 说明 |
|---|---|---|
| Video | Original / 720p / 480p | 候选项由当前视频 meta 分析结果决定 |

> Netflix 卡片有 Resolution / Video Codec / Audio Codec / Language / Subtitles 共 5 项；OnlyFans 只有 Video 1 项。

---

## B. Dashboard Settings - Extension Tab

变更后配置项（按顺序）：

1. **Language**
   - Same as UI Language
   - 其他语言：复用客户端 27 个选项

2. **Video Format**
   - MP4
   - MKV (FFmpeg)
   - MKV (MKVToolNix)

3. **Video Resolution**
   - Full HD - 1080p
   - HD - 720p

4. **Pre-select Audio Language**
   - Same as UI Language
   - 其他语言：复用客户端 27 个选项
   - `Pre-select Description Audio if available`：默认不选

5. **Audio Channel**
   - Stereo (AAC)
   - Multi-Channel 5.1 (EAC3 / AC3)
   - `Pre-select both 5.1 and 2.0 audios`：默认不选

6. **Pre-select Subtitle Language**
   - None
   - Same as UI Language
   - 其他语言：复用客户端 27 个选项
   - `Always download the forced subtitle`：默认选中

7. **Subtitle Action**
   - Remux Into File
   - Extract to SRT File
   - Extract Original Format

---

## C. 与 Netflix 配置项差异（Dashboard Settings）

| 配置项 | Netflix | OnlyFans | 说明 |
|---|---|---|---|
| Video Codec | ✅ H264 / H265 / VP9 / AV1 | ❌ 无 | OnlyFans 不做 Codec 选择 |
| H264 Profile | ✅ High / Main | ❌ 无 | 同上 |
| Video Resolution | ✅ 1080p / 720p | ✅ 1080p / 720p | 一致 |
| Audio Codec | ✅ Atmos / EAC3 / AAC | ❌ 无 | OnlyFans 不做 Audio Codec 选择 |
| Pre-select Audio Language | ✅ | ✅ | 一致 |
| Audio Channel | ✅ | ✅ | 一致 |
| Pre-select Subtitle Language | ✅（无 None 选项） | ✅（有 None 选项） | OnlyFans 多一个 None |
| Subtitle Action | ✅ | ✅ | 一致 |

---

## D. 联动边界
- 业务配额规则：见 `06_business_rules.md`
- 前置条件（OnlyFans 站点 / 登录 / 播放）：见 `04_interaction_details.md`
- Setting 生效范围：仅对新创建任务生效
