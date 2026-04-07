# Product Line Index

## 产线概览
- 产品线名称：StreamFab Browser Extensions
- 命名规则：`streamfab_<service>_downloader_for_browser`
- 当前目录内插件：8 个
- 业务进度总览：`plugin_progress_overview.md`
- 共性规则索引：`common_plugin_rules.md`
- PM 入口：`pm_context_hub.md`
- 检索入口：`search_index.md`

## 当前阶段说明

- 已发布插件：Video、Amazon、Netflix、Disney Plus
- 产品已准备，待开发插件：Hulu、TVer、FANZA、U-NEXT、OnlyFans
- Amazon Downloader 已按当前业务口径计入已发布插件，但当前工作区尚未发现对应插件目录

## 已上线
### streamfab_video_downloader_for_browser
- 定位：多站点（ytdlp）插件
- 关键规则：Trial 5 次；Premium 无每日上限；存在渠道差异；支持预分析与跨 Origin
- PM 文档：`streamfab_video_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_video_downloader_for_browser/requirements/index.md`

### Amazon Downloader
- 当前状态：已发布，但当前知识库目录待补录

## 规划中
### streamfab_netflix_downloader_for_browser
- 定位：Netflix 单站点插件（支持 Netflix DRM 下载）
- 关键规则：Trial 3 次；Premium 每日 100；批量发起 + 串行下载（并发 1）
- 前置条件：Netflix 站点 + 登录 Netflix + 播放视频获取 meta
- 特殊限制：最近两个月缓存 key 视频，试用用户不支持下载（Error 330）
- PM 文档：`streamfab_netflix_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_netflix_downloader_for_browser/requirements/index.md`

### streamfab_disney_plus_downloader_for_browser
- 定位：Disney Plus 单站点下载插件
- 当前状态：规划中（知识库骨架已创建）
- PM 文档：`streamfab_disney_plus_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_disney_plus_downloader_for_browser/requirements/index.md`

### streamfab_onlyfans_downloader_for_browser
- 定位：Onlyfans 单站点下载插件
- 当前状态：规划中（已创建并预设）
- PM 文档：`streamfab_onlyfans_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_onlyfans_downloader_for_browser/requirements/index.md`

### streamfab_fanza_downloader_for_browser
- 定位：Fanza 单站点下载插件
- 当前状态：规划中（模板已创建）
- PM 文档：`streamfab_fanza_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_fanza_downloader_for_browser/requirements/index.md`

### streamfab_u_next_downloader_for_browser
- 定位：U-NEXT 单站点下载插件
- 当前状态：规划中（模板已创建）
- PM 文档：`streamfab_u_next_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_u_next_downloader_for_browser/requirements/index.md`

### streamfab_hulu_downloader_for_browser
- 定位：Hulu 单站点下载插件
- 当前状态：规划中（repair mode 完成）
- 关键已知：
  - 产品页支持 `1080p/4K`
  - 产品页支持 `EAC3 5.1 audio track`
  - 产品页显示 `30 days / 3 downloads / 100 per day`
  - 目标站点调研已覆盖 `.com` 与 `.jp`
- PM 文档：`streamfab_hulu_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_hulu_downloader_for_browser/requirements/index.md`

### streamfab_tver_downloader_for_browser
- 定位：TVer 单站点下载插件
- 当前状态：规划中（已初始化，待后续进入开发）
- PM 文档：`streamfab_tver_downloader_for_browser/00_planning_context.md`
- 需求文档：`streamfab_tver_downloader_for_browser/requirements/index.md`
