# [StreamFab 浏览器插件] - [SiteName] - UI 需求说明模板

## 全局变量
替换完成后请删除本模块。

| 变量 | 用途 | 要求 |
|---|---|---|
| {SiteName} | 对应服务名称 | 若名称包含多个词，使用下划线 _ 分隔 |
| {BannerContentZH} | Dashboard-License Info 页面顶部 banner 文案 | 中文 |
| {BannerContentEN} | Dashboard-License Info 页面顶部 banner 文案 | 英文 |
| {ThirdStoreProductImageCaption} | 第三张商店配图副标题文案 | 英文 |
| {VideoDownloadConfigurationParametersScreenshot} | 视频下载配置参数截图 | 英文 |

- 原型链接：
- 需求地址：
- 相关文档：需求文档、目标站点调研文档

## 1. 文档目的
仅对部分差异模块进行重新设计，本文档说明差异并拆解 UI 任务。

## 2. 产品信息

| 信息 | 说明 |
|---|---|
| 产品名 | StreamFab {SiteName} Downloader for Browser |
| 产品 Logo | 遵循 ytdlp 插件 logo 设计规范，视觉效果保持一致 |
| 系统 | Win、Mac 双系统支持（如当前阶段仅做 Win，请注明） |

## 3. 设计需求拆分
根据优先级，可拆分为四个部分。

### 3.1 第一部分：界面改动
梳理界面上需要重新出设计稿的模块。

| 模块 | 截图 / 产出 | 说明 |
|---|---|---|
| License Info banner | 截图 | 点击 banner 引导至产品页，banner 固定，不会变更；文案需替换为 {BannerContentZH} / {BannerContentEN} |

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
  - 浏览器背景截图：使用 {SiteName} 官网截图
  - 视频封面图：改成 {SiteName} 站点内容，从站点选取代表性封面

#### 分图说明

| 图片序号 | 需要调整的内容 |
|---|---|
| 第一张图 | 改标题为 StreamFab {SiteName} Downloader |
| 第二张图 | 改视频封面图、插件 logo、{SiteName} 截图 |
| 第三张图 | 下载配置项需修改；使用 {VideoDownloadConfigurationParametersScreenshot}；副标题使用 {ThirdStoreProductImageCaption} |
| 第四张图 | 下载配置项需修改；视频封面图改为 {SiteName} 站点内容 |
| 第五张图 | 视频封面图改为 {SiteName} 站点内容 |

#### Small promo tile

| 项目 | 要求 |
|---|---|
| 尺寸 | 440*280 |
| 展示元素 | logo + product name |
| 产品名 | StreamFab {SiteName} Downloader for Browser |

### 3.4 第四部分：查漏补缺
针对研发过程中发现的遗漏部分进行补充。

建议补充项：
- 开发过程中新增的差异截图
- 文案补充需求
- 商店素材漏项
- 安装器资源漏项
- 特殊页面适配说明