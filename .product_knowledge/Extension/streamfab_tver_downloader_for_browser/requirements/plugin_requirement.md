# [StreamFab 浏览器插件] - [TVer] - 需求文档

- 原型链接：[http://axcloud.dvdfab.me/GEMIPT?id=lgtos6&g=14](http://axcloud.dvdfab.me/GEMIPT?id=lgtos6&g=14)
- 需求地址：[https://i6a1sqw3p2.feishu.cn/docx/TXgxdnRtgoLee8xXrofcB7Fen2b](https://i6a1sqw3p2.feishu.cn/docx/TXgxdnRtgoLee8xXrofcB7Fen2b)

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
| --- | --- | --- |
| 2026-04-30 | 首次编辑 |  |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
| --- | --- | --- |
| 插件产品名 | — | StreamFab TVer Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab TVer Coapp |
| app id | — | streamfab_for_browser_tver |
| pid | Win | 690 |
| pid | Mac | 1690 |
| option id | Win | 490 |
| option id | Mac | 1490 |
| client id — 主站 | 插件（发布） | 280 |
| client id — 主站 | CoApp Win x64 | 275 |
| client id — 主站 | CoApp Mac | 276 |
| client id — 品牌站 | 插件（发布） | 281 |
| client id — 品牌站 | CoApp Win x64 | 278 |
| client id — 品牌站 | CoApp Mac | 279 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
| --- | --- | --- | --- |
| 插件包 | — | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Downloader_for_Browser](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Downloader_for_Browser) |
| 插件包 | — | 独立站 | [https://streamfab.com/mlink?p=StreamFab_TVer_Downloader_for_Browser](https://streamfab.com/mlink?p=StreamFab_TVer_Downloader_for_Browser) |
| CoApp | Win | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Coapp](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Coapp) |
| CoApp | Win | 独立站 | [https://streamfab.com/mlink?p=StreamFab_TVer_Coapp](https://streamfab.com/mlink?p=StreamFab_TVer_Coapp) |
| CoApp | Mac | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Coapp_for_Mac](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Coapp_for_Mac) |
| CoApp | Mac | 独立站 | [https://streamfab.com/mlink?p=StreamFab_TVer_Coapp_for_Mac](https://streamfab.com/mlink?p=StreamFab_TVer_Coapp_for_Mac) |

### 网站信息

TVer（ティーバー）是日本的免费广告支持型视频流媒体平台，由日本各大主流电视台（日本テレビ、TBS、テレビ朝日、テレビ東京、フジテレビ等）联合运营，面向日本用户提供电视节目的回看（catch-up）服务。

- **服务地区**：仅限日本境内访问，平台明确禁止使用 VPN，海外访问视为不支持。界面以日语为主。
- **内容类型**：以免费广告支持型电视节目回看为主，覆盖综艺、剧集、动画、纪录片、新闻等。节目设有播出窗口期，超出窗口期后下架，部分节目可查看剩余有效期。此外支持部分实时（直播）内容观看，直播相关功能与 VOD 回看存在行为差异。
- **账号体系**：标准 VOD 内容观看无需注册或登录。TVer ID 账号可解锁追看（chase playback）、收藏夹、跨设备进度同步等便捷功能；部分实时相关功能需登录才可使用。
- **访问限制**：明确限定日本地区访问，不保障 VPN 环境下正常运行。平台在服务条款中明确禁止下载、保存、复制视频内容，具有较强的合规敏感性。播放质量支持 auto / high / medium / low 四档切换；部分节目支持字幕（标注 `[字]`），字幕仅限日语，PC 端通过播放器内 `[CC]` 控件开关。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
| --- | --- |
| 产品名 | StreamFab TVer Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | TVer |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
| --- | --- | --- |
| 登录 & 授权 | — | /（结构一致） |
| 用户权益 | — | /（结构一致） |
| 视频分析 | — | 下载配置项、视频目录结构 |
| 视频检测 | — | /（结构一致） |
| 视频下载 | — | 下载配置项、视频目录结构 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | /（结构一致） |

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
| --- | --- | --- |
| 产品页 | 主站 | [https://streamfab.dvdfab.cn/tver-downloader-for-browser.htm](https://streamfab.dvdfab.cn/tver-downloader-for-browser.htm) |
| 产品页 | 独立站 | [https://streamfab.com/tver-downloader-for-browser.htm](https://streamfab.com/tver-downloader-for-browser.htm) |
| What's New | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=tver-downloader](https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=tver-downloader) |
| What's New | 独立站 | [https://streamfab.com/streamfab-for-browser-new.htm?pid=tver-downloader](https://streamfab.com/streamfab-for-browser-new.htm?pid=tver-downloader) |
| 付费 / Upgrade | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=690](https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=690) |
| 付费 / Upgrade | 独立站 | [https://streamfab.com/streamfab-for-browser.htm?open=690](https://streamfab.com/streamfab-for-browser.htm?open=690) |

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
| --- | --- | --- |
| Resolution | `{宽}x{高} - {码率} kbps` | `1920x1080 - 3415 kbps` |
| Language | `{音频描述} {编码} {声道}` | `Main AAC 2.0` |
| Subtitle | — | `None`（无字幕时占位） |

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
| --- | --- |
| 不可获取文件大小 | `0 / 0 Segments`（分片数） |

### License Info — Banner 文案

| 语言 | 文案 |
| --- | --- |
| EN | TVer in Up to 1080P. One Click.<br>The simplest way to download TVer shows and movies for offline viewing |
| ZH | TVer 最高支持 1080P 分辨率。一键下载。<br>下载 TVer 节目和电影以供离线观看的最简单方法 |

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