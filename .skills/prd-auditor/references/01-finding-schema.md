# Finding Schema (结构化问题模板)

目标：把“感觉有问题”改成“可执行修复单”。

## 严重度定义

- `S0 Blocker`：不修复无法开发或高概率线上事故
- `S1 High`：可开发但高返工/高投诉风险
- `S2 Medium`：质量缺陷，建议在迭代内修复
- `S3 Low`：优化项，不阻断排期

## Finding 模板

- `ID`：如 `B1` / `H2` / `M3`
- `Severity`：S0/S1/S2/S3
- `Section`：问题所在章节
- `Quote`：原文片段（简短）
- `Risk`：为什么会出问题
- `Fix`：建议改写（可直接替换）
- `Validation`：修复后如何验证（测试点）

## 示例

- ID: B1
- Severity: S0 Blocker
- Section: 库存扣减规则
- Quote: "支付后扣减库存"
- Risk: 未定义下单到支付间的预占，会造成超卖。
- Fix: "下单时预占库存；支付成功实扣；15分钟未支付释放。"
- Validation: 构造并发下单 + 超时未支付场景，库存不得为负。
