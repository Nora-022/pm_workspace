# [StreamFab 浏览器插件] - [客户端方案拆解] -{SiteName}

## 背景&目的

对客户端的下载流程进行拆解，以确保 StreamFab 浏览器插件功能和用户体验与客户端基线基本一致。

---

## 客户端拆解

| 截图 / 模块 | 说明 | SF 插件策略 |
| --- | --- | --- |
| **Meta 分析结果弹窗** | 可选项为： |  |
| **Downloading 界面** | 下载中展示标签：<br>展示信息： |  |
| **Setting 界面** | 配置项： | 一致 |

---

## 网站产品页

| 渠道 | 链接 |
| --- | --- |
| 主站 | [https://streamfab.dvdfab.cn/{sitename}-downloader.htm](https://streamfab.dvdfab.cn/%7Bsitename%7D-downloader.htm) |
| 独立站 | [https://streamfab.com/{sitename}-downloader.htm](https://streamfab.com/%7Bsitename%7D-downloader.htm) |

---

## Feature

- 支持通过内置浏览器登录 `{SiteName}`
- 支持 region-agnostic：下载用户有权限观看的任意区域内容
- 支持输出格式 MP4 / MKV
- 支持视频编码选择（按客户端分析结果填写）
- 支持画质最高至 `{MaxResolution}`（如源内容和账号权限支持）
- 支持音轨选择（按客户端分析结果填写）
- 支持字幕选择与字幕处理（按客户端分析结果填写）
- 支持元数据保存（title / season / episode / cast / poster 等，按客户端能力填写）
- 支持批量下载与下载队列管理
- 支持自动 / 定时下载（例如设定时间自动抓取新上线剧集）
- 支持去广告处理（如站点和账号权益适用）
- 提供用户界面语言切换（多语言支持）
- 系统兼容要求：Windows / macOS + 最低硬件条件
- 提供免费试用 + 付费（授权 / 订阅）模式

---

## Notes / Constraints

- 仅供用户个人合法观看内容
- 有每日 / 每周下载配额限制（防止滥用与封禁风险）
- 根据内容版权 / DRM 状况，部分内容可能无法下载或质量受限
- 可下载的清晰度、编码、音轨取决于 `{SiteName}` 源内容与账号订阅 / 购买权限
- 不同地区 `{SiteName}` 内容库差异会影响可解析资源范围
- 如产品页或客户端分析存在能力冲突，以已确认的客户端分析结果为准

---

## 结论

核心流程大体上可复用 Netflix 插件流程；差异集中在 Meta 分析结果、Downloading 展示信息、Setting 配置项与站点限制。

| 项目 | 结论 |
| --- | --- |
| 是否可复用 Netflix 插件流程 |  |
| 需要扩充的配置参数 |  |
| 需要特殊处理的状态 / 错误 |  |
| 当前阻塞项 |  |