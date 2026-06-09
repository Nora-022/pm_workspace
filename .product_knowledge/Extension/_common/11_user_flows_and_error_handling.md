# 11 用户流程与错误处理（User Flows And Error Handling）

> 本文件是 `_common` 编号体系下的正式 common 规则正文；`references/` 不再维护本主题的现行规则。

---

## 用户主流程基线
> 跨插件共用的主流程与异常分支。站点专属流程写入插件 `requirements/plugin_requirement.md`。
> 关联：[10_detection_modes.md](10_detection_modes.md)、[06_business_rules.md](06_business_rules.md)

---

## 一、整体心智图

```
打开插件（Popup / Sidebar 或仅 Popup）
    ↓
[前置条件检查]   ※ netflix_mode：站点 + 登录 + 播放；ytdlp_mode：登录 + CoApp 可用
    ↓
[检测流程]      ※ 非 ytdlp_mode：后台刷新 CoApp 结果；ytdlp_mode：预分析检测
    ↓
Detected 列表（视频卡片 + 下载前配置）
    ↓
用户点击 Download / Select Episodes
    ↓
[权益校验]     ※ 阻断式
    ↓
[任务创建]     ※ 同步 + 配额预占
    ↓
[环境检查]     ※ 非阻断（CoApp 连接 / 磁盘空间）
    ↓
Downloads 队列（Pending → Downloading → Completed）
```

---

## 二、主流程：单视频下载

```
1. 用户在目标站点 + 已登录 + 已播放（netflix_mode）/ 已装 CoApp（ytdlp_mode）
2. 打开插件
3. 视频出现在 Detected 列表
4. 用户选择 Codec / Resolution / Audio / Subtitle（可用配置项随插件不同）
5. 点击 Download
6. 阻断校验通过 → 任务进入 Downloads 顶部，状态 Pending
7. 槽位可用 + 环境检查通过 → Downloading（进度条 / 速度 / 剩余时间）
8. 文件写入成功 → Completed，归入 Downloaded 分组，浏览器系统通知 "Download complete"
```

---

## 三、主流程：Playlist / 剧集批量下载

```
1. Detected 视频卡片显示剧集 Icon
2. 用户点击 Select Episodes，打开二级选集弹窗
3. 弹窗结构：Season → Episode 层级（即使只有一季也保留）
4. 默认选中：Season 1 / Episode 1
5. Episode 项只展示时长，不展示文件大小
6. 用户勾选目标 Episode，统一配置下载参数
7. 点击 Download，批量创建任务
8. Playlist 任务按 Season 维度进入 Downloads（每个 Season 一个任务卡片）
```

剧集组任务卡片头部信息：`Total / Finish / Failed`，支持展开 / 折叠。

---

## 四、主流程：CoApp 引导与更新

```
1. 检测 / 下载触发 CoApp 通信
2. CoApp 不可用：
   a. 未安装 → 引导安装页（区分 Win / Mac）
   b. 已卸载 → 引导重新安装
   c. 有更新 → 提示用户更新
3. 安装 / 更新完成后回到 Detected
```

---

## 五、异常分支

| 异常 | 分支处理 |
| --- | --- |
| 非目标站点 | Detected 区显示前置引导态 |
| 未登录 | 引导登录；Login Notice 在受限页面（chrome://* 等）引导去官网登录 |
| 未播放（netflix_mode） | Detected 引导用户播放视频 |
| 非视频页 / 无视频页（非 ytdlp_mode） | 无旧结果时保持 `No videos detected`；有旧结果时保留现有视频卡片 |
| 未安装 CoApp | 引导安装 |
| CoApp 有更新 | 提示更新 |
| 站点不支持 DRM（ytdlp_mode） | `Protected Video Content`，引导桌面客户端 |
| 站点不支持非 DRM（ytdlp_mode） | `未检测到视频，请确保视频播放或刷新页面，部分网站可能不支持` |
| YouTube 限制（Chrome 商店版） | `Video on YouTube`，引导 Edge / 官网 |
| Trial 次数耗尽 | `Free Trial Completed` 阻断弹窗 |
| 订阅过期 | `Subscription Expired` 阻断弹窗 |
| 订阅当日额度满 | `You've reached today's download limit (100).` 阻断弹窗 |
| 授权上限 | `Authorization Limit Reached`，引导 Member Center 解绑 |
| 网络授权失败 | 允许手动重试 |
| 登录中断 | 见 [06_business_rules.md § 五](06_business_rules.md#五登录中断后的业务规则) |

---

## 六、状态反馈规范

| 状态 | 展示 |
| --- | --- |
| 页面空态（非 ytdlp_mode URL 变化后默认） | `No videos detected` / "暂未检测到视频"，后台静默刷新 CoApp 结果 |
| 已有结果刷新中（非 ytdlp_mode） | 保留现有视频卡片，不用主区域 loading 打断用户 |
| 加载中（ytdlp_mode） | `Detecting videos...` 动画 |
| 新增内容加载中 | 在现有结果基础上继续补充，不打断浏览 |
| 成功 | 任务状态实时变更并给出进度 |
| 失败 | 任务卡片展示错误码与可恢复动作（`Retry`） |
| 空状态 | `No videos detected` + `Force Refresh` |

---

## 七、多语言

- 基准文案：English (US)
- 展示语言：按用户设置语言显示（支持 28 种语言）
- 回退策略：当前语言包缺失时自动回退 English (US)

---

## 错误处理基线
> 跨插件共用的错误大类、UI 表现、可重试性、用户引导
> 站点专属错误码（如 Netflix `Error 330`）写入插件 `plugin_differences.md`
> 关联：[用户主流程基线](#用户主流程基线)、[06_business_rules.md](06_business_rules.md)

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
- **站点专属错误码**（如 Netflix `Error 330`、Disney+ 区域限制）：在插件 `plugin_differences.md` 单独登记，文案、可重试性、扣减规则单列
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
