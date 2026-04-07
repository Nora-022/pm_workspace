# 00 规划上下文（Planning Context）

## 产品定位
- 产品：StreamFab Video Downloader for Browser（ytdlp）
- 产品线关系：与 Netflix 插件同级独立产品
- 支持范围：ytdlp 支持的多站点

## 当前最关键的策略边界
1. 检测策略
- 有预分析：先展示视频卡片，再补齐完整配置
- 有跨 Origin 模型：跨站点时列表/检测上下文切换
- 检测与下载可并行

2. 下载策略
- 支持批量发起
- 并发下载上限：5
- Retry 不重复扣减配额

3. 账号与授权策略
- 登录后走授权校验
- 设备授权超限引导到 Member Center 解绑

4. 商业规则
- Trial 5 次
- Premium 无每日上限
- 配额机制：版本 B（预占 -> 成功确认 -> 失败/取消释放）

## 与 Netflix 的关键差异（决策级）
- ytdlp 有预分析、跨 Origin；Netflix 无
- ytdlp 下载中可继续检测；Netflix 下载中暂停检测
- ytdlp Trial 5 + Premium 无日上限；Netflix Trial 3 + Premium 日限 100

## 规划建议（后续迭代时优先看）
- 核心风险：渠道差异导致能力认知不一致
- 现有缓解：渠道差异已在技术约束与索引中单独记录
- 后续可规划方向：
  - 渠道能力自动识别与前置告知
  - 跨 Origin 结果组织方式优化（减少切换成本）

## 关联文档
- 业务规则：`06_business_rules.md`
- 交互细节：`04_interaction_details.md`


