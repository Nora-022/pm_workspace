# 01 产品简介（Product Brief）

## 产品名称
- StreamFab Netflix Downloader for Browser

## 一句话定位
- 面向 Netflix 用户的专用浏览器下载插件，仅支持 Netflix 站点视频下载。

## 产品角色
- Netflix 插件是单站点插件，不是多站点通用下载插件。
- 在产品框架上，它沿用 StreamFab 浏览器插件的 common popup、dashboard、notification、CoApp 体系。
- 在业务上，它围绕 Netflix 的登录、播放、分析、下载和 DRM 鉴权链路展开。

## 支持范围
- 目标站点：`netflix.com`
- 内容范围：Netflix 单视频、剧集与 Season / Episode 结构内容
- 当前已归档能力：
  - 仅支持 Netflix 站点
  - 支持下载任务与新视频分析并行进行
  - 批量发起任务 + 串行下载
  - 下载配置基于 metadata 返回
  - CoApp 负责分析结果回传、下载执行与错误码回传

## 商业方案
- 试用方案：`30-Day Free Trial`，免费，每个服务最多下载 3 个视频
- 付费方案：`1 Month License $54.99 / 1-Year License $79.99 / Lifetime License $99.99`

## Netflix 插件相对 common 的关键差异

### 1. 下载配置字段更完整

- Netflix 的正式下载配置以完整字段集为准，不按截图区域差异收缩。
- 单视频与 playlist 的配置逻辑保持一致。
- 当前需要支持的字段包括：
  - `Video Codec`
  - `Resolution`
  - `Audio Codec`
  - `Language`
  - `Subtitles`

说明：

- `Video Codec` 在界面上采用扁平化能力表达，而不是客户端中的多级级联。
- 历史资料里出现过字段较少的截图，当前不作为产品规则保留。

### 2. Codec 切换会触发重新分析

- 切换 `Video Codec` 时需要重新请求 CoApp。
- 交互上应表现为独立加载态，而不是静默替换。
- 若切换过程中用户跳到新视频，当前视频的 codec 切换应取消，并回退到最近一次稳定分析结果。

### 3. Playlist 强调 Season 层级

- Netflix 的 playlist 弹窗必须体现 `Season -> Episode` 结构。
- 即使只有一季，也沿用 season 结构心智。
- Episode 项只展示时长，不展示文件大小。

### 4. 登录状态对任务状态影响明确

- `Detected` 与 `Pending` 依赖登录态，不在登出后继续放行。
- `Downloading` 进入执行后可继续。
- `Failed` 在登出场景下不允许重试。

### 5. Trial 规则包含 Error 330 特殊限制

- 最近两个月缓存 key 视频对 Trial 用户受限。
- 插件不再额外弹“最近两个月视频限制下载”的旧阻断弹窗。
- 统一通过 `Error 330` 呈现并上报，失败不扣次。

## 主要边界
- 不支持 Netflix 以外站点。
- 不在未登录 / 未播放情况下放行有效下载。
- 不支持预分析，不做“先给基础参数再补全”的表达。

## 信息来源
- Netflix 需求文档
- Netflix UI 需求说明
- Netflix 客户端方案拆解
