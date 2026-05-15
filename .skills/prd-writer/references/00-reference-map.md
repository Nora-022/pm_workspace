# Reference Map (按需加载导航)

目标：只加载当前任务需要的上下文，避免把所有模板一次性塞进会话。

## 加载规则

0. 先做现状锚定（优先）：读取 `/.product_knowledge/01_product_brief.md`、`/.product_knowledge/02_functional_architecture.md`、`/.product_knowledge/06_business_rules.md`
   - 若不存在，再尝试旧路径：`/.product_knowledge/context/product_brief.md`、`/.product_knowledge/context/business_rules.md`
1. 必读：`01-prd-core-skeleton.md`
2. 若需求是桌面客户端能力（安装、任务队列、硬解、文件系统、跨平台差异）：读 `02-desktop-capability-matrix.md`
3. 若需求涉及会员、试用、套餐、设备数、额度：读 `03-entitlement-packaging-template.md`
4. 若需求涉及复杂流程或状态流转：读 `04-flow-state-patterns.md`
5. 若用户没有给性能/稳定性指标：读 `05-nfr-slo-baseline.md`
6. 若需求接近发布或改动核心链路：读 `06-risk-rollback-checklist.md`
7. 若需求包含增长目标、转化或实验：读 `07-kpi-experiment-template.md`
8. 若需求提到具体产品线（DVDFab/StreamFab/UniFab/MusicFab/RecordFab/PlayerFab/BookFab）：读 `08-cross-product-context-cards.md`

## 输出约束

- 主文档必须保留 `Facts / Assumptions / Open Questions` 三段。
- 主文档必须包含“现状锚定”小节，说明引用了哪些知识文件和规则。
- 不要为了套模板补写无意义内容。
- 默认只追问 3 个关键缺口；超过 3 个时按风险排序。
