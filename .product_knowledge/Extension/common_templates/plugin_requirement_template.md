# [StreamFab 浏览器插件] - [需求文档] - [{SiteName}]

> **全局变量说明（填写完成后删除本块）**
> 
> | 变量 | 用途 | 格式要求 |
> | --- | --- | --- |
> | `{SiteName}` | 流媒体服务名（原始大小写，用于产品名、文案） | 按需求文档「流媒体服务名」填写，如 `FANZA`、`U-Next`、`Fandango at Home` |
> | `{service_name}` | snake_case 服务标识（用于 app id） | 小写 + 下划线，如 `fanza`、`u_next`、`fandango_at_home` |
> | `{SiteNameMlink}` | mlink 产品名片段 | 保留展示名大小写，单词用 `_` 连接，如 `Fandango_at_Home` |
> | `{sitename}` | 跳转链接 slug（用于 URL slug / pid） | 小写 + 连字符，如 `fanza`、`u-next`、`fandango-at-home` |
> | `{BannerContentEN}` | Dashboard License Info 顶部 Banner 英文文案 | 英文 |
> | `{BannerContentZH}` | Dashboard License Info 顶部 Banner 中文文案 | 中文 |
> 
> **插件名大小写规则**
> 
> - app id 使用 `{service_name}` snake_case 服务标识。
> - 产品页 URL、What's New、订阅 / 升级付费等跳转链接统一使用 `{sitename}` 连字符 slug。
> - 插件产品名、CoApp 安装程序名使用 `{SiteName}` 展示名。
> - mlink 链接中的产品名片段使用 `{SiteNameMlink}`，即展示名单词用 `_` 连接。
> - 示例：流媒体服务名为 `Fandango at Home` 时，安装程序写 `StreamFab Fandango at Home Coapp`，mlink 写 `StreamFab_Fandango_at_Home_Downloader_for_Browser` / `StreamFab_Fandango_at_Home_Coapp`，app id 写 `streamfab_for_browser_fandango_at_home`，跳转链接写 `fandango-at-home-downloader-for-browser.htm` / `pid=fandango-at-home-downloader`。

- 原型链接：
- 需求地址：
- UI 需求说明：

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
| --- | --- | --- |
|  | 首次编辑 |  |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
| --- | --- | --- |
| 插件产品名 | — | StreamFab {SiteName} Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab {SiteName} Coapp |
| app id | — | streamfab_for_browser_{service_name} |
| pid | Win |  |
| pid | Mac |  |
| option id | Win |  |
| option id | Mac |  |
| client id — 主站 | 插件（发布） |  |
| client id — 主站 | CoApp Win x64 |  |
| client id — 主站 | CoApp Mac |  |
| client id — 品牌站 | 插件（发布） |  |
| client id — 品牌站 | CoApp Win x64 |  |
| client id — 品牌站 | CoApp Mac |  |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
| --- | --- | --- | --- |
| 插件包 | — | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteNameMlink}_Downloader_for_Browser](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_%7BSiteNameMlink%7D_Downloader_for_Browser) |
| 插件包 | — | 独立站 | [https://streamfab.com/mlink?p=StreamFab_{SiteNameMlink}_Downloader_for_Browser](https://streamfab.com/mlink?p=StreamFab_%7BSiteNameMlink%7D_Downloader_for_Browser) |
| CoApp | Win | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteNameMlink}_Coapp](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_%7BSiteNameMlink%7D_Coapp) |
| CoApp | Win | 独立站 | [https://streamfab.com/mlink?p=StreamFab_{SiteNameMlink}_Coapp](https://streamfab.com/mlink?p=StreamFab_%7BSiteNameMlink%7D_Coapp) |
| CoApp | Mac | 主站 | [https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteNameMlink}_Coapp_for_Mac](https://www.dvdfab.cn/mlink/download.php?g=StreamFab_%7BSiteNameMlink%7D_Coapp_for_Mac) |
| CoApp | Mac | 独立站 | [https://streamfab.com/mlink?p=StreamFab_{SiteNameMlink}_Coapp_for_Mac](https://streamfab.com/mlink?p=StreamFab_%7BSiteNameMlink%7D_Coapp_for_Mac) |

### 网站信息

> **写作定位**：此节是面向插件需求的站点调研摘要，不是产品页宣传信息摘录，也不是只写官网介绍。优先参考 `references/site_research_notes.md`、目标站点公开页面、官方帮助中心、行业资料和可验证观察；产品页事实只作为补充来源，不替代站点调研。
> 
> **写作要求**：此节必须输出实质内容，不可只写两三行。参考结构如下，逐项展开，并说明与插件需求的关系：
> 
> - **平台定位**：一句话说明平台面向谁、提供什么内容/服务、运营主体或所在市场。
> - **主要服务地区**：覆盖国家/地区、重点市场、界面语言、地区访问或内容库差异；如存在 geoblocking，说明其对插件登录、检测、下载范围的影响。
> - **内容类型与权益形态**：平台提供哪些内容形态（影视/剧集/动画/创作者视频/图片/直播/频道/租买等），免费、订阅、单片购买、频道订阅或按创作者付费的分界。
> - **账号与访问限制**：注册/登录方式、订阅或购买权限、年龄验证、支付门槛、家庭/子账号、登录强制要求等。
> - **播放协议与加密线索**：公开可确认的 HLS / DASH、M3U8 / MPD、Widevine / PlayReady / FairPlay、AES-128 / SAMPLE-AES 等协议或加密/DRM 线索；无法确认时不要编造，留到调研或实测环节。
> - **对插件需求的直接影响**：说明上述信息会影响哪些需求字段，例如入口页识别、视频检测、Meta 分析、清晰度/音轨/字幕选择、失败原因归类、不支持边界、风控或合规提示。
> - **多站点情况**：如支持多站点（如 U-NEXT + H-NEXT），逐站说明服务地区、内容类型、账号体系、加密/权限差异及共用逻辑。
> 
> **禁止写法**：不要把产品页营销文案直接改写成站点技术结论；不要把未验证的 DRM、清晰度、下载能力写成已确认规则。

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
| --- | --- |
| 产品名 | StreamFab {SiteName} Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | {SiteName} |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
| --- | --- | --- |
| 登录 & 授权 | — | / |
| 用户权益 | — | / |
| 视频分析 | — | / |
| 视频检测 | — | / |
| 视频下载 | — | 下载配置项（按需填写） |
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 按需填写差异化配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
| --- | --- | --- |
| 产品页 | 主站 | [https://streamfab.dvdfab.cn/{sitename}-downloader-for-browser.htm](https://streamfab.dvdfab.cn/%7Bsitename%7D-downloader-for-browser.htm) |
| 产品页 | 独立站 | [https://streamfab.com/{sitename}-downloader-for-browser.htm](https://streamfab.com/%7Bsitename%7D-downloader-for-browser.htm) |
| What's New | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid={sitename}-downloader](https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=%7Bsitename%7D-downloader) |
| What's New | 独立站 | [https://streamfab.com/streamfab-for-browser-new.htm?pid={sitename}-downloader](https://streamfab.com/streamfab-for-browser-new.htm?pid=%7Bsitename%7D-downloader) |
| 付费 / Upgrade | 主站 | [https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open={pid}（pid](https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=%7Bpid%7D%EF%BC%88pid) 待补充） |
| 付费 / Upgrade | 独立站 | [https://streamfab.com/streamfab-for-browser.htm?open={pid}（pid](https://streamfab.com/streamfab-for-browser.htm?open=%7Bpid%7D%EF%BC%88pid) 待补充） |

### 安装器

参见 UI 需求说明文档。调整项：

- 安装器资源：([https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&p=f&m=dev](https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&p=f&m=dev))
- 安装目录结构：参见「[https://i6a1sqw3p2.feishu.cn/docx/CfszdQRt2o91I7xX6IIc9rY0nVh](https://i6a1sqw3p2.feishu.cn/docx/CfszdQRt2o91I7xX6IIc9rY0nVh)」

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
| --- | --- | --- |
| Resolution | `{宽}x{高} - {码率} kbps - {文件大小}` | `1280x720 - 2444 kbps - 1.46 GB` |
| Language | `{音频描述} {编码} {声道} - {码率} kbps` | `Default AAC 2.0 - 125 kbps` |

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
| --- | --- |
| 可获取文件大小 | `0B / 0B`（文件大小） |
| 不可获取文件大小 | `0 / 0 Segments`（分片数） |

（根据站点实际情况选择，填写后删除另一行。）

### License Info — Banner 文案

License Info 产品名：`StreamFab {SiteName} Downloader for Browser`

| 语言 | 文案 |
| --- | --- |
| EN | {BannerContentEN} |
| ZH | {BannerContentZH} |

### Setting — Extension 配置项

由 common 配置项+特殊配置项构成，common 配置项不再赘述，特殊配置项已展开（如有），配置项顺序如下：

通用配置项（按顺序）：

**1. Language**

**2. Video Format**

**3. Video Resolution**

**4. Pre-select Audio Language**

**5. Audio Channel**

**6. Pre-select Subtitle Language**

**7. Subtitle Action**