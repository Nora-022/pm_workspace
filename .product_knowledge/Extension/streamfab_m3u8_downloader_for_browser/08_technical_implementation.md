# 08 技术实现方案（Technical Implementation）

本文件只记录已确认的技术事实，来源为插件交互接口文档。未确认或待修复问题见 `09_technical_open_issues.md`。

## 信息源

| 编号 | 文档标题 | 飞书链接 |
|---|---|---|
| S1 | 插件交互接口 | https://i6a1sqw3p2.feishu.cn/wiki/P1SXwRmxmityKjkgfPpcRJnanGh |

---

## 核心架构

当前插件接口架构可拆成三层：

1. 插件
- 监听浏览器 `tab`、`url`、请求与响应变化
- 将线索数据发送给 CoApp
- 接收分析状态、分析结果、下载状态与结果
- 负责界面展示、参数收集和下载交互

2. Bridge / Native Messaging
- 负责插件与 CoApp 之间的消息透传

3. CoApp
- 根据插件提供的上下文和网络线索进行 URL 支持性判断
- 决定是否进入分析流程
- 产出 `analyze_status`、`analyze_result`
- 执行下载、解密、remux，并回传进度和结果

整体链路不是“插件自行分析视频”，而是“插件采集线索，CoApp 分析并执行”。

## Meta 分析入口

插件向 CoApp 持续发送三类关键信号：

### 1. Tab 激活

- 消息：`tab_actived`
- 作用：浏览器 tab 切换时通知 CoApp 做初始化

### 2. URL 变化

- 消息：`url_change`
- 作用：浏览器地址栏变化时通知 CoApp

### 3. 请求与响应数据

- 消息：`response_data`
- 作用：插件拦截浏览器请求与响应数据后，将请求头、payload、响应头和部分响应体透传给 CoApp

文档明确说明：

- `main_frame` 请求需要等拿到 `responseData` 后一起发送
- 其他请求通常不依赖完整响应体
- 为减少交互次数，可过滤样式、图片、字体、favicon、script 等无关类型

这说明插件的“检测”本质是：

- 感知页面变化
- 拦截网络线索
- 向 CoApp 提供可分析上下文

## URL 判断的实际含义

当前接口文档没有公开 CoApp 内部的具体匹配算法，但从时序和接口职责可以确认：

- 插件先发现 URL 变化，并通过 `url_change` 上报
- CoApp 收到 URL 后，先判断该 URL 是否属于支持或值得继续观察的页面
- 这一步是进入分析流程的第一轮筛选

需要特别区分：

- URL 判断
  - 只是在判断“当前页面是否可能存在可处理的视频线索”
- 视频分析成功
  - 则需要继续依赖 `response_data` 提供的请求、响应和页面数据

因此：

- URL 支持，不等于已经检测到可分析视频
- URL 不支持，则通常不会继续进入后续分析

## 检测与分析的职责划分

### 插件负责

- 感知 `tab` 激活
- 感知 URL 变化
- 拦截请求与响应数据
- 上报浏览器上下文
- 接收状态并更新 UI
- 保存 `analyze_result`
- 将用户选择转换为下载请求参数

### CoApp 负责

- 判断当前 URL 是否值得继续分析
- 基于 `response_data` 判断是否已有足够视频线索
- 在必要时继续等待更多数据，或加载额外页面补充数据
- 返回 `analyze_status`
- 返回 `analyze_result`
- 执行下载、解密、remux

## 分析状态流

CoApp 在分析过程中向插件发送：

- `analyze_status`

例如：

- `ANALYZE_VIDEO_URL`
- `ANALYZE_AUDIO_SUBTITLES_INFO`
- `ANALYZE_SEASON_INFO_LEFT`
- `ANALYZE_METADATA_INFO`
- `ANALYZE_PLAYLIST_INFO_LEFT`

接口定义表明：

- 这些状态由 CoApp 主动发给插件
- 插件需要据此展示分析进度
- 当前接口语义下，分析时需要弹出提示并阻止用户操作网页

## 分析结果

CoApp 分析完成后向插件发送：

- `analyze_result`

其结果并非简单成功标记，而是完整的结构化数据，至少包括：

### 1. `meta`

- 标题
- 缩略图
- Season / Episode 结构
- 时长
- Extras 等附属内容

### 2. `mediaConfig`

- 是否支持增强配置：`isValid`
- 字幕封装能力：`subtitle.remux`
- 视频 codec 能力：`video.listCodecInfo`
- 音频 codec 能力：`audio.lstSupportAudioCodec`
- 特定站点的附加配置
  - `video.listBitrateAdaptionInfo`
  - `videoType.lstSupportVideoType`

界面渲染规则依赖这些字段：

- 空列表或无效字段对应控件应隐藏
- `analyze_result` 需要被插件保存，供后续下载请求复用

## 下载链路

插件发起下载时，向 CoApp 发送：

- `download`

下载参数不只包含 URL，还包括：

- `taskID`
- `videoID`
- `videoCodec`
- `audioCodec`
- `audioChannel`
- `defaultAudioID`
- `defaultSubtitleID`
- `listAudioID`
- `listSubtitleID`

这说明：

- `analyze_result` 是下载前的中间数据模型
- 插件需要先保存它，再结合用户选择生成下载任务参数

## 下载执行状态

CoApp 会继续向插件发送：

- `download_status_change`
- `download_progress_info`
- `decrypt_info`
- `remux_info`
- `download_result`

因此插件侧只负责：

- 展示下载状态
- 展示进度
- 展示最终成功或失败

真正的下载、解密和 remux 由 CoApp 完成。

## 当前可确认的关键结论

1. 插件具备“线索检测与采集能力”，不是完全被动等待结果
2. CoApp 不仅负责分析结果产出，也负责基于 URL 和网络线索决定是否进入分析
3. URL 判断只是候选页筛选，不等于已经成功检测到视频
4. `response_data` 是视频分析真正依赖的主数据流
5. `analyze_result` 是结构化数据模型，不是简单的成功消息
