# 04 交互细节（Interaction Details）

## 前置条件

- 必须在 Disney Plus 站点
- 必须已登录 Disney Plus
- 必须已播放 Disney Plus 视频

## 检测与分析关系

### 1. 无预分析

- Disney 不拆分多阶段分析过程
- meta 完成后一次性展示结果

### 2. 检测与下载并行

- 当存在 `Downloading` 任务时，仍允许继续发起新检测

规则：

- 下载任务不再阻断 `Detected` 页的新检测
- 不再需要用“有下载任务所以暂停检测”的理由做额外说明

### 3. 提示方式

- `* Videos Found` 右侧允许常驻提示 icon
- EN 提示：
  - 不再使用“下载进行中暂停检测”的旧提示文案

## 列表与检测规则

- 无跨 Origin
- `Detected` 上限 `50`
- meta 返回后一次性展示结果

## 下载调度

- 批量发起
- 串行执行
- 并发 `1`
- FIFO
- `Retry` 回队头

## 登录中断规则

- 停止检测并清空 `Detected`
- `Downloading` 继续
- `Pending` 不启动
- `Failed` 禁止重试并引导登录
- 保留 `Downloaded` 历史

## 配置项交互

### Video Codec

支持：

- `H264`
- `H265-SDR`
- `HDR10`
- `Dolby Vision`

规则：

- 展示上按拼接编码能力集合处理
- 不单独额外增加新的控件类型

### Resolution

规则：

- 单视频无额外交互说明
- 剧集场景要支持：
  - `1920x1080 if available`

说明：

- 部分视频可能拿不到 `1080p`
- 插件不应在无充分理由时用阻断弹窗强拦用户

### Audio Codec / Language

关系：

- `Audio Codec -> Language` 单向联动
- 选择 Audio Codec 后，Language 跟随变化
- 反向不成立

### Subtitle

- 按接口结果直接展示
- 没有 Amazon 那种额外 `Subtitle Action` 结构差异

## Playlist / Extras 结构

### 弹窗结构

- Disney 的 Playlist 弹窗新增 `Extras` 层级
- 结构为三级

规则：

- 当前按三级结构处理
- 是否压缩层级，暂不在现阶段擅自简化

### 下载列表

- 主视频和 Extras 各自独立展示
- 不与对应主视频成组

## 进度信息展示

Netflix 的下载中通常展示：

- 百分比
- 速度
- 进度

Disney 的差异：

- 当拿不到文件大小时，用 `Segment` 替代
- 队列状态可展示 `0/0 Segment`

## Trial 相关边界

- 试用用户仅能试用 `3` 个视频
- 但试用态允许发起任务数大于剩余可用任务数

说明：

- 该规则属于业务边界，界面不能简单按“剩余数不足就完全禁止发起”去做

## 错误与文案

- 基础错误文案沿用 StreamFab 客户端通用体系
- Disney 特有规则优先体现在前置条件、任务互斥和 extras 结构上，而不是新造一套提示体系
