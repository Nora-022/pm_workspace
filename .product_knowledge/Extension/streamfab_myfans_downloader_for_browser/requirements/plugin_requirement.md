# [StreamFab 浏览器插件] - [myfans] - 需求文档

- 原型链接：[http://axcloud.dvdfab.me/67GY5L?id=n01130&g=14](http://axcloud.dvdfab.me/67GY5L?id=n01130&g=14)
- 需求地址：[https://i6a1sqw3p2.feishu.cn/docx/DBfrdrzVOo2dFIxuMcUcdEQ0n0O](https://i6a1sqw3p2.feishu.cn/docx/DBfrdrzVOo2dFIxuMcUcdEQ0n0O)

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
| 插件产品名 | — | StreamFab myfans Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab myfans Coapp |
| app id | — | streamfab_for_browser_myfans |
| pid | Win | 691 |
| pid | Mac | 1691 |
| option id | Win | 491 |
| option id | Mac | 1491 |
| client id — 主站 | 插件（发布） | 288 |
| client id — 主站 | CoApp Win x64 | 283 |
| client id — 主站 | CoApp Mac | 284 |
| client id — 品牌站 | 插件（发布） | 289 |
| client id — 品牌站 | CoApp Win x64 | 286 |
| client id — 品牌站 | CoApp Mac | 287 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
| --- | --- | --- | --- |
| 插件包 | — | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_myfans_Downloader_for_Browser](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_myfans_Downloader_for_Browser) |
| 插件包 | — | 独立站 | [https://streamfab.com/mlink?p=StreamFab_myfans_Downloader_for_Browser](https://streamfab.com/mlink?p=StreamFab_myfans_Downloader_for_Browser) |
| CoApp | Win | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_myfans_Coapp](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_myfans_Coapp) |
| CoApp | Win | 独立站 | [https://streamfab.com/mlink?p=StreamFab_myfans_Coapp](https://streamfab.com/mlink?p=StreamFab_myfans_Coapp) |
| CoApp | Mac | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_myfans_Coapp_for_Mac](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_myfans_Coapp_for_Mac) |
| CoApp | Mac | 独立站 | [https://streamfab.com/mlink?p=StreamFab_myfans_Coapp_for_Mac](https://streamfab.com/mlink?p=StreamFab_myfans_Coapp_for_Mac) |

### 网站信息

**myfans** 是日本的创作者订阅制内容平台，面向日本市场，允许创作者向粉丝发布独家内容（视频、图片、博客等）并收取订阅费用。

- **服务地区**：主要面向日本市场，账号注册和内容访问无明确地区封锁，但界面以日语为主，创作者和内容以日本为主体。
- **内容类型**：创作者自制视频、图片集、博客文章，内容以娱乐、成人、偶像、个人创作为主，部分内容仅限付费订阅者访问。
- **账号体系**：用户需注册 myfans 账号，并按创作者单独订阅，订阅费用由各创作者自行设定。访问受限内容须处于已登录且已订阅状态。
- **访问限制**：受版权保护内容仅限有效订阅用户播放，部分创作者内容可能设有年龄验证要求。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
| --- | --- |
| 产品名 | StreamFab myfans Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | myfans |
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
| 产品页 | 主站 | [https://streamfab.dvdfab.cn/myfans-downloader-for-browser.htm](https://streamfab.dvdfab.cn/myfans-downloader-for-browser.htm) |
| 产品页 | 独立站 | [https://streamfab.com/myfans-downloader-for-browser.htm](https://streamfab.com/myfans-downloader-for-browser.htm) |
| What's New | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=myfans-downloader](https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=myfans-downloader) |
| What's New | 独立站 | [https://streamfab.com/streamfab-for-browser-new.htm?pid=myfans-downloader](https://streamfab.com/streamfab-for-browser-new.htm?pid=myfans-downloader) |
| 付费 / Upgrade | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=691](https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=691) |
| 付费 / Upgrade | 独立站 | [https://streamfab.com/streamfab-for-browser.htm?open=691](https://streamfab.com/streamfab-for-browser.htm?open=691) |

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
| --- | --- | --- |
| Resolution | `{宽}x{高} - {码率} kbps` | `1280x720 - 2444 kbps` |
| Language | `{音频描述} {编码} {声道}` | `Default AAC 2.0` |
| Subtitle | — | `None`（无字幕时占位） |

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
| --- | --- |
| 可获取文件大小 | `0B / 0B` |

### License Info — Banner 文案

| 语言 | 文案 |
| --- | --- |
| EN | Creator Videos, Downloaded Simply.<br>Enjoy myfans offline in up to 1080p with clean AAC audio. |
| ZH | 创作者视频，轻松下载。<br>离线畅享 myfans 内容，最高支持 1080p 分辨率，搭配纯净的 AAC 音频。 |

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