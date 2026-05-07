# context/business_rules.md

主文件：`../06_business_rules.md`

用于 PRD/方案评审前快速加载；完整内容以 `06_business_rules.md` 为准。

## 快速摘要

- 试用（Trial）：3 次
- Premium：每日上限 100 次
- 试用弹窗触发：试用用户点击下载确认按钮时触发
- 特殊限制：最近两个月缓存 key 视频，Trial 受限（CoApp 返回 Error 330）
- 扣减机制：预占 → 成功确认 → 失败/取消释放；Retry 不重复扣减
