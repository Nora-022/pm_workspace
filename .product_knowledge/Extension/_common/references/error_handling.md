# 错误处理基线（Error Handling）

> 跨插件共用的错误大类、UI 表现、可重试性、用户引导
> 站点专属错误码（如 Netflix `Error 330`）写入插件 `diff_summary.md`
> 关联：[user_flows.md](user_flows.md)、[business_rules.md](business_rules.md)

---

## 一、错误分类与处理策略

| 错误大类 | UI 表现 | 可重试 | 用户引导 |
| --- | --- | --- | --- |
| 登录中断 | 任务卡片置 `Failed` + 红字提示 | ❌（禁止重试） | 引导重新登录 |
| 网络异常 | 任务卡片置 `Failed` + `Network error` | ✅ Retry | 等待网络恢复 |
| 配额耗尽（Trial） | 全局阻断弹窗 `Free Trial Completed` | ❌ | 引导升级订阅 |
| 配额耗尽（订阅当日） | 全局阻断弹窗 `You've reached today's download limit (100).` 按钮 `Got it` | ❌ | 第二天恢复 |
| 订阅过期 | 全局阻断弹窗 `Subscription Expired` | ❌ | 引导续费 |
| 授权上限 | 全局阻断 `Authorization Limit Reached` | ❌ | 跳转 Member Center 解绑 |
| 授权失败（网络） | 阻断弹窗 | ✅ 手动重试 | — |
| 授权失败（其他） | 阻断弹窗 | ❌ | 联系客户支持 |
| CoApp 未连接 | 任务 `Failed` + `Error: CoApp not connected` | ✅ Retry | 检查 CoApp 服务 |
| CoApp 有更新 | Detected 提示 + 引导更新 | — | 更新 CoApp |
| 磁盘空间不足 | 任务 `Failed` + `Error: Insufficient disk space` | ✅ Retry | 清理磁盘 |
| DRM 内容（ytdlp_mode） | Detected 卡片 `Protected Video Content` | ❌ | 引导桌面客户端 |
| 站点不支持 | Detected 提示 | ❌ | 检查站点 |
| YouTube 限制（Chrome 商店版） | Detected `Video on YouTube` | ❌ | 引导 Edge / 官网 |

---

## 二、错误展示位置规范

| 位置 | 适用场景 |
| --- | --- |
| 全局阻断弹窗 | 权益 / 配额 / 订阅 / 授权类，阻断后续操作 |
| Detected 状态态 | 检测层级问题（未登录 / 未装 CoApp / 站点不支持） |
| 任务卡片下方红字 | 单任务执行失败（网络 / IO / 权限 / 逻辑 / 超时） |
| Login Notice 弹窗 | 在受限页面（chrome://* / edge://* / Web Store）尝试登录时 |

---

## 三、可重试性原则

| 错误来源 | Retry 行为 |
| --- | --- |
| 网络 / IO / 临时性 | 重置为 Pending，按 FIFO 重新排队，**不重复预占配额** |
| 登录中断 | 禁止重试，先登录 |
| 权益 / 配额 / 授权类 | 解决根因后才能继续，不在任务卡片提供 Retry |
| DRM / 站点不支持 | 不可重试，引导其他方案 |

---

## 四、错误码登记原则

- **通用错误**：在本基线统一文案，走多语言包
- **站点专属错误码**（如 Netflix `Error 330`、Disney+ 区域限制）：在插件 `diff_summary.md` 单独登记，文案、可重试性、扣减规则单列
- **CoApp 回传错误**：保留原始 error code 以便数据上报与排查

---

## 五、Login Notice（受限页面登录）

插件无法在以下页面注入或运行：

- `chrome://*`
- `edge://*`
- `about:blank`
- Chrome Web Store / Edge Add-ons 页面

用户在这些页面尝试登录时，弹 `Login Notice` 引导去官网页面登录。

---

## 六、错误文案多语言

- 基准文案：English (US)
- 回退策略：当前语言包缺失时自动回退 English (US)
- 错误码（如 `Error 330`）保留数字标识，不翻译
