# 06 业务规则（Business Rules）

## 商业方案
- 试用方案：`30-Day Free Trial`，免费，每个服务最多下载 3 个视频
- 付费方案：`1 Month License $59.99 / Lifetime License $109.99`
- 价格来源：https://streamfab.com/unext-downloader.htm

## 权益口径
- Trial：3 次
- Premium：每日 100 次，每周 700 次（每个流媒体服务）

## 账号与设备授权
- 沿用产品线通用授权策略

## 配额与限制
- Trial 受额度限制
- Premium 用户存在单日 100 次、单周 700 次上限（产品页合规文案明确写明）

## 配额扣减机制
- 发起任务时进入预扣减流程
- 成功后确认扣减
- 失败不扣减
- Retry 视当前剩余额度重新判断

## 登录中断后的业务规则

| 当前状态 | 处理 |
|---|---|
| Detected 有视频 | 不允许启动新任务 |
| Detected 为空 | 提示登录 |
| Downloading | 允许继续 |
| Failed | 禁止重试 |
| Downloaded | 保留展示 |

## 试用弹窗触发条件
- 通用规则：试用用户点击下载确认按钮时触发
