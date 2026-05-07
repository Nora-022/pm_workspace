# 00 概览

## 产品定位
- 产品名称：StreamFab Netflix Downloader for Browser
- 产品类型：独立单站点浏览器插件
- 支持范围：仅 Netflix

## 核心规则
- 检测策略：无预分析、无跨 Origin、Detected 列表上限 50
- 下载策略：支持批量发起，串行下载（并发 1），Retry 回队头
- 检测与下载关系：支持下载任务与新视频分析并行
- 账号中断处理：退出登录后停止检测并清空 Detected；Downloading 继续；Pending 不启动；Failed 禁止重试；保留 Downloaded
- 权益规则：Trial 3 次，Premium 每日上限 100，最近两个月缓存 key 视频对 Trial 受限（Error 330）

## 已确认边界
- 仅支持 Netflix 站点
- 不支持预分析，界面以完整分析结果一次性展示
- 下载配置以完整字段集为准，不按历史截图中较少字段的版本收缩

## 关联文档
- `01_product_brief.md`
- `02_functional_architecture.md`
- `04_interaction_details.md`
- `06_business_rules.md`
- `patterns/netflix_vs_ytdlp_logic_diff.md`
