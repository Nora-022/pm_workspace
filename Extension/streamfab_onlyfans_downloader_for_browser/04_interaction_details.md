# 04 交互细节（Interaction Details）

## 前置条件（预设）
- 必须在 Onlyfans 站点
- 必须已登录 Onlyfans
- 必须已播放视频

## 检测与下载关系（预设）
- 有 Downloading 任务时暂停新检测
- 原因：下载期间依赖播放数据，避免并行检测导致数据混乱

## 下载调度（预设）
- 串行执行（并发 1）
- FIFO
- Retry 回队头
