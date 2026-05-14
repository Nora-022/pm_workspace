# [StreamFab 浏览器插件] - [{SiteName}] - 需求文档

> **全局变量说明（填写完成后删除本块）**
>
> | 变量 | 用途 | 格式要求 |
> |---|---|---|
> | `{SiteName}` | 流媒体服务名（原始大小写，用于产品名、文案、mlink） | 按需求文档「流媒体服务名」填写，如 `FANZA`、`U-Next`、`Disney-Plus` |
> | `{sitename}` | 小写服务标识（用于 app id、URL slug / pid） | 小写 + 连字符，如 `fanza`、`u-next`、`disney-plus` |
> | `{BannerContentEN}` | Dashboard License Info 顶部 Banner 英文文案 | 英文 |
> | `{BannerContentZH}` | Dashboard License Info 顶部 Banner 中文文案 | 中文 |
>
> **插件名大小写规则**
>
> - app id、产品页 URL、What's New、订阅 / 升级付费等跳转链接统一使用 `{sitename}` 小写服务标识。
> - 插件产品名、CoApp 安装程序名、mlink 链接中的服务名片段统一使用 `{SiteName}`，即「流媒体服务名」的原始大小写。
> - 示例：流媒体服务名为 `FANZA` 时，安装程序和 mlink 写 `StreamFab_FANZA_Downloader_for_Browser` / `StreamFab_FANZA_Coapp`，app id 和跳转链接写 `streamfab_for_browser_fanza` / `fanza-downloader-for-browser.htm` / `pid=fanza-downloader`。

- 原型链接：
- 需求地址：
- UI 需求说明：

---

## 文档更新记录

| 日期 | 更新内容 | 备注 |
|---|---|---|
| | 首次编辑 | |

---

## 产品信息

### 安装程序信息

| 信息 | 子项 | 值 |
|---|---|---|
| 插件产品名 | — | StreamFab {SiteName} Downloader for Browser |
| CoApp 安装程序名 | — | StreamFab {SiteName} Coapp |
| app id | — | streamfab_for_browser_{sitename} |
| pid | Win | |
| pid | Mac | |
| option id | Win | |
| option id | Mac | |
| client id — 主站 | 插件（发布）| |
| client id — 主站 | CoApp Win x64 | |
| client id — 主站 | CoApp Mac | |
| client id — 品牌站 | 插件（发布）| |
| client id — 品牌站 | CoApp Win x64 | |
| client id — 品牌站 | CoApp Mac | |

### Mlink 链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteName}_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_{SiteName}_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteName}_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_{SiteName}_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteName}_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_{SiteName}_Coapp_for_Mac |

### 网站信息

> **写作要求**：此节必须输出实质内容，不可只写两三行。参考结构如下，逐项展开：
>
> - 一句话介绍平台定位（面向谁、提供什么、运营主体或所在市场）
> - **服务地区**：主要覆盖地区、是否有地区访问限制、界面语言
> - **内容类型**：平台提供哪些内容形态（影视/动画/创作者视频/图片/直播等），付费与免费内容的分界
> - **账号体系**：注册方式、订阅/付费模式（平台统一订阅 or 按创作者/频道单独订阅）、权限层级
> - **访问限制**：是否有年龄验证、DRM 保护、登录强制要求、地区封锁等
> - 如支持多站点（如 U-NEXT + H-NEXT），逐站说明并注明共用账号体系情况

---

## 变更说明

除以下提及的逻辑外，其余所有逻辑均参照基线插件（Netflix）。

### 全局变更

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab {SiteName} Downloader for Browser |
| 安装器 | 界面 UI、替换 Logo |
| 流媒体服务名 | {SiteName} |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 模块变更

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录 & 授权 | — | /（结构一致）|
| 用户权益 | — | /（结构一致）|
| 视频分析 | — | /（结构一致）|
| 视频检测 | — | /（结构一致）|
| 视频下载 | — | 下载配置项（按需填写）|
| Dashboard | — | Banner 文案、产品名 |
| Dashboard | Setting | 按需填写差异化配置项 |

> 注："/" 代表信息结构一致，而非字段完全一致。

---

## 变更信息

### 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| 产品页 | 主站 | https://streamfab.dvdfab.cn/{sitename}-downloader-for-browser.htm |
| 产品页 | 独立站 | https://streamfab.com/{sitename}-downloader-for-browser.htm |
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid={sitename}-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid={sitename}-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open={pid}（pid 待补充）|
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open={pid}（pid 待补充）|

### 安装器

参见 UI 需求说明文档。调整项：
- 安装器资源：(https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6?node-id=21-6761&p=f&m=dev)
- 安装目录结构：参见「[StreamFab 浏览器插件] - CoApp 目录结构设计」

### 视频下载 — 配置参数

配置项选项由 CoApp 分析结果动态生成，不固定枚举。选项格式如下：

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution | `{宽}x{高} - {码率} kbps - {文件大小}` | `1280x720 - 2444 kbps - 1.46 GB` |
| Language | `{音频描述} {编码} {声道} - {码率} kbps` | `Default AAC 2.0 - 125 kbps` |

### 视频下载 — 下载进度显示

| 情况 | 进度标签格式 |
|---|---|
| 可获取文件大小 | `0B / 0B`（文件大小） |
| 不可获取文件大小 | `0 / 0 Segments`（分片数） |

（根据站点实际情况选择，填写后删除另一行。）

### License Info — Banner 文案

| 语言 | 文案 |
|---|---|
| EN | {BannerContentEN} |
| ZH | {BannerContentZH} |

License Info 产品名：`StreamFab {SiteName} Downloader for Browser`

### Setting — Extension 配置项

Setting 结构不变，分为 Extension 和 CoApp。

通用配置项（按顺序）：

**1. Language**
- Same as UI Language
- 其他语言复用客户端 27 个选项

**2. Video Format**
- MP4
- MKV (FFmpeg)
- MKV (MKVToolNix)

**3. Video Resolution**
- Full HD - 1080p
- HD - 720p

**4. Pre-select Audio Language**
- Same as UI Language
- 其他语言复用客户端 27 个选项
- 子选项：Pre-select Description Audio if available（默认不选）

**5. Audio Channel**
- Stereo (AAC)
- Multi-Channel 5.1 (EAC3 / AC3)
- 子选项：Pre-select both 5.1 and 2.0 audios（默认不选）

**6. Pre-select Subtitle Language**
- None
- Same as UI Language
- 其他语言复用客户端 27 个选项
- 子选项：Always download the forced subtitle（默认选中）

**7. Subtitle Action**
- Remux Into File
- Extract to SRT File
- Extract Original Format

> 如站点有差异化配置项，在上方列表后追加，并注明默认值。
