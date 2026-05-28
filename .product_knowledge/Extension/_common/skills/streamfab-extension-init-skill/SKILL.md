---
name: streamfab-plugin-init
description: 初始化新的 StreamFab 插件知识库目录，创建骨架文件；客户端方案拆解走飞书副本，不再生成本地 md。完成后交接给 streamfab-extension-workflow 先做站点调研 / 产品页事实提取，再让用户交付飞书拆解副本 URL。
allowed-tools:
  - Bash
  - Read
  - Write
---

# StreamFab Extension Init

当用户说“创建一个新插件”“初始化某个插件”“按浏览器插件 init 流程建插件”时，使用这个 skill。

## 目标

把一句”创建 `<service>` 插件”落成一个可继续推进的起点，至少完成：

- 在 `Extension/` 下创建或修复插件目录
- 按当前统一结构初始化本地知识库（00–07 骨架 + CHANGELOG + requirements/index.md）
- **不创建本地客户端方案拆解 md**；客户端方案拆解走飞书副本：
  - 通用模板 URL：`https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf`
  - 用户在飞书复制本模板为副本，重命名为 `[StreamFab 浏览器插件] - 客户端方案拆解 - <display_name>`，再把副本 URL 交付给 AI（workflow 阶段使用）
- 不调用 `create_feishu_plugin_docs.py`
- 需求文档和 UI 需求说明不在 init 阶段生成；workflow 先做站点调研 / 产品页事实提取，再等用户在飞书填完拆解副本后，从 common 模板创建并回填
- 输出：插件本地路径、模式、飞书拆解模板 URL 及"复制 / 重命名 / 交付副本 URL"使用提示

## 职责边界

- 本 skill 只负责初始化
- 不负责站点调研或需求文档 `### 网站信息` 回填
- 不负责产品页事实提取
- 不负责需求文档 / UI 需求说明创建或回填
- 不负责客户端拆解信息回填
- 不负责缺口检查和收尾追问

初始化完成后，先交接给 `streamfab-extension-workflow` 做站点调研 / 产品页事实提取；事实提取完成后，再提示用户填写客户端方案拆解 MD。用户确认填写完成后，workflow 继续生成 / 回填需求文档和 UI 需求说明。

## 初始化后的切换规则

满足以下条件时，`streamfab-plugin-init` 必须结束，交由 `streamfab-extension-workflow` 接管：

1. 插件目录已创建或修复
2. 核心 Markdown 骨架已存在
3. 已向用户输出飞书拆解模板 URL 及"复制 / 重命名 / 交付副本 URL"提示
4. 已返回插件本地路径和模式

切换时必须明确说明：

- `初始化完成`
- `下一步进入 streamfab-extension-workflow，先做站点调研 / 产品页事实提取`
- `事实提取完成后，请把你在飞书复制并填写后的客户端方案拆解副本 URL 交付给我，继续 workflow`

如果缺少初始化最小必要信息，则停留在本 skill 内继续补问；一旦最小必要信息齐全，不再追加后续流程问题。

## 最小必要输入

初始化默认只问这 2 个字段：

1. `service_name`
2. `display_name`

初始化阶段不追问客户端产品页 URL、目标站点 URL、pid、client id、option id、站点调研信息或客户端拆解字段；这些都由 workflow 后续处理。

## 提问机制

缺少信息时，直接用对话文本分别问，不使用复杂问卷。

规则：

- 每个问题单独问，不合并成多选表单
- 用户已给出的字段不重复询问
- 在初始化阶段不追问后续流程字段

提问顺序（缺什么问什么）：

1. `service_name`：`站点标识是什么？使用 snake_case，例如 crunchyroll、disney_plus。`
2. `display_name`：`展示名称是什么？例如 Crunchyroll、Disney Plus。`

## 目录命名规则

插件目录命名固定为：

`streamfab_<service_name>_downloader_for_browser`

## 当前统一结构

插件目录至少包含：

- `README.md`
- `00_overview.md`
- `01_product_brief.md`
- `02_functional_architecture.md`
- `03_page_structure.md`
- `04_interaction_details.md`
- `05_design_principles.md`
- `06_business_rules.md`
- `07_technical_constraints.md`
- `CHANGELOG.md`
- `requirements/index.md`
- `requirements/store_listing.md`（Chrome / Edge 应用商店上架信息，init 阶段从 `_common/templates/plugin_store_listing_template.md` 拷贝并替换 `{SiteName}` 等占位符；上架前由 PM 补充截图、Search terms 等待填字段）

`requirements/plugin_requirement.md` 和 `requirements/plugin_ui_requirement.md` 是 workflow 阶段的产物：先由 workflow 完成站点调研 / 产品页事实提取，再等用户在飞书完成拆解副本填写后，从 common 模板创建并回填。

客户端方案拆解走飞书副本（模板 URL：`https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf`），不再在插件目录下生成本地 md 文件。

禁止继续创建旧 `00_*` 文件：

- `00_planning_context.md`
- `00_decision_log.md`
- `00_context_and_decisions.md`

## 文档写作规则

- 公开知识库只写已确认、可归档、可共享的内容
- 未决问题不写入正式知识库正文
- 初始化阶段不写“待确认”“open questions”“roadmap”
- 目录入口文件应保留正文内容，只在“文件结构”部分使用树状结构加行尾概述

## 本地 Markdown 文档规则

init 阶段由 `scaffold_plugin.py` 生成两类本地文件：

1. **骨架文件**：从 `_common/skills/streamfab-extension-init-skill/references/` 读取，生成 00–07、CHANGELOG、requirements/index.md，替换 `{display_name}` / `{service_name}` 占位符。
2. **上架信息文档**：从 `_common/templates/plugin_store_listing_template.md` 拷贝到 `requirements/store_listing.md`，替换 `{SiteName}` → display_name、`{SiteNameMlink}` → display_name 单词用 `_` 连接、`{sitename}` → service_name 连字符小写形式。截图、Search terms 等待填字段由 PM 在上架前手工补齐。

**脚本不再复制 `plugin_client_plan_template.md`，本地客户端方案拆解 md 不再生成。**

客户端方案拆解改为飞书副本：

- 飞书通用模板 URL：`https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf`
- 用户操作：在飞书把本模板复制为副本，重命名为 `[StreamFab 浏览器插件] - 客户端方案拆解 - <display_name>`，填写完成后把副本 URL 交付给 AI

workflow 完成站点调研 / 产品页事实提取后，用户在飞书副本中完成填写。用户交付副本 URL 后，`streamfab-extension-workflow` 用 `lark-cli docs +fetch --api-version v2 --doc <副本 URL>` 读取副本作为权威输入，并从以下模板创建 / 回填：

- `_common/templates/plugin_requirement_template.md` → `requirements/plugin_requirement.md`
- `_common/templates/plugin_ui_requirement_template.md` → `requirements/plugin_ui_requirement.md`

模板中的占位符按以下规则替换：`{SiteName}` → display_name（用于插件产品名和 CoApp 安装程序名，保留原始大小写）；`{SiteNameMlink}` → display_name 单词用 `_` 连接（用于 mlink）；`{service_name}` → snake_case 服务标识（用于 app id）；`{sitename}` → service_name 的连字符小写形式（用于产品页 URL、What's New、订阅 / 升级付费等跳转链接）。其他占位符（`{BannerContentEN}`、`{ThirdStoreProductImageCaption}` 等）保留，待 workflow 阶段从飞书副本定稿内容填入。

`plugin_requirement.md` 中的 `### 网站信息` 由 workflow 基于 `references/site_research_notes.md` 和目标站点调研回填，仅写历史沿革 / 服务地区 / 内容形式 / 视频付费方式 / 调研笔记链接五项简介，不在 init 阶段填充正文。

## 执行流程

### Phase 1：收集初始化信息

收集并标准化：

- `service_name`
- `display_name`

如果字段缺失，优先通过一次 `AskUserQuestion` 完成补问；只有在工具不可用或问题极少时，才退回普通对话提问。

### Phase 2：创建或修复目录

计算目标目录：

`Extension/streamfab_<service_name>_downloader_for_browser`

模式判断：

- 目录不存在：`create mode`
- 目录已存在：`repair mode`

至少保证这些目录存在：

- `requirements/`
- `patterns/`
- `constraints/`
- `references/`
- `context/`

### Phase 2 & 3：创建目录和骨架文件（脚本执行）

调用：

```bash
python Extension/_common/scripts/scaffold_plugin.py \
  --service <service_name> \
  --display-name "<display_name>"
```

脚本从 `_common/skills/streamfab-extension-init-skill/references/` 读取骨架模板，从 `_common/templates/plugin_store_listing_template.md` 拷贝上架信息模板，替换 `{display_name}` / `{service_name}` / `{SiteName}` / `{SiteNameMlink}` / `{sitename}` 占位符后写入新插件目录。repair mode 下只创建缺失文件，不覆盖已有内容。**脚本不再复制 `plugin_client_plan_template.md`。**

先用 `--dry-run` 预览，确认无误后去掉参数正式执行。

### Phase 4：交付飞书拆解模板 URL

向用户输出飞书拆解模板 URL 与使用流程：

- 飞书通用模板：`https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf`
- 用户操作：在飞书把本模板复制为副本 → 重命名为 `[StreamFab 浏览器插件] - 客户端方案拆解 - <display_name>` → 待 workflow 完成站点调研 / 产品页事实提取后再开始填写副本 → 填好后把副本 URL 交付给 AI

此阶段不要求 `requirements/plugin_requirement.md` 或 `requirements/plugin_ui_requirement.md` 存在；它们由 workflow 在用户交付飞书副本 URL 并完成填写后生成 / 回填。

### Phase 5：输出并交接

输出至少包含：

- 插件本地路径
- 模式：`create mode` / `repair mode`
- 飞书拆解模板 URL：`https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf`
- 客户端方案拆解副本流程提示：飞书复制 → 重命名 → workflow 阶段交付副本 URL
- 已生成的上架信息文档：`requirements/store_listing.md`（截图 / Search terms 等待发版前由 PM 补齐）
- 后续由 workflow 生成 / 回填的本地 MD 文件：
  - `requirements/plugin_requirement.md`
  - `requirements/plugin_ui_requirement.md`
- 明确交接语：
  - `初始化完成，下一步进入 streamfab-extension-workflow`
  - `请先提供目标站点链接和 / 或客户端产品页链接，我会先做站点调研 / 产品页事实提取`
  - `事实提取完成后，请把你在飞书复制并填写后的客户端方案拆解副本 URL 交付给我`

如果用户只想完成初始化，不强行继续追问后续流程字段；交接留给 `streamfab-extension-workflow`。

## 完成标准

执行完成后，至少满足：

- 插件目录已创建或修复
- 核心骨架文件齐全
- 已向用户输出飞书拆解模板 URL（`https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf`）及"复制 / 重命名 / 交付副本 URL"流程提示
- 已明确交接到 `streamfab-extension-workflow`，下一步先做站点调研 / 产品页事实提取；事实提取完成后再让用户交付客户端方案拆解飞书副本 URL

## 交接语模板

初始化完成后，优先按这个格式汇报：

- `当前阶段：初始化完成`
- `本轮已同步内容：目录、骨架文件已创建；客户端方案拆解走飞书副本（已给出模板 URL）`
- `更新的文件：<插件目录路径>`
- `当前完成度：L0 初始化`
- `下一步建议：请提供目标站点链接和 / 或客户端产品页链接；我会进入 streamfab-extension-workflow 先做站点调研 / 产品页事实提取，之后请你在飞书复制拆解模板（https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf），填好后把副本 URL 交付给我`
