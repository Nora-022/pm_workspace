# Video Downloader 业务规则摘要

主文件：`../06_business_rules.md`

用于快速回看 Video Downloader 的商业方案、配额和授权边界；完整内容以 `06_business_rules.md` 为准。

## 快速摘要
- 商业方案：`Lifetime Free Access（免费） / 30-Day Free Trial（免费；每服务 3 个视频） / 1-Year License $49.99 / Lifetime License $59.99`
- 权益口径：Trial 最多 5 次，Premium 总量无限但每日上限 100
- 账号与设备授权：默认每账号 1 台计算机，超额授权需去 Member Center 处理
- 配额与限制：Chrome 商店版不支持 YouTube 下载；并发最多 5 个下载任务
- 配额扣减机制：预占、成功确认、失败或取消释放
- 订阅状态与阻断提示：订阅过期回退到试用结束状态；当日额度为 0 时弹窗提示
- 其它限制：不做 DRM 绕过，不在插件端处理授权解绑与退款
