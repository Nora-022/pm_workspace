# 04 交互细节（Interaction Details）

## 前置条件

## 检测流程

## 下载调度
- 串行执行（并发 1）
- 队列 FIFO
- Retry 回队头，按当前余量重新判断

## 登录中断后的行为

| 当前状态 | 处理 |
|---|---|
| Detected 有视频 | |
| Detected 为空 | |
| Downloading | |
| Failed | |
| Downloaded | |

## 错误与异常处理
