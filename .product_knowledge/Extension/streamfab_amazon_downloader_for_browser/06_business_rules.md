# 06 业务规则（Business Rules）

## 试用与付费

- Trial：
  - 试用期内每个服务最多下载 `3` 个视频
- Paid：
  - `1 Month License $54.99`
  - `1-Year License $79.99`
  - `Lifetime License $99.99`

## 用户权益口径

Amazon 需要区分这些业务状态：

- 未登录
- Prime included
- Rent / Buy
- Channel entitlement
- 广告支持版本

规则：

- 业务状态不同，下载可用性和提示语义不同。
- 不允许把这些状态混成一个统一错误。

## 下载配额

- Trial 用户每个服务最多 `3` 个视频。
- 客户端拆解文档额外提到：
  - 付费用户单日限制 `100` 个视频

说明：

- 该限制应作为业务侧能力边界在知识库中保留。
- 若后续以正式销售或客户端规则为准，应同步更新。

## 升级与跳转

Amazon 需要维护独立跳转链接：

- What’s New
- Upgrade / Purchase
- Contact Us
- 产品页
- 主站与独立站 Mlink

规则：

- 所有升级入口都应使用 Amazon 对应链接，不复用其他插件链接。

## 内容边界

- 仅处理用户有权限观看的 Amazon 内容。
- 租赁 / 购买 / channel 内容要按真实权益反馈。
- 不支持内容必须明确提示。

## 数据上报

- 数据上报逻辑与 Netflix 一致。
- 通过 Amazon 的插件 id、索引和事件类型区分。
