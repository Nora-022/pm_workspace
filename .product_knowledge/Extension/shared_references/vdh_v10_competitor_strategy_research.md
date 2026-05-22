# Video DownloadHelper V10 去 CoApp 竞品策略调研

> 日期：2026-05-21  
> 调研对象：Video DownloadHelper（VDH）V10，重点关注其从“扩展 + CoApp”转向“无需 CoApp”的产品与技术策略。  
> 文档定位：事实调研为主，StreamFab 可行性判断为辅。除已标注来源的事实外，其余为基于公开信息和 StreamFab 本地知识库的分析推断。

## 1. 关键结论

VDH V10 的变化不是“减少 CoApp 安装提示”，而是明确将主线产品切到“不需要 CoApp”的新架构。官方给出的理由是 CoApp 带来了杀毒软件拦截、CPU 不支持、旧系统不支持等用户问题；V10 改用浏览器缓存、cookies、headers 和浏览器下载能力来提高下载成功率并降低安装门槛。

这背后的竞品策略可以概括为：

- **把安装门槛从两个组件降到一个浏览器扩展**，提升新用户首次成功率。
- **把旧 CoApp 能力让位给浏览器原生能力**，接受下载目录、保存对话框、后处理能力受限的代价。
- **把复杂本地能力弱化成产品限制**，而不是继续要求所有用户先安装本地 native host。
- **通过 V10 新授权体系继续保留商业化闭环**，不是把产品变成完全免费或无账号模式。
- **保留 V9 作为旧路径兜底**，降低迁移风险。

对 StreamFab 的直接启发有限：StreamFab 当前 CoApp 不只是下载器，还承担授权、配额、分析、下载、解密和 remux。VDH 的策略可以借鉴在“降低前置安装门槛”，但不能直接照搬为“StreamFab 插件也可以下载前完全不依赖 CoApp”。

## 2. 可验证事实

### 2.1 V10 已成为 VDH 当前主线版本

| 渠道 | 当前公开版本/状态 | 事实来源 |
| --- | --- | --- |
| Chrome Web Store | `10.2.53.2`，更新时间 `2026-05-18`；页面说明支持 HLS/DASH/MPD、直播、HD、转换，但注明 Chrome 版不支持 YouTube | Chrome Web Store |
| Firefox AMO | `10.2.40.2`，更新时间 `2026-04-13`；页面说明支持 YouTube、HLS/DASH/MPD、直播、HD、转换 | Firefox AMO |
| V10 可用性 | 官方 Wiki 写明 V10 自 `2025-09` 起已在 Edge 和 Chrome 商店可用，Firefox 于 `2025-12-09` 发布 V10 | VDH Wiki |

来源：

- [Chrome Web Store - Video DownloadHelper](https://chromewebstore.google.com/detail/video-downloadhelper/lmjnegcaeklhafolokijcfjliaokphfk)
- [Firefox AMO - Video DownloadHelper](https://addons.mozilla.org/en-US/firefox/addon/video-downloadhelper/)
- [Version 10 availability](https://github.com/aclap-dev/video-downloadhelper/wiki/Version-10-availability)

### 2.2 官方明确说 V10 不再需要 CoApp

VDH 官方帮助文档《About V10》写明：

- V10 是一个不需要 CoApp 运行的新版本。
- V10 这么做是为了解决用户在 CoApp 上遇到的问题，例如杀毒软件、CPU 不支持、旧系统不支持。
- V10 的优点包括不需要 CoApp、更快下载、可使用浏览器缓存、可使用浏览器 cookies 和 headers。
- V10 的限制包括只能下载到浏览器下载目录，以及 `Download As...` 对话框只能在下载完成后出现。

来源：[About V10](https://help.downloadhelper.net/article/21-about-v10)

GitHub Wiki 的 VDH V10 页面也给出同样说明，并补充：如果 V10 不符合用户需要，V9 仍然可用。

来源：[VDH V10 Wiki](https://github.com/aclap-dev/video-downloadhelper/wiki/VDH-V10)

### 2.3 旧 CoApp 已进入停止开发状态

VDH CoApp 仓库 README 顶部写明：VDH CoApp 不再开发，因为 VDH v10 不需要 companion。

旧 CoApp 原本提供的能力包括：

- file writing API。
- 启动默认视频播放器打开数据文件。
- 内置 ffmpeg video converter。
- 通过 Native Messaging 与浏览器扩展通信。

来源：[VDH CoApp GitHub](https://github.com/aclap-dev/vdhcoapp)

### 2.4 V10 不是完全无商业化

VDH V10 不再使用旧 license key 方式。官方《About V10》写明：V10 购买记录绑定到用户邮箱，需要通过 `Restore purchase` 流程恢复购买。

来源：[About V10](https://help.downloadhelper.net/article/21-about-v10)

VDH Wiki 首页仍保留 Premium 体系，并说明 Firefox、Chrome、Edge Premium 是独立产品。

来源：[VDH Wiki Home](https://github.com/aclap-dev/video-downloadhelper/wiki)

Firefox AMO 权限列表里还出现了对 `v10.downloadhelper.net` 和 `app.v10.downloadhelper.net` 的访问权限。这至少说明 V10 与其自有 Web/App 域名存在功能关联。这里不能直接推断具体授权实现，只能判断它不是纯离线扩展。

来源：[Firefox AMO - Video DownloadHelper](https://addons.mozilla.org/en-US/firefox/addon/video-downloadhelper/)

### 2.5 浏览器 API 本身解释了 V10 的部分限制

Chrome `downloads.download()` 的公开文档说明：

- 扩展可以发起下载。
- HTTP/HTTPS 下载会包含目标主机当前 cookies。
- 可传入额外 HTTP headers，但 headers 受 XMLHttpRequest 允许范围限制。
- `filename` 只能是相对默认 Downloads 目录的路径，不能用绝对路径。

来源：[Chrome downloads API](https://developer.chrome.com/docs/extensions/reference/api/downloads)

Firefox WebExtensions `downloads.download()` 也说明：

- `filename` 是相对默认下载目录的路径。
- 可设置 headers，但 forbidden headers 仍有限制。
- `saveAs` 可触发文件选择器，但受浏览器偏好和平台影响。

来源：[Firefox downloads API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download)

这与 VDH 官方提到的“只能下载到浏览器下载目录”“Download As 对话框时机受限”是吻合的。

### 2.6 DRM 和渠道政策限制没有消失

VDH 官方 DRM 页面明确说明：如果遇到 DRM 保护内容，VDH 不能也不会尝试破解 DRM。

来源：[What can I do if the video is protected by DRM?](https://github.com/aclap-dev/video-downloadhelper/wiki/What-can-I-do-if-the-video-is-protected-by-DRM%3F)

Chrome Web Store 页面写明 VDH Chrome 版不支持 YouTube。VDH FAQ 解释原因是 Google 不允许 Chrome 扩展下载 YouTube 视频，否则扩展会被 Chrome Web Store 下架。

来源：

- [Chrome Web Store - Video DownloadHelper](https://chromewebstore.google.com/detail/video-downloadhelper/lmjnegcaeklhafolokijcfjliaokphfk)
- [VDH FAQ](https://www.downloadhelper.net/w/FAQ)

## 3. 竞品策略判断

以下为基于公开事实的分析推断。

### 3.1 核心策略：牺牲部分本地能力，换取安装漏斗改善

旧 VDH 通过 CoApp 获得本地文件写入、ffmpeg 转换、播放器启动等能力，但代价是用户必须额外安装一个 native app。官方列出的 CoApp 问题集中在安全软件、CPU、旧 OS 和识别失败，这些都是典型安装漏斗损耗点。

V10 的策略是把能力边界收回浏览器内：能用浏览器下载、缓存、cookies、headers 解决的，就不再要求 CoApp。这样新用户只安装扩展即可开始使用，减少“装了扩展还不能用”的挫败感。

### 3.2 技术策略：把浏览器会话变成下载成功率资产

VDH 官方强调 cookies、headers 和 cache，这说明它把用户真实浏览器会话作为核心能力来源：

- 用户已经登录的网站，浏览器具备 cookies。
- 播放页请求里的 headers、Referer、Authorization 等上下文更容易复用。
- 已播放或已请求资源可能进入浏览器缓存。

这与旧 CoApp 外部进程重新请求资源不同。外部进程可能需要重新构造 headers、cookies 和环境；浏览器扩展则更贴近资源实际被访问的上下文。

### 3.3 产品策略：把“高级本地能力”降级为限制，而不是强制前置

旧 CoApp 提供 ffmpeg converter 和 file writing API。V10 去掉 CoApp 后，官方直接承认下载目录和 `Download As...` 受限。这说明 VDH 并没有完全等价替代旧本地能力，而是在产品层面接受了能力损失。

这类策略适合 VDH 这种通用下载扩展：只要大部分用户能更快完成基础下载，少量高级场景能力下降是可接受的。

### 3.4 商业策略：迁移到 V10 账号/邮箱型购买恢复

V10 不再使用旧 license key，而是绑定邮箱并通过 Restore purchase 恢复购买。结合 Firefox 扩展对 `v10.downloadhelper.net` / `app.v10.downloadhelper.net` 的权限，可以判断 VDH 正在把授权和账户相关能力从旧 CoApp/license-key 体系迁移到 V10 Web/App 体系。

这里的关键不是“去授权”，而是“授权不再依赖旧 CoApp”。这点对 StreamFab 很重要：如果 StreamFab 也想在下载前不安装 CoApp，必须先解决插件侧或 Web 侧授权闭环。

### 3.5 迁移策略：保留 V9 兜底

VDH V10 页面明确提供 V9 入口。这说明 VDH 对 V10 能力差异有预期：部分用户或场景仍可能需要旧版本路径。保留 V9 可以降低激进架构切换带来的支持压力。

## 4. 仍不清楚的事实

公开资料不能确认以下问题：

- V10 内部如何处理 HLS/DASH/MPD 的分片合并。
- 是否使用扩展内 JS、wasm、浏览器缓存、站点特定规则，还是服务端辅助。
- “HD Download and Conversion” 在 V10 无 CoApp 情况下的真实覆盖范围。
- V10 授权接口、扣费逻辑、Premium 校验是否完全在 Web 端。
- 大文件、长直播、多音轨、多字幕、断点失败后的表现。

这些需要通过实际安装测试、抓包、扩展包分析或用户评论/issue 数据进一步确认。

## 5. 对 StreamFab 插件的可行性评估

### 5.1 不能直接照搬 VDH

StreamFab 当前插件链路中，CoApp 承担的能力更重：

- 分析视频。
- 产出结构化 `analyze_result`。
- 执行下载、解密、remux。
- 回传进度和结果。
- 授权、试用次数、订阅额度和配额扣减。

因此 StreamFab 不能直接把“VDH V10 不需要 CoApp”理解为“StreamFab 下载前也可以不安装 CoApp”。

### 5.2 可行部分：无 CoApp 检测与展示

StreamFab 可以优先评估“不安装 CoApp 时先完成检测和候选展示”。这不触发下载、不消耗权益，风险较低，也能降低用户打开插件后的空白感。

可行性：中高。  
主要前提是插件侧能独立完成足够多的页面和网络线索识别。

### 5.3 关键阻塞：授权链路

当前用户指出的问题成立：如果授权完全通过 CoApp，那么不安装 CoApp 时不能发起会消耗权益的下载。

要做 Browser-only 下载，至少要先验证：

- 插件能否独立登录或复用网页登录态。
- 插件能否调用授权后台查询 Trial/Premium/当日额度。
- 是否有下载前预扣减、成功确认、失败回滚机制。
- 多设备、多浏览器并发时额度是否一致。

可行性：中。  
不是做不了，但这已经不是单纯扩展技术问题，而是授权系统改造。

### 5.4 复杂下载能力仍应保留 CoApp

即使授权解耦成功，复杂能力仍建议保留 CoApp：

- DASH audio/video 分离合并。
- 多音轨、多字幕、remux。
- 任意保存目录。
- 批量队列、失败重试。
- DRM/专站客户端能力。

可行性判断：StreamFab 可以学习 VDH 的“降低 CoApp 前置门槛”，但短期更现实的目标是“无 CoApp 可检测、可展示；下载或高级能力仍按授权和能力要求触发 CoApp”，而不是全量去 CoApp。

## 6. 一句话判断

VDH V10 的本质是一次安装漏斗和架构取舍：用浏览器下载、缓存、cookies、headers 替代旧 CoApp 的主链路，接受文件系统和本地后处理能力下降，并把授权迁移到 V10 Web/App 体系。StreamFab 可借鉴的是“不要一上来强制安装 CoApp”，但在授权和复杂下载能力没有解耦前，不应承诺无 CoApp 下载。
