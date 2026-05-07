# 03 页面结构与布局（Page Structure）

## 页面清单
1. 插件主页（Popup / Sidebar）
2. 用户授权信息模块（顶部固定区）
3. Detected（检测结果页 / 分析结果展示）
4. Downloads（下载管理页）
5. Dashboard - License Info（含 Banner）
6. Dashboard - Settings（Extension + CoApp 两 tab）
7. CoApp 引导页

## 顶部用户授权信息模块（预设，结构参照 Netflix）
- 试用：邮箱 + 剩余下载次数 + Trial + Buy Now + Dashboard icon
- 订阅：邮箱 + 当日下载次数 + 订阅方案 + Dashboard icon

## Detected / 分析结果
- 分析完成后结果直接在插件内展示，无弹窗
- 下载配置项仅有 Video（由 meta 驱动）：
  - Original
  - 720p
  - 480p

## Downloads（下载管理页）
- 每个任务展示：分辨率标签、codec 标签、速度、进度、文件大小
- 不展示剩余时间

## Dashboard - License Info
- Banner 文案（已定稿）：
  - EN：Creator Videos, Downloaded Simply. / Enjoy OnlyFans offline in up to 1080p with clean AAC audio
  - ZH：创作者视频，轻松下载 / 离线畅享OnlyFans，支持最高1080p画质，搭配纯净AAC音频
- 产品名：StreamFab OnlyFans Downloader for Browser
- Trial 弹窗：与 Netflix 一致，不改动

## Dashboard - Settings
- 结构：Extension + CoApp 两 tab，结构不变
- 详细配置项见 `patterns/settings_configuration_matrix.md`
