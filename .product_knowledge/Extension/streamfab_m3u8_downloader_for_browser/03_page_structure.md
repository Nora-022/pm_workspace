# 03 页面结构与布局（Page Structure）

## 引用关系
- 通用视觉规范统一引用 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 通用交互结构统一引用 `shared_references/streamfab_extension_common_ux_patterns.md`
- 通用结构尺寸统一引用 `shared_references/streamfab_extension_common_layout_specs.md`
- 本文档只记录 M3U8 插件相对 common 的页面结构差异

## 基线说明

M3U8 插件页面结构以 Netflix 插件为基线，以下只记录差异点。

## 页面清单

1. 运行时插件页面
2. Dashboard（License Info / Settings）
3. 通知与试用类弹窗
4. CoApp 引导与更新页面
5. 分析进度弹窗（M3U8 新增）

（无 Season / Playlist 选集弹窗）

## 主界面布局

与 Netflix 一致：顶部固定区 + Tab 内容区（Detected / Downloads）+ 底部固定区

## Detected

M3U8 与 Netflix 的差异：

- **无特定站点限制**，多站点累计
- **有分析进度等待态**（检测中 → 分析中），Netflix 是无预分析直接出结果
- 配置区字段集：Resolution / Language / Subtitles（无 Video Codec 切换）

## Downloads

与 Netflix 一致：串行执行，FIFO

任务卡片展示规则：
- 待下载 / 下载成功：分辨率 + 音频编码 + 文件大小
- 排队下载 / 下载中 / 下载失败：仅分辨率

（无 Season 维度任务拆分）

## Dashboard

### License Info

Banner 文案（Trial 态）：
- EN: M3U8 Videos, Downloaded Simply. Save M3U8 streams for offline viewing in up to 1080p with clear AAC audio.
- ZH: M3U8 视频，轻松下载。将 M3U8 流媒体保存下来，以最高 1080p 分辨率和清晰的 AAC 音频进行离线观看。

产品名：`StreamFab M3U8 Downloader for Browser`

### Setting

Extension 配置项（较 Netflix 精简，无 Video Codec / H264 Profile / Audio Codec）：

1. Language
2. Video Format
3. Video Resolution
4. Pre-select Audio Language
5. Audio Channel
6. Pre-select Subtitle Language
7. Subtitle Action
