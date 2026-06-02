# StreamFab 浏览器插件知识库框架

> 本文档为整个 `Extension/` 知识库的源头文档，所有写作 / 检索 / 创建新插件的行为都以本文档为准。
> 定稿后将迁移到 `_common/FRAMEWORK.md`，所有 skill、scaffold 脚本、写作规则都指向它。

---

## 一、整体哲学

**Knowledge Manager 基线 + 两类检测模式 + 插件差异**

- **Knowledge Manager 基线**：`_common/01_product_brief.md` 到 `_common/07_technical_constraints.md` 是所有插件共享的 01-07 主干入口。
- **两类检测模式**：`netflix_mode`（无预分析，对应 StreamFab 客户端 VIP 服务）/ `ytdlp_mode`（有预分析，多 Origin 探测）。任何插件归属其一。
- **三大区域**：
  1. 通用基线与扩展（`_common/`） —— 跨插件共性内容，01-07 对齐 Knowledge Manager，08+ 留给 common 级扩展事实
  2. 插件差异化（`streamfab_<x>/`） —— 每个插件用固定的 `plugin_differences.md` 记录自己的差异，不占用 common 编号
  3. 创建维护工具（`_common/templates/`、`scripts/`、`skills/`） —— 用于生产前两部分
- **一份阅读地图**：`_common/READING_MAP.md` —— AI 查任意插件事实时的阅读路线 + 插件检测模式归属表

---

## 二、完整目录结构

```
Extension/
│
├── _common/                                      【非插件内容统一在这】
│   │
│   ├── README.md                                  _common 索引与使用指南
│   ├── 01_product_brief.md                        产品线定位、核心能力、红线
│   ├── 02_functional_architecture.md              浏览器扩展 + CoApp 架构、检测模式、模块结构
│   ├── 03_page_structure.md                       Popup / Dashboard / Downloads / Modal / CoApp 安装流
│   ├── 04_interaction_details.md                  主流程、状态反馈、错误处理、设置保存
│   ├── 05_design_principles.md                    通用视觉、组件、布局、信息层级
│   ├── 06_business_rules.md                       通用账号、授权、配额、订阅状态；不维护单插件定价
│   ├── 07_technical_constraints.md                系统、浏览器、CoApp、DRM、并发、平台限制
│   ├── 08_backlog.md                              需求池快照（飞书需求池快照）
│   ├── 09_version_ledger.md                       全局版本台账（飞书版本台账快照，只含版本信息）
│   ├── 10_detection_modes.md                      检测模式、下载调度、状态机、模式差异
│   ├── 11_user_flows_and_error_handling.md        用户流程、异常分支、错误处理和反馈规则
│   ├── 12_ui_ux_visual_layout_specs.md            UI / UX / 视觉 / 布局详细规范
│   ├── 13_settings_matrix.md                      Setting 配置项矩阵
│   ├── 14_platform_and_technical_limits.md        平台差异、渠道差异和技术限制
│   ├── 15_glossary.md                             产品线术语表
│   ├── 16_new_plugin_kickoff_checklist.md         新插件启动检查清单
│   │
│   ├── references/                                非规范参考资料：调研、证据、历史方案
│   │   ├── README.md                               参考资料定位说明
│   │   ├── index.md                                参考资料索引
│   │   ├── vdh_v10_coapp_research_and_streamfab_options.md
│   │   └── vdh_v10_competitor_strategy_research.md
│   │
│   ├── prototype/                                 通用原型 Demo
│   │   └── index.html                               单一通用原型，不为单插件维护副本
│   │
│   ├── templates/                                 创建新插件用的模板
│   │   ├── plugin_requirement.md                    11 项差异维度模板
│   │   ├── plugin_ui_requirement.md                 UI 差异模板
│   │   ├── plugin_store_listing.md                  商店上架文案模板
│   │   ├── plugin_research.md                       站点调研笔记模板
│   │   └── index.md                                 模板索引
│   │
│   ├── scripts/                                   自动化脚本
│   │   ├── scaffold_plugin.py                       新插件 init 脚手架
│   │   └── audit_links.py                           broken link / 孤儿文档校验
│   │
│   ├── skills/                                    AI Skill 定义
│   │   ├── streamfab-extension-init-skill/
│   │   └── streamfab-extension-workflow-skill/
│   │
│   ├── FRAMEWORK.md                               框架定稿（本文档）
│   ├── READING_MAP.md                             AI 阅读路线 + 检测模式归属表
│   └── plugin_rules.md                            跨插件规则总览
│
├── streamfab_netflix_downloader_for_browser/         面向 Netflix 单站点下载（DRM 鉴权链路）
├── streamfab_disney_plus_downloader_for_browser/     面向 Disney Plus 单站点下载
├── streamfab_u_next_downloader_for_browser/          面向 U-NEXT / H-NEXT 双站点下载，最高 4K（H-NEXT 为附属订阅）
├── streamfab_fandango_at_home_downloader_for_browser/  面向 Fandango at Home 单站点下载
├── streamfab_m3u8_downloader_for_browser/            面向 M3U8 / HLS 协议的多站点下载
├── streamfab_mpd_downloader_for_browser/             面向 MPD（MPEG-DASH manifest）协议的下载，1080p MP4/MKV
├── streamfab_amazon_downloader_for_browser/          面向 Amazon Prime Video 单站点下载
├── streamfab_hulu_downloader_for_browser/            面向 Hulu 下载（hulu.com / hulu.jp 双地区，最高 4K + EAC3 5.1）
├── streamfab_fanza_downloader_for_browser/           面向 Fanza 单站点下载
├── streamfab_onlyfans_downloader_for_browser/        面向 OnlyFans 下载，支持 Message videos 和 DRM video
├── streamfab_myfans_downloader_for_browser/          面向 MyFans 单站点下载
├── streamfab_tver_downloader_for_browser/            面向 TVer 单站点下载
├── streamfab_video_downloader_for_browser/           通用多站点下载（yt-dlp 支持的站点，含 YouTube）
│
├── README.md                                      顶层入口（指向 FRAMEWORK 和 READING_MAP）
├── index.md                                       顶层文件索引
└── DAILY_CHANGELOG.md                             每晚 21:00 定时推 GitLab 脚本生成的变更清单（增 / 改 / 删按日记录）
```

---

## 三、各区域内容计划

### A. `_common/references/`（非规范参考资料）

`references/` 不维护现行规则，也不是 01+ 编号正文的详细规则源。现行规则必须写入 `_common/01+` 编号文件。

| 文件 | 内容范围 | 使用方式 |
| --- | --- | --- |
| `README.md` | references 定位说明 | 说明本目录只放参考资料 |
| `index.md` | 参考资料索引 | 查找调研 / 历史资料 |
| `vdh_v10_coapp_research_and_streamfab_options.md` | VDH v10 CoApp 调研与 StreamFab 方案评估 | 作为方案背景，不直接当规则引用 |
| `vdh_v10_competitor_strategy_research.md` | VDH v10 竞品策略调研 | 作为竞品背景，不直接当规则引用 |

不应放入：检测模式基线、业务规则、UI / UX / 视觉 / 布局规范、技术限制、错误处理、Setting 矩阵等现行规则。这些内容已进入 `_common/10_detection_modes.md` 到 `_common/16_new_plugin_kickoff_checklist.md`。
### B. `_common/prototype/`

| 文件 | 内容 |
| --- | --- |
| `index.html` | 全产品线通用原型（Dashboard / Setting / Detected / Downloading / Downloaded 等界面 demo），不为单插件维护副本 |

### C. `_common/templates/`（创建新插件的模板）

| 文件 | 内容 | 占位符 |
| --- | --- | --- |
| `plugin_requirement.md` | 11 项差异维度模板（含"价格与权益"块、明确化的"Dashboard - Banner 文案"） | `{SiteName}` / `{service_name}` / `{SiteNameMlink}` / `{sitename}` / `{BannerContentEN}` / `{BannerContentZH}` |
| `plugin_ui_requirement.md` | UI 差异模板 | 同上 |
| `plugin_store_listing.md` | Chrome / Edge 商店上架文案模板 | 同上 + Search terms 占位 |
| `plugin_research.md` | 站点调研笔记模板 | 同上 |
| `index.md` | 模板索引 + 每个模板用途说明 | — |

> `plugin_client_plan_template.md` 已废弃，客户端方案拆解走飞书副本，不在本地落地。

### D. `_common/scripts/`

| 文件 | 职责 |
| --- | --- |
| `scaffold_plugin.py` | 新插件 init：复制模板 + 替换占位符 + 创建空目录 |
| `audit_links.py` | 周期性校验：broken link / 孤儿文档 / 插件未引用 common / 内容片段复制粘贴检测 |

### E. `_common/skills/`

| Skill | 职责 |
| --- | --- |
| `streamfab-extension-init-skill/` | 接到"创建新插件" → 调用 `scaffold_plugin.py` → 输出飞书拆解模板 URL |
| `streamfab-extension-workflow-skill/` | 接到"推进插件" → 站点调研 → 产品页事实提取 → 等飞书副本 → 回填 plugin_requirement.md |

### F. `_common/` 顶层文档

| 文件 | 内容 |
| --- | --- |
| `README.md` | `_common` 索引与 Knowledge Manager 读取说明 |
| `01_product_brief.md` | 产品线定位、核心能力、红线 |
| `02_functional_architecture.md` | 浏览器扩展 + CoApp 架构、检测模式、模块结构 |
| `03_page_structure.md` | Popup / Dashboard / Downloads / Modal / CoApp 安装流 |
| `04_interaction_details.md` | 主流程、状态反馈、错误处理、设置保存 |
| `05_design_principles.md` | 通用视觉、组件、布局、信息层级 |
| `06_business_rules.md` | 通用账号、授权、配额、订阅状态；不维护单插件定价 |
| `07_technical_constraints.md` | 系统、浏览器、CoApp、DRM、并发、平台限制 |
| `08_backlog.md` | Extension 需求池快照；飞书多维表格为权威源 |
| `09_version_ledger.md` | 插件版本与 CoApp 版本台账快照；飞书多维表格为权威源 |
| `10_detection_modes.md` | netflix_mode / ytdlp_mode 检测、下载、调度、状态机和模式差异 |
| `11_user_flows_and_error_handling.md` | 用户主流程、异常分支、错误处理和反馈规则 |
| `12_ui_ux_visual_layout_specs.md` | UI / UX / 视觉 / 布局详细规范 |
| `13_settings_matrix.md` | Setting 配置项顺序、默认值和分区结构 |
| `14_platform_and_technical_limits.md` | 平台差异、渠道差异、CoApp、DRM、并发和技术限制 |
| `15_glossary.md` | 产品线术语表 |
| `16_new_plugin_kickoff_checklist.md` | 新插件启动检查清单 |
| `FRAMEWORK.md` | 本结构文档定稿，所有人 + 所有 skill 的唯一 source of truth |
| `READING_MAP.md` | AI 查任意插件事实的 3 步路线 + 插件检测模式归属表 |
| `plugin_rules.md` | 跨插件规则总览（检测模式 / 文档落位 / 视觉规范 / 大小写 / 阅读顺序） |

### G. 各插件目录（`streamfab_<x>_downloader_for_browser/`）

```
streamfab_<x>_downloader_for_browser/
├── README.md                         一句话定位 + 检测模式 + 文档导航
├── CHANGELOG.md                      该插件变更日志
├── plugin_differences.md                   差异总览：本插件 vs common 的所有差异点（AI 检索入口）
└── requirements/
    ├── index.md                       requirements 内文档清单
    ├── plugin_requirement.md          需求文档（对外交付给开发 / PM）
    ├── plugin_ui_requirement.md       UI 需求说明（主要给 UI 设计师出商店配图）
    ├── store_listing.md               商店上架文案
    └── site_research_notes.md         站点调研笔记（如果有调研产物）
```

#### G.1 `plugin_differences.md`（差异总览，AI 检索入口）

**性质**：元文档，列出本插件相对 `_common/` 基线的所有差异点，每条带索引指向真正承载内容的文档章节。
**受众**：AI 知识库、需要快速查"这个插件哪里不一样"的人。
**对外**：不主动分发；同事需求看 `plugin_requirement.md`。

**内容模板**：

```markdown
# {SiteName} — 差异总览

> 本插件与基线（_common/）的所有差异点。AI 检索用入口。
> 详细规格见引用的具体文档章节。

## 逻辑差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 价格与权益 | <如有特殊套餐 / Trial / Premium 差异，一句话概括> | requirements/plugin_requirement.md § 价格与权益 |
| 视频下载配置参数 | <配置项与基线不同点> | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 视频下载进度显示 | <文件大小 / Segment> | requirements/plugin_requirement.md § 视频下载 - 下载进度显示 |
| Banner 文案 | <本插件专属 EN / ZH 文案> | requirements/plugin_requirement.md § Dashboard - Banner 文案 |
| Setting 配置项 | <通用 7 项 / 有特殊项> | requirements/plugin_requirement.md § Setting Extension 配置项 |
| 跳转链接 | <主站 / 独立站 slug 与 pid> | requirements/plugin_requirement.md § 跳转链接 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 商店配图 | <第几张需替换为本站点内容> | requirements/plugin_ui_requirement.md |

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见 [_common/FRAMEWORK.md](../_common/FRAMEWORK.md)、[_common/READING_MAP.md](../_common/READING_MAP.md)。
```

#### G.2 `plugin_requirement.md`（需求文档）

**性质**：标准 PRD，对外交付给开发 / PM。
**结构**（参考 `_common/templates/plugin_requirement.md` 模板）：

```
## 产品信息（必填）
   - 安装程序信息（产品名 / app id / pid / option id / client id）
   - Mlink 链接
   - 网站信息（30 秒站点简介，正文 ≤ 20 行）

## 价格与权益（差异时填，无差异时整块删除）
   - 订阅价格
   - Trial 配额
   - Premium 日 / 周配额
   - 特殊套餐（如 H-NEXT 附属订阅）

## 变更说明
   - 全局变更
   - 模块变更（只标差异范围，不列字段明细）

## 变更信息
   - 跳转链接（必填）
   - 安装器（必填）
   - 视频下载 - 配置参数（差异时填）
   - 视频下载 - 下载进度显示（必填）
   - Dashboard - Banner 文案（必填，仅 Banner）
   - Setting - Extension 配置项（独立章节，差异时填）
```

> 文档保持干净的 PRD 形态，不在顶部堆"基线参照"块。差异索引由 `plugin_differences.md` 承担。

#### G.3 `plugin_ui_requirement.md`（UI 需求说明）

**性质**：UI 需求说明，主要给 UI 设计师**出商店配图**。
**承载内容**：商店配图调整说明、专属视觉元素。
**不承载**：UI 交互差异（这部分仍归 `plugin_requirement.md`，目前没有专门的 UI 交互差异章节，因为大部分插件 UI 交互沿用基线）。

### H. 外部数据源与本地快照

权威数据存在飞书多维表格，本地只存快照（或按需查表）。所有写作以飞书为准，本地快照标注同步日期。

| 数据 | 飞书权威源 | 类型 | 本地快照 | 同步规则 |
| --- | --- | --- | --- | --- |
| 需求池 | `base/VFZVb3aXfanWimsyb1EcY65On6c` | 多维表格 | `_common/08_backlog.md` | 飞书为准，本地定期快照，标注同步日期 |
| 插件 ID（client_id / pid / option_id） | `sheets/shtcnlXOVQicx407Qs5xWs8euqb`（Sheet `7JaGqO` StreamFab for Browser） | 电子表格 | 无本地快照 | workflow 实时查表（节点 3 已有逻辑），不存本地（ID 发布时才定） |
| 版本台账 | `base/XmxhbAt1aaYDZWssW00cKRlSnzh` | 多维表格 | `_common/09_version_ledger.md` | 飞书为准，本地快照只含版本信息（插件版本 ↔ CoApp 版本），不含 URL |
| 客户端方案拆解 | 飞书文档副本（每插件一份，从通用模板复制） | 文档 | 无本地快照 | workflow 读飞书副本作为权威输入，不在本地落 MD |

**插件 ID 表读取逻辑**（workflow 节点 3）：按产品名定位 4 行一组 —— Coapp-win / Coapp-macos / null / Downloader for Browser；列映射 B=pid C=option_id F=主站 client_id I=品牌站 client_id。

> 各插件不再各存 `version_history.md`；版本统一看 `_common/09_version_ledger.md`。
> 各插件需求不再各存需求池；统一看 `_common/08_backlog.md`。
> 客户端方案拆解走飞书文档副本，本地插件目录不存拆解 MD。

---

## 四、AI 阅读路线（写进 READING_MAP.md）

```
查任何插件的事实，按 4 步读取：

【步骤 1：通用 Knowledge Manager 基线】 _common/01-07
   01_product_brief / 02_functional_architecture / 03_page_structure /
   04_interaction_details / 05_design_principles / 06_business_rules /
   07_technical_constraints

【按需：common 扩展事实】 _common/08+
   08_backlog / 09_version_ledger / 10_detection_modes /
   11_user_flows_and_error_handling / 12_ui_ux_visual_layout_specs /
   13_settings_matrix / 14_platform_and_technical_limits /
   15_glossary / 16_new_plugin_kickoff_checklist

【步骤 2：检测模式基线】 _common/10_detection_modes.md
   按下方归属表确认插件模式；字段级细节按插件差异下钻

【步骤 3：差异总览】 streamfab_<plugin>_downloader_for_browser/plugin_differences.md
   一眼看清本插件的所有差异点和它们的文档位置

【步骤 4：详细规格】 按 plugin_differences.md 的索引，下钻到对应的：
   - requirements/plugin_requirement.md       逻辑细节
   - requirements/plugin_ui_requirement.md    UI 细节
   - requirements/store_listing.md            商店上架文案
```

### 插件检测模式归属表

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

**检测模式归属的写入时机**：
- init 阶段：新插件默认归 `netflix_mode`（12/13 都是），先在本表占位，保证表始终完整
- workflow 节点 2（站点调研）：调研后若发现实际是 `ytdlp_mode`，修正本表对应行
- 只有 Video 这类 yt-dlp 通用下载器才是 `ytdlp_mode`

---

## 五、写作 / 索引规则

| 规则 | 内容 |
| --- | --- |
| **共性 vs 差异判断** | 内容能写成"对所有插件都成立的句子" → 通用规则；写"X 插件相比基线不同" → 差异 |
| **位置约束** | 通用主干写在 `_common/01-07`；无法合并进 01-07 的 common 级事实从 `_common/08_*.md` 继续编号；现行规则只写在 `_common/01+` 编号文件；`references/` 只放非规范参考资料；插件差异只写在 `plugin_differences.md`；模板只在 `_common/templates/` |
| **引用方式** | 跨文档引用用相对路径 markdown link；不复制粘贴 |
| **检测模式归属** | 插件**不自己声明**检测模式，唯一权威是 `READING_MAP.md` 的归属表 |
| **不写"待确认 / 后续优化"** | 已落实文档禁止开放性兜底句 |
| **客户端方案拆解** | 走飞书副本，不在本地落地 |
| **插件文档保持干净** | 不在插件 `plugin_requirement.md` 顶部堆"基线参照"块；导航由 `READING_MAP.md` 承担 |

### 命名规则（流媒体服务名大小写）

| 变量 | 用途 | 格式 | 示例（U-NEXT） |
| --- | --- | --- | --- |
| `{SiteName}` | 插件产品名、CoApp 安装程序名、License Info | 保留展示名原始大小写 | `U-NEXT` |
| `{service_name}` | app id | snake_case | `u_next` |
| `{SiteNameMlink}` | mlink 链接产品名片段 | 展示名单词用 `_` 连接 | `U-NEXT`（无空格无连字符也可保留原样） |
| `{sitename}` | 产品页 URL、What's New、付费 / 升级跳转链接的 slug | 小写 + 连字符 | `unext`（U-NEXT 例外，直接小写连写） |

> **DRM-MPD 例外**：安装程序名用空格（`DRM MPD`），mlink 用连字符（`DRM-MPD`），app id 用下划线（`drm_mpd`）。
> **U-NEXT 跳转链接 slug 例外**：用 `unext`（无连字符），不用 `u-next`。

---

## 六、迁移代价（实施备忘）

| 变更项 | 影响 | 修复 |
| --- | --- | --- |
| `shared_references/` → `_common/references/` | 现有引用链接 | 全局替换 |
| `common_templates/` → `_common/templates/` | `scaffold_plugin.py` 路径常量 | 改脚本 |
| `scripts/` → `_common/scripts/` | `scaffold_plugin.py` 自身相对路径 | 改脚本 |
| `skills/` → `_common/skills/` | skill `SKILL.md` 中模板路径引用 | 改 skill |
| `streamfab-extension-prototype/` → `_common/prototype/` | 如有外部引用 | 全局搜索修复 |
| `common_plugin_rules.md` → `_common/plugin_rules.md` | 各文档引用 | 全局替换 |

---

## 七、版本

| 日期 | 版本 | 改动 |
| --- | --- | --- |
| 2026-05-26 | v1 草稿 | 首次起草，等校验 |
