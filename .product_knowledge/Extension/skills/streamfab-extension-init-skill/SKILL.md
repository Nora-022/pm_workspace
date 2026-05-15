---
name: streamfab-plugin-init
description: 初始化新的 StreamFab 插件知识库目录，创建骨架文件和本地 Markdown 工作文档，完成后交给用户填写客户端方案拆解，再交接给 streamfab-extension-workflow。
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
- 按当前统一结构初始化本地知识库
- 从 `common_templates/` 复制需求文档、UI 需求说明、客户端方案拆解 3 份 Markdown 模版，替换占位符后写入 `requirements/`
- 客户端方案拆解文件名固定为 `[RecordFab] - [客户端方案拆解] - <display_name>.md`
- 输出本地路径、模式和待填写的客户端方案拆解 MD 路径

## 职责边界

- 本 skill 只负责初始化
- 不负责产品页事实提取
- 不负责本地 MD 定稿信息回填
- 不负责客户端拆解信息回填
- 不负责缺口检查和收尾追问

初始化完成后，先把客户端方案拆解 MD 交给用户填写；用户确认填写完成后，再切换到 `streamfab-extension-workflow` 继续推进。

## 初始化后的切换规则

满足以下条件时，`streamfab-plugin-init` 必须结束，交由 `streamfab-extension-workflow` 接管：

1. 插件目录已创建或修复
2. 核心 Markdown 骨架已存在
3. 3 份本地 Markdown 工作文档已创建成功
4. 已向用户返回本地路径和客户端方案拆解 MD 路径

切换时必须明确说明：

- `初始化完成`
- `下一步请填写客户端方案拆解 MD`
- `你填写完成后，我再进入 streamfab-extension-workflow`

如果缺少初始化最小必要信息，则停留在本 skill 内继续补问；一旦最小必要信息齐全，不再追加后续流程问题。

## 最小必要输入

初始化默认只问这 2 个字段：

1. `service_name`
2. `display_name`

只有在明确阻塞初始化时，才追加补问：

- 客户端产品页 URL
- 目标站点 URL

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
- `requirements/plugin_requirement.md`
- `requirements/plugin_ui_requirement.md`
- `requirements/[RecordFab] - [客户端方案拆解] - <display_name>.md`

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

新模式下不创建飞书模板文档。所有初始化工作文档都由 `scaffold_plugin.py` 从 `common_templates/` 复制 Markdown 模版生成：

- `common_templates/plugin_requirement_template.md` → `requirements/plugin_requirement.md`
- `common_templates/plugin_ui_requirement_template.md` → `requirements/plugin_ui_requirement.md`
- `common_templates/plugin_client_plan_template.md` → `requirements/[RecordFab] - [客户端方案拆解] - <display_name>.md`

脚本会自动将模版中的 `{SiteName}` 替换为 `display_name`、`{sitename}` 替换为 service_name 的连字符小写形式。`{SiteName}` 必须理解为需求文档中的「流媒体服务名」原始大小写，用于插件产品名、CoApp 安装程序名和 mlink；`{sitename}` 用于 app id、产品页 URL、What's New、订阅 / 升级付费等跳转链接。其他占位符（`{BannerContentEN}`、`{ThirdStoreProductImageCaption}` 等）保留，留待 workflow 阶段从本地 MD 定稿内容填入。

## 执行流程

### Phase 1：收集初始化信息

收集并标准化：

- `service_name`
- `display_name`
- `template_plugin`
- 可选：`client_product_url`
- 可选：`target_site_urls`

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
python Extension/scripts/scaffold_plugin.py \
  --service <service_name> \
  --display-name "<display_name>"
```

脚本从 `skills/streamfab-extension-init-skill/references/` 读取骨架模板，替换 `{display_name}` / `{service_name}` 占位符后写入新插件目录。repair mode 下只创建缺失文件，不覆盖已有内容。

先用 `--dry-run` 预览，确认无误后去掉参数正式执行。

### Phase 4：确认本地工作文档

需求文档、UI 需求说明、客户端方案拆解均已由 `scaffold_plugin.py` 在 Phase 2 & 3 自动从 `common_templates/` 复制并替换 `{SiteName}` / `{sitename}` 占位符，无需手工 Read + Write。

必须确认客户端方案拆解文件存在：

`requirements/[RecordFab] - [客户端方案拆解] - <display_name>.md`

### Phase 5：输出并交接

输出至少包含：

- 插件路径
- 模式：`create mode` / `repair mode`
- 本地生成的 MD 文件：
  - `requirements/plugin_requirement.md`
  - `requirements/plugin_ui_requirement.md`
  - `requirements/[RecordFab] - [客户端方案拆解] - <display_name>.md`
- 明确交接语：
  - `初始化完成，下一步请填写客户端方案拆解 MD`
  - `你填写完成后，我再进入 streamfab-extension-workflow`

如果用户只想完成初始化，不强行继续追问后续流程字段；交接留给 `streamfab-extension-workflow`。

## 完成标准

执行完成后，至少满足：

- 插件目录已创建或修复
- 核心骨架文件齐全
- `requirements/plugin_requirement.md`、`requirements/plugin_ui_requirement.md`、`requirements/[RecordFab] - [客户端方案拆解] - <display_name>.md` 已从 common_templates 生成
- `{SiteName}` / `{sitename}` 占位符已替换
- 已明确交给用户填写客户端方案拆解 MD，用户填完后再交接到 `streamfab-extension-workflow`

## 交接语模板

初始化完成后，优先按这个格式汇报：

- `当前阶段：初始化完成`
- `本轮已同步内容：目录、骨架文件、本地 Markdown 工作文档已创建`
- `更新的文件：<插件目录路径>`
- `当前完成度：L0 初始化`
- `下一步建议：请填写 requirements/[RecordFab] - [客户端方案拆解] - <display_name>.md；填写完成后我继续进入 streamfab-extension-workflow`
