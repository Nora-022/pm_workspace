# Disney Plus 业务规则摘要

主文件：`../06_business_rules.md`

用于快速回看 Disney Plus 插件的商业方案与业务边界；完整内容以 `06_business_rules.md` 为准。

## 快速摘要
- 商业方案：`30-Day Free Trial（免费；每服务 3 个视频） / 1 Month License $59.99 / 1-Year License $89.99 / Lifetime License $109.99`
- 权益口径：Trial 3 次，Premium 每日 100
- 账号与设备授权：沿用产品线通用授权策略
- 配额与限制：Disney 无 Error 330 特殊规则
- 配额扣减机制：预占 -> 成功确认 -> 失败/取消释放；Retry 不重复扣减
- 订阅状态与阻断提示：订阅权益说明已沉淀到相关展示文案
- 其它限制：相较 ytdlp，Premium 不再是无每日上限
