# Video — 差异总览

> 本插件是 ytdlp_mode 基线的活样例。
> 详细规格见引用的具体文档章节。
> 检测模式：**ytdlp_mode**（基线本身）
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/10_detection_modes.md`](../_common/10_detection_modes.md)

---

## 逻辑差异（相对 netflix_mode 的核心差异在 baseline 已写清，此处只列 Video 自有特性）

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 价格与权益 | 免费方案 `Lifetime Free Access`（YouTube 720p）/ Trial 5 次 / Premium 每日 100 / 1Y $49.99 / Lifetime $59.99 / 促销 $59.99（原价 $99.99） | requirements/plugin_requirement.md § 价格与权益 |
| 视频下载配置参数 | `Format` / `Video Codec` / `Audio Codec` / `Subtitle`；分辨率上限 8K HDR；音频上限 320kbps | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 检测策略 | 预分析 + 多 Origin 探测；Detected 以 Origin 为单位隔离 | _common/10_detection_modes.md § 二 |
| 下载并发 | 5（超过进入 Pending） | _common/10_detection_modes.md § 三 |
| Always Free 路径 | YouTube < 720p + 关 Turbo = `0` 点；仅官网 / Edge 版可用 | _common/10_detection_modes.md § 六 |
| Turbo-Speed 开关 | 付费权益，订阅默认可用；Trial 无剩余次数时不可用；本身不产生扣点 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 渠道差异 | Chrome 商店版不支持 YouTube 下载（政策）；Edge 商店 + 官网完整 | _common/14_platform_and_technical_limits.md § 三 |
| 站点池 | yt-dlp 支持的多站点（1000+），含 YouTube / Dailymotion / Vimeo / Bilibili / Twitter / TikTok / Facebook 等 | requirements/site_research_notes.md |
| DRM 边界 | 不下载 DRM；显示 `Protected Video Content`，引导桌面客户端 | _common/14_platform_and_technical_limits.md § 四 |
| 历史记录上限 | Downloaded 页保留最近 20 条 | _common/14_platform_and_technical_limits.md § 六 |
| 展示模式 | 支持 Popup + Sidebar 双模式，共享同一套主框架 | _common/10_detection_modes.md § 九 |
| 字幕 | 多语言识别与下载，最高 28 种语言 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 跳转链接 | 主站 slug `streamfab-for-browser`（产品线聚合页） | requirements/plugin_requirement.md § 跳转链接 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 用户授权信息模块 | 订阅类型展示 `LeftTime / Annual / Expired / Fab365` | requirements/plugin_ui_requirement.md |
| Detected 状态机 | 状态多于 netflix_mode：检测中 / 新增加载中 / 空状态 / 未登录 / 未装 CoApp / CoApp 更新 / DRM 提示 / YouTube 限制（Chrome） | _common/10_detection_modes.md § 二 |
| 底部固定区 | 界面样式切换（Popup / Sidebar）+ 外链入口（Official Site / Member Center / Contact Us / What's New） | requirements/plugin_ui_requirement.md |

---

## 设计原则（Video 沉淀的 4 条工具型产品原则）

1. **框架稳定，模式复用** — Popup / Sidebar 共享一套 `Detected / Downloads` 主结构
2. **意图优先，异步校验** — 点击下载立即建任务跳 Downloads；环境问题在卡片内异步反馈
3. **状态完整，反馈就地** — 检测中 / 空状态 / 未登录 / 未装 CoApp / CoApp 更新 / 失败重试都有明确界面承接
4. **上下文严格绑定** — `Detected` 列表与当前页面 URL 生命周期绑定；页面切换后清空重检

这 4 条原则也是 ytdlp_mode 整个模式的设计精神，适用于所有共享 `Detected / Downloads` 框架的插件。

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。Video 是 ytdlp_mode 唯一插件，因此本插件的实现细节也是该模式的事实标准。
