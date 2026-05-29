# StreamFab M3U8 Downloader for Browser

面向 `M3U8 / HLS` 协议的**多站点**浏览器下载插件，覆盖所有含 M3U8 流的视频站点，不绑定特定平台。

| 维度 | 取值 |
| --- | --- |
| 检测模式 | **netflix_mode（变体）** — 插件侧增加页面结构预判断 + 20 秒 CoApp 超时 |
| 站点范围 | 多站点（任意含 M3U8 / HLS 流的视频页） |
| 上线状态 | 已上线（V1001 / 2026-04-28） |
| 视频画质 | 最高 1080P |
| 加密支持 | 明文 + AES-128 / AES-256 / SAMPLE-AES（key 从 playlist 提取）；不支持 Widevine / PlayReady / FairPlay |
| Banner 文案锚点 | M3U8 streams、up to 1080p、clear AAC audio（不绑定单站点） |
| 产品页 | https://streamfab.dvdfab.cn/m3u8-downloader-for-browser.htm |

## 文档导航

- 差异索引：[`diff_summary.md`](diff_summary.md)
- 需求文档：[`requirements/plugin_requirement.md`](requirements/plugin_requirement.md)
- UI 需求：[`requirements/plugin_ui_requirement.md`](requirements/plugin_ui_requirement.md)
- 站点调研：[`requirements/site_research_notes.md`](requirements/site_research_notes.md)
- 产品页事实：[`requirements/product_page_facts.md`](requirements/product_page_facts.md)
- 变更日志：[`CHANGELOG.md`](CHANGELOG.md)

## 阅读路线

按 [`_common/READING_MAP.md`](../_common/READING_MAP.md) 4 步读取：

1. 通用规则 → [`_common/references/`](../_common/references/)
2. 检测模式基线 → [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)（**重点看 § 八 M3U8 变体小节**）
3. 差异总览 → [`diff_summary.md`](diff_summary.md)
4. 详细规格 → `requirements/`
