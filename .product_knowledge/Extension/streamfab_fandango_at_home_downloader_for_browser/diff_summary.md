# Fandango at Home — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 检测模式：**netflix_mode**
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 平台与品牌 | 运营平台 Fandango at Home（前身 Vudu，2024-03-12 由 NBCUniversal / Comcast 旗下 Fandango Media 完成更名）；旧域 `vudu.com` 已重定向到 `athome.fandango.com` | requirements/site_research_notes.md |
| 地区 | **仅美国可用**；账户、播放、下载均地理锁定；非 US IP / VPN 触发拒绝 | requirements/plugin_requirement.md § 网站信息 |
| 内容形态 | TVOD（Rent / Buy）为主 + AVOD（Free with Ads）混合；约 200,000+ 标题 | requirements/site_research_notes.md |
| 价格与权益 | Lifetime $59.99（仅一档）；试用 / 付费体系复用 StreamFab 浏览器插件统一规则；pid `693`（Win） | requirements/plugin_requirement.md § 价格与权益 |
| **用户权益分层（5 状态）** | 未登录 / Free with Ads / Rent（30 天激活 + 48 小时观看窗口）/ Buy（永久持有）/ 租期过期，各状态下载可用性与提示语义不同 | requirements/plugin_requirement.md § 价格与权益 |
| 内容边界 | 仅处理用户已 Rent / Buy / Free-with-Ads 的内容；保留 `eligible` / `personal offline viewing` / `valid access period` 表述 | requirements/site_research_notes.md |
| **错误归类（5 类）** | 未登录 / **地理限制**（独立成类，与未登录区分）/ 版权拒绝 / 租期过期 / 硬件 DRM 不足 | requirements/plugin_requirement.md § Error Codes |
| 视频画质 | 最高 4K（实际命中以 CoApp 分析为准） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 视频编码 | H.264 / H.265-SDR / HDR10 / Dolby Vision | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 音频 | EAC3 5.1 / AAC 2.0；4K 内容可能伴随 Dolby Atmos 元数据 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 字幕 | WebVTT / TTML，DASH 内嵌或 sidecar；可多语言同时下载，可保 SRT 或封装 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 协议与 DRM | **MPEG-DASH + CMAF / fMP4**；CENC 加密；多 DRM 并存（Widevine + PlayReady；FairPlay 走 HLS 路径，浏览器场景不命中） | requirements/site_research_notes.md |
| DRM Robustness 分层 | SD/HD: Widevine L3 / PlayReady SL2000 即可；4K HDR / DV: **Widevine L1（硬件）/ PlayReady SL3000（硬件）**；浏览器命中 L3 通常降级到 HD | requirements/site_research_notes.md |
| 跳转链接 slug | `fandango-at-home-downloader`；付费 / Upgrade 链接以 Win pid `693` 作 `?open=` 参数 | requirements/plugin_requirement.md § 跳转链接 |
| app id 命名 | `streamfab_for_browser_fandango_at_home`（snake_case） | requirements/plugin_requirement.md § 产品信息 |
| 平台支持 | Windows 优先；macOS 声明支持，发布范围以版本计划为准；Linux 不支持 | requirements/plugin_requirement.md § 平台支持 |
| 基线复用范围 | 登录 & 授权、视频分析、视频检测、数据上报、Dashboard 框架、Setting 框架全部复用 Netflix | requirements/plugin_requirement.md § 网站信息 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 站点级地理限制提示 | `Sorry, Fandango is not available outside the United States`（独立提示，非"未登录"） | requirements/plugin_ui_requirement.md |
| 内容级地理限制提示 | `Oops! This movie won't play on your display due to copyright restrictions` | requirements/plugin_ui_requirement.md |
| 租期 / 观看窗口 UI | Rent 内容卡片标注剩余激活 / 观看时间，过期后引导续租或购买 | requirements/plugin_ui_requirement.md |
| 详情页 DOM 适配 | 详情页结构随权益状态变化（Rent / Buy / Free-with-Ads / 未登录），插件需多状态识别 | requirements/plugin_ui_requirement.md |

---

## 关键事实

- 产品页：`https://streamfab.com/fandango-at-home-downloader.htm`
- 入口 URL 模式：`https://athome.fandango.com/content/browse/details/<slug>/<id>`
- 兼容旧域：`vudu.com`（已重定向）
- 地区：仅美国
- 视频画质上限：4K（视权益与 DRM 环境降级）
- 上线状态：**待研发**
- 实测确认项（写在 site_research_notes.md）：AVOD 免费内容下载边界、4K HDR/DV 在内置浏览器的命中率、Free with Ads 的广告插入与"Remove Ads"适用范围

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)
