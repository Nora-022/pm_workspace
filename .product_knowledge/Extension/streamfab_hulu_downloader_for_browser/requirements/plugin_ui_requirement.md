# [StreamFab 浏览器插件] - [HULU] - UI 需求说明

## 全局变量
| 变量 | 当前值 |
|---|---|
| {SiteName} | HULU |
| {BannerContentZH} | Hulu 视频，一键下载，轻松离线观看。 |
| {BannerContentEN} | Hulu in Up to 4K. One Click. |
| {ThirdStoreProductImageCaption} | Download Hulu shows and movies in up to 4K |
| {VideoDownloadConfigurationParametersScreenshot} | Hulu video-quality-only configuration |

- 原型链接：
- 需求地址：
- 相关文档：`requirements/plugin_requirement.md`、`references/client_product_page_notes.md`、`references/site_research_notes.md`
- 初始化说明：本文件基于 `common_templates/plugin_ui_requirement_template.md` 创建，并按 `streamfab-plugin-init` repair 流程回填。

## 1. 当前 UI 基线
- License Info banner 使用 Hulu 产品页提炼文案。
- 下载弹窗左侧为内容树，右侧为视频清晰度配置。
- 当前不设计独立音频和字幕配置控件。

## 2. 当前已确认树形场景
- 纯 `season` 结构
- 带 `subtitle-version / dubbed-version` 的版本结构
- 含 `extras` 的结构

## 3. Banner 基线文案
- EN Title: `Hulu in Up to 4K. One Click.`
- EN Subtitle: `The simplest way to download Hulu shows and movies for offline viewing`
- ZH Candidate: `Hulu 视频，一键下载，轻松离线观看。`

## 4. 站点对 UI 的启示
- `hulu.com` 需要关注订阅与地区限制文案边界。
- `hulu.jp` 需要关注字幕/吹替、本地化命名和可能的 store/TVOD 入口区分。
