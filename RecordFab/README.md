# RecordFab 产品知识库

## 1. 知识库简介

本目录是 `RecordFab` 的产品知识库，用于集中沉淀产品定义、页面结构、交互规则、商业规则、技术边界与版本演进记录。

这份知识库优先服务以下场景：
- 让运营、商务、支持、设计、研发快速了解 `RecordFab` 是什么
- 查询当前正式版本已经上线的能力和限制
- 统一产品口径，减少跨团队沟通时的信息偏差
- 保留版本演进历史，便于追溯能力变化

## 2. 产品概览

| 项目 | 说明 |
|---|---|
| 产品名称 | `RecordFab` |
| 产品定位 | 帮助用户快捷录制并保存视频的客户端产品 |
| 产品类型 | 流媒体录制产品 |
| 当前平台 | 仅 Windows |
| 产品角色 | `StreamFab` 的补充产品，承担下载方案补足角色 |
| 核心价值 | 在下载不可用或不稳定时，仍然帮助用户保存内容，尤其适合直播流保存 |

## 3. 目录结构

### 3.1 根目录文件

| 文件 | 作用 |
|---|---|
| `00_product_context.md` | 产品背景文件，说明产品在产品线中的角色、核心场景和长期边界 |
| `01_product_brief.md` | 产品简介，概览定位、目标用户、核心能力与产品红线 |
| `02_functional_architecture.md` | 功能架构，说明主要模块、流程关系和能力组织方式 |
| `03_page_structure.md` | 页面结构，说明主要页面、页面职责和页面之间的关系 |
| `04_interaction_details.md` | 交互细节，记录真实交互规则、状态变化和异常处理逻辑 |
| `05_design_principles.md` | 设计原则，记录界面表达、交互取向和设计约束 |
| `06_business_rules.md` | 业务规则，记录试用、套餐、授权、登录、续费等商业规则 |
| `07_technical_constraints.md` | 技术约束，记录平台限制、能力边界、站点差异和实现约束 |
| `README.md` | 当前知识库入口说明 |

### 3.2 子目录

| 目录 | 作用 |
|---|---|
| `context/` | 核心背景的压缩版文档，适合快速浏览或供 AI 快速读取 |
| `patterns/` | 可复用的交互模式、流程模式和错误处理模式 |
| `constraints/` | 对平台、合规、技术边界的补充说明 |
| `references/` | 资料来源、研究整理、网页链接、PDF 来源、changelog 来源等 |
| `requirements/raw/` | 历史需求文档原件、会议纪要、原始输入材料 |
| `requirements/derived/` | 从原始资料中提炼出的结构化文档，如 changelog 和归纳稿 |

## 4. 主要内容说明

### 4.1 想了解产品是什么
建议先阅读：
1. `00_product_context.md`
2. `01_product_brief.md`
3. `06_business_rules.md`

这一组文件适合运营、商务、支持人员快速建立产品认知。

### 4.2 想了解产品怎么工作
建议继续阅读：
1. `02_functional_architecture.md`
2. `03_page_structure.md`
3. `04_interaction_details.md`

这一组文件适合理解用户是如何进入录制、如何完成录制、录制完成后如何查看结果。

### 4.3 想了解产品有哪些限制
建议补读：
1. `07_technical_constraints.md`
2. `constraints/`
3. `requirements/derived/recordfab_changelog.md`

这一组文件适合查看平台限制、站点差异、能力边界和版本变化。

## 5. 推荐阅读路径

### 5.1 运营人员
1. `00_product_context.md`
2. `01_product_brief.md`
3. `06_business_rules.md`
4. `requirements/derived/recordfab_changelog.md`

### 5.2 设计与产品协作
1. `00_product_context.md`
2. `01_product_brief.md`
3. `03_page_structure.md`
4. `04_interaction_details.md`
5. `05_design_principles.md`
6. `07_technical_constraints.md`

### 5.3 版本追溯
1. `requirements/derived/recordfab_changelog.md`
2. `references/changelog_source.md`
3. 对应专题文件

## 6. 资料来源与版本文档

| 路径 | 内容 |
|---|---|
| `references/sources.md` | 主要资料来源索引 |
| `references/changelog_source.md` | changelog 来源页说明 |
| `references/product_research.md` | 产品研究和整理材料 |
| `requirements/raw/` | 历史需求和原始资料 |
| `requirements/derived/recordfab_changelog.md` | 官网版本更新记录的整理稿 |

## 7. 知识库使用边界

- 本知识库记录的是 `RecordFab` 当前正式版本及其历史演进，不等于未来规划清单。
- 历史需求文档是知识来源，不等于当前正式口径。
- 版本变更应优先进入 changelog，再决定是否回写到专题文件。
- 未确认信息不应直接写入 `01-07` 核心文件。

## 8. 当前知识库更新记录

| 日期 | 更新内容 |
|---|---|
| 2026-04-08 | 建立 `RecordFab` 产品知识库主结构，形成 `00-07` 核心文件框架 |
| 2026-04-08 | 基于官网、PDF 资料和人工确认，补充产品定位、平台、录制能力、主链路、授权和套餐规则 |
| 2026-04-08 | 整理官网 changelog，新增 `requirements/derived/recordfab_changelog.md` 与 `references/changelog_source.md` |
| 2026-04-08 | 收敛知识库结构，移除 `00_decision_log.md`，保留单一入口文件 `00_product_context.md` |
| 2026-04-08 | 重写 README，使其更适合作为运营和跨团队人员的知识库入口文档 |
