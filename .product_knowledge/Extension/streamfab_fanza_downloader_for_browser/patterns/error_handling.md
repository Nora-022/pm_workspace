# patterns/error_handling.md

## Error 330 — Trial 用户 + 缓存 key 视频

- 触发条件：Trial 用户下载最近两个月缓存 key 视频时，CoApp 返回 Error 330
- 错误文案：多语言包（固定文案），缺失翻译回退 English (US)
- 原因提示：该视频对 Trial 用户受限
- 用户下一步：购买 Premium 订阅；无法通过重试解决
- 是否可重试：否
- 是否扣减次数：否（预占后 CoApp 返回 330，释放）

## 登录中断 — Failed 任务重试

- 触发条件：任务 Failed 状态下用户已退出 Fanza 登录
- 错误文案：Failed 状态显示（沿用 StreamFab 客户端信息）
- 原因提示：登录已失效
- 用户下一步：点击 Retry 后引导至 Detected 页完成登录，登录后可重新发起
- 是否可重试：登录后可重试，但不在 Failed 状态直接重试

## CoApp 未安装

- 触发条件：用户点击下载时 CoApp 未安装或未运行
- 错误文案：引导安装页（Install CoApp / Learn More）
- 原因提示：CoApp 是执行下载的必要组件
- 用户下一步：按引导安装 CoApp
- 是否可重试：安装完成后可重试

## 前置条件不满足（非 Fanza / 未登录 / 未播放）

- 触发条件：用户打开插件时未在 Fanza 站点，或未登录，或未播放视频
- 错误文案：Detected 页展示引导态说明（不同状态不同文案）
- 用户下一步：按提示前往 Fanza 站点 / 登录 / 播放视频
- 是否可重试：满足前置条件后自动恢复检测
