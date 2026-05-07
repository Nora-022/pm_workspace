# 06 业务规则（Business Rules）

## 商业方案
- 试用方案：`30-Day Free Trial`，免费，每个服务最多下载 3 个视频
- 付费方案：`1 Month License $54.99 / 1-Year License $79.99 / Lifetime License $99.99`
- 价格来源：`https://streamfab.com/streamfab-for-browser.htm`

## 权益口径
- Netflix Trial：3 次
- Netflix Premium：每日 100

## 账号与设备授权
- 沿用产品线通用授权策略

## 配额与限制
- Trial 受额度限制
- 最近两个月缓存 key 视频，Trial 受限（Error 330）
- Premium 用户存在单日 `100` 次上限

## 配额扣减机制
- 发起任务时进入预扣减流程
- 成功后确认扣减
- 失败不扣减
- Retry 视当前剩余额度重新判断

## 登录中断后的业务规则

- `Detected` 中已有结果：登出后不允许继续从该区域启动新任务
- `Detected` 为空：直接提示登录
- `Downloading`：允许继续
- `Failed`：禁止重试
- `Downloaded`：正常保留与展示

## 试用与限制弹窗

- Trial 相关弹窗中的下载次数统一为 `3`
- 付费权益文案以 Netflix 版本为准
- 最近两个月受限内容不再额外弹旧版限制弹窗，改为走 `Error 330`

## 订阅状态与阻断提示
- 订阅权益说明（弹窗 / Dashboard）：
  - Access to all features
  - High speed batch processing
  - Lossless video quality
  - Professional technical support
  - Lossless audio quality
  - Free updates within period of validity

## 其它限制
- 与 ytdlp 差异：
  - ytdlp Trial：5 次
  - ytdlp Premium：无每日上限

## 数据上报

- 插件侧上报逻辑沿用产品线通用方案
- 通过 Netflix 插件 id 区分统计对象
- `Error 330` 等特殊错误需保留可检索性

## 归档说明
- 商业方案以统一售卖页为准
