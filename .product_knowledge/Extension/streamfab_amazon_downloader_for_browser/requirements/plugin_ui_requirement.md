# [StreamFab 浏览器插件] - [Amazon] - UI 归档

## 全局变量
| 变量 | 当前值 |
|---|---|
| `SiteName` | `Amazon` |
| `BannerContentZH` | `Amazon 视频一键下载，轻松离线观看。` |
| `BannerContentEN` | `Amazon Videos in Up to 1080p. One Click.` |
| `ThirdStoreProductImageCaption` | `Download Prime Video titles in up to 1080p` |
| `VideoDownloadConfigurationParametersScreenshot` | `Amazon quality and entitlement state dialog` |

- 原型链接：
- 需求来源：
- 相关文档：`requirements/plugin_requirement.md`、`requirements/product_page_facts.md`、`requirements/site_research_notes.md`
- 初始化说明：本文档基于 `_common/templates/plugin_ui_requirement_template.md` 创建，并在 `streamfab-plugin-init` create mode 中完成首轮回填。

## 1. 当前 UI 基线
- License Info banner 使用 Amazon 产品页已明确的能力文案
- 基础布局继续沿用现有浏览器插件设计系统
- 商店截图和安装器资源替换为 Amazon / Prime Video 内容
- UI 以电影、剧集、权益状态、下载配置、任务队列为主要表达对象

## 2. 当前内容树场景
- `movie`
- `series -> season -> episode`
- `movie -> rent / buy option`
- `channel / sports / live` 作为站内内容类型归档

## 3. Banner 基线文案
- EN Title：`Amazon Videos in Up to 1080p. One Click.`
- EN Subtitle：`Save Prime Video titles for offline viewing with EAC3 5.1 or AAC 2.0 audio.`
- ZH Title：`Amazon 视频一键下载，轻松离线观看。`

## 4. 商店素材方向
- 浏览器背景截图替换为 Prime Video 页面
- 视频封面替换为 Amazon / Prime Video 内容
- 第三张截图重点体现画质相关配置
- 素材优先使用一张电影详情页和一张剧集详情页
- 不使用 sports / live 相关素材

## 5. 安装器资源方向
- 保留现有安装器结构
- 替换产品名、logo、资源包引用
- 导出规格沿用产品线公共规范
