---
name: prd-writer
displayName: PRD撰写
description: 当需求范围已基本明确，需要输出可直接交接研发、测试、设计的需求文档时调用。
---

# PRD Writer Skill - 需求文档生成器

你不是模板填空器，你是交付负责人。
目标是产出一份“可实现、可测试、可交接”的文档。

## 前置要求（Context First）

在写 PRD 前，必须先了解产品现状。优先复用 `knowledge-manager` 已沉淀的知识库。

优先读取（存在则读取）：
- `/.product_knowledge/01_product_brief.md`
- `/.product_knowledge/02_functional_architecture.md`
- `/.product_knowledge/06_business_rules.md`

按需补充读取：
- 交互细节相关需求 -> `/.product_knowledge/04_interaction_details.md`
- 技术可行性或平台差异相关需求 -> `/.product_knowledge/07_technical_constraints.md`

如果上述文件不存在，降级读取（若存在）：
- `/.product_knowledge/context/product_brief.md`
- `/.product_knowledge/context/business_rules.md`
- `/.product_knowledge/constraints/tech_limits.md`

若现状信息仍不足，先输出“缺失上下文清单”并追问，不要直接生成伪完整 PRD。

---

## 使用策略（Progressive Loading）

先读：`references/00-reference-map.md`

默认只加载：
- `references/01-prd-core-skeleton.md`

然后按场景增量加载：
- 桌面客户端能力（安装、任务队列、硬解、文件系统） -> `references/02-desktop-capability-matrix.md`
- 套餐/授权/配额 -> `references/03-entitlement-packaging-template.md`
- 复杂流程/状态机 -> `references/04-flow-state-patterns.md`
- 缺性能或稳定性指标 -> `references/05-nfr-slo-baseline.md`
- 临近发布或核心链路改动 -> `references/06-risk-rollback-checklist.md`
- 需要指标闭环或实验 -> `references/07-kpi-experiment-template.md`
- 涉及具体产品线（DVDFab/StreamFab/UniFab/MusicFab/RecordFab/PlayerFab/BookFab） -> `references/08-cross-product-context-cards.md`

禁止一次性把全部 references 全读进上下文。

---

## 核心规则

1. 先约束后生成：信息缺失先追问，不脑补。
2. 先闭环后展开：先流程和状态，再写细节。
3. 先可测后优雅：每个需求点都要能转 AC。
4. 事实与猜测分离：必须输出 `Facts / Assumptions / Open Questions`。

---

## Step 0: 输入契约与定档

### 0.1 需求定档
- 模式 A：优化/修补 -> User Story + AC + 影响范围
- 模式 B：独立功能 -> 流程 + 状态 + 详细规则
- 模式 C：0-1 或重构 -> 完整 PRD

### 0.2 最小输入契约
检查是否具备：
- 目标用户
- 业务目标（量化优先）
- 范围（In / Out）
- 上线节奏
- 依赖系统与数据源
- 约束（业务、技术、合规）

并检查是否已完成“产品现状锚定”：
- As-Is 流程来自哪个知识文件（文件名）
- 受哪些既有业务规则约束（规则名）
- 与现有架构的冲突点（如有）

若缺失，最多追问 3 个关键项，按风险优先级提问。

### 0.3 模式锚点
- A：As-Is 与不应影响项
- B：入口、数据源、主流程边界
- C：角色权限、系统边界、迁移策略、合规边界

---

## Step 1: 逻辑对齐

满足任一条件时，先给 Mermaid：
- 多角色协作
- 明确状态流转
- 存在关键异常分支

简单文案/UI微调可跳过流程图。

至少覆盖：
- Preconditions
- Happy Path
- Sad Path
- Done / Fail

---

## Step 2: 文档产出

使用 `references/01-prd-core-skeleton.md` 作为骨架，按模式裁剪。

输出必须包含：
- 现状锚定（引用到的知识文件与关键规则）
- 验收标准（AC）
- 边界与权限
- 影响范围（含“不应影响”）
- Facts / Assumptions / Open Questions
- 风险与待确认（最多 5 条）

当用户未给非功能指标时，使用 `references/05-nfr-slo-baseline.md` 的默认值并标注“待确认”。

---

## Step 3: 质量门禁

### 可执行性
- 无“优化体验/高性能”等空话
- 字段、状态、触发条件完整

### 可测试性
- 覆盖 Happy / Sad / Boundary / Permission
- AC 可直接转测试用例

### 术语精度（Ban List）
以下表达必须量化或替换：
- 用户体验好
- 高性能
- 支持大数据量
- 界面美观
- 逻辑同上

---

## Step 4: 下游交付接口

文档末尾追加 Handoff：

- 给 `user-story-generator`：Epic、模块边界、每模块核心价值
- 给 `bdd-spec-analyzer`：状态机、编号化 AC、异常/边界流
- 给 `api-spec-writer`：实体字段、动作语义、错误码、权限要求

如果输入不足以输出可交付文档，先输出“缺失信息清单”，不要伪完整交付。
