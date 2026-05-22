# Video DownloadHelper V10 去 CoApp 调研与 StreamFab 插件方案评估

> 日期：2026-05-21
> 适用范围：StreamFab 浏览器插件产品线，包括 Video Downloader、M3U8 Downloader、MPD Downloader 以及各站点插件的安装漏斗和技术架构评估。
> 结论口径：本文件是调研与方案建议，不是已确认研发方案。涉及浏览器内下载、分段流合并、字幕/音轨处理、授权与计费的部分仍需研发 PoC 验证。

## 1. 背景

Video DownloadHelper（下文简称 VDH）历史上是典型的“浏览器扩展 + Companion App/CoApp”结构。StreamFab 浏览器插件早期也参考了类似思路：扩展负责页面感知、线索采集和 UI，CoApp/客户端负责分析、下载、解密、remux 与本地文件处理。

VDH 最新主线已经进入 V10：Chrome Web Store 显示版本 `10.2.53.2`，更新时间为 2026-05-18；Firefox AMO 显示版本 `10.2.40.2`，更新时间为 2026-04-13。官方 V10 文档明确说明：V10 不再需要 CoApp。

这意味着 VDH 并不是简单优化了 CoApp 安装流程，而是把核心下载链路从“扩展调用本地 Native Host”转为“尽量在浏览器扩展能力内完成”。

## 2. 外部证据

### 2.1 VDH V10 的官方表述

VDH 官方帮助文档《About V10》写明：

- V10 是不需要 CoApp 的新版本。
- 这么做是为了解决用户在 CoApp 上遇到的杀毒软件拦截、CPU 不支持、旧系统不支持等问题。
- V10 的收益包括：

- 不需要 CoApp。
- 下载更快，因为可以使用浏览器缓存。
- 下载支持范围更广，因为可以使用浏览器 cookies 和 headers。
- V10 的限制包括：

- 只能下载到浏览器下载目录。
- `Download As...` 对话框只能在下载完成后出现。

来源：[https://help.downloadhelper.net/article/21-about-v10](https://help.downloadhelper.net/article/21-about-v10)

VDH GitHub Wiki 的 V10 页面也给出同样口径，并补充 V9 仍可作为旧版本使用：

来源：[https://github.com/aclap-dev/video-downloadhelper/wiki/VDH-V10](https://github.com/aclap-dev/video-downloadhelper/wiki/VDH-V10)

### 2.2 VDH CoApp 的状态

VDH CoApp GitHub 仓库 README 顶部写明：VDH CoApp 不再继续开发，因为 VDH v10 不需要 companion。

同一个 README 也说明旧 CoApp 原本提供三类能力：

- file writing API
- 启动默认视频播放器打开数据文件
- 内置 ffmpeg video converter

来源：[https://github.com/aclap-dev/vdhcoapp](https://github.com/aclap-dev/vdhcoapp)

### 2.3 浏览器下载 API 的能力与限制

Chrome `downloads.download()` 支持：

- 通过浏览器发起 URL 下载。
- 对 HTTP/HTTPS URL，可携带当前主机名下的 cookies。
- 可传入额外 HTTP headers，但受 XMLHttpRequest 允许范围限制。
- `filename` 只能是相对默认 Downloads 目录的路径，不能是绝对路径。

来源：[https://developer.chrome.com/docs/extensions/reference/api/downloads](https://developer.chrome.com/docs/extensions/reference/api/downloads)

Firefox WebExtensions `downloads.download()` 也有类似约束：

- `filename` 是相对默认下载目录的路径。
- 可设置 headers，但 forbidden headers 仍受限制。
- `saveAs` 可触发文件选择器，但行为受浏览器偏好与平台限制影响。

来源：[https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download)

## 3. VDH 究竟做了什么改动

基于官方说明，可以明确确认的改动是：

1. **从 Native Messaging/CoApp 依赖转向浏览器原生下载链路**

- V9 及更早版本依赖 CoApp 做文件写入、ffmpeg 转换和部分本地能力。
- V10 改为使用浏览器下载能力作为主链路，不再要求用户先安装外部本地组件。
2. **利用浏览器已有会话能力提高下载成功率**

- 官方明确提到 V10 可以使用 browser cookies 和 headers。
- 这对需要登录态、Referer、Authorization 或特定请求头的站点有直接价值。
- 和 CoApp 从外部进程重新请求资源相比，浏览器侧更接近用户真实播放环境。
3. **利用浏览器缓存减少重复下载或提高速度**

- 官方明确提到 V10 可以使用 browser cache。
- 这意味着 VDH 更依赖浏览器已访问/已播放产生的数据上下文，而不是完全由本地 CoApp 自行重新拉取。
4. **接受浏览器沙盒限制，换取安装门槛下降**

- 原先 CoApp 解决的是本地文件系统、ffmpeg、播放器启动等能力。
- V10 放弃或弱化这些 OS 级能力，转而接受下载目录、保存对话框、headers、下载历史等浏览器 API 边界。

需要注意：官方没有公开 V10 内部如何处理所有 DASH/HLS/MPD 的分片合并、容器封装和格式转换。可以确定的是它已经不再依赖旧 CoApp；但具体是使用浏览器下载、扩展内 JS/wasm 处理、站点特定下载策略，还是组合方案，需要进一步通过实际抓包/包体分析确认。

## 4. VDH V10 仍然存在的限制

### 4.1 文件系统限制

VDH V10 不能像本地客户端一样随意写入任意路径。官方明确说只能下载到浏览器下载目录。浏览器 API 文档也确认 `filename` 只能是相对默认 Downloads 目录的路径。

这会影响：

- 不能由插件完全控制保存目录。
- 多任务归档、跨盘保存、按站点保存到用户指定资料库等能力受限。
- “下载前选择保存位置”的体验不如 CoApp/客户端直接。

### 4.2 后处理能力限制

旧 CoApp 的核心价值之一是内置 ffmpeg converter。VDH V10 虽然页面仍宣传支持 HLS/DASH/MPD、HD 与转换，但没有 CoApp 后，本地 ffmpeg 级别能力不再天然存在。

对 StreamFab 来说，不能直接假设“浏览器扩展内就能稳定替代 FFmpeg/remux/decrypt”。尤其是：

- 多音轨、多字幕、多码率选择。
- DASH audio/video 分离流合并。
- HLS rolling playlist 与长直播录制。
- 容器转换、封装修复、断点续传后的可播放性修复。
- 大文件长时间内存/缓存压力。

这些都需要 PoC，而不是照抄 VDH 的市场口径。

### 4.3 DRM 限制没有消失

VDH 官方 DRM 页面明确表示，遇到 DRM 保护内容时，Video DownloadHelper 不能也不会尝试破解 DRM。

来源：[https://github.com/aclap-dev/video-downloadhelper/wiki/What-can-I-do-if-the-video-is-protected-by-DRM%3F](https://github.com/aclap-dev/video-downloadhelper/wiki/What-can-I-do-if-the-video-is-protected-by-DRM%3F)

### 4.4 Chrome 渠道政策限制仍在

VDH Chrome Web Store 页面明确说明 Chrome 版不支持 YouTube；VDH FAQ 说明原因是 Google 不允许 Chrome 扩展下载 YouTube 视频，否则扩展会被下架。

来源：

- [https://chromewebstore.google.com/detail/video-downloadhelper/lmjnegcaeklhafolokijcfjliaokphfk](https://chromewebstore.google.com/detail/video-downloadhelper/lmjnegcaeklhafolokijcfjliaokphfk)
- [https://www.downloadhelper.net/w/FAQ](https://www.downloadhelper.net/w/FAQ)

对 StreamFab 的含义：即使技术上减少 CoApp 依赖，商店政策限制仍需要单独设计渠道差异。当前 StreamFab 知识库里“Chrome 商店版不支持 YouTube，引导 Edge 或官网版”的规则仍然有效。

## 5. 与 StreamFab 现有架构的差异

### 5.1 StreamFab 当前链路

本地知识库中，StreamFab 插件当前基线可以抽象为：

```
浏览器插件
  -> 监听 tab/url/request/response
  -> 收集网页上下文与网络线索
  -> 通过 Native Messaging 发给 CoApp
  -> CoApp 做 URL 支持判断、分析、下载、解密、remux
  -> 插件展示 analyze_status、analyze_result、download_progress、download_result
```

现有结论明确写到：整体链路不是“插件自行分析视频”，而是“插件采集线索，CoApp 分析并执行”。

### 5.2 StreamFab CoApp 当前承载的能力比 VDH V10 可替代范围更重

StreamFab CoApp/客户端不只是下载器外壳，还承担：

- 站点支持判断。
- 多请求/响应数据分析。
- `analyze_result` 结构化产出。
- 视频、音频、字幕、季集、extras 等元数据处理。
- 下载参数解释与任务创建。
- 下载、解密、remux、进度回传。
- 授权、试用次数、订阅上限、下载配额等业务流程配合。

这意味着 StreamFab 不应直接得出“VDH 可以不用 CoApp，所以我们也可以全量去 CoApp”的结论。

更合理的判断是：StreamFab 可以借鉴 VDH 的“降低安装门槛”方向，把 CoApp 从强制前置改为按能力触发，但不要把 CoApp 从核心能力中一次性移除。

## 6. 可借鉴点

### 6.1 产品策略：从“先装 CoApp”改成“先可用，再增强”

当前如果插件在首次使用时强引导安装 CoApp，用户会把插件理解成“只是客户端安装器”。VDH V10 的启发是：先让插件在浏览器内尽可能完成检测、展示、简单下载或轻量下载，再在高级能力场景提示安装 CoApp/客户端。

建议把安装漏斗改成三级：

1. **无 CoApp 可用层**

- 可检测当前页面视频线索。
- 可展示可下载候选。
- 对浏览器可直接下载的资源提供下载。
- 对不可处理资源给出原因与升级路径。
2. **CoApp 增强层**

- 高质量 HLS/DASH/MPD 合并。
- 多音轨、多字幕、多格式封装。
- 批量下载、队列、失败重试。
- 任意保存目录、本地文件管理。
3. **StreamFab 客户端兜底层**

- DRM/专站客户端能力。
- 复杂授权、站点特定下载器。
- 与完整桌面产品订阅体系打通。

### 6.2 技术策略：增加 Browser-only Engine

不要把现有 CoApp Engine 拆掉。建议新增一个 Browser-only Engine：

```
Detection Layer
  -> 浏览器侧 webRequest / content script / page context 线索
  -> Capability Router
      -> Browser-only Engine
      -> CoApp Engine
      -> StreamFab Client Deep Link
```

Capability Router 负责判断：

- 当前资源是否是直接 MP4/WebM/可直接下载 URL。
- 是否是非 DRM HLS，且浏览器侧能稳定处理。
- 是否需要 audio/video 合并。
- 是否需要字幕 remux。
- 是否需要任意保存目录。
- 是否触发 Chrome/Edge/Firefox 渠道政策限制。

### 6.3 交互策略：把 CoApp 安装提示改成能力解释

不要在空状态直接写“Install CoApp”。建议按失败原因显示：

- “Basic download is available in your browser.”
- “Install StreamFab CoApp to merge separate audio/video streams.”
- “Install StreamFab CoApp to choose any save folder and manage batch tasks.”
- “Protected video content requires StreamFab desktop app.”
- “Chrome Web Store version cannot download YouTube videos. Use Edge or official package.”

用户看到的是能力差异，而不是被强制安装。

## 7. 方案选项

### 方案 A：维持现状，继续强制 CoApp

适合：短期不投入研发。

优点：

- 不影响现有 CoApp 分析和下载链路。
- 研发成本最低。
- 对复杂下载能力最稳。

缺点：

- 首次使用转化阻力高。
- 用户容易在杀毒、权限、系统兼容、Native Messaging 识别上流失。
- 与 VDH V10 的“无 CoApp 可用”体验差距会扩大。

结论：不建议作为长期策略。

### 方案 B：完全去 CoApp，全部改成浏览器内下载

适合：只做轻量通用视频下载器，不追求 StreamFab 现有高质量能力。

优点：

- 安装门槛最低。
- 跨平台潜力更好。
- 用户感知更接近普通浏览器扩展。

缺点：

- 很难覆盖现有 StreamFab 的高质量下载、remux、字幕、队列、保存目录、授权和专站能力。
- 大文件、分段流、直播流、复杂音轨处理风险高。
- 会削弱 StreamFab 与桌面客户端的差异化。

结论：不建议。它会把 StreamFab 做窄，且工程不确定性高。

### 方案 C：混合架构，Browser-only 作为默认轻量层，CoApp 作为增强层

适合：StreamFab 当前产品线。

优点：

- 降低首次使用门槛。
- 保留现有 CoApp/客户端核心能力。
- 可以按站点、协议、渠道逐步灰度，不需要一次性替换。
- 能把“安装 CoApp”从前置门槛改为价值解释。

缺点：

- 需要维护两套能力路径。
- UI 需要清楚表达不同下载方式的能力边界。
- 需要埋点区分 browser-only 成功率、转 CoApp 率、失败原因。

结论：推荐。

## 8. 推荐方案

推荐采用方案 C：**StreamFab Plugin Lite Mode + CoApp Enhanced Mode**。

一句话定义：

> 插件默认无需 CoApp 即可完成页面检测和基础下载；遇到需要合并、解密、remux、批量、任意保存目录或专站能力时，再引导安装/打开 StreamFab CoApp 或桌面客户端。

### MVP 范围

MVP 不建议覆盖所有站点。建议先选两类：

1. **直接文件下载**

- MP4/WebM/音频文件等可直接由浏览器下载 API 保存的资源。
- 目标是验证 cookies、headers、Referer、文件命名、浏览器默认下载目录和下载状态回传。
2. **非 DRM HLS 简化路径**

- 仅验证明文 HLS 或 playlist 中可直接取 key 的 AES HLS。
- 首期可以只做单音轨、无字幕或外挂字幕不 remux。
- 遇到 DASH audio/video 分离、多音轨、多字幕、直播长录制时转 CoApp。

### 不纳入 MVP

- DRM 内容。
- YouTube Chrome 商店版下载。
- 完整 DASH 合并与转码。
- 任意保存目录。
- 大规模批量队列。
- 复杂字幕 remux。
- 长直播 4-6 小时稳定录制。

## 9. PoC 验证清单

### 技术 PoC

- 浏览器下载 API 是否能稳定携带目标站点所需 cookies/headers。
- webRequest 能否拿到足够的 HLS/DASH/MPD 线索。
- Browser-only 下载结果在 Chrome / Edge / Firefox 的文件命名、目录、冲突处理是否一致。
- 明文 HLS/AES-HLS 是否能在扩展侧稳定下载并生成可播放文件。
- 大文件和多分片下载是否会触发 MV3 service worker 生命周期、内存、缓存或下载并发问题。
- 与现有 CoApp 任务队列、授权、配额扣减是否能共存。

### 产品 PoC

- 首次打开插件时，不安装 CoApp 的用户能否完成至少一次成功下载。
- 当 Browser-only 不支持时，用户是否理解为什么需要 CoApp。
- CoApp 安装转化是否从“被迫安装”变成“为了高级能力安装”。
- 用户是否接受下载目录只能在浏览器 Downloads 下的限制。

### 数据指标

- Browser-only 检测成功率。
- Browser-only 下载成功率。
- Browser-only 失败原因分布。
- 从 Browser-only 转 CoApp 的点击率与安装完成率。
- CoApp 安装后高级下载成功率。
- 首次下载完成率与首次流失率。

## 10. 风险与缓解

| 风险 | 说明 | 缓解 |
| --- | --- | --- |
| 能力承诺过度 | 用户以为无需 CoApp 就能覆盖所有站点 | UI 中明确分 Basic / Enhanced / Desktop |
| 浏览器目录限制引发投诉 | 不能像客户端一样选择任意目录 | 支持 Downloads 下子目录与 smart naming；高级保存目录归 CoApp |
| 分段流合并不稳定 | HLS/DASH/MPD 差异大 | MVP 只做直接下载和极简 HLS，复杂场景转 CoApp |
| DRM 误解 | 用户误以为 VDH 去 CoApp 后能处理 DRM | 所有文案保持 Protected Video Content 边界 |
| 渠道政策风险 | Chrome 对 YouTube 等限制仍在 | 沿用现有渠道差异矩阵 |
| 两套引擎维护成本 | Browser-only 与 CoApp 并存 | 通过 Capability Router 和统一结果模型收敛 UI |

## 11. 最终建议

不建议把 StreamFab 插件全量改成“无 CoApp 产品”。VDH V10 值得借鉴的是**安装门槛降低与浏览器会话复用**，不是“本地增强能力完全消失”。

建议方向：

1. 立项一个 Browser-only Lite Mode PoC。
2. 保留 CoApp 作为 Enhanced Mode。
3. 首期只覆盖直接文件与简单非 DRM HLS。
4. 重构安装引导：从启动前强制安装，改为按能力触发安装。
5. 用数据决定是否扩大 Browser-only 能力，而不是一次性替换现有 CoApp 架构。

如果 PoC 成功，下一步可以把结论沉淀进：

- `Extension/common_plugin_rules.md`：新增“Browser-only / CoApp Enhanced 双层模式”的共性规则。
- `Extension/shared_references/streamfab_extension_common_ux_patterns.md`：新增无 CoApp、需 CoApp、需客户端三类状态。
- 各插件 `07_technical_constraints.md`：按站点确认 browser-only 可覆盖范围。