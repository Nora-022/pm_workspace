# 00 决策记录（Decision Log）

## 已定决策
1. 命名规范
- `streamfab_<service>_downloader_for_browser`

2. 产品边界
- Disney 插件仅支持 Disney Plus
- 与 ytdlp/Netflix 同级独立产品

3. 检测模型
- 无预分析
- 无跨 Origin
- 检测列表上限 50

4. 检测与下载关系
- 有 Downloading 任务时，不触发新检测
- 原因：下载期间也依赖播放数据；若并行检测新视频会导致数据上下文混乱

5. 下载模型
- 支持批量发起
- 串行执行（并发 1）
- Retry 回队头

6. 顶部授权信息模块
- 试用：邮箱 + 剩余下载次数 + Trial + Buy Now + Dashboard icon
- 订阅：邮箱 + 当日下载次数 + 订阅方案（LeftTime/Annual/Fab365）+ Dashboard icon

7. 权益与限制
- Trial 3 次
- Premium 每日上限 100
- 无 Error 330 特殊规则
