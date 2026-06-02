# M3U8 — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 详细规格见引用的具体文档章节。
> 检测模式：**netflix_mode（变体）** — 标准 netflix_mode 之上插件侧增加"页面结构预判断"
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/10_detection_modes.md`](../_common/10_detection_modes.md)（§ 八 变体小节）

---

## 模式变体（核心差异）

M3U8 在标准 netflix_mode 之上增加两段判断机制：

```
用户进入页面
   ↓
【第一段】插件侧页面结构预判断 ──→ 非视频页：直接显示不支持，不进 CoApp
   ↓ 通过
【第二段】CoApp 分析（20 秒超时上限）
   ↓
   ├─ 支持下载 → Detected 区域新增视频卡片
   ├─ 不支持 / 超时 → 插件弹窗内引导前往 StreamFab 客户端
   └─ 分析失败 → toast 提示（3s 自动消失）
```

其余逻辑（下载调度、登录中断、配额扣减、状态机）与 netflix_mode 一致。

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 站点范围 | **多站点**，凡含 M3U8 / HLS 流的视频站点均在支持范围；不绑定平台，不要求登录目标站点账号 | requirements/plugin_requirement.md § 网站信息 |
| 前置条件 | 无"必须在特定站点 / 必须登录站点 / 必须正在播放"的强前置；前置仅"已登录 StreamFab + 已安装 CoApp" | requirements/plugin_requirement.md § 检测、分析流程 |
| 检测流程 | netflix_mode 变体：插件侧先做页面结构判断过滤非视频页，再走 CoApp 分析（20 秒超时） | requirements/plugin_requirement.md § 检测、分析流程 |
| 分析等待态 | 引入"检测中 → 分析中"显式进度态，CoApp 通过 `LoadingDialog` 接口回传分析进度（基线无预分析直接出结果） | requirements/plugin_requirement.md § 检测、分析流程 |
| 不支持下载提示 | 后置判断：插件内已有视频 → toast（3s）；插件内无视频 → 全局提示；不新增阻断弹窗 | requirements/plugin_requirement.md § 检测、分析流程 |
| 视频下载配置参数 | 精简字段集：`Resolution`（`{宽}x{高}-{码率}`）/ `Language`（语言 + 视频编码）/ `Subtitles`（None / English）；选项由 CoApp 分析结果动态生成；**无 Video Codec 切换、无 H264 Profile、无 Audio Codec** | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 视频下载进度显示 | 待下载 / 下载成功：分辨率 + 音频编码 + 文件大小；排队 / 下载中 / 失败：仅分辨率 | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| Playlist 结构 | **无 Season / Episode 层级**，无选集弹窗，按单视频任务粒度入 Downloads | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| Banner 文案 | M3U8 多站点口径，强调"M3U8 streams / up to 1080p / clear AAC audio"；**不绑定单一站点** | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| Setting Extension 配置项 | 沿用通用 7 项默认顺序，**无插件专属增配项**（无 Video Codec / H264 Profile） | requirements/plugin_requirement.md § Setting Extension 配置项 |
| 跳转链接 | 主站 slug `m3u8-downloader-for-browser`；What's New `pid=drm-m3u8-downloader`；付费 `open=652`（主站）/ `open=655`（独立站） | requirements/plugin_requirement.md § 跳转链接 |
| 加密支持范围 | 明文 M3U8 + 加密 M3U8（AES-128 / AES-256 / SAMPLE-AES，key 从 `#EXT-X-KEY` 直接提取）；**不支持** Widevine / PlayReady / FairPlay；app id 中含 "drm" 字样为历史标识，产品显示名不含 DRM | requirements/site_research_notes.md |
| Error 330 | **无**（M3U8 无缓存 key 概念） | — |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 商店配图 | License Info banner 使用 M3U8 多站点口径文案，不出现具体站点 logo | requirements/plugin_ui_requirement.md |
| 分析进度弹窗 | 页面清单中新增"分析进度弹窗"（基线无此项），承载 CoApp 分析等待态 | requirements/plugin_ui_requirement.md |

---

## 关键事实（来自产品页 + 站点调研）

- 产品页：`https://streamfab.dvdfab.cn/m3u8-downloader-for-browser.htm`
- 视频画质上限：`1080P`（产品页口径；CHANGELOG 历史项中"最高 4K"为客户端能力描述）
- 支持编码：`H.264` / `H.265`
- 音频：`EAC3 5.1` / `AAC 2.0`
- 字幕：多语言识别，可外挂或封装
- 输出格式：`MP4` / `MKV`
- 加密：明文 + AES-128 / AES-256 / SAMPLE-AES（key 从 playlist 直接提取）
- 公开边界：仅适用于公开可访问的 M3U8 / HLS 流，不涉及 DRM license server 与 CDM

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)（§ 八 变体小节）
