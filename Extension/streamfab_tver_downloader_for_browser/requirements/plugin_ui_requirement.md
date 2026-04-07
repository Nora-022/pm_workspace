# [StreamFab 浏览器插件] - TVer - UI 需求说明

## 初始化说明
本文档已在 2026-03-27 按 `TVer` 插件初始化。站点截图、banner 文案和商店素材说明仍需根据正式调研补齐。

| 变量 | 当前值 | 备注 |
|---|---|---|
| `SiteName` | `TVer` | 已确认 |
| `BannerContentZH` | 待确认 | 需来自正式产品页 / 市场文案 |
| `BannerContentEN` | Pending confirmation | 需来自正式产品页 / 市场文案 |
| `ThirdStoreProductImageCaption` | Pending confirmation | 待商店素材方案 |
| `VideoDownloadConfigurationParametersScreenshot` | Pending confirmation | 待 TVer 下载配置定稿 |

- 原型链接：
- 需求地址：`streamfab_tver_downloader_for_browser/requirements/plugin_ui_requirement.md`
- 相关文档：需求文档、目标站点调研文档

## 1. 文档目的
仅对部分差异模块进行重新设计，本文档说明差异并拆解 UI 任务。

## 2. 产品信息

| 信息 | 说明 |
|---|---|
| 产品名 | StreamFab TVer Downloader for Browser |
| 产品 Logo | 遵循 ytdlp 插件 logo 设计规范，视觉效果保持一致 |
| 系统 | Win、Mac 双系统支持（如当前阶段仅做 Win，请注明） |

## 3. 设计需求拆分

### 3.1 第一部分：界面改动

| 模块 | 截图 / 产出 | 说明 |
|---|---|---|
| License Info banner | 截图 | 点击 banner 引导至产品页；文案当前待确认 |

补充说明：
- 可参考基线插件对应模块设计。

### 3.2 第二部分：CoApp 安装器资源

| 模块 | 截图 / 产出 | 说明 |
|---|---|---|
| CoApp 安装器资源 | 截图 / 资源清单 | 参照基线插件，需要给出对应的 logo 尺寸与资源要求 |

### 3.3 第三部分：应用商店素材

#### Global Screenshots
参照基线插件设计结构，需要调整的元素：

- 统一替换：
  - 浏览器背景截图：使用 TVer 官网截图
  - 视频封面图：改成 TVer 站点内容，从站点选取代表性封面

#### 分图说明

| 图片序号 | 需要调整的内容 |
|---|---|
| 第一张图 | 改标题为 StreamFab TVer Downloader |
| 第二张图 | 改视频封面图、插件 logo、TVer 截图 |
| 第三张图 | 下载配置项需修改；截图与副标题待 TVer 配置定稿后补齐 |
| 第四张图 | 下载配置项需修改；视频封面图改为 TVer 站点内容 |
| 第五张图 | 视频封面图改为 TVer 站点内容 |

#### Small promo tile

| 项目 | 要求 |
|---|---|
| 尺寸 | 440*280 |
| 展示元素 | logo + product name |
| 产品名 | StreamFab TVer Downloader for Browser |

### 3.4 第四部分：查漏补缺

建议补充项：
- 开发过程中新增的差异截图
- 文案补充需求
- 商店素材漏项
- 安装器资源漏项
- 特殊页面适配说明
