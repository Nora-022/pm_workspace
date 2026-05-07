# 04 交互细节（Interaction Details）

## 前置条件

- 必须在 video.unext.jp 或 H-NEXT 站点
- 必须已登录 U-NEXT 账号
- H-NEXT 为 U-NEXT 成人内容分支，共用同一账号体系

## 下载配置交互

- 配置项：Resolution + Language（电影 / 剧集一致）
- 无分层结构，单界面完成配置

## 下载进度展示

- 进度单位：文件大小（非分片数）
- 展示字段：下载速度、已完成进度、文件大小

## 配额扣减

- 发起任务时进入预扣减流程
- 成功后确认扣减
- 失败不扣减
- Retry 按当前剩余额度重新判断

## 登录中断后的处理规则

| 当前状态 | 处理 |
|---|---|
| Detected 有视频 | 不允许启动新任务 |
| Detected 为空 | 提示登录 |
| Downloading | 允许继续 |
| Failed | 禁止重试 |
| Downloaded | 保留展示 |

## 批量下载

- 支持 TV 剧集批量发起
- 每集独立任务，统一在 Downloads 页签管理
