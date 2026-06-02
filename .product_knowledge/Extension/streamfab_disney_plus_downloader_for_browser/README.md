# StreamFab Disney Plus Downloader for Browser

面向 Disney+ 用户的专用浏览器下载插件，仅支持 `disneyplus.com` 单站点。

| 维度 | 取值 |
| --- | --- |
| 检测模式 | **netflix_mode**（标准模式，无变体） |
| 上线状态 | 已上线（首版 2026-03-16） |
| 视频画质 | 浏览器侧最高 1080P（Chrome / Firefox 受 Widevine L3 限制至 720p） |
| Banner 文案锚点 | `Pro-Quality Disney Plus Downloads, One Click.` / `up to 1080p, MP4/MKV, multi-track where available.` |
| 站点协议 | HLS（M3U8）+ CMAF（同时携带 Widevine / PlayReady 初始化数据） |
| 产品页 | https://streamfab.dvdfab.cn/disney-plus-downloader.htm |

## 文档导航

- 差异索引：[`plugin_differences.md`](plugin_differences.md)
- 需求文档：[`requirements/plugin_requirement_feishu.md`](requirements/plugin_requirement_feishu.md)（飞书侧需求文档快照，主交付件）
- 站点调研：[`requirements/site_research_notes.md`](requirements/site_research_notes.md)
- 产品页事实：[`requirements/product_page_facts.md`](requirements/product_page_facts.md)
- 变更日志：[`CHANGELOG.md`](CHANGELOG.md)

## 阅读路线

按 [`_common/READING_MAP.md`](../_common/READING_MAP.md) 4 步读取：

1. 通用基线 → [`_common/01-07`](../_common/README.md)
2. 检测模式基线 → [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)
3. 差异总览 → [`plugin_differences.md`](plugin_differences.md)
4. 详细规格 → `requirements/`
