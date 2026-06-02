# 01 产品简介（Product Brief）

## 产品名称

StreamFab Downloader for Browser 产品线。

## 一句话定位

StreamFab 浏览器插件是面向主流流媒体和在线视频站点的浏览器下载工具集，通过浏览器扩展识别网页视频，通过本地 CoApp 执行分析、下载、转封装和授权相关能力。

## 产品角色

- **浏览器扩展**：负责站点识别、页面注入、Popup / Dashboard UI、用户配置、任务触发与状态展示。
- **CoApp 本地服务**：负责 Native Messaging 通信、实际下载、复杂流媒体处理、转封装、DRM 站点支持范围内的能力执行。
- **Video 插件**：ytdlp_mode 基线，承载通用多站点和 yt-dlp 技术栈。
- **Netflix 类插件**：netflix_mode 基线，承载 VIP 服务、DRM 授权链路和付费流程基线。

## 核心功能清单

- 在目标站点检测当前可下载视频。
- 展示 Detected 列表，并允许用户选择分辨率、格式、音轨、字幕等下载参数。
- 创建下载任务并进入 Downloads 队列。
- 支持单视频、Playlist / 剧集批量下载。
- 通过 Dashboard 展示 License Info 和全局 Setting。
- 处理 CoApp 安装、更新、不可用等依赖状态。
- 按账号权益、订阅状态和配额规则阻断或放行下载。

## 插件范围

插件清单和检测模式归属见 [READING_MAP.md](READING_MAP.md#检测模式归属表唯一权威)。当前产品线包括 Netflix、Disney+、U-NEXT、Fandango at Home、M3U8、MPD、Amazon、Hulu、FANZA、OnlyFans、myfans、TVer、Video 等插件。

## 产品红线

- 插件不绕过浏览器商店政策和站点版权规则。
- ytdlp_mode 不下载 DRM 受保护内容，统一引导桌面客户端或对应能力。
- 插件层不处理 DRM key，不在浏览器沙盒内承担复杂下载合并能力。
- 通用规则只写在 `_common`；单插件特殊价格、站点限制、配置项差异写入对应插件的 `plugin_differences.md` 和 `requirements/`。

## 详细来源

- [FRAMEWORK.md](FRAMEWORK.md)
- [READING_MAP.md](READING_MAP.md)
- [15_glossary.md](15_glossary.md)
- [10_detection_modes.md](10_detection_modes.md)
