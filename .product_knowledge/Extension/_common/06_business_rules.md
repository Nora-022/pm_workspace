# 06 业务规则（Business Rules）

> 本文件是 `_common` 编号体系下的正式 common 业务规则正文；`references/` 不再维护业务规则现行版本。

## 适用范围

本文只维护跨插件共用的账号、授权、配额、订阅状态和使用限制。**common 不维护单插件定价**；各插件价格、特殊套餐和特殊权益写入对应插件的 `plugin_differences.md` 和 `requirements/plugin_requirement.md`。

---

> 覆盖跨插件共用的商业方案、权益口径、配额扣减、授权、订阅状态规则
> 单插件特殊套餐 / 价格写入插件 `plugin_differences.md` + `requirements/plugin_requirement.md` 的"价格与权益"节
> 关联：[10_detection_modes.md](10_detection_modes.md)

---

## 一、商业方案口径

| 类型 | netflix_mode（VIP 服务） | ytdlp_mode（Video） |
| --- | --- | --- |
| 免费方案 | — | `Lifetime Free Access`（YouTube 720p） |
| 试用方案 | `30-Day Free Trial`，每服务最多 3 个视频 | `30-Day Free Trial`，每服务最多 5 个视频 |
| 付费方案 | 各插件独立维护 | 各插件独立维护 |

**价格唯一权威源**：`https://streamfab.com/streamfab-for-browser.htm`

具体价格、特殊套餐和特殊权益写入插件 `plugin_differences.md` 与 `requirements/plugin_requirement.md`，不在本基线维护。

---

## 二、权益口径

| 维度 | netflix_mode | ytdlp_mode |
| --- | --- | --- |
| Trial 配额 | `3` 次 | `5` 次 |
| Premium 日上限 | `100` 次 | `100` 次 |
| Premium 周上限 | `700`（部分插件） | — |
| Always Free 路径 | ❌ | ✅（YouTube < 720p + 关 Turbo = 0 cost，仅官网 / Edge 版） |

**适用人群**：

- 试用：新用户 / 未购买用户 / 订阅过期用户
- 订阅：付费订阅用户

---

## 三、配额扣减机制（两类模式统一）

采用 **预占 + 成功确认 + 失败释放** 机制：

```
任务创建并通过权益校验
   ↓
预占 1 个配额（Reserve）
   ↓
执行下载
   ↓
┌── Completed → 预占转永久扣减（Commit）
├── Failed   → 自动返还预占（Release）
├── Canceled → 自动返还预占
└── Retry    → 不重复预占（属于同一任务延续）
```

**特殊扣减规则**：

| 场景 | 扣点 |
| --- | --- |
| netflix_mode 站点下载 | 1 点 |
| ytdlp_mode 非 YouTube 下载 | 1 点 |
| ytdlp_mode YouTube ≥ 720p 或纯音频 | 1 点 |
| ytdlp_mode YouTube < 720p + 关 Turbo（仅官网 / Edge） | `0` 点 |
| Error 330（Netflix Trial 受限内容） | 不扣次 |

---

## 四、账号与设备授权

| 维度 | 规则 |
| --- | --- |
| 设备授权配额 | 默认每账号 `1` 台计算机 |
| 超额授权 | `Authorization Limit Reached`，下载功能锁定，无法创建新任务 |
| 解绑入口 | 插件端不提供直接解绑；跳转 Member Center 处理 |
| 重置规则 | Member Center 提供每年有限次数的 `Deauthorize All` |

---

## 五、登录中断后的业务规则

详见 [10_detection_modes.md § 六](10_detection_modes.md#六登录中断规则)。摘要：

| 区域 | 行为 |
| --- | --- |
| Detected | 停止检测 + 清空 |
| Downloading | 继续 |
| Pending | 不启动 |
| Failed | 禁止重试，引导登录 |
| Downloaded | 保留 |

---

## 六、订阅状态与阻断提示

| 状态 | 表现 | 文案 |
| --- | --- | --- |
| 订阅过期 | 回退到试用结束状态，仅保留 Always Free 权益 | `Subscription Expired`，引导续费 |
| 订阅有效但当日额度为 0 | 允许继续分析，点击下载触发全局弹窗 | `You've reached today's download limit (100). Downloads will be available again tomorrow.` 按钮 `Got it` |
| Trial 次数耗尽 | 点击下载触发全局弹窗 | `Free Trial Completed`，引导升级 |

### 订阅权益说明（弹窗 / Dashboard 共用）

- Access to all features
- High speed batch processing
- Lossless video quality
- Professional technical support
- Lossless audio quality
- Free updates within period of validity

---

## 七、退款与异常补偿

- 非成功结束状态（Failed / Canceled）自动返还预占配额
- 系统故障导致返还异常时，用户联系客服人工补发
- 订阅退款遵循 StreamFab 官网标准退款政策，插件端不处理

---

## 八、数据上报

- 插件侧上报逻辑沿用产品线通用方案
- 通过插件 id 区分统计对象
- 特殊错误码（如 Netflix `Error 330`）需保留可检索性

---

## 插件差异落位

- 单插件特殊价格、特殊套餐、特殊权益写入插件 `plugin_differences.md` 和 `requirements/plugin_requirement.md`。
- 模式差异、Trial / Premium 扣减细节同步参见 [10_detection_modes.md](10_detection_modes.md)。
