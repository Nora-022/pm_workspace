# 04 交互细节（Interaction Details）

## 核心操作交互

### 操作：Detected 页点击 `Download`
- 触发方式：用户在视频卡片点击 `Download`。
- 交互步骤：
  1. 阶段一（阻断式同步校验）：先做权益与配额检查。
  2. 阶段二（即时任务创建）：校验通过后立即创建任务并跳转 Downloads。
  3. 阶段三（异步环境检查）：后台检查 CoApp 连接与磁盘空间。
  4. 阶段四（下载执行）：检查通过后进入下载并持续反馈进度。
- 成功反馈：
  - 新任务插入 Downloads 顶部，初始状态 `Pending`。
  - Downloads Tab 气泡数 +1。
  - 下载完成后进入 Downloaded 分组并触发浏览器通知（"Download complete"）。
- 失败反馈：
  - 权益校验失败：弹出阻断模态，不创建任务。
  - 环境检查失败：任务置为 `Failed`，卡片展示错误原因并提供 `Retry`。
- 可撤销性：
  - `Pending`/`Downloading` 阶段允许 `Cancel`。

## 下载任务状态流转（Downloads）

### 状态：Pending
- 定义：任务已创建，等待并发槽位或环境检查结果。
- 触发条件：新任务创建时并发下载数 >= 5，或前置环境检查尚未完成。
- 展示：状态 `Pending` + 文案 `Waiting in queue...`。
- 可操作：仅 `Cancel`。
- 流转：并发槽位可用且环境检查通过 -> `Downloading`。

### 状态：Downloading
- 定义：任务正在下载传输。
- 展示：进度条、百分比、速度、剩余时间。
- 可操作：仅 `Cancel`。
- 资源：占用 1 个并发槽位。
- 流转：成功 -> `Completed`；出错 -> `Failed`；用户取消 -> `Canceled`。

### 状态：Completed
- 定义：文件写入本地成功且校验通过。
- 展示：移动到 Downloaded 分组，显示文件大小与分辨率；显示 `Open Folder`。
- 资源：释放并发槽位，触发下一条 `Pending`。
- 后续：系统通知 `Download complete`。

### 状态：Failed
- 定义：下载过程中出现阻断性错误（网络/IO/权限/逻辑/超时）。
- 展示：任务保留在 Downloading 分组（或独立 Failed 分组），状态条不变红；错误码与错误原因使用红色文案。
- 资源：释放并发槽位，触发下一条 `Pending`。
- 可操作：显示 `Retry`。

### 状态：Retry
- 触发：用户点击 `Retry`。
- 行为：状态重置为 `Pending`，按 FIFO 重新排队。
- 流转：等待并发槽位后再次进入 `Downloading`。

## 阻断校验与异常处理规范

### 阶段一：权益与配额校验（阻断）
- 校验项：
  - 登录与授权状态有效。
  - 试用用户剩余次数 > 0（非 Always Free 场景）。
  - 订阅用户未过期，且当日剩余额度 > 0。
- 失败处理：
  - 试用次数耗尽：`Free Trial Completed`（引导升级）。
  - 订阅过期：`Subscription Expired`（引导续费）。
  - 订阅当日额度用尽：
    - `You’ve reached today’s download limit (100).`
    - `Downloads will be available again tomorrow.`
    - 按钮：`Got it`
- 失败结果：流程终止，不创建任务，停留 Detected 页。

### 阶段二：配额预占（与创建同步）
- 机制：创建任务时预占 1 个配额（Reserve）。
- 结算：`Completed` 才永久扣减；`Failed/Canceled` 自动返还；`Retry` 不重复预占。

### 阶段三：环境检查（非阻断）
- 检查项：CoApp 连接、目标磁盘空间。
- 异常处理：
  - CoApp 未连接：`Failed` + `Error: CoApp not connected` + `Retry`。
  - 磁盘空间不足：`Failed` + `Error: Insufficient disk space` + `Retry`。

## 状态反馈规范
- 加载中：Detected 检测中显示动画（`Detecting videos...`）。
- 成功：任务状态实时变更并给出进度。
- 失败：在任务卡片展示错误码与可恢复动作（`Retry`）。
- 空状态：`No videos detected`，提供 `Force Refresh`。
- 离线/网络异常：授权校验失败时支持手动重试。

## 错误提示文案与多语言
- 基准文案：English (US)。
- 展示语言：按用户设置语言显示（支持 28 种语言）。
- 回退策略：当前语言包缺失时自动回退 English (US)。
