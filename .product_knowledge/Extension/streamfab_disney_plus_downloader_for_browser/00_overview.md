# 00 概览

## 产品定位
- 产品名称：StreamFab Disney Plus Downloader for Browser
- 产品类型：独立单站点浏览器插件
- 支持范围：仅 Disney Plus

## 核心规则
- 检测策略：无预分析、无跨 Origin、Detected 列表上限 50
- 下载策略：支持批量发起，串行下载（并发 1），Retry 回队头
- 检测与下载关系：支持检测与下载并行，下载中任务不阻断新检测
- 账号中断处理：退出登录后停止检测并清空 Detected；进行中任务继续；Pending 不启动；Failed 禁止重试；保留 Downloaded
- 权益规则：Trial 3 次，Premium 每日上限 100

## 已确认边界
- 仅支持 Disney Plus
- 当前产品线已完成并行能力优化，下载任务存在时仍允许继续检测新内容

## 关联文档
- `01_product_brief.md`
- `02_functional_architecture.md`
- `04_interaction_details.md`
- `06_business_rules.md`
- `patterns/disney_vs_netflix_logic_diff.md`
