# Audit Map (按需加载导航)

目标：在审计 PRD 时按场景加载最小必要上下文，避免一次性塞入全部模板。

## 加载顺序

0. 先做现状锚定：
- 优先读取：`/.product_knowledge/01_product_brief.md`、`/.product_knowledge/02_functional_architecture.md`、`/.product_knowledge/06_business_rules.md`
- 按需补充：`/.product_knowledge/04_interaction_details.md`、`/.product_knowledge/07_technical_constraints.md`
- 旧路径回退：`/.product_knowledge/context/product_brief.md`、`/.product_knowledge/context/business_rules.md`

1. 必读：`01-finding-schema.md`
2. 按模式读：`02-audit-checklists.md`
3. 需要改写建议时：`03-rewrite-patterns.md`
4. 需要发布结论时：`04-release-gates.md`

## 输出约束

- 审计结论必须包含：`Context Anchoring`、`Findings`、`Open Questions`、`Release Decision`。
- Findings 至少覆盖：逻辑闭环、异常流、边界条件、权限、非功能指标。
- 每条 Finding 必须可定位、可修改、可验证。
