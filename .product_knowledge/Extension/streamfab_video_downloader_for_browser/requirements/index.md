# Requirements Index

## 当前状态

- 当前目录下尚未归档原始需求文件
- 现有知识主要来自插件主文档 `00-07`

## 现有文档

1. 主文档组
- `00_planning_context.md`
- `00_decision_log.md`
- `01_product_brief.md`
- `02_functional_architecture.md`
- `03_page_structure.md`
- `04_interaction_details.md`
- `05_design_principles.md`
- `06_business_rules.md`
- `07_technical_constraints.md`

## 后续归档规则

- 原始需求文件放入 `requirements/raw/`
- 解析或清洗产物放入 `requirements/derived/`
- 新增归档后，在本文件记录：
  - 文档名
  - 日期
  - 状态
  - 关联知识库文件

## 文件结构
```text
requirements/
├── plugin_requirement.md      ## 主需求文档，作为当前插件需求定义的正式入口
├── plugin_ui_requirement.md   ## UI 需求文档，作为界面与交互说明的正式入口
├── raw/                       ## 原始输入资料目录，存放历史文档、会议纪要与原始材料
└── derived/                   ## 整理输出资料目录，存放摘要、归纳与整理结果
```
