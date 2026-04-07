# [StreamFab 浏览器插件] - [SiteName] - 需求文档模板

## 全局变量
替换完成后请删除本模块。

| 变量 | 用途 | 要求 |
|---|---|---|
| {SiteName} | 对应服务名称 | 若名称包含多个词，使用下划线 _ 分隔 |
| {BannerContentZH} | Dashboard-License Info 页面顶部 banner 文案 | 中文 |
| {BannerContentEN} | Dashboard-License Info 页面顶部 banner 文案 | 英文 |

- 原型链接：
- 需求地址：

## 文档更新记录

| 版本 | 日期 | 修改人 | 修改说明 |
|---|---|---|---|
| v0.1 |  |  | 初始化 |

## 1. 产品信息

### 1.1 安装程序信息

| 信息 | 说明 |
|---|---|
| 插件产品名 | StreamFab {SiteName} Downloader for Browser |
| CoApp 安装程序名 | StreamFab {SiteName} Coapp |
| app_id | streamfab_for_browser，所有插件统一，不同产品用 client id 区分 |
| client id - 主站插件（发布） |  |
| client id - 主站 CoApp Win x64 |  |
| client id - 主站 CoApp Mac |  |
| client id - 独立站插件（发布） |  |
| client id - 独立站 CoApp Win x64 |  |
| client id - 独立站 CoApp Mac |  |
| option id - Win |  |
| option id - Mac |  |

### 1.2 Mlink 链接

| 渠道 | 类型 | 链接 |
|---|---|---|
| 主站 | 插件包 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteName}_Downloader_for_Browser |
| 独立站 | 插件包 | https://streamfab.com/mlink?p=StreamFab_{SiteName}_Downloader_for_Browser |
| 主站 | CoApp Win | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteName}_Coapp |
| 独立站 | CoApp Win | https://streamfab.com/mlink?p=StreamFab_{SiteName}_Coapp |
| 主站 | CoApp Mac | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_{SiteName}_Coapp_for_Mac |
| 独立站 | CoApp Mac | https://streamfab.com/mlink?p=StreamFab_{SiteName}_Coapp_for_Mac |

## 2. 相关文档

- 【SF 插件】Common 逻辑规范
- UI 需求说明文档
- 目标站点调研文档

## 3. 变更说明
从全局和完整功能模块对变更项进行拆解。

### 3.1 全局

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab {SiteName} Downloader for Browser |
| 安装器 | 界面 UI、替换 logo |
| 流媒体服务名 | {SiteName} |
| 跳转链接 | 产品页、What's New、订阅 / 升级付费链接 |

### 3.2 模块

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录&授权 | / | / |
| 用户权益 | / | / |
| 视频分析 | / |  |
| 下载配置项 | 视频目录结构 |  |
| 视频检测 | / |  |
| 视频下载 | / |  |
| Dashboard | / | Banner 文案、产品名 |
| Setting | / | 需要针对 {SiteName} 做差异化 |

注：/ 代表信息结构一致，而非字段完全一致。

## 4. 变更信息
详细拆分变更项并举例说明。

### 4.1 跳转链接

| 按钮 | 跳转链接 |
|---|---|
| What's New - 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid={SiteName}-downloader |
| What's New - 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid={SiteName}-downloader |
| 付费 / upgrade - 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open={pid} |
| 付费 / upgrade - 独立站 | https://streamfab.com/streamfab-for-browser.htm?open={pid} |

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

#### 下载中 & 下载完成任务状态
- 说明任务状态的站点差异。

#### License Info - Trial
- 顶部 Banner 文案改为：
  - EN: {BannerContentEN}
  - ZH: {BannerContentZH}
- License Info 产品名改为：
  - StreamFab {SiteName} Downloader for Browser

#### Setting - Extension
Setting 结构不变，分为 Extension 和 CoApp。

变更后的通用配置项如下（按顺序）：

| 配置项 | 选项 / 说明 |
|---|---|
| Language | Same as UI Language；其余语言复用客户端 27 个选项 |
| Video Format | MP4 / MKV (FFmpeg) / MKV (MKVToolNix) |
| Video Resolution | Full HD - 1080p / HD - 720p |
| Pre-select Audio Language | Same as UI Language；其余语言复用客户端 27 个选项 |
| Pre-select Description Audio if available | 默认不选 |
| Audio Channel | Stereo (AAC) / Multi-Channel 5.1 (EAC3 / AC3) |
| Pre-select both 5.1 and 2.0 audios | 默认不选 |
| Pre-select Subtitle Language | None / Same as UI Language / 其余语言复用客户端 27 个选项 |
| Always download the forced subtitle | 默认选中 |
| Subtitle Action | Remux Into File / Extract to SRT File / Extract Original Format |

## 5. 数据上报
需写出应用索引、区分当前服务的方式以及上报事件类型。

| 上报方 | 索引 | Elk 空间 | 上报事件类型 |
|---|---|---|---|
| 插件 |  |  |  |
| CoApp |  |  |  |