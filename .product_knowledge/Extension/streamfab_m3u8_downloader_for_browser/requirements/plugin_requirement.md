# [StreamFab 浏览器插件] - [M3U8] - 需求文档

**原型：** http://axcloud.dvdfab.me/AFZKNR?id=6xh3eu&g=14

**UI 需求说明：** [StreamFab 浏览器插件] - [DRM M3U8] - UI 需求说明（飞书 wiki）

**相关文档：** 【SF 插件】Common 逻辑规范（飞书 docx）

---

## 产品信息

### 安装程序信息

| 信息 | 说明 |
|---|---|
| 插件产品名 | StreamFab M3U8 Downloader for Browser |
| coapp 安装程序名 | StreamFab M3U8 Coapp |
| app id | streamfab_for_browser_drm_m3u8 |
| pid - Win | 652 |
| pid - Mac | 1652 |
| option id - Win | 452 |
| option id - Mac | 1452 |
| client id 主站 - 插件（用作发布） | 256 |
| client id 主站 - coapp win x64 | 251 |
| client id 主站 - coapp mac | 252 |
| client id 品牌站 - 插件（用作发布） | 257 |
| client id 品牌站 - coapp win x64 | 254 |
| client id 品牌站 - coapp mac | 255 |

### Mlink 链接

| 渠道 | 平台 | Mlink |
|---|---|---|
| 插件包 | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_M3U8_Downloader_for_Browser |
| 插件包 | 独立站 | https://streamfab.com/mlink?p=StreamFab_M3U8_Downloader_for_Browser |
| CoApp Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_M3U8_Coapp |
| CoApp Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_M3U8_Coapp |
| CoApp Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_M3U8_Coapp_for_Mac |
| CoApp Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_M3U8_Coapp_for_Mac |

---

## 变更说明

### 全局

| 一级模块 | 变更点 |
|---|---|
| 产品名 | StreamFab M3U8 Downloader for Browser |
| 安装器 | 界面 UI、替换 logo |
| 流媒体服务名 | M3U8（多站点支持） |
| 跳转链接 | 产品页、What's New、订阅/升级付费链接 |

### 模块

> 注："/" 代表信息结构一致，而非字段完全一致。

| 一级模块 | 二级模块 | 变更点 |
|---|---|---|
| 登录&授权 | / | / |
| 用户权益 | / | / |
| 视频分析 | / | 下载配置项、分析流程、视频目录结构 |
| 视频检测 | / | 下载配置项、分析流程、视频目录结构 |
| 视频下载 | / | 下载配置项、分析流程、视频目录结构 |
| Dashboard | / | Banner 文案、产品名 |
| Dashboard | setting | 通用配置 |

---

## 变更信息

详细拆分变更项并举例说明。

### 跳转链接

| 按钮 | 主站 | 独立站 |
|---|---|---|
| 产品页 | https://streamfab.dvdfab.cn/m3u8-downloader-for-browser.htm | https://streamfab.com/m3u8-downloader-for-browser.htm |
| What's New | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=drm-m3u8-downloader | https://streamfab.com/streamfab-for-browser-new.htm?pid=drm-m3u8-downloader |
| 付费/upgrade | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=652 | https://streamfab.com/streamfab-for-browser.htm?open=655 |

### 安装器

需做以下调整，其余保持一致：

- 安装器资源：（界面 UI 及 logo 替换，样式见飞书原文 — 变更信息 > 安装器）
- 调整安装目录：参照《[StreamFab 浏览器插件] - Coapp 目录结构设计》（飞书 docx）

### 变更说明

除以下提及的逻辑外，其余所有逻辑均参照 Netflix 插件。

#### 检测、分析流程

**背景**

m3u8 分析流程与 VIP 站点存在差异，需先对 m3u8 视频流进行分析，再返回**视频是否支持下载**以及 **meta 分析结果**，等待时间较长。

**视频是否支持下载处理方案**

- 现行 common 逻辑：在视频进入分析流程之前，通过 url 判断是否支持。
- m3u8 需等待流分析完才得知，判断逻辑后置：
  - 如果视频支持下载：直接在插件弹窗展示待下载视频卡片
  - 如果视频不支持下载：
    - 插件内已有检测到的视频 → toast 提示（toast 位置及样式见飞书原文 — 变更信息 > 变更说明 > 检测、分析流程）
    - 插件内没有检测到的视频 → 全局提示（样式见飞书原文 — 该视频不支持下载提示）

**等待时间长处理方案**

扩充"检测中"状态，视频分析进度由 coapp 接口（LoadingDialog 接口）返回：

- 检测中：网页检测视频并将信息发送给 coapp
- 分析中：coapp 收到通知，开始分析视频并返回分析进度
- 分析结果：coapp 返回分析结果
  - 成功：插件新增视频卡片
  - 失败：插件触发 toast 提示（展示 3s 后自动消失，支持手动关闭）
    - EN: Analysis Failed. Please retry or contact us for help.
    - ZH: 分析失败，请重试或联系我们获得帮助。
    - Contact us：主站 https://www.dvdfab.cn/contact.htm / 独立站 https://streamfab.com/contact.htm

#### 配置参数

配置参数取决于当前视频的分析结果，配置项如下：

- **Resolution**：width × length-bitrate
- **Language**：Language、video codec
- **Subtitles**：None、English

#### 下载中 & 下载完成任务状态

- 待下载 / 下载成功：展示 分辨率、音频编码、文件大小
- 排队下载 / 下载中 / 下载失败：只展示 分辨率

#### License Info - Trial

- 后续插件 Banner 均采用通用配图（若无特殊说明）；Figma 参考：https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/【StreamFab】-浏览器插件?node-id=0-4336
- 顶部 Banner 文案：
  - EN: M3U8 Videos, Downloaded Simply. Save ~~DRM-protected~~ M3U8 streams for offline viewing in up to 1080p with clear AAC audio.
  - ZH: M3U8 视频，轻松下载。将~~受 DRM 保护的~~ M3U8 流媒体保存下来，以最高 1080p 分辨率和清晰的 AAC 音频进行离线观看。
- License Info 产品名：StreamFab M3U8 Downloader for Browser

#### Setting - Extension

Setting 结构不变，分为 Extension 和 Coapp。配置项复用通用配置项，顺序如下：

1. Language
2. Video Format
3. Video Resolution
4. Pre-select Audio Language
5. Audio Channel
6. Pre-select Subtitle Language
7. Subtitle Action

---

## 数据上报

| 上报方 | 索引 | Elk 空间 | 上报事件类型 |
|---|---|---|---|
| 插件 | — | — | 通用逻辑，对接插件不需要调整，后续不再单独说明。与《[streamfab 浏览器插件] 数据上报提测文档》完全一样，通过插件 id 区分。 |
| coapp | — | — | — |
