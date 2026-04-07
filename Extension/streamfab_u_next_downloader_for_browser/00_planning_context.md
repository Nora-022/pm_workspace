# 00 规划上下文（Planning Context）

## 产品定位
- 产品：StreamFab U-NEXT Downloader for Browser
- 产品线关系：与 ytdlp 插件同级独立产品
- 支持范围：仅 U-NEXT
- 初始化方式：基于 Netflix 单站点模板创建，当前仅作为结构和基线参考

## 当前阶段目标
1. 建立 U-NEXT 插件知识库目录与标准文档结构
2. 承接后续站点调研、需求导入、规则定版
3. 将 Netflix 模板中的预设逻辑逐步替换为 U-NEXT 已确认结论

## 待确认的关键策略边界
1. 检测策略
- 是否需要预分析
- 是否支持跨页面 / 跨 origin 累计
- 检测列表上限与刷新策略

2. 下载策略
- 是否支持批量发起
- 并发模型与队列策略
- Retry 是否回队头

3. 账号中断策略
- 中途退出 U-NEXT 后，Detected / Pending / Downloading / Failed / Downloaded 各态如何处理

4. 商业规则
- Trial 次数
- Premium 日上限
- 是否存在新片 / key 缓存 / DRM 相关限制

## 当前默认处理原则
- 未明确确认前，不把 Netflix 的产品结论视为 U-NEXT 定版规则。
- 可复用 Netflix 的单站点插件结构、文档组织方式和分析维度。
- 所有 U-NEXT 专属差异需在调研后回填到 `00_decision_log.md` 与 `01-07` 文件。

## 关联文档
- 产品简介：`01_product_brief.md`
- 业务规则：`06_business_rules.md`
- 交互细节：`04_interaction_details.md`
- 差异基线：`patterns/u_next_vs_ytdlp_logic_diff.md`
