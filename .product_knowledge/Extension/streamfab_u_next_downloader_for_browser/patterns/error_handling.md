# Error Handling — StreamFab U-NEXT Downloader for Browser

## 场景一：未登录 U-NEXT

- **触发**：在 video.unext.jp 访问但未登录
- **展示**：Detected 为空，提示登录
- **用户下一步**：登录 U-NEXT 后重新检测
- **可重试**：登录后自动重新检测

## 场景二：登录中断（任务进行中）

| 当前任务状态 | 处理 |
|---|---|
| Detected 有视频 | 不允许发起新任务，提示登录 |
| Downloading | 允许继续 |
| Failed | 禁止重试 |
| Downloaded | 保留展示 |

## 场景三：Trial 额度耗尽

- **触发**：Trial 用户 3 次下载已用完
- **展示**：弹窗提示（触发条件待飞书需求文档确认）
- **用户下一步**：升级至付费方案
- **可重试**：升级后可继续

## 场景四：CoApp 未安装

- **触发**：发起下载但未检测到 CoApp
- **展示**：引导安装 CoApp
- **用户下一步**：安装 CoApp 后重试
- **可重试**：安装后可重试
