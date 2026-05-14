# [StreamFab 浏览器插件] - [DRM MPD] - UI 需求说明

- 原型链接：[http://axcloud.dvdfab.me/AFZKNR?id=n01130&g=14](http://axcloud.dvdfab.me/AFZKNR?id=n01130&g=14)
- 需求地址：[https://project.feishu.cn/streamfab_browser_extension/story/detail/6925035500](https://project.feishu.cn/streamfab_browser_extension/story/detail/6925035500)

---

## 文档目的

仅对部分差异模块进行重新设计，本文档说明差异并拆解 UI 任务。

## 产品信息

| 信息 | 值 |
| --- | --- |
| 产品名 | StreamFab DRM MPD Downloader for Browser |
| 产品 Logo | 遵循 ytdlp 插件 logo 设计规范，视觉效果保持一致 |
| 系统支持 | Win、Mac 双系统支持（暂时只做 Win） |

## 设计需求拆分

按优先级分为四部分。

### 第一部分：界面改动

无。

### 第二部分：CoApp 安装器资源

参照 Netflix 插件，需给出对应 logo 尺寸。

### 第三部分：应用商店素材

DRM MPD 支持多个站点，界面不展示具体站点，参照客户端产品页处理方式（模糊、占位）。

通用调整元素

| 元素 | 处理方式 |
| --- | --- |
| 标题 / 产品名 | StreamFab DRM MPD Downloader |
| 浏览器背景截图 | 模糊处理 |
| 视频封面图 | 使用默认图（含插件 logo 底纹） |
| 站点 logo 占位 | 用 DRM MPD 插件 logo 代替 |

各张素材

| 素材 | 尺寸 / 说明 |
| --- | --- |
| 插件 Logo | 128 x 128 px。用区别于其它插件的颜色处理（不取具体服务的品牌色） |
| 默认封面图 | 在默认封面图中增加插件 logo 底纹图案 |
| Global Screenshots — 第一张图 | 改标题、网站背景截图、视频封面图、右上角插件 logo |
| Global Screenshots — 第二张图 | 修改网站背景截图、视频封面图、右上角插件 logo |
| Global Screenshots — 第三张图 | 副标题改为：`Experience the highest quality 1080p/2160p video. Full control in your hands.`<br>下载配置项：Resolution `1280x720 - 2338 kbps` / Language `English AAC` / Subtitles `English` |
| Global Screenshots — 第四张图 | 修改网站背景截图、视频封面图、右上角插件 logo |
| Global Screenshots — 第五张图 | 修改网站背景截图、视频封面图、右上角插件 logo |
| Small promo tile | 440 x 280 px。展示 logo + product name `StreamFab DRM MPD Downloader for Browser` |

参考客户端产品页：[https://streamfab.dvdfab.cn/drm-mpd-downloader.htm](https://streamfab.dvdfab.cn/drm-mpd-downloader.htm)

### 第四部分：查漏补缺

针对研发过程中发现的遗漏部分进行补充。