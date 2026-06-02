# DRM MPD — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 检测模式：**netflix_mode（MPD 协议变体）**
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/10_detection_modes.md § 九（MPD 变体）`](../_common/10_detection_modes.md)

---

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 协议 | **MPEG-DASH `.mpd` manifest**；CoApp 自动识别 URL 是否为 MPD + DRM 后点亮下载按钮，无独立分析弹窗 | requirements/site_research_notes.md |
| **多站点心智** | 不绑定具体站点，UI 与商店素材做模糊 / 占位处理；客户端口径覆盖 Channel 5 / BritBox / AMC+ / ITV / SHOWTIME | requirements/plugin_requirement.md § 网站信息 |
| 命名例外（DRM-MPD） | 安装程序名用空格 `DRM MPD`、mlink 用连字符 `DRM-MPD`、app id 用下划线 `drm_mpd`；详见 `_common/FRAMEWORK.md` 命名规则节 | requirements/plugin_requirement.md § 产品信息 |
| 价格与权益 | Lifetime $64.99（一次性购买）；Trial 3 次 / Premium 每日 100 + **每周 700** | requirements/plugin_requirement.md § 价格与权益 |
| 视频画质 | **上限 1080p**（不支持 4K） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 音频 | EAC3 / AC3 5.1 或 AAC 2.0 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 输出格式 | MP4 / MKV | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 字幕 | SRT（独立文件）或嵌入视频 | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| License Info Banner | EN: `DRM MPD Videos, Downloaded Simply. Save DRM-protected MPD streams for offline viewing in up to 1080p with clear AAC audio.` | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| License Info 产品名 | `StreamFab DRM MPD Downloader for Browser` | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| 跳转链接 slug | `drm-mpd-downloader`；付费 / Upgrade 链接以 Win pid `653` 作 `?open=` 参数 | requirements/plugin_requirement.md § 跳转链接 |
| 安装程序 id | pid 653(Win)/1653(Mac)；option 453/1453；client 264/265/259/260/262/263 | requirements/plugin_requirement.md § 产品信息 |
| 平台支持 | Win + Mac 双系统支持；**首版暂只做 Win** | requirements/plugin_requirement.md § 平台支持 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 商店素材与 UI | **不展示具体站点名**；产品名、Banner 都以"DRM MPD"为锚点，不出现 Channel 5 / BritBox / AMC+ / ITV / SHOWTIME 等子站点字样 | requirements/plugin_ui_requirement.md |
| 检测交互 | 站点页 URL 命中 MPD 协议时点亮下载按钮，**不弹独立分析弹窗** | requirements/plugin_ui_requirement.md |

---

## 关键事实

- 展示名：`DRM MPD`
- 技术包名：`StreamFab DRM MPD Downloader for Browser`
- CoApp 名：`StreamFab DRM MPD Coapp`
- app id：`streamfab_for_browser_drm_mpd`
- 产品页：`https://streamfab.dvdfab.cn/drm-mpd-downloader.htm`
- 客户端对应：`StreamFab DRM MPD Downloader`
- 知识库目录名：`streamfab_mpd_downloader_for_browser`（沿用初始命名，不影响实际产品名）
- 客户端口径覆盖：Channel 5、BritBox、AMC+、ITV、SHOWTIME
- 上线状态：**待研发**

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线（含 netflix_mode 第八节的 M3U8 / MPD 变体说明）。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/10_detection_modes.md`](../_common/10_detection_modes.md)
