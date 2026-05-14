# 07 技术限制与约束（Technical Constraints）

## 系统与平台

| 平台 | 支持 | 当前实施 |
|---|---|---|
| Windows | ✅ | 已纳入 |
| macOS | ✅ | 双系统支持，首版暂只做 Win |

## 分发渠道

- Chrome / Edge / 官网版本
- 三渠道功能一致

## 核心依赖

1. 已安装 CoApp（StreamFab DRM MPD Coapp）
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内

## 能力边界

- 目标协议：基于 MPD（MPEG-DASH manifest）的流媒体站点
- 分辨率上限：1080p
- 输出容器：MP4 / MKV
- 音频编码：EAC3 / AC3 5.1 或 AAC 2.0
- 字幕：SRT（独立文件）或嵌入视频
- 客户端最低系统要求：Windows 11/10（32/64 位）、Intel i3 及以上、4 GB RAM、40 GB 可用硬盘、网络连接

## 安装程序信息

| 项 | 值 |
|---|---|
| 插件产品名 | StreamFab DRM MPD Downloader for Browser |
| CoApp 名 | StreamFab DRM MPD Coapp |
| app id | streamfab_for_browser_drm_mpd |
| pid (Win / Mac) | 653 / 1653 |
| option id (Win / Mac) | 453 / 1453 |
| client id 主站（插件 / CoApp Win x64 / CoApp Mac）| 264 / 259 / 260 |
| client id 品牌站（插件 / CoApp Win x64 / CoApp Mac）| 265 / 262 / 263 |

## CoApp 下载链接

| 平台 | 渠道 | 链接 |
|---|---|---|
| Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM_MPD_Coapp |
| Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_DRM_MPD_Coapp |
| Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM_MPD_Coapp_for_Mac |
| Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_DRM_MPD_Coapp_for_Mac |

## 插件包下载链接

| 渠道 | 链接 |
|---|---|
| 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_DRM_MPD_Downloader_for_Browser |
| 独立站 | https://streamfab.com/mlink?p=StreamFab_DRM_MPD_Downloader_for_Browser |

## 跳转链接

| 按钮 | 渠道 | 链接 |
|---|---|---|
| What's New | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=drm-mpd-downloader |
| What's New | 独立站 | https://streamfab.com/streamfab-for-browser-new.htm?pid=drm-mpd-downloader |
| 付费 / Upgrade | 主站 | https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=653 |
| 付费 / Upgrade | 独立站 | https://streamfab.com/streamfab-for-browser.htm?open=653 |
