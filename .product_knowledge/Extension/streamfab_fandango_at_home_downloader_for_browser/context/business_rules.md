# Business Rules (Context Summary)

> 从 `06_business_rules.md` 提炼。不在此引入新事实。

## Trial / Paid

- Trial / Paid 体系复用 StreamFab 浏览器插件统一规则
- 产品页标价：`USD 59.99`（抽取日期 2026-04-17）
- 试用次数和价格档以 pid 总表 / 主站为准

## 用户权益分层

需区分以下状态，下载可用性和提示语义不同，不允许混成统一错误：

- 未登录
- Free with Ads（已登录、无购买、含广告免费内容可下）
- Rent（30 天激活窗口 + 48 小时观看窗口内）
- Buy（永久持有）
- 租期过期 / 观看窗口关闭（已 Rent 但超时）

## 内容边界

- 仅处理用户已 Rent / Buy / Free-with-Ads 的内容
- 保留 `eligible`、`personal offline viewing`、`valid access period` 表述
- 不支持内容必须明确提示，不静默失败

## 地理限制

- 服务地区严格限定为美国
- 非 US IP 触发两类拒绝：
  - 站点级：`Sorry, Fandango is not available outside the United States`
  - 内容级：`Oops! This movie won't play on your display due to copyright restrictions`

## 跳转 / 商业链接

- 付费 / Upgrade 链接以 Win pid `693` 作为 `?open=` 参数
- 主站、独立站独立维护，不复用其他插件

## 数据上报

- 上报逻辑与 Netflix 基线一致
- 通过插件 id `streamfab_for_browser_fandango_at_home`、索引和事件类型区分
