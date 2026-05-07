# client_product_page_notes.md

用途：记录 ytdlp 插件对外产品页和宣传口径中应保持一致的关键信息。

## 产品定位口径

- 产品名称：StreamFab Video Downloader for Browser
- 定位：多站点视频下载插件
- 适合场景：浏览器内检测视频并直接发起下载

## 对外能力口径

- 覆盖 `yt-dlp` 支持的多站点
- 支持批量下载
- 支持下载加速
- 支持任务队列管理
- 支持高画质视频与音频下载

## 需要同步说明的限制

- Chrome 商店版不支持 YouTube 下载
- 不支持 DRM 受保护内容下载
- 下载依赖 CoApp

## 与单站点插件的边界

- ytdlp 插件负责多站点通用能力
- Netflix、Disney Plus 等单站点插件承担各自的 DRM/单站点深度能力
