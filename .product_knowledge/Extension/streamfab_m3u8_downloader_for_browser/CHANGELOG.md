# M3U8 Downloader for Browser Changelog

本文档记录 M3U8 Downloader for Browser 的版本更新历史，按时间倒序整理。

## 版本历史

### 2026-04-28 | 已发布 | M3U8 V1001 + CoApp V1001

- 新增：支持 Chrome 与 Edge，全面适配主流 Chromium 内核环境，更多信息：https://streamfab.dvdfab.cn/streamfab-for-browser.htm
- 新增：下载 M3U8 站点的剧集/电影。
- 新增：支持加速下载，显著提升视频获取效率。
- 新增：支持剧集下载，自动识别剧集列表并连续下载。
- 新增：支持字幕选择与下载，可识别多语言字幕轨道并自由选择。
- 新增：支持最高 4K 视频分辨率输出，获得更清晰的画面质量。
- 新增：支持 H.264/H.265 视频编码选择，获得最佳播放器兼容性与更佳压缩效果。
- 新增：支持保留 EAC3 5.1/AAC 2.0 清晰音频，确保离线播放拥有宽广清晰的音效。
- 新增：支持 MP4、MKV 格式输出，兼容更多设备与播放器。
- 新增：支持 28 种语言的界面与内容识别，方便不同语言环境使用。

## 信息来源

- 官方更新页：https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=drm-m3u8-downloader

---

## 知识库变更记录

### 2026-04-28
- 补充 `06_business_rules.md` 业务规则
- 补充 `02_functional_architecture.md` 功能架构
- 补充 `03_page_structure.md` 页面结构
- 补充 `04_interaction_details.md` 交互细节
- 补充 `05_design_principles.md` 设计原则
- 更新 `07_technical_constraints.md` 加密支持范围
- 新增 `version_history.md`

### 2026-04-23
- 初始化 `streamfab_m3u8_downloader_for_browser` 插件知识库目录
- 创建 `README.md` 与 `00-07` 核心文档
- 创建 `requirements/`、`context/`、`patterns/`、`constraints/`、`references/`、`working_notes/` 基础文件
- 新增 `08_technical_implementation.md` 与 `09_technical_open_issues.md`
- 补充插件与 CoApp 的接口职责、URL 判断链路与分析终态缺口
