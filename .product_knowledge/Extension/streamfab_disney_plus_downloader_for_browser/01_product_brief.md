# 01 产品简介（Product Brief）

## 产品名称

- StreamFab Disney Plus Downloader for Browser

## 一句话定位

- 面向 Disney Plus 的单站点浏览器下载插件，用于识别、分析并下载用户有权限观看的 Disney Plus 视频内容。

## 产品角色

- Disney Plus 插件是单站点插件，不是多站点通用下载器。
- 在产品框架上继承 StreamFab 浏览器插件的 common popup、dashboard、notification、CoApp 体系。
- 在能力上依赖 CoApp 执行实际分析和下载任务。

## 核心能力

- 支持 Disney Plus 单视频和 playlist 内容下载。
- 支持 `MP4 / MKV` 输出。
- 支持 `H264 / H265` 编码能力。
- 支持 `HDR10 / Dolby Vision` 编码变体表达，如源内容支持。
- 支持 `Atmos / EAC3 / AAC` 音频能力，如源内容支持。
- 支持多音轨、多字幕、字幕单独导出或封装进文件。
- 支持 metadata 保存。
- 支持批量下载和下载队列管理。
- 支持 Extras 内容下载。

## Disney 插件相对 common 的关键差异

### 1. 检测与下载可并行

- Disney 插件当前已支持检测与下载并行。
- 下载中的任务不再作为暂停新检测的默认条件。

### 2. 无预分析、一次性展示结果

- Disney 不拆分“检测中 -> 分析中”多阶段过程。
- meta 完成后一次性展示结果。

### 3. Extras 结构更特殊

- Disney 支持 Extras 下载。
- Playlist 弹窗中会出现额外的 `Extras` 层级，形成三级结构压力。
- 进入下载列表后，主视频与 Extras 不再成组展示，而是作为独立任务存在。

### 4. 文件大小信息不稳定

- Disney 代表的一部分 VIP 服务可能无法获取文件大小。
- 当文件大小拿不到时，界面不展示“文件大小”标签。

### 5. 试用逻辑存在边界说明

- 试用用户仅能试用 `3` 个视频。
- 但在边界逻辑上，允许发起任务数大于当前剩余可用任务数，后续再按业务规则扣减与处理。

## 商业方案

- Trial：
  - `30-Day Free Trial`
  - 每个服务最多下载 `3` 个视频
- Paid：
  - `1 Month License $59.99`
  - `1-Year License $89.99`
  - `Lifetime License $109.99`

## 主要边界

- 仅支持 `disneyplus.com`
- 当前知识库记录为 `Win` 为主，`macOS` 当前不支持或未开放
- 下载能力受源内容权限、地区、编码、音轨和版权状态影响
- 不把未确认能力直接写进插件承诺

## 重要外部信息

- 产品页：
  - [Disney Plus 产品页](https://streamfab.com/disney-plus-downloader.htm)
- 关键跳转：
  - What’s New
  - Upgrade / Purchase
  - Mlink

## 信息来源

- Disney Plus UI 需求说明
- Disney Plus 需求文档
- Disney 客户端方案拆解
