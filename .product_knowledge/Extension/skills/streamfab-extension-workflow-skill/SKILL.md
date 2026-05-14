---
name: streamfab-extension-workflow
description: 把已初始化的 StreamFab 插件知识库从 L0 推进到 L5 已上线，覆盖产品页提取、飞书同步、客户端拆解、缺口检查和上线收尾，不重复做初始化。
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
---

# StreamFab Extension Workflow

把”做一个新插件”拆成固定节点，避免每次靠对话临时拼流程。

## 可视化流程图

[FigJam：StreamFab 插件知识库工作流](https://www.figma.com/board/WKZcu20Nz4AX79kX0efh7C)

## 目标

把一个新插件从“已起盘”推进到“可归档”，覆盖以下固定节点：

1. 初始化状态确认
2. 产品页事实提取
3. 飞书定稿同步
4. 客户端拆解回填
4.5. context / patterns / constraints 回填
5. 缺口检查
6. 收尾追问
7. 上线收尾

## 与 init 的切换关系

### 什么时候由 init 切到 workflow

当 `streamfab-plugin-init` 已完成以下事项时，本 skill 必须接管：

- 本地插件目录已存在
- 核心骨架文档已存在
- 飞书客户端拆解文档已创建（1份）
- 用户开始提供产品页、飞书定稿信息或客户端拆解信息

### workflow 接管后的第一优先级

默认优先进入：

- `节点 2：产品页事实提取`

如果用户不是先给产品页，而是先说“飞书文档已补完”或直接给客户端拆解信息，则允许跳过前序节点，直接进入对应节点。

### 什么情况下不回退到 init

只要插件目录已经存在且结构基本齐全，就不再回退到 `streamfab-plugin-init`，除非用户明确要求重新初始化或修复骨架。

## 边界

- 本 skill 不重新创建插件目录
- 本 skill 不重复创建飞书模板文档
- 公开知识库只写已确认、已定稿、可共享的信息
- “待确认 / 未验证 / 开放问题”不写入正式知识库正文
- 真正阻塞归档的问题只在对话里追问

## 提问机制

本 skill 的提问默认使用 `AskUserQuestion`，目标是把补问变成结构化收集，而不是临时聊天。

使用原则：

- 只在确实阻塞当前节点时提问
- 一次提问尽量覆盖当前节点所需的关键信息
- 问题数量保持克制
- 用户已明确给出的信息不重复问
- 不把“思考过程”包装成提问

适用场景：

- 节点 2 缺产品页 URL
- 节点 3 缺飞书文档入口
- 节点 4 缺关键截图或字段说明
- 节点 6 需要收尾追问

不适用场景：

- 可以从现有文档中自行判断的信息
- 不影响当前回填的小差异
- 风格偏好或可后补问题

## AskUserQuestion 标准模板

### 模板 A：产品页事实提取补问

适用场景：

- 插件已初始化
- 当前缺产品页或目标站点链接

推荐字段：

1. `client_product_url`
   - 提示语：`请提供客户端产品页链接，我将先从中提取客观事实并回填知识库。`
2. `target_site_url`
   - 提示语：`如需要同步站点侧结构，请提供目标站点链接。`

使用规则：

- 只在缺链接时使用
- 一轮问完后立即进入产品页事实提取

示例问法：

- `client_product_url`
  - `请提供客户端产品页链接，我将先从中提取客观事实并回填知识库。`
- `target_site_url`
  - `如需要同步站点侧结构，请提供目标站点链接。`

### 模板 B：飞书定稿同步补问

适用场景：

- 用户说飞书已补完
- 但当前缺客户端拆解文档入口

推荐字段：

1. `client_breakdown_doc_url`
   - 提示语：`请提供客户端方案拆解飞书文档链接。`

使用规则：

- 只收集客户端拆解文档链接，需求文档和 UI 文档使用本地 MD 文件（`requirements/plugin_requirement.md`、`requirements/plugin_ui_requirement.md`，由 init skill 从 common_templates 生成）
- 收到链接后立即用 `lark-cli docs +fetch` 读取

### 模板 C：客户端拆解回填补问

适用场景：

- 当前进入客户端拆解阶段
- 但缺少足以回填的观察信息

推荐字段：

1. `page_type_or_screenshot`
   - 提示语：`请提供页面类型说明或页面截图。`
2. `settings_fields`
   - 提示语：`请提供当前页面可见的配置项字段。`
3. `state_notes`
   - 提示语：`请提供当前页面的状态说明，例如未登录、检测中、可下载、失败等。`
4. `final_copy`
   - 提示语：`如有已定稿文案，请一并提供。`

使用规则：

- 只围绕当前回填节点收集信息
- 不提前追问发布信息或商业信息

示例问法：

- `page_type_or_screenshot`
  - `请提供页面类型说明或页面截图。`
- `settings_fields`
  - `请提供当前页面可见的配置项字段。`
- `state_notes`
  - `请提供当前页面的状态说明，例如未登录、检测中、可下载、失败等。`
- `final_copy`
  - `如有已定稿文案，请一并提供。`

### 模板 D：收尾追问

适用场景：

- 已完成产品页、飞书、客户端三轮主要同步
- 当前仅剩关键归档字段未齐

推荐字段池：

1. `pid`
   - 提示语：`请提供最终 pid。`
2. `client_id`
   - 提示语：`请提供最终 client id。`
3. `option_id`
   - 提示语：`请提供最终 option id。`
4. `final_store_url`
   - 提示语：`请提供最终商店页链接或发布状态。`
5. `final_boundary`
   - 提示语：`请确认最终支持边界或关键状态归类。`

使用规则：

- 最多选 5 个真正阻塞的问题
- 回答完成后立即收尾，不继续扩展

示例问法：

- `pid`
  - `请提供最终 pid。`
- `client_id`
  - `请提供最终 client id。`
- `option_id`
  - `请提供最终 option id。`
- `final_store_url`
  - `请提供最终商店页链接或发布状态。`
- `final_boundary`
  - `请确认最终支持边界或关键状态归类。`

## 固定节点

### 节点 1：初始化状态确认

仅做轻量确认，不重做初始化。

确认项：

- 插件目录是否已存在
- 3 份飞书文档是否已存在
- 当前处于哪个完成度等级

如果未初始化，返回给 `streamfab-plugin-init`。
如果已初始化，立即进入后续节点。

**确认完成后，必须主动索取需求文档：**

> 初始化已确认。请提供以下飞书文档链接，我将用 `lark-cli docs +fetch` 直接读取并回填知识库：
> 1. 需求文档（plugin_requirement）
> 2. UI 需求说明（plugin_ui_requirement）
> 3. 客户端方案拆解（可选，有则提供）

用 `lark-cli docs +fetch --doc <url> --as user --format pretty` 读取，内容回填到对应知识库文件。不等用户说"已补完"，主动发起读取。

### 节点 2：产品页事实提取

当用户给出客户端产品页或官网产品页链接时：

1. 先将客观事实落到：
   - `references/client_product_page_notes.md`
2. 再按主题分发到主干文档：
   - `01_product_brief.md`
   - `02_functional_architecture.md`
   - `03_page_structure.md`
   - `06_business_rules.md`
   - `07_technical_constraints.md`
   - `requirements/plugin_requirement.md`
   - `requirements/plugin_ui_requirement.md`

只提取：

- 产品名
- 价格与商业方案
- 分辨率、格式、音频、编码
- 产品页明确承诺的功能
- 使用流程
- 合规文案
- 系统要求

不把产品页未写明的信息扩写成规则。

如果产品页链接缺失，使用 `AskUserQuestion` 直接收集：

- `client_product_url`
- 如有必要：`target_site_url`

### 节点 3：飞书定稿同步

**文档获取方式：**
- 优先使用节点 1 已收集到的文档链接，用 `lark-cli docs +fetch --doc <url> --as user --format pretty` 直接读取
- 如节点 1 未收到链接，通过 `AskUserQuestion` 一次性补问 3 份文档链接，再用 `lark-cli docs +fetch` 读取

当文档链接可用时（无论用户是否说"已补完"）：

1. 读取：
   - 需求文档
   - UI 需求说明
   - 客户端方案拆解
2. 提取定稿字段：
   - app id / pid / option id / client id / mlink
   - 跳转链接
   - Banner 文案
   - 界面差异点
   - 客户端流程
   - 配置项
   - 试用和付费规则
   - 状态说明
   - 商店素材要求
3. 回填到对应知识库文件

**回填 plugin_requirement.md / plugin_ui_requirement.md 的硬约束（强制）：**

写入这两个文件前必须先 Read `Extension/common_templates/plugin_requirement_template.md` 和 `Extension/common_templates/plugin_ui_requirement_template.md`，按其章节结构填值：

- 模板已有的章节必须保留（如需求模板的 `### 网站信息` 是必填节）
- 不增加模板没有的章节（如 `## 数据上报`、`## 全局变量`、`## 相关文档`、`## 文档目的`、`## 设计需求拆分` 等都不属于模板章节，即使飞书原文有，也不在正式文档里另立节，而是并入模板已有节或不写入）
- 不删除模板的必填节
- 占位符（`{SiteName}` / `{sitename}` / `{BannerContentEN}` / `{ThirdStoreProductImageCaption}` 等）替换为飞书定稿值
- `{SiteName}` 按需求文档「流媒体服务名」原始大小写填写，用于插件产品名、CoApp 安装程序名、mlink 链接中的服务名片段；例如流媒体服务名为 `FANZA` 时写 `StreamFab_FANZA_Downloader_for_Browser`、`StreamFab_FANZA_Coapp`
- `{sitename}` 一律小写，用于 app id 和跳转链接（产品页 URL、What's New、订阅 / 升级付费链接）；例如 `streamfab_for_browser_fanza`、`fanza-downloader-for-browser.htm`、`pid=fanza-downloader`，不是 `pid=FANZA-downloader`
- 飞书未提供的字段对应单元格留空，不写"待确认"等兜底句
- markdown 链接禁用嵌套方括号语法（如 `[[Feature][新品]X](url)` 会导致渲染器跳错），改用单层文本
- Setting 配置项严格按模板顺序，站点差异化项（如 Hulu 的 Video Codec）追加到模板末尾，不插入中间

如果某字段在飞书里仍为空，不编造，只在对话里指出缺口。

**节点 3 附加步骤：从 pid 表格自动读取并回填 Client ID 和 pid**

在飞书定稿同步完成后，立即执行以下操作：

1. 用 `lark-cli sheets +read` 读取 pid 总表：
   - URL：`https://i6a1sqw3p2.feishu.cn/sheets/shtcnlXOVQicx407Qs5xWs8euqb`
   - Sheet ID：`7JaGqO`（StreamFab for Browser）
   - 范围：`A1:J100`（覆盖全部产品行）

2. 按产品名定位对应行组（每组 4 行）：
   - 第 1 行：`[产品名] Coapp - win` → B 列 = pid (Win)，C 列 = Option ID (Win)，F 列 = 主站 CoApp Win x64 Client ID，I 列 = 品牌站 CoApp Win x64 Client ID
   - 第 2 行：`[产品名] Coapp - macos` → B 列 = pid (Mac)，C 列 = Option ID (Mac)，F 列、I 列的 x86 数据当前不入需求文档
   - 第 3 行：null（macOS Client ID 行）→ F 列 = 主站 CoApp Mac Client ID，I 列 = 品牌站 CoApp Mac Client ID
   - 第 4 行：`[产品名] Downloader for Browser` → F 列 = 主站插件（发布）Client ID，I 列 = 品牌站插件（发布）Client ID

3. 将读取结果回填到 `requirements/plugin_requirement.md` 的三处：
   - **pid / Option ID 字段**（4 行）：
     - `pid | Win` → 第 1 行 B 列
     - `pid | Mac` → 第 2 行 B 列
     - `option id | Win` → 第 1 行 C 列
     - `option id | Mac` → 第 2 行 C 列
   - **Client ID 表格**（6 行）：
     - `client id — 主站 | 插件（发布）` → 第 4 行 F 列
     - `client id — 主站 | CoApp Win x64` → 第 1 行 F 列
     - `client id — 主站 | CoApp Mac` → 第 3 行 F 列
     - `client id — 品牌站 | 插件（发布）` → 第 4 行 I 列
     - `client id — 品牌站 | CoApp Win x64` → 第 1 行 I 列
     - `client id — 品牌站 | CoApp Mac` → 第 3 行 I 列
   - **付费 / Upgrade 跳转链接**：将链接末尾的 `{pid}` 替换为第 1 行 B 列的 Win pid

4. 如果表格中对应行不存在或值为空：在对话中告知用户哪项缺失，不编造数据，对应单元格留空。

如果缺飞书入口，优先通过一次 `AskUserQuestion` 收集：

- 需求文档链接
- UI 需求文档链接
- 客户端拆解文档链接

### 节点 4：客户端拆解回填

当用户继续给截图、页面字段、观察结果时：

- 页面结构 -> `03_page_structure.md`
- 交互与状态 -> `04_interaction_details.md`
- 模块关系 -> `02_functional_architecture.md`
- 业务规则 -> `06_business_rules.md`
- 技术参数 -> `07_technical_constraints.md`
- UI 差异 -> `05_design_principles.md` / `requirements/plugin_ui_requirement.md`

如果用户给的是最终定稿文案，直接按定稿回填。

如果当前缺客户端拆解输入，使用 `AskUserQuestion` 聚焦收集：

- 页面截图或页面类型
- 配置项字段
- 状态说明
- 已定稿文案

### 节点 4.5：context / patterns / constraints 回填

在核心文件 01–07 完成后，触发此节点：

- `context/product_brief.md`：产品名、定位、加密/协议支持摘要
- `context/business_rules.md`：Trial / Premium 规则摘要
- `patterns/user_flows.md`：主流程 + 分支（不支持、分析失败、登录中断）
- `patterns/error_handling.md`：各错误场景触发条件、展示形式、文案、可重试性
- `patterns/settings_configuration_matrix.md`：下载区配置项 + Setting 配置项 + 与参考插件的差异
- `constraints/tech_limits.md`：加密支持范围、超时、结构限制
- `constraints/platform_diffs.md`：平台支持、CoApp 下载链接

规则：
- 内容从已有 01–07 核心文件提炼，不额外收集新信息
- 只写已确认事实，与核心文件保持一致，不重复展开

### 节点 5：缺口检查

每完成一轮同步后，都做一次轻量检查。

**执行前加载：** `references/checklist_gap_check.md`，逐行对照，不跳项。

只在对话里说明当前完成度和剩余阻塞项，不把缺口写进共享知识库正文。

### 节点 6：收尾追问

只在产品页同步、飞书定稿同步、客户端拆解回填都做完后再触发。

规则：

- 只问真正阻塞归档的问题
- 最多 5 个
- 优先问：
  1. 正式链接 / pid / client id / option id / app id
  2. 最终定稿文案
  3. 商店页或发布状态
  4. 客户端边界定义
  5. 少量关键状态归类

执行方式：

- 优先使用一次 `AskUserQuestion`
- 问题总数不超过 5 个
- 每个问题都必须直接服务于归档收尾
- 回答完成后立即进入最终回填，不再继续发散提问

### 节点 7：上线收尾

当用户确认插件已上线（或即将封版发布）时触发，执行以下操作：

**执行前加载：** `references/template_version_history.md` 和 `references/template_changelog_entry.md`，按模板填空。

**必须更新：**

1. `version_history.md`（位于插件根目录）
   - 新增版本行：版本号、CoApp 版本、发布日期、状态（已封版）、关键变更
   - 如文件不存在，以 `references/template_version_history.md` 为基础创建
2. `CHANGELOG.md`（位于插件根目录）
   - 新增版本 section，包含本次发布所有变更项
3. `Extension/index.md`
   - 将该插件状态从"产品准备中"改为"已上线"
4. 插件 `00_overview.md`
   - 更新发布状态描述（例如："首版（V1001）已于 YYYY-MM-DD 发布"）
5. 插件 `README.md`
   - 更新当前进度描述反映上线状态

**条件触发：**
- 如 context/ patterns/ constraints/ 目录尚未回填，同时完成节点 4.5

**版本号收集：**
如用户未主动说明版本号，补问：
- 插件版本号
- CoApp 版本号
- 发布日期（默认今天）
- 关键变更项（可从 CHANGELOG 草稿中归纳）

## 节点切换规则

### 从节点 2 切到节点 3

满足任一条件即可：

- 用户明确说“3 份飞书文档已补完”
- 用户给出飞书文档链接
- 用户要求“从飞书定稿回填知识库”

### 从节点 3 切到节点 4

满足任一条件即可：

- 用户开始给客户端截图
- 用户开始给页面字段、配置项、状态说明
- 用户明确说“开始拆客户端”

### 从节点 4 切到节点 5

当一轮客户端信息已回填完成，且没有新的同类输入时，自动进入缺口检查。

### 从节点 5 切到节点 6

满足以下条件时进入收尾追问：

- 已完成产品页事实同步
- 已完成飞书定稿同步
- 已完成至少一轮客户端拆解回填
- 当前剩余问题数量有限，且都属于关键归档字段

### 终止条件

达到以下状态时，可判定该插件进入可归档状态：

- 主干文档完整
- 关键定稿字段齐全
- 客户端核心结构已补齐
- 剩余仅为非阻塞小缺口

## 标准输出格式

每推进一个节点后，统一按这个顺序汇报：

1. `当前阶段`
2. `本轮已同步内容`
3. `更新的文件`
4. `当前完成度`
5. `下一步建议`

## 固定回合输出模板

### 当前阶段

使用固定短语，例如：

- `初始化完成`
- `产品页事实已同步`
- `飞书定稿已同步`
- `客户端拆解同步中`
- `客户端拆解已同步`
- `可进入收尾`

### 本轮已同步内容

只写本轮新增或新确认的信息：

- 新确认事实
- 新定稿文案
- 新补齐的链接 / id / 配置项
- 新同步的客户端结构

### 更新的文件

直接列本轮改动文件，使用可点击绝对路径。

### 当前完成度

固定使用 `L0-L4`。

### 下一步建议

只给 1 到 3 条最值得继续做的动作。

## 完成度定义

- `L0 初始化`
  - 目录和 3 份飞书文档已建立
- `L1 产品页同步`
  - 产品页客观事实已回填
- `L2 飞书定稿同步`
  - 需求 / UI / 客户端拆解定稿信息已同步
- `L3 客户端拆解完善`
  - 页面、交互、状态、参数已补齐；context / patterns / constraints 已回填
- `L4 收尾可归档`
  - 结构完整，剩余仅为非阻塞小缺口
- `L5 已上线`
  - version_history.md 已记录；CHANGELOG.md 已有发布 section；index.md 状态为"已上线"；00_overview.md / README.md 已更新

## 提问规则

只问阻塞问题，而且一次最多 3 个；进入收尾追问节点时最多 5 个。

优先顺序：

1. 会影响归档质量的正式字段
2. 会影响事实回填的关键信息
3. 会影响对外或对内口径的最终定稿内容

不追问：

- 风格偏好
- 可后补示例
- 不影响当前回填的补充说明

推荐提问风格：

- 字段式
- 结论式
- 单轮收集式

推荐执行顺序：

1. 先判断当前节点真正缺什么
2. 从对应模板中选择最少字段
3. 一次发出 `AskUserQuestion`
4. 收到答案后直接执行回填

避免：

- “顺便再问一下”式连续补问
- 为了显得周到而追加问题
- 在知识库结构已经足够清晰时继续扩展问题范围

## 交接语模板

当由 `streamfab-plugin-init` 切入本 skill 时，优先按这个格式接管：

- `当前阶段：初始化完成`
- `本轮已同步内容：插件目录和飞书文档已创建，后续进入知识库完善流程`
- `更新的文件：<插件目录路径>`
- `当前完成度：L0 初始化`
- `下一步建议：提供客户端产品页链接，开始产品页事实提取`
