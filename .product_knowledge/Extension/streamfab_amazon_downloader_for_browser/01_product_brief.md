# 01 产品简介（Product Brief）

## 产品名称

- StreamFab Amazon Downloader for Browser

## 一句话定位

- 面向 Amazon Prime Video 的单站点浏览器下载插件，用于识别、分析并下载用户有权限观看的 Amazon 视频内容。

## 产品角色

- Amazon 插件是单站点插件，不是多站点通用下载器。
- 在产品框架上继承 StreamFab 浏览器插件的 common popup、dashboard、notification、CoApp 体系。
- 在能力上依赖 CoApp 提供实际分析和下载执行能力。

## 核心能力

- 支持 Amazon 电影和剧集内容下载。
- 支持 `MP4 / MKV` 输出。
- 支持 `H264 / H265` 编码选择。
- 支持最高 `1080p` 清晰度，如源内容支持。
- 支持 `AAC 2.0 / EAC3 5.1` 音轨能力，如源内容支持。
- 支持多音轨、多字幕、字幕单独导出或封装进文件。
- 支持 metadata 保存。
- 支持多集内容批量处理和下载队列管理。

## Amazon 插件相对 common 的关键差异

### 1. 分析链路更重

- Amazon 不只是“检测到视频即可下载”，而是存在明显的 `检测中 -> 分析中 -> 分析完成` 链路。
- 分析进度来自 CoApp 接口，不是插件本地假状态。
- 因此 Amazon 插件需要比 common 更强调分析阶段反馈。

### 2. 下载配置更复杂

- 新增 `Mode`：
  - `Full Download`
  - `Audio Only`
  - `Subtitle Only`
- 新增 `Bitrate Adaption`：
  - `CVBR`
  - `CBR`
- `Language`、`Audio Codec`、`Codec`、`Resolution`、`Subtitle Action` 之间存在联动关系。

### 3. Playlist 存在首集分析限制

- Playlist 场景只分析第一集。
- 第一集的参数不一定代表后续剧集全部参数。
- 因此需要兼容提示、Resolution fallback 和非阻断式说明。

### 4. Amazon 有更细的音轨类型

- 支持 `Audio Description`。
- 支持 `Dialogue Boost` 音轨及强度区分。
- Language 展示不只是语言名，还需要拼接 Track Type、Codec、Bitrate 信息。

## 商业方案

- Trial：试用期内每个服务最多下载 `3` 个视频。
- Paid：当前文档记录的销售方案为：
  - `1 Month License $54.99`
  - `1-Year License $79.99`
  - `Lifetime License $99.99`

## 主要边界

- 只处理用户有权限观看的 Amazon 内容。
- 不把 `Sports / Live` 默认视为已支持能力。
- 不写 `4K`、`HDR` 等当前未确认支持的能力口径。
- 可下载的清晰度、编码、音轨、字幕取决于 Amazon 源内容和账户权限。

## 重要外部信息

- 产品页：
  - [Amazon 产品页](https://streamfab.com/amazon-downloader.htm)
- 关键跳转：
  - What’s New
  - Upgrade / Purchase
  - Contact Us
- 安装器和 Mlink 链接另见需求文档归档。

## 信息来源

- Amazon UI 需求说明
- Amazon 需求文档
- Amazon 客户端方案拆解
