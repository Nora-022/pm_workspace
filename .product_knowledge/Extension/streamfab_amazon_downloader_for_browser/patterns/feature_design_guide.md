# Amazon 功能设计指引

## 适用范围
- Amazon 浏览器插件检测流程
- Prime Video 标题详情页与剧集树交互
- 权益状态提示
- 下载配置与任务创建流程

## 设计检查点

### 1. 先把站点模型写对
- `Prime Video` 是一个支持站点。
- 不要因为站内存在这些内容，就把产品理解成多个站点：
  - Prime-included
  - rent / buy
  - channels
  - sports / live

### 2. 内容类型与权益类型分开看
- 内容类型示例：
  - movie
  - episodic title
  - sports / live page
- 权益类型示例：
  - Prime-included
  - 需要 rental / purchase
  - 需要 channel entitlement
- 这两类信息不要压成一个笼统状态。

### 3. 页面暴露层级时要保留
- 如果页面已经暴露 `season -> episode`，下载弹窗应尽量保留这一层级。
- 如果页面同时出现多种 CTA，应保留更明确的权益线索。

### 4. 商业阻断与技术失败分开
- 商业阻断：
  - 需要登录
  - 没有 Prime
  - 需要 rental / purchase
  - 没有 channel 权益
- 技术失败：
  - CoApp 不可用
  - 任务创建失败
  - 元数据提取失败
- 这两类问题不要共用一套文案和恢复动作。

### 5. 保持范围表达稳定
- live / sports 不要设计成常规 happy path。
- rental / purchased titles 统一按现有产品页和商店页口径表达。

## 文档同步建议
- 先更新 `01-07` 的主结论
- 再把稳定模式同步到：
  - `user_flows.md`
  - `ui_patterns.md`
  - `error_handling.md`
