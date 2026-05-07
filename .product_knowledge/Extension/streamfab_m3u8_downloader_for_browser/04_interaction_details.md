# 04 交互细节（Interaction Details）

## 基线说明

M3U8 插件以 Netflix 插件为交互基线，以下只记录差异点。

## 前置条件

- 多站点，不限定具体网站
- 已登录 StreamFab 账号
- 已安装 CoApp

（无”必须在特定站点”或”必须播放”的强前置判断）

## 检测与分析流程（M3U8 特有）

M3U8 采用两段判断机制，”是否支持下载”分两个阶段决定。

### 第一段：插件页面结构判断

- 插件从网页结构判断当前页面是否为视频页
- 判断结果为”非视频页” → 直接展示不支持，流程终止，不进入 CoApp 分析

### 第二段：CoApp 分析判断

通过第一段判断后，进入 CoApp 分析流程：

1. **检测中**：插件感知到 M3U8 线索，向 CoApp 上报
2. **分析中**：CoApp 开始分析，通过 `LoadingDialog` 接口回传分析进度；超时上限 **20 秒**
3. **分析结果**，两个独立出口：
   - 支持下载 → Detected 区域新增视频卡片
   - **不支持下载**（含超时）→ 插件弹窗内引导前往 StreamFab 客户端，不触发额外弹窗
   - **分析失败**（流程中断）→ toast 提示（3s 自动消失，支持手动关闭）
     - EN: Analysis Failed. Please retry or contact us for help.
     - ZH: 分析失败，请重试或联系我们获得帮助。

**说明**：插件弹窗内引导 StreamFab 客户端是产品线通用行为（Netflix / Disney 等插件同样如此，凡当前插件不支持的视频均引导至 StreamFab）。M3U8 的差异仅在于多了第一段页面结构过滤，其余逻辑与其他插件一致。

## 下载配置交互

配置项由分析结果驱动，字段集：

- **Resolution**：width × height-bitrate
- **Language**：Language + video codec
- **Subtitles**：None / English

## 下载调度

与 Netflix 一致：
- 批量发起
- 串行执行（并发 1）
- FIFO
- Retry 回队头

## 登录中断规则

与 Netflix 一致：
- `Detected` 已有结果：登出后不允许从该区域启动新任务
- `Detected` 为空：直接提示登录
- `Downloading`：允许继续
- `Failed`：禁止重试
- `Downloaded`：正常保留与展示

## 错误处理

- 无 Error 330（M3U8 无缓存 key 概念）
- 分析失败走 toast 提示，不走额外阻断弹窗
- 其余错误沿用产品线通用文案
