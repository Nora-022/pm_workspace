# 06 业务规则（Business Rules）

> 基线插件：Netflix。本文档仅记录差异点。

## 商业方案

- 试用方案：Try for Free（具体次数见"权益口径"）
- 付费方案：客户端 $64.99 一次性购买（参考客户端产品页）

## 权益口径

| 用户类型 | 配额 | 说明 |
|---|---|---|
| Trial | 3 个视频 | 客户端拆解明示 |
| Premium | 单日 100 / 单周 700 | 按每流媒体服务独立计算 |

## 账号与设备授权

沿用产品线通用授权策略，与 Netflix 一致。

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

## 试用弹窗

- 触发条件、文案与 Netflix 完全一致
- 仅产品名替换为 `StreamFab DRM MPD Downloader for Browser`

## License Info Banner 文案

| 语言 | 文案 |
|---|---|
| EN | DRM MPD Videos, Downloaded Simply.<br/>Save DRM-protected MPD streams for offline viewing in up to 1080p with clear AAC audio. |
| ZH | DRM MPD 视频，轻松下载。<br/>将受 DRM 保护的 MPD 流媒体保存下来，以最高 1080p 分辨率和清晰的 AAC 音频进行离线观看。 |

License Info 产品名：`StreamFab DRM MPD Downloader for Browser`
