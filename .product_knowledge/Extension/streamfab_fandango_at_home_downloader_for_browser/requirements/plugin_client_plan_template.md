# [StreamFab 浏览器插件] - [Fandango at Home] - 客户端方案拆解

> 填写说明：本文件由初始化流程生成，基于飞书客户端方案拆解模板抽象。请只填写已确认信息；未确认内容保留为空，或写入对应章节的待确认项。

---

## 背景&目的

对客户端的下载流程进行拆解，以确保 StreamFab 浏览器插件功能和用户体验与客户端基线基本一致。

---

## 客户端拆解

<!-- colwidth:36.24%,44.49%,19.27% -->
| 截图 / 模块 | 说明 | SF 插件策略 |
| --- | --- | --- |
| **Meta 分析弹窗**movie![](https://i6a1sqw3p2.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTM1MmUzZmM5YzA2ODE1ODI4MWE5YTRjNzczOTI1ZDNfbUNEOXhBNEd1N09DbjRwMDh6MndrV2o3R0ExVWRhR2VfVG9rZW46UkJQamJqUjN6b2lrNzZ4dUlib2NUc29ObnNpXzE3NzkwOTUxMTU6MTc3OTA5ODcxNV9WNA)tv![](https://i6a1sqw3p2.feishu.cn/space/api/box/stream/download/asynccode/?code=MjcwMTQ3YWQyYzVmYzkzMmU0ZmE2MzUyMDNhYTljYzhfbmVOMkFEYW5iTW80N0N2TW5MNjU2N3pOR1pnRjdFeWpfVG9rZW46SFJWdWJUMVNPb1BpVnl4VEd5dWN6TTNKbmpmXzE3NzkwOTUxMTU6MTc3OTA5ODcxNV9WNA) | Movie 由主视频和Extra构成，Extra分两级结构，按照meta分析返回的结果展示 下载配置项  ：Resolution Audio Codec    Language    Subtitle | 复用 Netflix 插件流程；按 Fandango at Home 实际分析结果补齐配置项。 |
| **Downloading 界面** | 下载中展示标签：文件大小或 Segments。<br>展示信息：下载进度、速度、剩余时间、任务状态。 | 复用 common 下载进度展示；无法获取文件大小时使用 Segments 进度。 |
| **Setting 界面**![image.png](https://doc-img.dvdfab.me/assets/2026/05/img/1779096218852-37c951cb817b.png) | 通用配置项(选项不再赘述）：Language、Video Format、Video Resolution、Pre-select Audio Language、Audio Channel、Pre-select Subtitle Language、Subtitle Action。特殊配置项： Video Codec：<br>H264 H265 - SDRHDR10 Dolby Vision Audio Codec： EAC3 AAC配置项顺序为：Language、Video Format、Video Codec、Video Resolution、Pre-select Audio Language、Audio Codec、Audio Channel、Pre-select Subtitle Language、Subtitle Action。<br>1112223334661234<br>1<br>2<br>3<br>4 | common 配置项+特殊配置项 |

---

1

2

3

4

## 网站产品页

| 渠道 | 链接 |
| --- | --- |
| 主站 | [https://streamfab.dvdfab.cn/fandango-at-home-downloader.htm](https://streamfab.dvdfab.cn/fandango-at-home-downloader.htm) |
| 独立站 | [https://streamfab.com/fandango-at-home-downloader.htm](https://streamfab.com/fandango-at-home-downloader.htm) |

---

## Feature

- 支持通过内置浏览器浏览 Fandango at Home 内容
- 支持 region-agnostic：下载用户有权限观看的任意区域内容
- 支持输出格式 MP4 / MKV
- 支持 up to 4K
- 支持 HDR10 和 Dolby Vision
- 支持 EAC3 5.1 与 AAC 2.0
- 支持多语言字幕选择
- 支持字幕保存为 SRT 文件或封装进视频
- 支持一个视频同时下载多种语言字幕文件
- 支持批量下载与下载队列管理
- 支持自动 / 定时下载（按天或按周自动下载新发布内容）
- 支持去广告处理（对含广告计划的内容进行无广告导出，适用范围待客户端确认）
- 提供用户界面语言切换（多语言支持）
- 系统兼容要求：Windows / macOS + 最低硬件条件
- 提供免费试用 + 付费（授权 / 订阅）模式

---

## Notes / Constraints

- 仅供用户个人合法观看内容
- 仅限符合条件的 Fandango at Home 内容
- 离线观看需处于有效访问期内
- 有每日 / 每周下载配额限制（防止滥用与封禁风险）
- 根据内容版权 / DRM 状况，部分内容可能无法下载或质量受限
- 可下载的清晰度、编码、音轨取决于 Fandango at Home 源内容与账号订阅 / 购买权限
- 不同地区 Fandango at Home 内容库差异会影响可解析资源范围
- 产品页首屏强调 MP4，正文同时写到 MP4 / MKV；需求中需保留该层次差异

---

## 结论

核心流程大体上可复用 Netflix 插件流程；差异集中在 Meta 分析结果、Downloading 展示信息、Setting 配置项与站点限制。

| 项目 | 结论 |
| --- | --- |
| 是否可复用 Netflix 插件流程 | 可复用 |
| 需要扩充的配置参数 | 按 Fandango at Home 的 CoApp 分析结果补齐画质、格式、音轨、字幕等配置项 |
| 需要特殊处理的状态 / 错误 | eligible 内容、valid access period、DRM / 权限受限、地区内容差异 |
| 当前阻塞项 | 需要客户端确认 Meta 分析结果弹窗、Downloading 界面字段、Setting 差异项 |