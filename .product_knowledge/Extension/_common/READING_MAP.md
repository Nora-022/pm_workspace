# 知识库阅读地图

> AI / 人查任意插件的事实时，按本文件的 4 步路线读取。
> 框架总览见 [FRAMEWORK.md](FRAMEWORK.md)。

## 查任意插件，按 4 步读取

### 步骤 1：Knowledge Manager 通用基线（所有插件共享）

先读 `_common/` 下的标准 01-07 文件：

- [01_product_brief.md](01_product_brief.md) — 产品线定位、核心能力、红线
- [02_functional_architecture.md](02_functional_architecture.md) — 浏览器扩展 + CoApp 架构、检测模式、模块结构
- [03_page_structure.md](03_page_structure.md) — Popup、Dashboard、Downloads、Modal、CoApp 安装流
- [04_interaction_details.md](04_interaction_details.md) — 主流程、状态反馈、错误处理、设置保存
- [05_design_principles.md](05_design_principles.md) — 通用视觉、组件、布局、信息层级
- [06_business_rules.md](06_business_rules.md) — 通用账号、授权、配额、订阅状态；不维护单插件定价
- [07_technical_constraints.md](07_technical_constraints.md) — 系统、浏览器、CoApp、DRM、并发、平台限制

如任务涉及需求排期、版本、上线状态，再读取 common 扩展编号文档：

- [08_backlog.md](08_backlog.md) — Extension 需求池快照，飞书为权威源
- [09_version_ledger.md](09_version_ledger.md) — 插件版本与 CoApp 版本台账快照，飞书为权威源

需要详细规则时继续读取 `_common/10+` 正式编号文档：

- [10_detection_modes.md](10_detection_modes.md) — 检测模式、下载调度、状态机、模式差异
- [11_user_flows_and_error_handling.md](11_user_flows_and_error_handling.md) — 主流程、异常分支、错误反馈
- [12_ui_ux_visual_layout_specs.md](12_ui_ux_visual_layout_specs.md) — UI / UX / 视觉 / 布局规范
- [13_settings_matrix.md](13_settings_matrix.md) — Setting 配置项矩阵
- [14_platform_and_technical_limits.md](14_platform_and_technical_limits.md) — 平台、渠道、CoApp、DRM 和技术限制
- [15_glossary.md](15_glossary.md) — 产品线术语
- [16_new_plugin_kickoff_checklist.md](16_new_plugin_kickoff_checklist.md) — 新插件启动检查

### 步骤 2：检测模式基线（按归属表选一份）

读 `_common/10_detection_modes.md`。
字段级细节按插件 `plugin_differences.md` 下钻，不再读取插件级 01-07。

### 步骤 3：差异总览

读 `streamfab_<plugin>_downloader_for_browser/plugin_differences.md`，一眼看清本插件所有差异点及其文档位置。

### 步骤 4：详细规格（按 plugin_differences.md 索引下钻）

- `requirements/plugin_requirement.md` — 逻辑细节
- `requirements/plugin_ui_requirement.md` — UI 细节（主要出商店配图）
- `requirements/store_listing.md` — 商店上架文案

---

## 检测模式归属表（唯一权威）

| 插件 | 检测模式 |
| --- | --- |
| Netflix | netflix_mode |
| Disney+ | netflix_mode |
| U-NEXT | netflix_mode |
| Fandango at Home | netflix_mode |
| M3U8 | netflix_mode（变体） |
| MPD | netflix_mode（变体） |
| Amazon | netflix_mode |
| Hulu | netflix_mode |
| Fanza | netflix_mode |
| OnlyFans | netflix_mode |
| MyFans | netflix_mode |
| TVer | netflix_mode |
| Video（通用） | ytdlp_mode |

> 插件不自己声明检测模式，本表是唯一权威。
> 写入时机：init 默认归 netflix_mode 占位，workflow 站点调研后修正。

---

## 外部数据源（权威在飞书，本地只存快照或按需查）

| 数据 | 飞书权威源 | 类型 | 本地快照 |
| --- | --- | --- | --- |
| 需求池 | `base/VFZVb3aXfanWimsyb1EcY65On6c` | 多维表格 | `_common/08_backlog.md` |
| 插件 ID（client_id/pid/option_id） | `sheets/shtcnlXOVQicx407Qs5xWs8euqb`（Sheet `7JaGqO`） | 电子表格 | 无（实时查表） |
| 版本台账 | `base/XmxhbAt1aaYDZWssW00cKRlSnzh` | 多维表格 | `_common/09_version_ledger.md` |
| 客户端方案拆解 | 飞书文档副本（每插件一份） | 文档 | 无（读飞书副本） |
