# 02 功能架构详解（Functional Architecture）

## 功能模块总览
- Netflix 检测与 meta 获取
- 下载任务处理（插件 + CoApp）
- 下载配置字段联动
- Playlist / Season 结构处理
- Dashboard 与 Setting 联动
- 权益与授权控制

## 模块规格

### 模块：Netflix 检测与 meta 获取
- 前置条件：Netflix 站点 + 已登录 + 已播放
- 无预分析：meta 完成后一次性展示
- 无跨 Origin
- Detected 列表上限 50
- 支持下载任务进行时继续分析新视频

说明：

- 需求资料里出现过字段较少与字段较多两类截图，当前按“字段更全”的结果作为正式规则。
- 不把截图差异解释为预分析阶段。

### 模块：下载任务处理
- 批量发起
- 串行处理（并发 1）
- 队列 FIFO
- Retry 回队头
- 进度/状态由 CoApp 回传

状态补充：

- 下载任务以 `Season` 为单位进入 Downloads 列表
- 已在下载中的 playlist 任务不做额外覆盖或合并
- 重复发起同类任务时，界面层跳转到 Downloads，但不覆盖既有任务

### 模块：下载配置字段联动

#### 单视频 / Playlist 通用字段

- `Video Codec`
- `Resolution`
- `Audio Codec`
- `Language`
- `Subtitles`

#### Video Codec

Netflix 在界面上采用扁平化表达，当前支持：

- `H264 - High Profile`
- `H264 - Main Profile`
- `H265 - HDR10`
- `H265 - Dolby Vision`
- `VP9`
- `AV1`

规则：

- 切换 codec 会重新请求分析结果
- 切换过程中需要展示加载状态
- 若用户在加载中切到新视频，旧视频本次切换应取消，并回退到最近稳定结果

#### Resolution / Audio / Subtitle

- `Resolution`、`Audio Codec`、`Language`、`Subtitles` 均由 metadata 返回驱动
- `Language` 与 `Subtitles` 支持多选
- 配置项以完整分析结果为准，不再保留“较少字段版本”的单独规则

### 模块：Playlist / Season 结构处理

- Playlist 弹窗新增 `Season` 层级
- 默认选中 `Season 1 / Episode 1`
- Episode 项只展示时长，不展示文件大小
- 剧集配置逻辑与单视频一致

### 模块：权益与授权控制
- Trial 3 次
- Premium 每日 100
- 最近两个月缓存 key 视频：Trial 受限（Error 330）

补充规则：

- 任务发起时进入预扣减流程
- 成功时确认扣减
- 失败不扣减
- Retry 按当前剩余额度再次判断

## 核心依赖
1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内
