# [StreamFab 浏览器插件] - [Amazon] - 需求文档

- 原型链接：
- 需求地址：https://i6a1sqw3p2.feishu.cn/docx/HeUPdODCLobIV8xVZwncqK1pnSe
- UI 需求说明：[StreamFab 浏览器插件] - [Amazon] - UI 需求说明

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| 2026-04-07 | 初始化 | 基于产品页和 Prime Video 公开站点调研 |
| 2026-04-15 | 整理归档版本 | 清理草稿口径 |
| 2026-04-29 | 按新模版归档 | 从旧版需求归档迁移 |
| 2026-06-01 | 按 workflow 结构补齐 Amazon 差异内容 | 补齐配置项、权益、Playlist、状态与文案 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab Amazon Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Amazon Coapp |
| app id | — | streamfab_for_browser |
| pid | Win | |
| pid | Mac | |
| option id | Win | |
| option id | Mac | |
| client id — 主站 | 插件（发布） | |
| client id — 主站 | CoApp Win x64 | |
| client id — 主站 | CoApp Mac | |
| client id — 品牌站 | 插件（发布） | |
| client id — 品牌站 | CoApp Win x64 | |
| client id — 品牌站 | CoApp Mac | |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Amazon_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Amazon_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Amazon_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Amazon_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Amazon_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Amazon_Coapp_for_Mac |

### 网站信息

- **历史沿革**：Prime Video 是 Amazon 旗下流媒体服务，现以 `primevideo.com` / `amazon.com/video` 承载全球视频内容。
- **主要服务地区**：覆盖北美、欧洲、日本、印度及其他亚太地区；中国大陆官方不可用。
- **内容形式**：电影、剧集、Amazon Originals、频道内容、Free with Ads、Sports / Live TV 等站内入口。
- **视频付费方式**：Prime 会员包含、单片 Rent / Buy、Prime Video Channels 单独订阅、部分免费含广告内容。
- **调研笔记链接**：[`site_research_notes.md`](site_research_notes.md)

---

## 价格与权益

| 项 | 值 |
|---|---|
| 订阅价格 | 1 Month License：$54.99；1-Year License：$79.99；Lifetime License：$99.99 |
| Trial 配额 | 30-Day Free Trial；每服务 3 个视频 |
| Premium 配额 | 每日 100 次；每周 700 次 |
| 特殊套餐 | 无插件专属套餐；Amazon 站内权益需区分 Prime included / Rent / Buy / Channel entitlement / Free with Ads |
| 不支持内容边界 | Sports / Live TV 识别后明确反馈不支持，不进入正常下载链路 |

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Amazon Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | Amazon / Prime Video |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | 区分未登录、无 Prime、Rent / Buy、Channel gating、Free with Ads、地区或设备限制 |
| 用户权益 | — | 多权益并存，不合并为统一不可下载状态 |
| 视频分析 | — | 增加分析中阶段、Codec 切换重分析、Playlist 首集分析限制与分析失败分支 |
| 视频检测 | — | 支持电影、剧集、Bonus / Extras、Trailers 等不同内容树结构 |
| 视频下载 | — | 完整配置项包含 Mode、Video Codec、Bitrate Adaption、音轨类型、字幕与下载进度差异 |
| Dashboard | — | Banner 文案、产品名、Amazon 能力边界 |
| Dashboard | Setting | 新增 Video Codec、Dialogue Boost、Description Audio 等 Amazon 专属配置 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| 产品页 | 主站 | https://streamfab.dvdfab.cn/amazon-downloader.htm |
| 产品页 | 独立站 | https://streamfab.com/amazon-downloader.htm |
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=amazon-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=amazon-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open={pid} |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open={pid} |

### 安装器

参见 UI 需求说明文档。调整项：

- 安装器资源：参见 Figma 设计文件
- 安装目录结构：参见「[StreamFab 浏览器插件] - CoApp 目录结构设计」

### 登录、权益与不支持边界

| 状态 | 处理要求 |
|---|---|
| 未登录 Amazon 账号 | 提示用户先登录；登录中断时停止检测并回到可重试状态 |
| 无 Prime 权益 | 判断内容是否仍可通过 Rent / Buy / Free with Ads 观看；不能直接按无权益失败处理 |
| Rent / Buy 内容 | 与 Prime 内容共享下载链路，但必须以账号实际可播放授权为准 |
| Channel entitlement | 需要识别频道订阅门槛，如 Paramount+ / Showtime 等，未授权时明确说明原因 |
| Free with Ads | 可播放时进入分析；下载结果按产品页口径去广告 |
| 地区或设备限制 | 明确反馈不可用原因，避免归因到通用分析失败 |
| Sports / Live TV | 识别后反馈不支持，不进入正常下载链路 |

### 视频分析 — 状态与失败处理

| 场景 | 处理要求 |
|---|---|
| 检测中 | 插件侧识别当前页是否存在可分析的视频入口 |
| 分析中 | CoApp 对当前视频进行实际分析；进度由真实接口驱动，不模拟假状态 |
| 切换 Video Codec | 触发 CoApp 重新分析，刷新 Resolution 和 Language 候选 |
| 切换期间跳转到新视频 | 以新视频的分析结果为准，旧结果丢弃 |
| 分析失败 | 提供 toast / 空态两条分支，并提供 Contact us 链接 |

分析失败文案：

| 语言 | 文案 |
|---|---|
| EN | Analysis Failed. Please retry or contact us for help. |
| ZH | 分析失败，请重试或联系我们获得帮助。 |

### 视频下载 — Playlist 内容结构

| 场景 | 内容结构 |
|---|---|
| Movie | Main Movie / Bonus / Extras / Trailers |
| TV | Season / Episode / Bonus / Extras / Trailers |

处理规则：

1. 默认只展开第一组树结构，其余分组折叠。
2. 主视频与 Extras 在 Downloads 中独立任务展示，不保留树层级。
3. Playlist 仅分析第一集，后续剧集 codec / bitrate / resolution 可能不同。
4. 首集分析限制使用非阻断常驻提示，不弹阻断 modal。

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。Amazon 的下载配置项顺序如下：

1. **Mode**
   - Full Download
   - Audio Only
   - Subtitle Only
   - 切换 Audio Only 时仅保留 `Audio Codec` + `Language`，其他字段置灰不删除。
   - 切换 Subtitle Only 时仅保留 `Subtitle` + `Subtitle Action`，其他字段置灰不删除。
2. **Video Codec**
   - H264
   - H265
   - 不包含 HDR / Dolby Vision / VP9 / AV1。
3. **Bitrate Adaption**
   - CVBR（默认）
   - CBR
   - 当前 codec 下无可用 CBR 流时隐藏 CBR 选项。
   - 不支持 Setting 预设。
4. **Resolution**
   - 正常分析结果格式：`{宽}x{高} - {码率} kbps - {文件大小}`
   - Codec + Bitrate 不可用时使用固定列表：Best Quality / 1920x1080 if available / 1280x720 if available / 960x540 if available / 640x480 if available。
   - 固定列表选中项由 Setting 预设决定。
5. **Audio Codec**
   - AAC
   - EAC3
6. **Language**
   - 展示格式：`{Language} {Track Type} {Audio Codec} {Audio Bitrate}`
   - 示例：`English Dialogue Boost: High EAC3 5.1 - 640 kbps`
   - 无 Track Type 时降级为：`{Language} {Audio Codec} {Audio Bitrate}`
   - `Audio Codec -> Language` 单向联动，Language 变化不反向影响 Audio Codec。
7. **Subtitle**
   - 多语言字幕候选由 CoApp 分析结果生成。
8. **Subtitle Action**
   - Remux Into File (SRT)
   - Extract to SRT File
   - Extract Original Format
   - Subtitle 与 Subtitle Action 是逻辑组，不合并为单下拉。

音轨 Track Type：

| Track Type | 说明 |
|---|---|
| Audio Description | 描述音轨 |
| Dialogue Boost: High | 高强度对话增强 |
| Dialogue Boost: Medium | 中强度对话增强 |
| Dialogue Boost: Low | 低强度对话增强 |

同时开启 Description Audio + Dialogue Boost 时，默认选中 3 个音轨：主音轨、描述音轨、对话增强音轨。

H265 + CBR 兼容性提示：

| 语言 | 文案 |
|---|---|
| EN | If CBR isn't available for this episode, we'll still try other episodes in CBR. |
| ZH | 如果本集没有 CBR 格式，我们仍会尝试下载其他集的 CBR 格式。 |

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
|---|---|
| 可获取文件大小 | `0B / 0B`（文件大小） |
| Mode = Audio Only | 待下载 / 排队 / 下载中 / 下载成功均不展示分辨率，只展示 `Audio Only` |
| Mode = Subtitle Only | 待下载 / 排队 / 下载中 / 下载成功均不展示分辨率，只展示 `Subtitle Only` |

### Dashboard - Banner 文案

License Info 产品名：`StreamFab Amazon Downloader for Browser`

| 语言 | 文案 |
|---|---|
| EN Title | Amazon Videos in Up to 1080p. One Click. |
| EN Subtitle | Save Prime Video titles for offline viewing with EAC3 5.1 or AAC 2.0 audio. |
| ZH Title | Amazon 视频一键下载，轻松离线观看。 |

文案边界：

- 强调 `1080p`、`MP4 / MKV`、`AAC 2.0 / EAC3 5.1`。
- 不写 4K / HDR / HDR10+ / Dolby Vision。

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。Amazon 在通用配置项基础上新增 `Video Codec`、`Pre-Select Dialogue Boost Audio`、`Pre-select Description Audio`；明确去掉 `Amazon Prime Video Region`。

配置项顺序如下：

1. **Language**
2. **Video Format**
   - MP4
   - MKV (FFmpeg)
   - MKV (MKVToolNix)
3. **Video Codec**
   - H264
   - H265
4. **Video Resolution**
   - Full HD - 1080p
   - HD - 720p
5. **Pre-select Audio Language**
   - Same as UI Language + 27 个语言选项
6. **Audio Channel**
   - Stereo (AAC)
   - Multi-Channel 5.1 (EAC3 / AC3)
   - 子选项：Pre-select both 5.1 and 2.0 audios（默认不选）
7. **Pre-Select Dialogue Boost Audio**
   - Dialogue boost audio only
   - Normal and dialogue boost audio
   - Dialogue Boost: High
   - Dialogue Boost: Medium
   - Dialogue Boost: Low
8. **Pre-select Description Audio**
   - 默认不选
9. **Pre-select Subtitle Language**
   - Same as UI Language + 27 个语言选项
   - 子选项：Always download the forced subtitle（默认选中）
10. **Subtitle Action**
   - Remux Into File
   - Extract to SRT File
   - Extract Original Format
