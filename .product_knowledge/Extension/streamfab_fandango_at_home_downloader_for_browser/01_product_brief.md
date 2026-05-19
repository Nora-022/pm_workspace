# 01 产品简介

## 一句话定位
`StreamFab Fandango at Home Downloader for Browser` 是面向 `Fandango at Home` 的单站点浏览器插件知识库项目。

## 当前范围
- 建立 Fandango at Home 插件的产品知识结构
- 对齐 Amazon 模板插件的目录、需求文档和初始化方式
- 为后续站点调研、PRD、UI 设计和版本维护提供统一入口

## 非目标
- 当前阶段不对未确认的站点能力边界做公开结论
- 当前阶段不在知识库中写入未经确认的业务规则

## 初始化基线
- 参考插件：`streamfab_amazon_downloader_for_browser`
- 初始化日期：`2026-04-14`

---

## 产品事实（2026-05-19 分发）

事实来源：`references/site_research_notes.md`、`references/product_page_facts.md`、客户端方案拆解（飞书）、`requirements/plugin_requirement.md`。

### 平台与服务

- 运营平台：Fandango at Home（前身 Vudu，2024-03-12 由 NBCUniversal / Comcast 旗下 Fandango Media 完成更名）
- 服务地区：仅美国可用，账户、播放和下载均地理锁定
- 内容形态：Movies、TV Shows、Free with Ads；TVOD（Rent / Buy）为主 + AVOD 混合
- 资料库规模：官方对外口径 200,000+ 标题
- 界面语言：英文为主，无多语言切换

### 插件支持的输出能力

- 输出格式：MP4、MKV（FFmpeg / MKVToolNix）
- 视频清晰度：up to 4K，实际上限以 CoApp 分析结果为准
- 视频编码：H264、H265 - SDR、HDR10、Dolby Vision
- 音频编码：EAC3 5.1、AAC 2.0
- 字幕：多语言；可保存为 SRT 或封装进视频；一个视频可同时下载多种语言字幕

### 商业方案

- 复用 StreamFab 浏览器插件统一 Trial / Paid 体系（试用次数和价格档以 pid 总表 / 主站为准）
- 产品页标价：USD 59.99（抽取日期 2026-04-17）
- 提供免费试用 + 付费（授权 / 订阅）模式

### 主要边界

- 仅处理用户在 Fandango at Home 已 Rent / Buy / Free-with-Ads 的内容
- 保留 `eligible`、`personal offline viewing`、`valid access period` 表述
- Rent 内容 30 天激活 + 48 小时观看窗口；Buy 内容永久持有
- 4K HDR / Dolby Vision 实际命中以 CoApp 分析结果为准，不在任何环境下都成立

### 基线插件复用

- 基线插件：`streamfab_netflix_downloader_for_browser`
- 复用范围：登录 & 授权、用户权益、视频分析、视频检测、数据上报、Dashboard 框架、Setting 框架
