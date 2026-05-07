# 02 功能架构（Functional Architecture）

## 一级模块

| 模块 | 说明 |
|---|---|
| 站点检测与 meta 获取 | 在 video.unext.jp / H-NEXT 页面检测可下载视频，提取 meta |
| 检测结果展示 | Detected 面板展示视频卡片，支持批量发起（TV 剧集） |
| 下载配置 | Resolution + Language 两项，电影/剧集一致，无特殊分层 |
| 下载执行 | 由 CoApp 执行，插件展示进度（文件大小 / 速度 / 进度），不以分片计 |
| 权益校验 | Trial 每个服务 3 次，Premium 每日 100 次 / 每周 700 次 |
| Dashboard / Settings | 沿用 Netflix 通用流程，Setting 无 U-NEXT 差异化配置项 |

## 核心流程

直接复用 Netflix 插件流程。

## 下载配置字段

| 场景 | 配置项 |
|---|---|
| 电影 | Resolution、Language |
| 剧集（单集 / 批量） | Resolution、Language |

无 Playlist 特殊结构，配置项与电影一致。

## Dashboard Setting 配置项（按顺序）

1. Language
2. Video Format
3. Video Resolution
4. Pre-select Audio Language（含 Pre-select Description Audio）
5. Audio Channel（含 Pre-select both 5.1 and 2.0）
6. Pre-select Subtitle Language（含 Always download forced subtitle）
7. Subtitle Action

与 Netflix 插件相比：无差异化配置项，使用通用 common 配置。

> **Video Resolution 说明**：Settings 里的 Video Resolution（Full HD 1080p / HD 720p）是下载偏好预设，用于自动选中 CoApp 分析结果中匹配的选项。实际可选分辨率由 CoApp 动态分析生成，最高可达 4K；Settings 预设不限制 CoApp 能返回的最高分辨率。

## 下载进度展示

- 展示字段：文件大小 / 下载速度 / 已完成进度
- 进度单位：文件大小（非分片数）
