# context/business_rules.md

主文件：`../06_business_rules.md`

用途：用于快速加载 ytdlp 插件的套餐、配额和授权边界。

## 快速摘要

- 免费形态：无永久免费版
- 试用规则：默认 5 次 Trial
- 订阅规则：Premium 总量无限，但存在每日 100 次上限
- 并发规则：最多 5 个下载任务并发，超出进入 Pending
- 配额机制：预占、成功确认、失败或取消释放
- 渠道差异：
  - 官网版和 Edge 版支持部分 YouTube 场景
  - Chrome 商店版不支持 YouTube 下载
- 业务红线：
  - 不做 DRM 绕过
  - 不在插件端处理授权解绑与退款
