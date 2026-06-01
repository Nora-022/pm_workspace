# StreamFab DRM MPD Downloader for Browser

面向 MPEG-DASH（`.mpd` manifest）协议视频的多站点浏览器下载插件。

| 维度 | 取值 |
| --- | --- |
| 检测模式 | **netflix_mode（MPD 协议变体）** |
| 上线状态 | 待研发 |
| 展示名 | `DRM MPD` |
| 技术包名 | `StreamFab DRM MPD Downloader for Browser` |
| CoApp 名 | `StreamFab DRM MPD Coapp` |
| app id | `streamfab_for_browser_drm_mpd`（**命名例外：下划线**） |
| mlink 命名 | `DRM-MPD`（**命名例外：连字符**） |
| 协议 | MPEG-DASH `.mpd` manifest |
| 视频画质 | 上限 1080p |
| 输出格式 | MP4 / MKV |
| 音频 | EAC3 / AC3 5.1 / AAC 2.0 |
| 字幕 | SRT 或嵌入 |
| 价格 | Lifetime $64.99（一次性购买） |
| 客户端口径覆盖 | Channel 5 / BritBox / AMC+ / ITV / SHOWTIME |
| pid | 653（Win）/ 1653（Mac） |
| 跳转 slug | `drm-mpd-downloader` |
| 产品页 | https://streamfab.dvdfab.cn/drm-mpd-downloader.htm |

## 文档导航

- 差异索引：[`diff_summary.md`](diff_summary.md)
- 需求文档：[`requirements/plugin_requirement.md`](requirements/plugin_requirement.md)
- UI 需求：[`requirements/plugin_ui_requirement.md`](requirements/plugin_ui_requirement.md)
- 客户端产品页笔记：[`requirements/client_product_page_notes.md`](requirements/client_product_page_notes.md)
- 变更日志：[`CHANGELOG.md`](CHANGELOG.md)

## 阅读路线

按 [`_common/READING_MAP.md`](../_common/READING_MAP.md) 4 步读取：

1. 通用规则 → [`_common/references/`](../_common/references/)
2. 检测模式基线 → [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)（含第九节 MPD 变体）
3. 差异总览 → [`diff_summary.md`](diff_summary.md)
4. 详细规格 → `requirements/`
