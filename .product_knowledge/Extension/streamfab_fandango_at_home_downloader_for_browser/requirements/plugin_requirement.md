# [StreamFab 浏览器插件] - [需求文档] - [Fandango at Home]

- 需求地址：[https://project.feishu.cn/streamfab_browser_extension/story/detail/6994916861](https://project.feishu.cn/streamfab_browser_extension/story/detail/6994916861)
- UI 需求说明：[https://doc-viewer.specm8.work/s/jdc4isj3](https://doc-viewer.specm8.work/s/jdc4isj3)

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
| --- | --- | --- |
| 插件产品名 | — | StreamFab Fandango at Home Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab Fandango at Home Coapp |
| app id | — | streamfab_for_browser_fandango_at_home |
| pid | Win | 693 |
| pid | Mac | 1693 |
| option id | Win | 493 |
| option id | Mac | 1493 |
| client id — 主站 | 插件（发布） | 326 |
| client id — 主站 | CoApp Win x64 | 321 |
| client id — 主站 | CoApp Mac | 322 |
| client id — 品牌站 | 插件（发布） | 327 |
| client id — 品牌站 | CoApp Win x64 | 324 |
| client id — 品牌站 | CoApp Mac | 325 |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
| --- | --- | --- | --- |
| 插件包 | — | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Downloader_for_Browser](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Downloader_for_Browser) |
| 插件包 | — | 独立站 | [https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Downloader_for_Browser](https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Downloader_for_Browser) |
| CoApp | Win | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Coapp](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Coapp) |
| CoApp | Win | 独立站 | [https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Coapp](https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Coapp) |
| CoApp | Mac | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Coapp_for_Mac](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fandango_at_Home_Coapp_for_Mac) |
| CoApp | Mac | 独立站 | [https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Coapp_for_Mac](https://streamfab.com/mlink?p=StreamFab_Fandango_at_Home_Coapp_for_Mac) |

### 网站信息

平台定位：Fandango at Home 原名 Vudu，2024-03-12 更名；由 Fandango Media 运营，核心形态为 TVOD（Rent / Buy）+ AVOD（Free with Ads）混合 VOD。

主要服务地区：服务和已购内容仅美国可用；非 US IP 可能触发站点级或内容级地域 / 版权拒绝。

Movies 支持单片 Rent / Buy；TV Shows 支持 Season / Episode；Free with Ads 需登录但不强制支付方式。Rent 通常 30 天激活、48 小时观看窗口；Buy 为账户持有。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
| --- | --- |
| 产品名 | StreamFab Fandango at Home Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | Fandango at Home |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
| --- | --- | --- |
| 登录 & 授权 | — | / |
| 用户权益 | — | / |
| 视频分析 | — | / |
| 视频检测 | — | / |
| 视频下载 | — | 下载配置项 |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | common 之外新增两项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
| --- | --- | --- |
| 产品页 | 主站 | [https://streamfab.dvdfab.cn/fandango-at-home-downloader-for-browser.htm](https://streamfab.dvdfab.cn/fandango-at-home-downloader-for-browser.htm) |
| 产品页 | 独立站 | [https://streamfab.com/fandango-at-home-downloader-for-browser.htm](https://streamfab.com/fandango-at-home-downloader-for-browser.htm) |
| What's New | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=fandango-at-home-downloader](https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=fandango-at-home-downloader) |
| What's New | 独立站 | [https://streamfab.com/streamfab-for-browser-new.htm?pid=fandango-at-home-downloader](https://streamfab.com/streamfab-for-browser-new.htm?pid=fandango-at-home-downloader) |
| 付费 / Upgrade | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=693](https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=693) |
| 付费 / Upgrade | 独立站 | [https://streamfab.com/streamfab-for-browser.htm?open=693](https://streamfab.com/streamfab-for-browser.htm?open=693) |

### 安装器

- 安装器资源：([https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&p=f&m=dev](https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&p=f&m=dev))
- 安装目录结构：参见「[https://i6a1sqw3p2.feishu.cn/docx/CfszdQRt2o91I7xX6IIc9rY0nVh](https://i6a1sqw3p2.feishu.cn/docx/CfszdQRt2o91I7xX6IIc9rY0nVh)」

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。

结构规则：

- Movie：主视频 + Extra（如有），Extra 按客户端返回的两级结构展示。
- TV：Season —> Episode 两级结构。
- TV playlist 仅返回第一集 meta；后续剧集若可能不存在当前分辨率，分辨率选项使用 `if available` 标注。

Meta 分析结果弹窗包含以下下载配置项：

<!-- colwidth:8.09%,20.46%,23%,48.45% -->
| 配置项 | 格式 | 示例 | 备注 |
| --- | --- | --- | --- |
| Resolution | `{宽}x{高} - {码率} kbps - {文件大小}` | `1280x528 - 1158 kbps - 439.65 MB` | 据观察，少部分 Tv Show 会触发分辨率兼容提示弹窗（客户端内），需确认触发逻辑再补充插件处理方案。 |
| Audio Codec | `EAC3` / `AAC` | `EAC3` | 非独立配置项，用于筛选音轨集合（audio tracks / adaptation sets）；不同 codec 下可用语言不同，切换会联动影响 Language 选项 |
| Language | `{音频描述} {编码} {声道} - {码率} kbps` | `Deutsch EAC3 5.1 - 640 kbps` | 受当前 Audio Codec 选择联动 |
| Subtitle | `None` / `{语言} CC` | `None`、`English CC` | — |

### 视频下载 — 下载进度显示

下载中信息：速度、进度、剩余时间、分片进度。

任务卡片展示标签：分辨率、视频 codec、音频 codec。

### License Info — Banner 文案

License Info 产品名：`StreamFab Fandango at Home Downloader for Browser`

| 语言 | 文案 |
| --- | --- |
| EN | Fandango at Home Videos in Up to 4K. One Click.<br>The simplest way to download Fandango at Home movies and shows for offline viewing. |
| ZH | Fandango at Home 视频最高支持 4K 画质。一键下载。<br>下载 Fandango at Home 电影和剧集以供离线观看的最简单方式。 |

### Setting — Extension 配置项

由 common 配置项+特殊配置项构成，common 配置项不再赘述，特殊配置项已展开，配置项顺序如下：

**1. Language**

**2. Video Format**

**3. Video Codec**

- H264
- H265 - SDR
- HDR10
- Dolby Vision

**4. Video Resolution**

**5. Pre-select Audio Language**

**6. Audio Codec**

- EAC3
- AAC

**7. Audio Channel**

**8. Pre-select Subtitle Language**

**9. Subtitle Action**