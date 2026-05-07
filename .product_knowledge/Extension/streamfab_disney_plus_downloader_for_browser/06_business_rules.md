# 06 业务规则（Business Rules）

## 试用与付费

- Trial：
  - `30-Day Free Trial`
  - 每个服务最多下载 `3` 个视频
- Paid：
  - `1 Month License $59.99`
  - `1-Year License $89.99`
  - `Lifetime License $109.99`

## 试用边界

- Disney 试用态允许发起任务数大于当前剩余可用任务数

说明：

- 这是一条明确的业务边界
- 不能简单用“剩余数不足则禁止发起”去替代

## 用户权益口径

Disney 当前知识库沿用 common 授权逻辑，但重点记录：

- 已登录
- 有可下载次数
- 可下载次数在有效期内

## 下载配额

- Trial：每个服务最多 `3` 个视频
- 客户端拆解文档提到：
  - 付费用户单日限制 `100` 个视频

说明：

- 该限制应作为业务能力边界保留
- 若后续正式销售口径有变化，应同步更新

## 升级与跳转

Disney 需要维护独立跳转链接：

- What’s New
- Upgrade / Purchase
- 产品页
- 主站与独立站 Mlink

## Trial Status 口径

来自需求文档的新增说明：

- `Trial Status`
  - `Active`：30 天有效期内
  - `Expired`：已过期

说明：

- 该逻辑被标注为后续插件都应采用
- 已作为 common 候选规则保留

## 内容边界

- 仅处理用户有权限观看的 Disney Plus 内容
- 可下载的清晰度、编码、音轨、字幕取决于源内容与订阅权限
- 不支持内容必须明确提示

## 数据上报

- 数据上报逻辑与 Netflix 一致
- 通过 Disney Plus 插件 id、索引和事件类型区分
