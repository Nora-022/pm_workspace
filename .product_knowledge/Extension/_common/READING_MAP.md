# 知识库阅读地图

> AI / 人查任意插件的事实时，按本文件的 4 步路线读取。
> 框架总览见 [FRAMEWORK.md](FRAMEWORK.md)。

## 查任意插件，按 4 步读取

### 步骤 1：通用规则（所有插件共享）

读 `_common/references/` 下：

- user_flows.md — 主流程 / 异常流程
- error_handling.md — 错误处理基线
- business_rules.md — 权益 / 配额 / 合规
- settings_matrix.md — 通用 Setting 配置项
- platform_diffs.md — Win / Mac 平台差异
- tech_limits.md — 通用能力边界
- visual_guidelines.md — 视觉规范
- ux_patterns.md — 交互模式
- layout_specs.md — 页面骨架 / 布局尺寸
- glossary.md — 术语表

### 步骤 2：检测模式基线（按归属表选一份）

读 `_common/references/baselines/<netflix_mode|ytdlp_mode>.md`。
字段级细节可参考 Netflix 插件的 00-07（活样例）。

### 步骤 3：差异总览

读 `streamfab_<plugin>_downloader_for_browser/diff_summary.md`，一眼看清本插件所有差异点及其文档位置。

### 步骤 4：详细规格（按 diff_summary 索引下钻）

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
| 需求池 | `base/VFZVb3aXfanWimsyb1EcY65On6c` | 多维表格 | `_common/backlog.md` |
| 插件 ID（client_id/pid/option_id） | `sheets/shtcnlXOVQicx407Qs5xWs8euqb`（Sheet `7JaGqO`） | 电子表格 | 无（实时查表） |
| 版本台账 | `base/XmxhbAt1aaYDZWssW00cKRlSnzh` | 多维表格 | `_common/version_ledger.md` |
| 客户端方案拆解 | 飞书文档副本（每插件一份） | 文档 | 无（读飞书副本） |
