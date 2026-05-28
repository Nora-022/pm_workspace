# [StreamFab 浏览器插件] - [DRM-MPD] - 需求文档

- 原型链接：[http://axcloud.dvdfab.me/AFZKNR?id=n01130&g=14](http://axcloud.dvdfab.me/AFZKNR?id=n01130&g=14)
- 需求地址：[https://project.feishu.cn/streamfab_browser_extension/story/detail/6925035500](https://project.feishu.cn/streamfab_browser_extension/story/detail/6925035500)

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
| --- | --- | --- |
| 2026/05/07 | 首次编辑 | — |
| 2026/05/11 | 按 common 模板对齐结构 | 新增网站信息节；删除关联文档、安装器、数据上报子节；Setting 配置项展开 |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
| --- | --- | --- |
| 插件产品名 | — | StreamFab DRM MPD Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab DRM MPD Coapp |
| app id | — | streamfab_for_browser_drm_mpd |
| pid | Win | 653 |
| pid | Mac | 1653 |
| option id | Win | 453 |
| option id | Mac | 1453 |
| client id — 主站 | 插件（发布） | 264 |
| client id — 主站 | CoApp Win x64 | 259 |
| client id — 主站 | CoApp Mac | 260 |
| client id — 品牌站 | 插件（发布） | 265 |
| client id — 品牌站 | CoApp Win x64 | 262 |
| client id — 品牌站 | CoApp Mac | 263 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
| --- | --- | --- | --- |
| 插件包 | — | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM-MPD_Downloader_for_Browser](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM-MPD_Downloader_for_Browser) |
| 插件包 | — | 独立站 | [https://streamfab.com/mlink?p=StreamFab_DRM-MPD_Downloader_for_Browser](https://streamfab.com/mlink?p=StreamFab_DRM-MPD_Downloader_for_Browser) |
| CoApp | Win | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM-MPD_Coapp](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM-MPD_Coapp) |
| CoApp | Win | 独立站 | [https://streamfab.com/mlink?p=StreamFab_DRM-MPD_Coapp](https://streamfab.com/mlink?p=StreamFab_DRM-MPD_Coapp) |
| CoApp | Mac | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM-MPD_Coapp_for_Mac](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM-MPD_Coapp_for_Mac) |
| CoApp | Mac | 独立站 | [https://streamfab.com/mlink?p=StreamFab_DRM-MPD_Coapp_for_Mac](https://streamfab.com/mlink?p=StreamFab_DRM-MPD_Coapp_for_Mac) |

### 网站信息

DRM-MPD 不针对单一流媒体平台，而是面向所有以 MPEG-DASH（`.mpd` manifest）协议分发、且内容受 DRM 保护的在线视频站点的多站点聚合下载工具。客户端产品页明示的代表性目标站点包括 Channel 5、BritBox、AMC+、ITV、SHOWTIME 等英美主流付费 VOD 服务。

- **服务地区**：插件本身不限地区。目标站点的可下载范围由用户在该站点的访问权限与订阅资格决定（如 Channel 5、BritBox、ITV 主要服务英国市场，AMC+、SHOWTIME 主要服务北美市场）。
- **内容类型**：以订阅制点播影视为主，覆盖剧集、电影、纪录片、原创节目等付费会员可观看内容。
- **账号体系**：插件使用 StreamFab 账号体系（Trial / Premium 双档）；目标流媒体站点的订阅账号由用户自行准备，并需在浏览器内完成登录与播放鉴权后，插件才能识别可下载内容。多个目标站点的订阅账号互不互通。
- **访问限制**：目标内容均受 Widevine（多数）/ PlayReady DRM 保护；浏览器端下载清晰度上限 1080p；目标站点自身可能存在年龄验证、地区封锁等访问限制，由用户在浏览器侧自行解决。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照 Netflix 插件。

### 全局变更

| 一级模块 | 变更点 |
| --- | --- |
| 产品名 | StreamFab DRM-MPD Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | DRM MPD |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
| --- | --- | --- |
| 登录 & 授权 | — | /（结构一致） |
| 用户权益 | — | /（结构一致） |
| 视频分析 | — | /（结构一致） |
| 视频检测 | — | 自动分析当前 URL，无独立分析弹窗 |
| 视频下载 | — | 下载配置项 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 通用配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
| --- | --- | --- |
| 产品页 | 主站 | [https://streamfab.dvdfab.cn/drm-mpd-downloader.htm](https://streamfab.dvdfab.cn/drm-mpd-downloader.htm) |
| 产品页 | 独立站 | [https://streamfab.com/drm-mpd-downloader.htm](https://streamfab.com/drm-mpd-downloader.htm) |
| What's New | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=drm-mpd-downloader](https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=drm-mpd-downloader) |
| What's New | 独立站 | [https://streamfab.com/streamfab-for-browser-new.htm?pid=drm-mpd-downloader](https://streamfab.com/streamfab-for-browser-new.htm?pid=drm-mpd-downloader) |
| 付费 / Upgrade | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=653](https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=653) |
| 付费 / Upgrade | 独立站 | [https://streamfab.com/streamfab-for-browser.htm?open=653](https://streamfab.com/streamfab-for-browser.htm?open=653) |

### 视频检测 — 检测流程

无独立分析弹窗。用户在受 DRM 保护的 MPD 站点页面打开视频后，插件自动分析当前 URL；DRM-MPD 标识默认隐藏，识别为 MPD + DRM 内容后显示，并点亮下载按钮。

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
| --- | --- | --- |
| Resolution | `{宽}x{高} - {码率} kbps` | `1280x720 - 2338 kbps` |
| Language | `{语言} {音频编码}` | `English AAC` |
| Subtitles | meta 返回值 | `None` / `English` |

### 视频下载 — 下载进度显示

进度信息用 Segment（分片数）展示，非文件大小。

### License Info — Banner 文案

License Info 产品名：`StreamFab DRM-MPD Downloader for Browser`

| 语言 | 文案 |
| --- | --- |
| EN | DRM-MPD Videos, Downloaded Simply.<br>Save DRM-protected MPD streams for offline viewing in up to 1080p with clear AAC audio. |
| ZH | DRM-MPD 视频，轻松下载。<br>将受 DRM 保护的 MPD 流媒体保存下来，以最高 1080p 分辨率和清晰的 AAC 音频进行离线观看。 |

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。保留下方默认 7 项通用配置项顺序，不修改。

通用配置项（按顺序）：

**1. Language**

**2. Video Format**

**3. Video Resolution**

**4. Pre-select Audio Language**

**5. Audio Channel**

**6. Pre-select Subtitle Language**

**7. Subtitle Action**