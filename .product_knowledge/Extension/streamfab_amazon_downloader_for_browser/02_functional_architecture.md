# 02 功能架构（Functional Architecture）

## 核心模块

1. 页面检测
2. 权益识别
3. 视频分析
4. 下载配置
5. Playlist 结构处理
6. 任务创建与下载队列
7. Dashboard 与 Setting 联动
8. 数据上报

## 1. 页面检测

Amazon 当前需要覆盖的页面类型：

- 电影详情页
- 剧集详情页
- 播放页
- 首页和浏览页中的内容卡片
- 搜索结果页

特殊类型：

- `Sports / Live`

规则：

- Sports / Live 只作为页面类型识别，不默认进入正常下载链路。
- 如果检测到不支持的页面，应明确反馈，不静默失败。

## 2. 权益识别

Amazon 需要区分的权益状态：

- 未登录
- 已登录但无 Prime 权益
- Prime included
- 需要 `Rent / Buy`
- 需要 `Channel entitlement`
- 广告支持版本
- 区域或设备限制

规则：

- 权益识别先于下载任务创建。
- 插件不能把这些状态混成一个通用“不可下载”提示。

## 3. 视频分析

### 分析阶段

Amazon 需要拆出两个阶段：

1. `检测中`
- 网页侧识别视频并把信息发送给 CoApp。

2. `分析中`
- CoApp 开始分析音视频流并返回进度。

### 分析结果

- 成功：返回配置参数并新增视频卡片。
- 失败：
  - 如果当前弹窗内已有检测结果，走 toast 提示。
  - 如果当前弹窗为空，则继续走“未检测到”逻辑。

### 失败提示

- EN:
  - `Analysis Failed. Please retry or contact us for help.`
- ZH:
  - `分析失败，请重试或联系我们获得帮助。`

## 4. 下载配置

### 4.1 Movie 配置结构

Amazon Movie 的配置项包含：

- `Mode`
- `Video Codec`
- `Bitrate Adaption`
- `Resolution`
- `Audio Codec`
- `Language`
- `Subtitle`
- `Subtitle Action`

### 4.2 Mode

- `Full Download`
- `Audio Only`
- `Subtitle Only`

行为规则：

- `Audio Only` 时，只保留：
  - `Audio Codec`
  - `Language`
- `Subtitle Only` 时，只保留：
  - `Subtitle`
  - `Subtitle Action`
- 其他配置项进入置灰态，而不是直接消失。

### 4.3 Video Codec

- `H264`
- `H265`

规则：

- 首次切换 Codec 时进入 loading。
- 切换 Codec 后，`Resolution` 和 `Language` 对应选项会变化。
- 若用户切换 codec 期间跳转到新视频，结果以最新分析视频为准。

### 4.4 Bitrate Adaption

- 默认 `CVBR`
- 可选 `CVBR / CBR`

规则：

- 不支持 setting 预设。
- 如果当前 codec 下没有可用 CBR 视频流，隐藏 `CBR` 选项。

### 4.5 Resolution

规则：

- 正常情况下：
  - 固定项：`Best Quality`
  - 动态项：`Resolution + Bitrate + Size`
- 例：
  - `1280x528 - 1158 kbps - 439.65 MB`

### 4.6 Audio Codec / Language

关系：

- `Audio Codec -> Language` 单向联动。
- 选择 Audio Codec 后，Language 跟着变化。
- 反向不成立。

Language 构成规则：

- `Language + Track Type + Audio Codec + Audio Bitrate`
- 例：
  - `English Dialogue Boost: High EAC3 5.1 - 640 kbps`
- 若没有 Track Type，则展示：
  - `Language + Audio Codec + Audio Bitrate`

支持的 Track Type：

- `Audio Description`
- `Dialogue Boost`

### 4.7 Subtitle

结构：

- `Subtitle`
- `Subtitle Action`

Subtitle Action 选项：

- `Remux Into File (SRT)`
- `Extract to SRT File`
- `Extract Original Format`

## 5. Playlist 架构

### 5.1 分析策略

- Playlist 只分析第一集。

影响：

- 第一集的 codec / bitrate / resolution 结果，不一定覆盖后续所有剧集。

### 5.2 H265 + CBR 兼容性

如果第一集下 `H265 + CBR` 不可用：

- 不使用客户端阻断式弹窗。
- 插件使用非阻断常驻提示。

提示文案：

- EN:
  - `If CBR isn't available for this episode, we'll still try other episodes in CBR.`
- ZH:
  - `如果本集没有 CBR 格式，我们仍会尝试下载其他集的 CBR 格式。`

### 5.3 Resolution fallback

当 `Codec + Bitrate` 不可用时，Resolution 使用固定值：

- `Best Quality`
- `1920x1080 if available`
- `1280x720 if available`
- `960x540 if available`
- `640x480 if available`

选中项取决于 setting 预设。

### 5.4 内容结构

Playlist 需要支持：

- `Season`
- `Episode`
- `Bonus / Extras`
- `Trailers`

规则：

- 只展开第一组树结构，其余默认折叠。

## 6. 任务创建与下载队列

### 下载任务展示

在 `Mode = Audio Only / Subtitle Only` 时：

- 待下载、下载成功：
  - 不展示分辨率，只展示 `Audio Only` 或 `Subtitle Only`
- 排队下载、下载中：
  - 不展示分辨率

### 队列管理

- 主视频和花絮作为独立任务展示。
- 下载列表不保留 Playlist 的树形层级。

## 7. Setting 联动

Amazon Setting 结构仍为：

- `Extension`
- `CoApp`

但 Amazon 特有配置包括：

- `Video Codec`
- `Video Resolution`
- `Pre-select Audio Language`
- `Audio Channel`
- `Pre-select Subtitle Language`
- `Subtitle Action`
- `Pre-Select Dialogue Boost Audio`

明确去掉：

- `Amazon Prime Video Region`

## 8. 数据上报

- 数据上报逻辑与 Netflix 一致。
- 通过 Amazon 插件 id 和对应索引区分统计对象。
