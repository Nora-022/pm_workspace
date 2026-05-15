# Release Gates (审计放行门禁)

目标：给出明确的 Go/No-Go 结论，而不是模糊评价。

## 决策规则

- `No-Go`：存在任一 S0 Blocker
- `Conditional Go`：无 S0，且 S1 <= 2，且所有 Open Questions 有 owner
- `Go`：S0=0, S1=0，关键 AC 可测，发布与回滚策略完整

## 审计结论模板

- Decision: Go / Conditional Go / No-Go
- Summary: 1-2 句
- Must Fix Before Dev: 列出 S0/S1
- Can Follow Up: 列出 S2/S3
- Owners & ETA: 每项问题对应负责人和时间

## 发布前最小清单

- AC 覆盖 Happy/Sad/Boundary/Permission
- 风险点有监控指标
- 回滚触发阈值明确
- 客服/运营告警预案存在
