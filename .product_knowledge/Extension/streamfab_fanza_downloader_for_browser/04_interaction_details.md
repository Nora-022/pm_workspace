# 04 交互细节（Interaction Details）

## 前置条件
- 必须在 Fanza 站点
- 必须已登录 Fanza
- 必须已播放 Fanza 视频

## 检测与下载关系
- 存在 Downloading 任务时，仍允许继续发起新检测
- `* Videos Found` 右侧常驻提示 icon
- EN 提示：不再沿用“下载中暂停检测”的旧提示文案

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

## 下载任务状态展示规则

| 任务状态 | 展示内容 |
|---|---|
| 待下载（Pending） | Video 所选项（完整显示） |
| 排队中 / 下载中 / 下载失败 | 仅展示分辨率（空间有限，不展示画质等级、帧率） |
| 下载完成（Downloaded） | 分辨率 + 音频编码 |

## 下载进度格式

- 进度单位：`0 / 0 Segments`（分片数）
- 同时展示速度与进度百分比

## 错误与文案
- Error 330：由 CoApp 判定（最近两个月缓存 key，试用受限），固定文案，走多语言包
- 其余错误与文案：沿用 StreamFab 客户端信息
