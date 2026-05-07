# 06 业务规则（Business Rules）

## 商业方案
- 免费方案：`Lifetime Free Access`，免费终身访问 YouTube `720p` 下载。
- 试用方案：`30-Day Free Trial`，免费，每个服务最多下载 3 个视频。
- 付费方案：`1-Year License $49.99 / Lifetime License $59.99`
- 促销信息：`Full Version 40% OFF`，`$59.99`（原价 `$99.99`）
- 价格来源：`https://streamfab.com/streamfab-for-browser.htm`

## 权益口径
- 试用适用人群：新用户 / 未购买用户 / 订阅过期用户。
- 订阅适用人群：付费订阅用户。
- 总下载能力：
  - Trial：最多 5 次。
  - Premium：总量无限，但每日上限 100 次。

## 账号与设备授权
- 登录后进入授权校验流程。
- 设备授权配额：默认每账号 1 台计算机。
- 超额授权：触发 `Authorization Limit Reached`，下载功能锁定，无法创建新任务。
- 解绑规则：插件端不提供直接解绑；仅跳转 Member Center 处理。
- 重置规则：Member Center 提供每年有限次数的 `Deauthorize All`。

## 配额与限制
- Trial 扣减规则：
  - 非 YouTube 下载：扣 1 点。
  - YouTube >= 720p 或纯音频：扣 1 点。
- Always Free（仅官网版 / Edge 版）：
  - YouTube < 720p 且关闭 Turbo：0 Cost。
  - 即使 Trial 点数为 0，该能力仍可使用。
- Chrome 特例：不支持任何 YouTube 下载；非 YouTube 下载按正常规则执行。
- Turbo 规则：
  - Turbo 是付费权益，订阅用户默认可用。
  - Turbo 本身不产生独立扣点。
  - Trial 用户无剩余次数时，Turbo 不可用。
- 并发任务：最多 5 个 Downloading / Turbo 并发，超出进入 Pending。

## 配额扣减机制
- 采用版本 B：预占（Reservation）+ 成功确认（Commit）+ 失败释放（Release）。
- 规则：
  1. 任务创建并通过校验后，先预占额度。
  2. 任务 `Completed` 时，预占转永久扣减。
  3. 任务 `Failed` 或 `Canceled` 时，自动返还预占。
  4. `Retry` 属于同一任务延续，不重复预占。

## 订阅状态与阻断提示
- 订阅过期：回退到试用结束状态，触发 `Subscription Expired`，仅保留 Always Free 权益。
- 订阅有效但当日额度为 0：点击下载时弹窗提示今日下载上限已达 100。

## 其它限制
- 支持网站：全网（YouTube + 1000+ 网站），Chrome 版本受政策限制不支持 YouTube 下载。
- 视频画质：最高至 8K HDR。
- 音频下载：支持，最高 320kbps。
- 批量下载：支持，Trial 受配额限制。
- 退款与异常补偿：
  - 非成功结束状态自动返还预占配额。
  - 系统故障导致返还异常时，用户可联系客服人工补发。
  - 订阅退款遵循 StreamFab 官网标准退款政策，插件端不处理。

## 归档说明
- 商业方案以统一售卖页为准。
