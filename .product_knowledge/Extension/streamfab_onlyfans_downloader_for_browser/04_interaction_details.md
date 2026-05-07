# 04 交互细节（Interaction Details）

## 检测与分析流程
- 用户打开 OnlyFans 视频页 → 插件自动分析 URL，无需手动点击
- 分析过程不弹窗，完成后结果直接展示在插件内
- 分析速度快（UGC 内容 meta 信息相对较少）

## 下载配置交互
- 下载卡片仅展示 Video 配置项（由 meta 驱动）：Original / 720p / 480p
- 无 Codec 选择、无 Language 选择、无 Subtitle 选择（与 Netflix 卡片不同）

## 检测与下载并行
- 有 Downloading 任务时，仍允许发起新检测
- 无”下载中暂停检测”限制

## 下载进行中展示
- 展示：分辨率标签、codec 标签、速度、进度、文件大小
- 不展示：剩余时间

## 下载调度（预设）
- 串行执行（并发 1）
- FIFO
- Retry 回队头

## 试用限制交互
- Trial 用户仅可试用 3 个视频，超出后触发升级引导
- 试用弹窗与 Netflix 一致，不改动
