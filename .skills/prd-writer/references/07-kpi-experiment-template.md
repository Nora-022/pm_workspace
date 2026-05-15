# KPI & Experiment Template (指标与实验模板)

目标：让 PRD 不止“能做”，还能“评估效果”。

## 1. 目标与北极星

- 北极星指标：
- 关键结果（KR）：

## 2. 指标分层

- 输入指标：曝光、触达、入口点击
- 过程指标：任务开始率、完成率、失败率
- 结果指标：留存、付费转化、复购、退款率

## 3. 事件埋点草案

| Event | Trigger | Params |
|---|---|---|
| `task_start` | 用户开始任务 | source, quality, tier |
| `task_fail` | 任务失败 | code, stage, recoverable |
| `upgrade_click` | 点击升级 | entry, reason |
| `purchase_success` | 购买成功 | plan, price, region |

## 4. 实验设计（按需）

- 实验假设：
- 分组策略：
- 样本门槛：
- 判定周期：
- 风险防护：

## 5. 结果解释规则

- 指标上涨但投诉升高时，以哪项优先
- 不同地区/版本差异如何归因
