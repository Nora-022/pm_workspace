# 06 业务规则

## 当前已定规则
- 当前目录用于维护 Fandango at Home 插件的正式产品知识
- 版本记录统一写入 `CHANGELOG.md`
- 需求主入口统一写入 `requirements/index.md`
- 未确认业务边界不直接写入公开知识库

---

## 业务规则（2026-05-19 分发）

事实来源：`references/site_research_notes.md`、`references/product_page_facts.md`、客户端方案拆解（飞书）。

### 用户权益分层

Fandango at Home 用户权益需区分以下状态，下载可用性和提示语义不同，不允许混成统一错误：

- 未登录
- Free with Ads（已登录、无购买、含广告免费内容可下）
- Rent（30 天激活窗口 + 48 小时观看窗口内）
- Buy（永久持有）
- 租期过期 / 观看窗口关闭（已 Rent 但超时）

### 内容边界

- 仅处理用户已 Rent / Buy / Free-with-Ads 的内容
- 保留 `eligible`、`personal offline viewing`、`valid access period` 表述
- 不支持内容必须明确提示，不静默失败

### 地理限制

- 服务地区严格限定为美国
- 平台 geo-location 检测；非 US IP 触发两类拒绝：
  - 站点级：`Sorry, Fandango is not available outside the United States`
  - 内容级：`Oops! This movie won't play on your display due to copyright restrictions`
- 插件错误归类中地理限制独立成类，与"未登录"区分

### 错误归类（5 类）

| 类型 | 触发条件 | 处理方式 |
|---|---|---|
| 未登录 / 登录态失效 | 无有效 session | 跳转登录页 |
| 地理限制 | 非 US IP / VPN 检出 | 提示用户切换 US 网络环境 |
| 版权拒绝 | 平台返回 copyright 限制 | 标记为不可下载 |
| 租期过期 | Rent 内容观看窗口关闭 | 提示用户续租或购买 |
| 硬件 DRM 不足 | 4K / HDR / DV 命中失败 | 降级到 HD 或提示用户使用支持硬件 DRM 的环境 |

### 商业方案

- Trial / Paid 体系复用 StreamFab 浏览器插件统一规则
- 产品页标价：USD 59.99（抽取日期 2026-04-17）
- 跳转链接：
  - 付费 / Upgrade 链接以 Win pid `693` 作为 `?open=` 参数
  - 主站、独立站独立维护，使用 Fandango at Home 对应链接，不复用其他插件

### 数据上报

- 上报逻辑与 Netflix 基线一致
- 通过 Fandango at Home 的插件 id（`streamfab_for_browser_fandango_at_home`）、索引和事件类型区分
