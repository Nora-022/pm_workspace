# StreamFab 浏览器扩展知识库

StreamFab 浏览器扩展是面向主流流媒体平台的下载插件产品线，支持 **Chrome 和 Edge**，采用**浏览器扩展 + CoApp 本地服务**的两层架构：扩展负责页面注入与 UI 交互，CoApp 在本地执行实际下载与转封装。Video Downloader 是全线 UX 和技术基线（首个上线插件）；Netflix 是第一个 VIP 付费服务插件，承担了 DRM 授权与付费流程部分的基线角色。其他插件的需求文档只记录与基线的差异。

本知识库统一维护各插件的产品定义、交互规则、技术约束与站点调研，供产品、设计、研发跨团队协作使用。单插件入口见各目录下的 `00_overview.md`，完整插件清单与目录路径见 [`index.md`](index.md)。

---

## 插件全景

产品线聚合页：[streamfab.dvdfab.cn/streamfab-for-browser.html](https://streamfab.dvdfab.cn/streamfab-for-browser.html)

| 插件 | 目标站点 | 地区 | 阶段 |
|---|---|---|---|
| Video | 通用多站点（yt-dlp 技术栈） | 全球 | 已上线 |
| Netflix | Netflix | 全球 | 已上线 |
| Amazon | Amazon Prime Video | 全球 | 已上线 |
| Disney+ | Disney+ | 全球 | 已上线 |
| M3U8 | M3U8 / DRM 流 | 全球 | 已上线 |
| OnlyFans | OnlyFans | 全球 | 已上线 |
| U-NEXT | U-NEXT | 日本 | 集成中 |
| FANZA | FANZA | 日本 | 集成中 |
| myfans | myfans | 日本 | 集成中 |
| Hulu | Hulu | 美国 | 待研发 |
| TVer | TVer | 日本 | 待研发 |
| Fandango at Home | Fandango at Home | 美国 | 待研发 |
| DRM MPD | MPEG-DASH / DRM 流 | 全球 | 待研发 |

---

## 按角色导航

| 角色 | 优先阅读入口 |
|---|---|
| 产品 | 各插件 `requirements/plugin_requirement.md` → 跨插件共用规则见 `_common/references/` |
| 设计 | 各插件 `requirements/plugin_ui_requirement.md` → 共用视觉 / UX / 布局规范见 `_common/references/` |
| 研发 | `_common/references/baselines/` 取检测模式基线 → 各插件 `diff_summary.md` 看差异 → 通用技术基线见 Video 插件，DRM / 付费流程基线见 Netflix 插件 |

### _common/references 快查

| 文件 | 内容 |
|---|---|
| `ux_patterns.md` | 跨插件通用交互模式 |
| `visual_guidelines.md` | 共用视觉规范 |
| `layout_specs.md` | 页面骨架与尺寸参考 |
| `glossary.md` | 产品线术语表 |
| `baselines/netflix_mode.md` / `baselines/ytdlp_mode.md` | 两类检测模式基线 |

---

## 维护规范

- 框架与目录结构以 [`_common/FRAMEWORK.md`](_common/FRAMEWORK.md) 为唯一权威；阅读路线见 [`_common/READING_MAP.md`](_common/READING_MAP.md)
- 跨插件通用规则沉淀到 `_common/references/`，不在各插件中重复维护
- 检测模式归属由 `_common/READING_MAP.md` 的归属表决定，插件文档不自行声明
- 工作流、Skills 速查、同步脚本说明见 [`../MAINTENANCE.md`](../MAINTENANCE.md)

## 当前知识库更新记录

| 日期 | 更新内容 |
|---|---|
| 2026-05-29 | 新增 29 项，修改 12 项，删除 152 项 |

> 完整更新记录见 [DAILY_CHANGELOG.md](DAILY_CHANGELOG.md)
