# Amazon 能力覆盖笔记

## 用途
- 这份文件用于快速回顾 Amazon 插件目前有哪些能力线索。
- 它把信息分成三层：
  - 产品页已确认
  - Prime Video 公开页面已观察到
  - Chrome 商店公开文案

## 1. 产品页已明确提到的能力

### 来自 StreamFab Amazon 产品页
- 分辨率：
  - up to `1080p`
- 音频：
  - `EAC3 5.1`
  - `AAC 2.0`
- 输出：
  - `MP4`
  - `MKV`
- 编码：
  - `H.264`
  - `H.265`
- 字幕：
  - 合并进视频
  - 导出为 `SRT`
- metadata：
  - title
  - cast
  - season
  - cover
  - 其它媒体库字段
- 工作流：
  - 定时下载新剧集
- 范围文案：
  - regular series
  - behind-the-scenes footage
  - films
  - rentals
  - purchased movies

## 2. Prime Video 公开页面线索

### 从公开页面可确认
- Prime Video 是一个目标站点。
- 顶部导航可见：
  - `Movies`
  - `TV shows`
  - `Sports`
  - `Live TV`
  - `Channels`
- 公开详情页可见：
  - `Watch with Prime`
  - `Join Prime`
  - `Rent`
  - `Buy`
  - `More purchase options`
  - `Audio languages`
  - `Subtitles`
  - `Studio`
  - `Cast`
- 公开剧集页可见：
  - season switcher
  - episode list
  - 单集 CTA

## 3. Chrome 已发布商店页线索

### 当前商店文案已确认
- 插件范围明确写成 `Amazon only`
- 明确提到了音轨选择
- 明确提到了字幕语言选择
- 明确提到了字幕导出 / 合并
- 明确提到了多集顺序处理
- 明确提到了队列管理
- 明确保留 title / season / episode 信息
- 明确提到了多语言 UI
- 明确提到了 trial 和 licensing
- 明确提到了本地 CoApp 架构
- 隐私文案明确写了不收集个人数据、浏览历史、账号凭据

### 当前已知发布信息
- 扩展 ID：
  - `hklfhiaihmmnodbbckgcleegglapjlfk`
- 版本：
  - `1.0.0.1`
- 发布方：
  - `dvdfab2003`
- Chrome 状态：
  - 已发布 / 已审核通过
- Edge 状态：
  - 审核中

## 4. 当前最值得保留的结论

### 稳定结论
- Amazon 应按 `Prime Video 单站点插件` 归档，不应记成多站点插件。
- 复杂点不在站点数量，而在同一站点内多种内容类型与权益路径并存。
- 最值得记住的核心区分是：
  - `site = one`
  - `content / entitlement types = multiple`

### 便于记忆的短标签
- Prime-included
- rent / buy
- channels
- sports / live
- episodic hierarchy
- metadata-rich detail pages
