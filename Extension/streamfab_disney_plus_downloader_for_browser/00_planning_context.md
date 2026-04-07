# 00 规划上下文（Planning Context）

## 产品定位
- 产品：StreamFab Disney Plus Downloader for Browser
- 产品线关系：与 ytdlp / Netflix 插件同级独立产品
- 支持范围：仅 Disney Plus

## 当前最关键的策略边界
1. 检测策略
- 无预分析：meta 完成后一次性展示
- 无跨 Origin：单站点累计展示（上限 50）
- 下载中暂停检测：有 Downloading 任务时不检测新视频

2. 下载策略
- 支持批量发起
- 串行处理（并发 1）
- Retry 回队头（优先重试）

3. 账号中断策略
- 中途退出 Disney Plus：
  - 停止检测并清空 Detected
  - 进行中任务继续
  - Pending 不启动
  - Failed 禁止重试并引导登录
  - 保留 Downloaded 历史

4. 商业规则
- Trial 3 次
- Premium 每日 100
- 无 Error 330 特殊规则

## 与 ytdlp 的关键差异（决策级）
- ytdlp 有预分析、跨 Origin；Disney 无
- ytdlp 支持检测下载并行；Disney 检测下载互斥
- ytdlp Trial 5 + Premium 无日上限；Disney Trial 3 + Premium 日限 100

## 关联文档
- 业务规则：`06_business_rules.md`
- 交互细节：`04_interaction_details.md`
