# 00 概览

## 产品定位
- 产品名称：StreamFab Video Downloader for Browser
- 产品类型：浏览器插件产品线的多站点基线产品
- 支持范围：ytdlp 支持的多站点

## 核心规则
- 检测策略：有预分析流程，有跨 Origin 模型，下载中仍可继续检测
- 下载策略：支持批量发起，并发下载上限 5，Retry 不重复扣减配额
- 授权策略：登录后进行授权校验，设备授权超限时引导到 Member Center 解绑
- 权益规则：Trial 5 次，Premium 无每日上限，配额机制采用版本 B（预占 / 成功确认 / 失败释放）
- 交互框架：主体固定为 `Detected` 与 `Downloads` 两个一级页签，支持 Popup 与 Sidebar 两种展示方式

## 已确认边界
- Chrome / Edge / 官网版本存在能力差异
- 渠道差异属于该产品的重要上下文

## 关联文档
- `01_product_brief.md`
- `02_functional_architecture.md`
- `04_interaction_details.md`
- `06_business_rules.md`
- `patterns/ui_patterns.md`
