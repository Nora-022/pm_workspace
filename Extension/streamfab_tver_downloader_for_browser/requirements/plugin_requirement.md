# [StreamFab 浏览器插件] - TVer - 需求文档

## 初始化说明
本文档已在 2026-03-27 按 `TVer` 插件初始化。仍未确认的字段请在站点调研和客户端产品页确认后补齐。

| 变量 | 当前值 | 备注 |
|---|---|---|
| `SiteName` | `TVer` | 已确认 |
| `BannerContentZH` | 待确认 | 需来自正式产品页 / 市场文案 |
| `BannerContentEN` | Pending confirmation | 需来自正式产品页 / 市场文案 |

- 原型链接：
- 需求地址：`streamfab_tver_downloader_for_browser/requirements/plugin_requirement.md`

## 文档更新记录

| 版本 | 日期 | 修改人 | 修改说明 |
|---|---|---|---|
| v0.1 | 2026-03-27 | Codex | TVer 插件初始化 |

## 1. 产品信息

### 1.1 安装程序信息

| 信息 | 说明 |
|---|---|
| 插件产品名 | StreamFab TVer Downloader for Browser |
| CoApp 安装程序名 | StreamFab TVer Coapp |
| app_id | streamfab_for_browser，所有插件统一，不同产品用 client id 区分 |
| client id - 主站插件（发布） | 待确认 |
| client id - 主站 CoApp Win x64 | 待确认 |
| client id - 主站 CoApp Mac | 待确认 |
| client id - 独立站插件（发布） | 待确认 |
| client id - 独立站 CoApp Win x64 | 待确认 |
| client id - 独立站 CoApp Mac | 待确认 |
| option id - Win | 待确认 |
| option id - Mac | 待确认 |

### 1.2 Mlink 链接

| 渠道 | 类型 | 链接 |
|---|---|---|
| 主站 | 插件包 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Downloader_for_Browser |
| 独立站 | 插件包 | https://streamfab.com/mlink?p=StreamFab_TVer_Downloader_for_Browser |
| 主站 | CoApp Win | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Coapp |
| 独立站 | CoApp Win | https://streamfab.com/mlink?p=StreamFab_TVer_Coapp |
| 主站 | CoApp Mac | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_TVer_Coapp_for_Mac |
| 独立站 | CoApp Mac | https://streamfab.com/mlink?p=StreamFab_TVer_Coapp_for_Mac |

## 2. 相关文档

- 【SF 插件】Common 逻辑规范
- UI 需求说明文档
- `../references/site_research_notes.md`
- `../references/client_product_page_notes.md`

## 3. 变更说明

### 3.1 全局

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab TVer Downloader for Browser |
| 安装器 | 界面 UI、替换 logo |
| 流媒体服务名 | TVer |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接，待正式产品页确认 |

### 3.2 模块

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录&授权 | / | 待确认是否需要登录态 |
| 用户权益 | / | 待确认 Trial / Paid 边界 |
| 视频分析 | / | 待确认 TVer 页面和播放前置条件 |
| 下载配置项 | 视频目录结构 | 待确认是否存在节目 / 剧集 / 单集分层 |
| 视频检测 | / | 待确认稳定检测点 |
| 视频下载 | / | 待确认质量、音频、字幕能力 |
| Dashboard | / | Banner 文案、产品名 |
| Setting | / | 需要针对 TVer 做差异化，当前未定稿 |

## 4. 变更信息

### 4.1 跳转链接

| 按钮 | 跳转链接 |
|---|---|
| What's New - 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=TVer-downloader |
| What's New - 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=TVer-downloader |
| 付费 / upgrade - 主站 | 待确认 |
| 付费 / upgrade - 独立站 | 待确认 |

说明：如站点有特殊 pid / open 参数，需在本节确认并替换。

### 4.2 安装器

参考文档：UI 需求说明中的 CoApp 安装器资源部分。

需补充：
- 安装器资源替换项
- logo 尺寸与导出要求
- 安装目录调整要求
- CoApp 目录结构设计链接

### 4.3 差异化逻辑说明
除以下提及的逻辑外，其余所有逻辑均参照基线插件。

#### 配置参数
- 配置项取决于当前视频的分析结果。
- TVer 的可见配置项仍待研究确认。

#### 下载中 & 下载完成任务状态
- 说明任务状态的站点差异。

#### License Info - Trial
- 顶部 Banner 文案改为：
  - EN: Pending confirmation
  - ZH: 待确认
- License Info 产品名改为：
  - StreamFab TVer Downloader for Browser

#### Setting - Extension
Setting 结构不变，分为 Extension 和 CoApp。

变更后的通用配置项如下（按顺序）：

| 配置项 | 选项 / 说明 |
|---|---|
| Language | Same as UI Language；其余语言复用客户端 27 个选项 |
| Video Format | MP4 / MKV (FFmpeg) / MKV (MKVToolNix) |
| Video Resolution | 待 TVer 实测确认 |
| Pre-select Audio Language | 待确认 |
| Pre-select Description Audio if available | 待确认 |
| Audio Channel | 待 TVer 实测确认 |
| Pre-select both 5.1 and 2.0 audios | 待确认 |
| Pre-select Subtitle Language | 待确认 |
| Always download the forced subtitle | 待确认 |
| Subtitle Action | 待确认 |

## 5. 数据上报

| 上报方 | 索引 | Elk 空间 | 上报事件类型 |
|---|---|---|---|
| 插件 | 待确认 | 待确认 | 待确认 |
| CoApp | 待确认 | 待确认 | 待确认 |
