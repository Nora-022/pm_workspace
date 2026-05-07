# Business Rules — StreamFab U-NEXT Downloader for Browser

## 用户权益

| 方案 | 额度 |
|---|---|
| Trial（30天免费试用） | 每个服务最多 3 次下载 |
| Premium（付费） | 每日 100 次 / 每周 700 次（每个流媒体服务） |

## 配额扣减机制

- 发起任务时进入预扣减流程
- 成功后确认扣减
- 失败不扣减
- Retry 按当前剩余额度重新判断

## 登录中断处理

| 状态 | 处理 |
|---|---|
| Detected 有视频 | 不允许启动新任务 |
| Detected 为空 | 提示登录 |
| Downloading | 允许继续 |
| Failed | 禁止重试 |
| Downloaded | 保留展示 |

> 详见 `06_business_rules.md`
