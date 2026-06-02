# StreamFab 浏览器扩展知识库

StreamFab 浏览器扩展是面向主流流媒体平台的下载插件产品线，支持 **Chrome 和 Edge**，采用**浏览器扩展 + CoApp 本地服务**的两层架构：扩展负责页面注入与 UI 交互，CoApp 在本地执行实际下载与转封装。通用知识按 Knowledge Manager 标准沉淀在 [`_common/01_product_brief.md`](_common/01_product_brief.md) 到 [`_common/07_technical_constraints.md`](_common/07_technical_constraints.md)；无法合并进 01-07 的 common 级事实从 `_common/08_*.md` 继续编号；各插件目录只通过 `plugin_differences.md` 记录与通用基线的差异。

本知识库统一维护各插件的产品定义、交互规则、技术约束与站点调研，供产品、设计、研发跨团队协作使用。单插件入口见各目录下的 `README.md` 和 `plugin_differences.md`，完整插件清单与目录路径见 [`index.md`](index.md)。

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
| 产品 | `_common/01-07` → `_common/08+`（按需） → 各插件 `plugin_differences.md` → `requirements/plugin_requirement.md` |
| 设计 | `_common/03-05` → 各插件 `plugin_differences.md` → `requirements/plugin_ui_requirement.md` |
| 研发 | `_common/02` / `_common/07` → `_common/10_detection_modes.md` / `_common/14_platform_and_technical_limits.md` → 各插件 `plugin_differences.md` |

### _common 快查

| 文件 | 内容 |
|---|---|
| `01_product_brief.md` - `07_technical_constraints.md` | Knowledge Manager 标准入口 |
| `08_backlog.md` | Extension 需求池快照 |
| `09_version_ledger.md` | 插件版本与 CoApp 版本台账快照 |
| `10_detection_modes.md` | 两类检测模式基线 |
| `11_user_flows_and_error_handling.md` | 用户流程与错误处理 |
| `12_ui_ux_visual_layout_specs.md` | UI / UX / 视觉 / 布局规范 |
| `13_settings_matrix.md` | Setting 配置项矩阵 |
| `14_platform_and_technical_limits.md` | 平台差异与技术约束 |
| `15_glossary.md` | 产品线术语表 |

---

## 维护规范

- 框架与目录结构以 [`_common/FRAMEWORK.md`](_common/FRAMEWORK.md) 为唯一权威；阅读路线见 [`_common/READING_MAP.md`](_common/READING_MAP.md)
- 跨插件通用规则沉淀到 `_common/01+` 编号文件；`_common/references/` 只保留调研、证据和历史资料，不维护现行规则
- 插件目录不再维护 01-07 主干文件；插件差异固定写入 `plugin_differences.md`，不参与 common 编号
- 检测模式归属由 `_common/READING_MAP.md` 的归属表决定，插件文档不自行声明
- 工作流、Skills 速查、同步脚本说明见 [`../MAINTENANCE.md`](../MAINTENANCE.md)

## 当前知识库更新记录

| 日期 | 更新内容 |
|---|---|
| 2026-06-02 | 新增 34 项，修改 17 项，删除 36 项 |

> 完整更新记录见 [DAILY_CHANGELOG.md](DAILY_CHANGELOG.md)
