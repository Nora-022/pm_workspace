# 03 页面结构

## 当前知识结构
- 主入口：`README.md`
- 总览入口：`00_overview.md`
- 核心知识文件：`01-07`
- 需求入口：`requirements/index.md`
- 版本入口：`CHANGELOG.md`

## 后续承接方向
- 站点调研结果进入 `references/`
- 确认后的产品事实回填至 `00_overview.md` 与 `01-07`
- 需求与设计工作文档持续沉淀在 `requirements/`

---

## 页面清单（2026-05-19 分发）

事实来源：客户端方案拆解（飞书）、`requirements/plugin_requirement.md`。

### 触发与入口

- 检测 URL 模式：`https://athome.fandango.com/content/browse/details/<slug>/<id>`
- 兼容旧域：`vudu.com`（站点已重定向到新域）

### 页面 / 弹窗清单

| # | 页面 | 触发条件 | 关键内容 |
|---|---|---|---|
| 1 | Trial 弹窗 | 试用未开始 / 未付费 | 文案复用 Netflix 现有试用弹窗 |
| 2 | Meta 分析结果弹窗 | CoApp 分析完成 | Movie / TV 两类内容树 + 下载配置项 |
| 3 | Downloading 视图 | 已加入下载队列 | 任务列表 + 标签 + 进度 |
| 4 | Setting 视图 | 用户进入 Setting | Extension + CoApp 两区配置 |
| 5 | Dashboard | 插件主面板 | Banner、产品名、入口 |
| 6 | License Info | Dashboard 内 Banner 区 | 中英文 Banner 文案 + 产品名 |

### Meta 分析结果弹窗

- **Movie**：
  - 主视频 + Extra（如有）；Extra 分两级结构
  - 下载配置项：Resolution、Audio Codec、Language、Subtitle
- **TV**：
  - 主视频两级层级：Season > Episode
  - playlist 仅分析第一集 meta；后续剧集可能存在 / 不存在的分辨率以 `1920x1080 if available` / `1280x720 if available` 形式标注
  - 部分剧集（时间久远、画质较差）会触发分辨率兼容提示

### Downloading 视图

- 每行展示标签：分辨率、视频 codec、音频 codec
- 每行展示信息：速度、进度、剩余时间、分片进度
- 进度标签：可获取文件大小时 `0B / 0B`，不可获取时 `0 / 0 Segments`

### Setting 视图

- 通用配置项（按顺序）：Language、Video Format、Video Resolution、Pre-select Audio Language、Audio Channel、Pre-select Subtitle Language、Subtitle Action
- Fandango at Home 差异化配置项（追加在末尾）：
  - **Video Codec**：H264 / H265 - SDR / HDR10 / Dolby Vision
  - **Audio Codec**：EAC3 / AAC

### Dashboard / License Info

- Banner（EN）：`Fandango at Home Videos in Up to 4K. One Click.` + `The simplest way to download Fandango at Home movies and shows for offline viewing.`
- Banner（ZH）：`Fandango at Home 视频最高支持 4K 画质。一键下载。` + `下载 Fandango at Home 电影和剧集以供离线观看的最简单方式。`
- 产品名：`StreamFab Fandango at Home Downloader for Browser`
