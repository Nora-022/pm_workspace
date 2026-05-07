# Requirements Workspace

## 用途
- `raw/`：存放原始需求、会议纪要、截图、外部输入
- `derived/`：存放从知识库派生出的 PRD、UI 需求、方案稿
- `index.md`：维护当前需求清单和状态

## 使用规则
1. 写新 PRD 前，先读：
  - `../01_product_brief.md`
  - `../02_functional_architecture.md`
  - `../06_business_rules.md`
  - `../07_technical_constraints.md`
2. 若需求涉及界面，补读：
  - `../03_page_structure.md`
  - `../04_interaction_details.md`
  - `../05_design_principles.md`

## 文件结构
```text
requirements/
├── README.md                  ## 当前目录入口，说明需求资料的组织方式与阅读入口
├── index.md                   ## 需求索引，汇总正式需求与整理资料入口
├── raw/                       ## 原始输入目录，保存历史文档、会议纪要与原始材料
└── derived/                   ## 整理输出目录，保存摘要、归纳、版本记录与整理结果
```
