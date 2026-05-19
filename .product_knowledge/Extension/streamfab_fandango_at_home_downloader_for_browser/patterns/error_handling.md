# Error Handling

> 从 `04_interaction_details.md`、`06_business_rules.md`、`07_technical_constraints.md` 提炼。不在此引入新事实。

## 错误归类（5 类）

5 类错误必须独立处理，不与"分析失败"合并。

### 1. 未登录 / 登录态失效

- 触发：无有效 session、token 过期
- 效果：无法读取账户权益和内容库
- 处理：跳转登录页

### 2. 地理限制

- 触发：非 US IP / VPN 检出
- 平台返回文案：
  - 站点级：`Sorry, Fandango is not available outside the United States`
  - 内容级：`Oops! This movie won't play on your display due to copyright restrictions`
- 处理：提示用户切换 US 网络环境，与"未登录"区分

### 3. 版权 / 内容拒绝

- 触发：平台返回 copyright 限制（特定标题、特定地区或运营调整）
- 效果：内容标记为不可下载
- 处理：明确提示，不静默失败

### 4. 租期过期 / 观看窗口关闭

- 触发：已 Rent 但超过 30 天激活窗口或 48 小时观看窗口
- 效果：内容不再可访问
- 处理：提示用户续租或购买

### 5. 硬件 DRM 不足

- 触发：4K / HDR / Dolby Vision 请求时环境仅命中 Widevine L3 / PlayReady SL2000
- 效果：平台降级到 HD 或拒绝发放 license
- 处理：自动降级到可用清晰度，或提示用户使用支持硬件 DRM 的环境

## 来源依赖

- DRM / 版权状态由 Fandango at Home 源决定，部分内容可能无法下载或质量受限
- 实际可用清晰度 / 编码 / 音轨取决于源内容和用户账户权限

## 当前未细化的场景

- 分析失败的分阶段触发条件、展示文案、可重试性
- 下载中途登录中断的处理（resume / cancel / prompt）
- CoApp 本地执行失败 / 网络中断的回退策略
- DRM provisioning 失败的具体表现
