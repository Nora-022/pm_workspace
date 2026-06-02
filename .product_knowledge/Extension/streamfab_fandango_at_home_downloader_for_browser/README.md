# StreamFab Fandango at Home Downloader for Browser

面向 Fandango at Home（前身 Vudu）用户的单站点浏览器下载插件，仅美国。

| 维度 | 取值 |
| --- | --- |
| 检测模式 | **netflix_mode** |
| 上线状态 | 待研发 |
| 站点 | `athome.fandango.com`（旧域 `vudu.com` 已重定向） |
| 地区 | 仅美国 |
| 内容形态 | TVOD（Rent / Buy）+ AVOD（Free with Ads），约 200,000+ 标题 |
| 视频画质 | 最高 4K（DRM 环境影响命中） |
| 编码 | H.264 / H.265-SDR / HDR10 / Dolby Vision |
| 音频 | EAC3 5.1 / AAC 2.0（4K 可能伴随 Atmos） |
| 协议 | MPEG-DASH + CMAF / fMP4 |
| DRM | Widevine + PlayReady（FairPlay 走 HLS，浏览器不命中） |
| 价格 | Lifetime $59.99（仅一档） |
| pid | 693（Win） |
| app id | `streamfab_for_browser_fandango_at_home` |
| 跳转 slug | `fandango-at-home-downloader` |
| 产品页 | https://streamfab.com/fandango-at-home-downloader.htm |

## 文档导航

- 差异索引：[`plugin_differences.md`](plugin_differences.md)
- 需求文档：[`requirements/plugin_requirement.md`](requirements/plugin_requirement.md)
- UI 需求：[`requirements/plugin_ui_requirement.md`](requirements/plugin_ui_requirement.md)
- 站点调研：[`requirements/site_research_notes.md`](requirements/site_research_notes.md)
- 产品页事实：[`requirements/product_page_facts.md`](requirements/product_page_facts.md)
- 客户端产品页笔记：[`requirements/client_product_page_notes.md`](requirements/client_product_page_notes.md)
- 变更日志：[`CHANGELOG.md`](CHANGELOG.md)

## 阅读路线

按 [`_common/READING_MAP.md`](../_common/READING_MAP.md) 4 步读取：

1. 通用基线 → [`_common/01-07`](../_common/README.md)
2. 检测模式基线 → [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)
3. 差异总览 → [`plugin_differences.md`](plugin_differences.md)
4. 详细规格 → `requirements/`
