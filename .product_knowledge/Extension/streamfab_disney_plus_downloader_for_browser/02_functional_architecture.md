# 02 功能架构（Functional Architecture）

## 核心模块

1. 页面检测
2. 权益识别
3. meta 分析
4. 下载配置
5. Extras / Playlist 结构处理
6. 任务调度与队列管理
7. Dashboard 与 Setting 联动
8. 数据上报

## 1. 页面检测

Disney 当前需要覆盖的页面类型：

- 单视频详情页
- 剧集页
- 播放页
- Disney Plus 首页或浏览页内容入口

规则：

- 必须在 Disney Plus 站点内
- 必须已登录
- 必须已播放视频

## 2. 权益识别

Disney 的权益判断以 common 逻辑为基础，但当前文档重点保留：

- 账号已登录
- 账号有可下载次数
- 下载次数在有效期内

## 3. meta 分析

Disney 的分析策略：

- 无预分析
- meta 完成后一次性展示结果
- 不拆分为多阶段分析状态

这意味着：

- 检测反馈相对 Amazon 更简单
- 界面重点不在过程进度，而在结果完整性

## 4. 下载配置

### 4.1 单视频 / Playlist 通用结构

当前配置项结构不新增字段，选项值由接口返回结果驱动。

核心字段：

- `Video Codec`
- `Resolution`
- `Audio Codec`
- `Language`
- `Subtitle`

### 4.2 Video Codec

支持能力：

- `H264`
- `H265`

其中 H265 存在变体：

- `SDR`
- `HDR10`
- `Dolby Vision`

展示规则：

- 参考 Netflix 的编码表达逻辑
- 用拼接后的编码能力集合展示，如：
  - `H265-HDR10`

### 4.3 Resolution

规则：

- 单视频无特殊额外结构
- 剧集场景明确存在：
  - `1920x1080 if available`

说明：

- 部分视频可能无法获取 `1080p`
- 默认下载能拿到的最高分辨率

### 4.4 Audio Codec / Language

关系：

- `Audio Codec -> Language` 单向联动
- 选择 Audio Codec 后，Language 跟随变化
- 反向不成立

Disney Setting 中出现的 Audio Codec 选项包括：

- `Atmos`
- `EAC3`
- `AAC`

### 4.5 Subtitle

- 按实际分析结果展示
- 不新增 Amazon 式的 `Subtitle Action` 结构差异

## 5. Extras / Playlist 结构

### 5.1 Playlist 弹窗

Disney 的关键差异：

- 部分视频新增 `Extras`
- 弹窗中形成三级结构

基础结构示意：

- `Main Movie`
- `Extras`
  - `extra item`

### 5.2 是否合并层级

客户端拆解里明确提出：

- 需要确认花絮层级结构是否可以合并
- 原因是插件空间受限

当前知识库结论：

- 先按三级结构保留
- 是否压缩层级作为后续待确认项

## 6. 任务调度与队列管理

### 调度规则

- 批量发起
- 串行执行
- 并发 `1`
- FIFO
- `Retry` 回队头

### 检测与下载并行

- 下载任务与新检测可并行存在
- `Downloading` 状态不再作为暂停检测的触发条件

### 下载列表结构

- 主视频与 Extras 各自独立展示
- 不保留树层级

### 进度显示差异

- Netflix 以 `百分比 + 速度 + 进度` 组合表达
- Disney 无法获取文件大小时，改用 `Segment`
- 队列状态可展示为 `0/0 Segment`

## 7. Setting 联动

Disney Setting 结构仍为：

- `Extension`
- `CoApp`

但字段差异包括：

- `Video Codec`
  - `H264`
  - `H265 - SDR`
  - `HDR10`
  - `Dolby Vision`
- 去掉 `H264 Profile`
- `Video Resolution`
  - `Full HD - 1080p`
  - `HD - 720p`
- `Audio Codec`
  - `Atmos`
  - `EAC3`
  - `AAC`
- `Pre-select Subtitle Language`
  - 新增 `None`

约定：

- 如无特殊说明，默认选中第一个选项

## 8. 数据上报

- 数据上报逻辑与 Netflix 一致
- 通过 Disney Plus 插件 id 和对应索引区分统计对象
