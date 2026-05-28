# StreamFab 浏览器插件知识库框架

> 本文档为整个 `Extension/` 知识库的源头文档，所有写作 / 检索 / 创建新插件的行为都以本文档为准。
> 定稿后将迁移到 `_common/FRAMEWORK.md`，所有 skill、scaffold 脚本、写作规则都指向它。

---

## 一、整体哲学

**两类检测模式 + 三大区域 + 一份阅读地图**

- **两类检测模式**：`netflix_mode`（无预分析，对应 StreamFab 客户端 VIP 服务）/ `ytdlp_mode`（有预分析，多 Origin 探测）。任何插件归属其一。
- **三大区域**：
  1. 通用基线（`_common/`） —— 跨插件共性内容
  2. 插件差异化（`streamfab_<x>/`） —— 每个插件自己的差异
  3. 创建维护工具（`_common/templates/`、`scripts/`、`skills/`） —— 用于生产前两部分
- **一份阅读地图**：`_common/READING_MAP.md` —— AI 查任意插件事实时的 3 步路线 + 插件检测模式归属表

---

## 二、完整目录结构

```
Extension/
│
├── _common/                                      【非插件内容统一在这】
│   │
│   ├── references/                                通用规则文档
│   │   ├── user_flows.md                            主流程 / 异常流程
│   │   ├── error_handling.md                        错误处理基线
│   │   ├── business_rules.md                        权益 / 配额 / 合规
│   │   ├── settings_matrix.md                       通用 Setting 配置项
│   │   ├── platform_diffs.md                        Win / Mac 平台差异
│   │   ├── tech_limits.md                           通用能力边界
│   │   ├── visual_guidelines.md                     视觉规范
│   │   ├── ux_patterns.md                           交互模式
│   │   ├── layout_specs.md                          页面骨架 / 布局尺寸
│   │   ├── index.md                                 通用规则索引
│   │   └── baselines/
│   │       ├── netflix_mode.md                      Netflix 模式基线（含 M3U8 / MPD 变体小节）
│   │       └── ytdlp_mode.md                        ytdlp 模式基线
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
│   ├── version_ledger.md                          全局版本台账（飞书版本台账快照，只含版本信息）
│   ├── backlog.md                                 需求池快照（飞书需求池快照）
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

### A. `_common/references/`（通用规则）

| 文件 | 内容范围 | 不写什么 |
| --- | --- | --- |
| `user_flows.md` | 主流程：检测 → Detected → 下载 → 完成；异常分支（未登录 / 网络异常 / 被限流） | 站点专属流程 |
| `error_handling.md` | 错误大类：登录中断 / 网络 / CoApp 异常 / 配额耗尽。每类的 UI 表现、可重试性、用户引导 | 站点专属错误码 |
| `business_rules.md` | Trial（30 天 3 次 / 服务）、Premium（每日 100 / 每周 700 / 服务）、配额扣减时机、并发上限、退款基线 | 单插件价格 / 特殊套餐 |
| `settings_matrix.md` | 通用 Setting 7 项默认顺序及含义（Language / Video Format / Resolution / Audio Lang / Channel / Subtitle Lang / Subtitle Action） | 单插件特殊配置项 |
| `platform_diffs.md` | Win 11/10、macOS 11.0+ 系统门槛、CoApp 链接生成规则、Mac 限制 | 站点专属平台限制 |
| `tech_limits.md` | 通用能力边界：最高 4K、H.264/265 编解码、字幕格式、批量下载上限 | 单插件分辨率 / 编码限制 |
| `visual_guidelines.md` | 颜色、字体、圆角、边框、阴影、间距、组件状态 | 单插件视觉例外 |
| `ux_patterns.md` | 界面结构、页面职责、通知 / 阻断逻辑 | 单插件交互例外 |
| `layout_specs.md` | 页面骨架、布局比例、容器尺寸、关键控件尺寸 | 单插件布局例外 |
| `baselines/netflix_mode.md` | netflix_mode 检测 / 下载流程 + M3U8 / MPD 协议变体小节 | ytdlp 模式逻辑 |
| `baselines/ytdlp_mode.md` | ytdlp_mode 预分析 / 多 Origin / 检测下载并行 | netflix 模式逻辑 |

#### baselines 文档骨架（初版，后续完善）

**`netflix_mode.md`**
```
一、模式定义
   核心特征：不支持预分析
   分析方式：直出分析（CoApp 直接对当前页 / 单 Origin 分析）
   并行能力：下载与分析可并行
   对应业务：StreamFab 客户端 VIP 服务

二、检测 / 下载流程
   （后续填）

三、变体 - M3U8 协议特例
   插件侧增加一段"页面结构预判断"：
   1. 先从网页结构判断是否为视频页；非视频页直接不支持，不进 CoApp
   2. 通过预判断后，进入标准 CoApp 分析流程（20 秒超时）
   3. 超时或不支持时引导前往 StreamFab 客户端
   其余逻辑同 netflix_mode

四、变体 - MPD 协议特例
   （后续填）
```

**`ytdlp_mode.md`**
```
一、模式定义
   核心特征：支持预分析
   分析方式：预分析（多 Origin 预探测）+ CoApp 分析
   并行能力：检测与下载可并行
   多站点：基于 yt-dlp 支持的站点池

二、检测 / 下载流程
   （后续填）

三、与 netflix_mode 的核心区别
   | 维度 | netflix_mode | ytdlp_mode |
   | 预分析 | ❌ | ✅ |
   | Origin | 单 Origin | 多 Origin 探测 |
   | 内容覆盖 | 单站点 / 单协议（M3U8 / MPD 含多站点） | yt-dlp 站点池 |
   | 业务对应 | VIP 服务 | 通用下载器 |
```

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

### F. `_common/` 顶层三份文档

| 文件 | 内容 |
| --- | --- |
| `FRAMEWORK.md` | 本结构文档定稿，所有人 + 所有 skill 的唯一 source of truth |
| `READING_MAP.md` | AI 查任意插件事实的 3 步路线 + 插件检测模式归属表 |
| `plugin_rules.md` | 跨插件规则总览（检测模式 / 文档落位 / 视觉规范 / 大小写 / 阅读顺序） |

### G. 各插件目录（`streamfab_<x>_downloader_for_browser/`）

```
streamfab_<x>_downloader_for_browser/
├── README.md                         一句话定位 + 检测模式 + 文档导航
├── CHANGELOG.md                      该插件变更日志
├── diff_summary.md                   差异总览：本插件 vs common 的所有差异点（AI 检索入口）
└── requirements/
    ├── index.md                       requirements 内文档清单
    ├── plugin_requirement.md          需求文档（对外交付给开发 / PM）
    ├── plugin_ui_requirement.md       UI 需求说明（主要给 UI 设计师出商店配图）
    ├── store_listing.md               商店上架文案
    └── site_research_notes.md         站点调研笔记（如果有调研产物）
```

#### G.1 `diff_summary.md`（差异总览，AI 检索入口）

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

> 文档保持干净的 PRD 形态，不在顶部堆"基线参照"块。差异索引由 `diff_summary.md` 承担。

#### G.3 `plugin_ui_requirement.md`（UI 需求说明）

**性质**：UI 需求说明，主要给 UI 设计师**出商店配图**。
**承载内容**：商店配图调整说明、专属视觉元素。
**不承载**：UI 交互差异（这部分仍归 `plugin_requirement.md`，目前没有专门的 UI 交互差异章节，因为大部分插件 UI 交互沿用基线）。

### H. 外部数据源与本地快照

权威数据存在飞书多维表格，本地只存快照（或按需查表）。所有写作以飞书为准，本地快照标注同步日期。

| 数据 | 飞书权威源 | 类型 | 本地快照 | 同步规则 |
| --- | --- | --- | --- | --- |
| 需求池 | `base/VFZVb3aXfanWimsyb1EcY65On6c` | 多维表格 | `_common/backlog.md` | 飞书为准，本地定期快照，标注同步日期 |
| 插件 ID（client_id / pid / option_id） | `sheets/shtcnlXOVQicx407Qs5xWs8euqb`（Sheet `7JaGqO` StreamFab for Browser） | 电子表格 | 无本地快照 | workflow 实时查表（节点 3 已有逻辑），不存本地（ID 发布时才定） |
| 版本台账 | `base/XmxhbAt1aaYDZWssW00cKRlSnzh` | 多维表格 | `_common/version_ledger.md` | 飞书为准，本地快照只含版本信息（插件版本 ↔ CoApp 版本），不含 URL |
| 客户端方案拆解 | 飞书文档副本（每插件一份，从通用模板复制） | 文档 | 无本地快照 | workflow 读飞书副本作为权威输入，不在本地落 MD |

**插件 ID 表读取逻辑**（workflow 节点 3）：按产品名定位 4 行一组 —— Coapp-win / Coapp-macos / null / Downloader for Browser；列映射 B=pid C=option_id F=主站 client_id I=品牌站 client_id。

> 各插件不再各存 `version_history.md`；版本统一看 `_common/version_ledger.md`。
> 各插件需求不再各存需求池；统一看 `_common/backlog.md`。
> 客户端方案拆解走飞书文档副本，本地插件目录不存拆解 MD。

---

## 四、AI 阅读路线（写进 READING_MAP.md）

```
查任何插件的事实，按 4 步读取：

【步骤 1：通用】 _common/references/
   user_flows / error_handling / business_rules / settings_matrix /
   platform_diffs / tech_limits / visual_guidelines / ux_patterns / layout_specs

【步骤 2：基线】 _common/references/baselines/<netflix_mode|ytdlp_mode>.md
   按下方归属表选一份

【步骤 3：差异总览】 streamfab_<plugin>_downloader_for_browser/diff_summary.md
   一眼看清本插件的所有差异点和它们的文档位置

【步骤 4：详细规格】 按 diff_summary.md 的索引，下钻到对应的：
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
| **位置约束** | 通用规则只写在 `_common/references/`；差异只写在插件目录；模板只在 `_common/templates/` |
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
