# StreamFab 浏览器插件通用知识库

`_common` 是所有 StreamFab 浏览器插件共享的 Knowledge Manager 基线和 common 级扩展事实库。插件目录不再重复维护 01-07 主干文件，也不占用 common 的编号空间；插件差异统一写入各自的 `plugin_differences.md`。

## Knowledge Manager 标准入口

| 文件 | 内容 |
| --- | --- |
| [01_product_brief.md](01_product_brief.md) | 产品线定位、核心能力、插件清单、红线 |
| [02_functional_architecture.md](02_functional_architecture.md) | 浏览器扩展 + CoApp 架构、检测模式、模块结构 |
| [03_page_structure.md](03_page_structure.md) | Popup、Dashboard、Downloads、Modal、CoApp 安装流页面结构 |
| [04_interaction_details.md](04_interaction_details.md) | 检测、下载、错误、订阅阻断、设置保存等交互规则 |
| [05_design_principles.md](05_design_principles.md) | 通用视觉、组件、布局、信息层级原则 |
| [06_business_rules.md](06_business_rules.md) | 通用账号、授权、配额、订阅状态与使用限制；不维护单插件定价 |
| [07_technical_constraints.md](07_technical_constraints.md) | 系统、浏览器、CoApp、DRM、并发、平台限制 |

## Common 扩展入口

01-07 无法承载、但属于全产品线 common 事实的内容，从 08 开始继续编号：

| 文件 | 内容 |
| --- | --- |
| [08_backlog.md](08_backlog.md) | Extension 需求池快照；飞书多维表格为权威源 |
| [09_version_ledger.md](09_version_ledger.md) | 插件版本与 CoApp 版本台账快照；飞书多维表格为权威源 |

## 正式规则扩展

以下文件是 common 正式规则正文，不属于 `references/`：

| 文件 | 内容 |
| --- | --- |
| [10_detection_modes.md](10_detection_modes.md) | netflix_mode / ytdlp_mode 检测、下载、调度、状态机和模式差异 |
| [11_user_flows_and_error_handling.md](11_user_flows_and_error_handling.md) | 用户主流程、异常分支、错误处理和反馈规则 |
| [12_ui_ux_visual_layout_specs.md](12_ui_ux_visual_layout_specs.md) | UI / UX / 视觉 / 布局详细规范 |
| [13_settings_matrix.md](13_settings_matrix.md) | Setting 配置项顺序、默认值和分区结构 |
| [14_platform_and_technical_limits.md](14_platform_and_technical_limits.md) | 平台差异、渠道差异、CoApp、DRM、并发和技术限制 |
| [15_glossary.md](15_glossary.md) | 产品线术语表 |
| [16_new_plugin_kickoff_checklist.md](16_new_plugin_kickoff_checklist.md) | 新插件启动检查清单 |

## 参考资料目录

[references/](references/) 只保留非规范资料：原始调研、外部证据、历史方案和竞品分析。现行规则不得继续写入 `references/`。

## 结构说明

- [READING_MAP.md](READING_MAP.md)：AI / 人查任意插件事实的阅读顺序。
- [FRAMEWORK.md](FRAMEWORK.md)：common + plugin diff 的结构说明。

## 插件差异入口规则

每个 `streamfab_<service>_downloader_for_browser/` 目录使用固定非编号入口，避免和 common 08+ 扩展文档冲突：

- `plugin_differences.md`：本插件相对 `_common/01-07` 的差异入口。
- `requirements/plugin_requirement.md`：详细需求规格。
- `requirements/plugin_ui_requirement.md`：UI / 商店素材差异。
- `requirements/site_research_notes.md`、`requirements/product_page_facts.md`：站点调研和产品页事实。

如历史文档仍提到 `diff_summary.md`，应按本规则迁移到 `plugin_differences.md`。
