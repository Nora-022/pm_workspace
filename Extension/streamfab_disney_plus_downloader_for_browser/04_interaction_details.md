# 04 交互细节（Interaction Details）

## 前置条件
- 必须在 Disney Plus 站点
- 必须已登录 Disney Plus
- 必须已播放 Disney Plus 视频

## 检测与下载关系
- 有 Downloading 任务时暂停新检测
- 原因：下载期间也需要获取播放数据；若并行检测新视频会导致数据混乱
- `* Videos Found` 右侧常驻提示 icon
- EN 提示：`Video detection runs only when no downloading tasks exist to ensure stability.`

## 列表与检测规则
- 无预分析，meta 完成后一次性展示
- 无跨 Origin，Detected 上限 50

## 下载调度
- 批量发起
- 串行执行（并发 1）
- FIFO
- Retry 回队头

## 登录中断规则
- 停止检测并清空 Detected
- Downloading 继续
- Pending 不启动
- Failed 禁止重试并引导登录
- 保留 Downloaded 历史

## 错误与文案
- 暂沿用 StreamFab 客户端通用文案体系
