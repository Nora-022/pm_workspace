# 00 规划上下文（Planning Context）

## 产品定位
- 产品：StreamFab Onlyfans Downloader for Browser
- 产品线关系：与 ytdlp / Netflix / Disney 插件同级独立产品
- 支持范围：仅 Onlyfans（预设，待确认）

## 预设策略（来自 DRM 单站点模板，待确认）
1. 检测策略
- 无预分析
- 无跨 Origin
- Downloading 存在时暂停新检测
- Detected 列表上限 50

2. 下载策略
- 支持批量发起
- 串行执行（并发 1）
- FIFO
- Retry 回队头

3. 商业规则（预设）
- Trial 3 次
- Premium 每日 100

## 待你确认的关键差异
- Onlyfans 是否有特殊受限错误码（类似 330）
- 最高画质与音轨能力
- 渠道功能是否一致（Chrome/Edge/官网）
- 顶部授权信息展示字段
