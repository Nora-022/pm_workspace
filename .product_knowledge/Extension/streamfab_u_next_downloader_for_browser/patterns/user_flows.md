# User Flows — StreamFab U-NEXT Downloader for Browser

## 主流程（Happy Path）

1. 用户在 video.unext.jp 或 H-NEXT 打开视频页，已登录 U-NEXT
2. 插件检测页面 → 判断为可下载视频
3. Detected 面板展示视频卡片（含 Resolution + Language 配置项）
4. 用户发起下载（单集或批量 TV 剧集）
5. CoApp 执行下载，插件展示进度（文件大小 / 速度 / 进度）
6. 下载完成，保留在 Downloads 列表

## 分支流程

### 非支持站点
- 插件不显示检测结果，展示引导前往 U-NEXT 站点

### 未登录
- Detected 为空，提示用户登录 U-NEXT

### 登录中断（下载中）
- Downloading 状态任务允许继续
- Failed 状态禁止 Retry
- Downloaded 记录保留展示
- Detected 有视频时不允许发起新任务

### Trial 额度耗尽
- 提示升级至付费方案

## 配额扣减时序

发起任务 → 预扣减 → 成功确认扣减 / 失败不扣减
