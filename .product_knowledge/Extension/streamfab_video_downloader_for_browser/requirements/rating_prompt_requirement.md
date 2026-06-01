# [StreamFab 浏览器插件] - [需求文档] - 商店评价引导

## 文档信息

| 项目 | 内容 |
| --- | --- |
| 文档类型 | 需求文档 |
| 试点插件 | StreamFab Video Downloader for Browser |
| 适用渠道 | Chrome Web Store 版本 |
| 当前版本 | v0.1 |
| 日期 | 2026-05-29 |
| 目标读者 | 产品、设计、客户端开发、测试 |

## 1. 背景与目标

### 1.1 背景

Chrome 插件矩阵分析显示，当前多个插件存在评分资产不足的问题。Video 插件是通用多站点下载器，也是 ytdlp_mode 的基线样例，已上线且具备较明确的用户规模基础。因此，评价引导不应先全量铺到所有插件，而应先在 Video 插件中试点，验证触发时机、用户接受度、界面干扰和评分资产提升效果。

数据分析文档：[https://doc-viewer.specm8.work/s/dga9nnue](https://doc-viewer.specm8.work/s/dga9nnue)

Video 插件的核心价值链路是：用户检测到可下载视频，发起下载，并在 Downloads / Downloaded 区域看到任务成功完成。评价引导应放在用户完成核心价值闭环之后，而不是安装后、检测后或下载开始时。

### 1.2 为什么先做 Video 试点

| 原因 | 说明 |
| --- | --- |
| 用户规模具备基础 | Video / Ytdlp 是当前 Chrome 插件矩阵中 WAU 最高的插件，具备更高的评价样本转化潜力 |
| 任务闭环明确 | 下载完成是清晰、可识别、用户感知强的成功节点 |
| 模式可复用 | Video 是 ytdlp_mode 基线样例，试点结果可沉淀为后续 M3U8、TVer 等插件的共用规则 |
| 风险可控 | 先在单插件验证频控、文案和转化效果，避免全矩阵一次性上线带来打扰或差评风险 |

### 1.3 业务目标

1. 提升 Chrome Web Store 有效评分与评论数量。
2. 在不打断下载任务流的前提下，引导已经完成核心价值体验的用户进行评价。
3. 验证“下载完成后评价引导”是否适合作为浏览器插件产品线的通用口碑建设机制。

### 1.4 不做范围

| 不做项 | 原因 |
| --- | --- |
| 不做奖励换评价 | Chrome Web Store 政策禁止通过激励方式操纵评分、评论或安装量 |
| 不要求 5 星评价 | 避免评分操纵和误导用户 |
| 不在失败场景触发 | 下载失败、CoApp 异常、配额阻断等场景不适合引导评价 |
| 不在单条下载记录右侧新增 icon | 会破坏 Downloaded item 的文件操作语义 |
| 不做全插件同步上线 | 先通过 Video 试点验证效果和干扰程度 |

## 2. 现状锁定

### 2.1 已引用知识文件

| 文件 | 关键事实 |
| --- | --- |
| `Extension/streamfab_video_downloader_for_browser/README.md` | Video 插件是通用多站点下载插件，支持 Popup + Sidebar 双模式 |
| `Extension/streamfab_video_downloader_for_browser/diff_summary.md` | Video 是 ytdlp_mode 活样例，主结构为 Detected / Downloads |
| `Extension/_common/references/baselines/ytdlp_mode.md` | 任务状态包含 Pending、Downloading、Completed、Failed、Canceled；Completed 后进入 Downloaded 分组 |
| `Extension/_common/references/user_flows.md` | 下载成功后进入 Completed / Downloaded，并给出下载完成反馈 |
| `Extension/_common/references/ux_patterns.md` | Downloads 页负责查看和管理下载任务，状态反馈应清楚区分成功、失败和等待 |
| `chrome_store_plugin_matrix_analysis_report.md` | 当前插件矩阵评分资产不足，Ytdlp / Video 是核心活跃资产 |

### 2.2 当前界面约束

Downloaded 列表右侧 hover action 已承载文件级操作：`Open Folder` 和关闭 / 删除。该区域不适合加入评价入口，原因如下：

| 约束 | 影响 |
| --- | --- |
| 单条 item 右侧空间有限 | 只能容纳少量文件操作 icon，新增评价 icon 会造成拥挤 |
| 右侧 icon 已形成文件级语义 | 用户会把新增 icon 理解为该文件的操作，而不是插件整体评价 |
| 只给第一条完成记录加 icon 会破坏一致性 | 同一列表内不同 item 行为不一致，容易造成理解成本 |
| 下载完成后用户仍可能继续操作文件 | 评价引导不应抢占打开文件夹、删除记录等主要操作 |

## 3. 方案概述

### 3.1 推荐方案

在用户首次成功下载后，在 `Downloaded` 分组顶部展示一次轻量评价提示条。提示条位于 `Downloaded (n)` 标题下方、第一条下载记录上方，不进入单条下载记录的 hover action 区。

该提示条属于插件级反馈入口，而不是文件级操作。它应保持低高度、可关闭、低频率，并且只在成功体验后出现。

### 3.2 位置选择

| 位置 | 结论 | 原因 |
| --- | --- | --- |
| Downloaded 分组标题下方 | 推荐 | 不破坏单条记录操作语义，且与下载完成结果相关 |
| 单条下载记录右侧 | 不推荐 | 与 Open Folder / Close 混在一起，会被理解为文件级操作 |
| Downloaded 标题右侧垃圾桶附近 | 不推荐 | 垃圾桶是列表清理语义，评价入口放在这里不自然 |
| 下载完成系统通知 | 不推荐 | 侵入感较强，不适合承载商店评价动作 |
| 全局 modal 弹窗 | 不推荐 | 打断用户继续下载或打开文件 |
| Dashboard / Setting 底部 | 可作为长期入口 | 适合提供常驻反馈入口，但不适合作为首次主动引导主入口 |

### 3.3 低空间兜底方案

如果 Popup 高度不足，提示条允许采用更轻的 compact 形态：

| 形态 | 使用条件 | 展示内容 |
| --- | --- | --- |
| 标准提示条 | Sidebar 或 Popup 空间充足 | 一行文案 + `Rate` + `Not now` / 关闭 |
| 紧凑提示条 | Popup 空间有限 | `Enjoying StreamFab?` + `Rate` + 关闭 |
| 延后展示 | 当前 Downloads 列表空间不足或用户正在 hover item | 用户下次进入 Downloads / Downloaded 时再展示 |

不允许把紧凑形态降级为单条 item 上的独立 icon。

## 4. 用户流程

```
flowchart TD
  A["用户发起下载"] --> B["任务进入 Downloads"]
  B --> C{"任务结果"}
  C -->|"Completed"| D["进入 Downloaded 分组"]
  C -->|"Failed / Canceled / Blocked"| X["不触发评价引导"]
  D --> E{"是否满足评价引导条件"}
  E -->|"是"| F["Downloaded 顶部展示评价提示条"]
  E -->|"否"| G["不展示"]
  F --> H{"用户操作"}
  H -->|"Rate"| I["打开 Chrome Web Store 评价页"]
  H -->|"Not now / Close"| J["记录冷却期"]
  H -->|"无操作"| K["本次会话保留或随页面关闭消失"]
```

## 5. 触发逻辑

### 5.1 触发条件

评价引导必须同时满足以下条件：

| 条件 | 规则 |
| --- | --- |
| 渠道 | Chrome Web Store、Edge Addon |
| 任务状态 | 至少 1 个任务进入 `Completed` |
| 成功类型 | 文件写入成功且校验通过 |
| 用户状态 | 用户未主动点击过 `Rate` |
| 冷却状态 | 用户未处于关闭后的冷却期 |
| 展示位置 | 用户当前可见或进入 `Downloaded` 分组 |

### 5.2 不触发条件

以下场景不得触发评价引导：

| 场景 | 原因 |
| --- | --- |
| 下载失败 | 用户处于负面体验，不适合引导商店评价 |
| 用户取消下载 | 未完成核心价值闭环 |
| CoApp 未连接或更新失败 | 问题尚未解决，优先给出修复引导 |
| 配额耗尽或订阅过期 | 用户处于权益阻断场景 |
| DRM / YouTube Chrome 限制 | 产品能力边界明确，不适合引导评价 |
| 当前正在 hover 下载记录 | 避免与 `Open Folder` / `Close` 操作竞争注意力 |
| 批量任务中仅部分完成 | 等待批量任务结束后按一次成功体验处理 |

### 5.3 频控规则

| 用户操作 | 后续规则 |
| --- | --- |
| 点击 `Rate` | 永久不再主动展示评价提示 |
| 点击关闭或 `Not now` | 14 天内不再展示 |
| 无操作关闭插件 | 下次满足条件时可继续展示，但同一自然日最多展示 1 次 |
| 完成批量下载 | 只计为 1 次成功体验，不按文件数量重复触发 |

## 6. 界面影响

### 6.1 Downloaded 分组

在 `Downloaded (n)` 标题下方增加评价提示条。提示条不改变下载记录 item 的结构，不占用 item 右侧 hover action，不影响 `Open Folder` 和关闭 / 删除操作。

建议布局：

| 元素 | 规则 |
| --- | --- |
| 高度 | 标准态 32-36px；紧凑态不超过 28px |
| 位置 | Downloaded 标题下方，第一条记录上方 |
| 文案 | 一行展示，超出省略 |
| 操作 | `Rate` 作为文字按钮；关闭按钮使用现有 close 样式 |
| 样式 | 低强调，不使用强弹窗、不使用动画抢注意力 |

### 6.2 文案建议

推荐文案使用中性表达，不引导用户给好评。

| 场景 | 文案 | 按钮 |
| --- | --- | --- |
| 标准态 | `Download completed. Share your feedback?` | `Rate` / `Not now` |
| 紧凑态 |  | `Rate` / close |
| Tooltip | `Rate StreamFab Video Downloader on Chrome Web Store` | - |

### 6.3 对既有界面的影响

| 模块 | 影响 |
| --- | --- |
| Detected | 无影响，不新增入口 |
| Downloads / Downloading | 无影响，不在下载中任务上展示 |
| Downloaded | 新增分组级提示条，不修改单条 item hover action |
| Popup | 支持紧凑提示条或延后展示 |
| Sidebar | 支持标准提示条 |
| Dashboard / Setting | 可增加常驻 `Rate on Chrome Web Store` 入口，作为后续扩展，不属于本期主动引导 |

## 7. 状态与数据规则

### 7.1 本地状态

客户端需记录以下本地状态，用于频控和避免重复打扰：

| 字段 | 含义 |
| --- | --- |
| `rating_prompt_eligible` | 是否已完成首次成功下载，具备展示资格 |
| `rating_prompt_last_shown_at` | 上次展示时间 |
| `rating_prompt_dismissed_at` | 用户关闭或 Not now 时间 |
| `rating_prompt_rated_at` | 用户点击 Rate 时间 |
| `rating_prompt_show_count` | 累计展示次数 |

### 7.2 事件埋点

| Event | Trigger | Params |
| --- | --- | --- |
| `rating_prompt_eligible` | 首个任务进入 Completed | `channel`、`task_type`、`is_batch` |
| `rating_prompt_show` | 提示条展示 | `surface`、`layout`、`download_count` |
| `rating_prompt_click_rate` | 点击 Rate | `surface`、`layout`、`days_since_install` |
| `rating_prompt_dismiss` | 点击关闭或 Not now | `surface`、`reason` |
| `rating_prompt_suppressed` | 满足下载完成但未展示 | `reason`、`channel` |

### 7.3 评价链接

Chrome Web Store：[https://chromewebstore.google.com/detail/streamfab-video-downloade/pmblmkemjdeicgahfkiogdkhjhefhhea?hl=en-US&utm_source=ext_sidebar](https://chromewebstore.google.com/detail/streamfab-video-downloade/pmblmkemjdeicgahfkiogdkhjhefhhea?hl=en-US&utm_source=ext_sidebar)

Edge Addon: [StreamFab Video Downloader - Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/streamfab-video-downloade/bgfbcbkjjndjeamckkakgkiphdhlmbip)

## 8. 合规与策略边界

Chrome Web Store 政策要求开发者不得通过非法或激励方式操纵评分、评论或安装量，也不得使用误导性内容影响用户判断。评价引导必须遵守以下规则：

| 规则 | 要求 |
| --- | --- |
| 不激励 | 不提供折扣、权益、下载次数、功能解锁等奖励 |
| 不诱导五星 | 不出现“5 stars”“good review”等定向表达 |
| 不阻断任务 | 不用 modal 阻断用户继续使用 |
| 不筛选正负反馈 | 不根据用户选择好评/差评决定是否跳商店 |
| 不伪装成系统通知 | 不使用系统级警告或误导式 UI |
| 不夸大商店表现 | 不使用“官方推荐”“排名第一”等无依据表达 |

参考来源：Chrome Web Store Program Policies 对评分 / 评论操纵、误导性行为、通知滥用和扩展质量均有明确限制。

## 9. 验收标准

### 9.1 功能验收

| 编号 | 验收标准 |
| --- | --- |
| AC01 | 用户首次完成下载后，进入或停留在 Downloaded 分组时可看到评价提示条 |
| AC02 | 下载失败、取消、配额阻断、CoApp 异常、DRM 限制、YouTube Chrome 限制场景不展示评价提示 |
| AC03 | 提示条展示在 Downloaded 分组顶部，不出现在单条下载记录右侧 |
| AC04 | 单条 downloaded item 的 hover action 保持为 `Open Folder` 和关闭 / 删除，不新增评价 icon |
| AC05 | 点击 `Rate` 后打开 Chrome Web Store 对应插件评价入口，并永久不再主动展示提示 |
| AC06 | 点击关闭或 `Not now` 后进入 14 天冷却期 |
| AC07 | 批量下载只触发一次评价资格，不按文件数量重复展示 |
| AC08 | Popup 空间不足时使用紧凑形态或延后展示，不破坏下载列表布局 |

### 9.2 数据验收

| 编号 | 验收标准 |
| --- | --- |
| AC09 | 所有展示、点击、关闭、抑制原因均有埋点 |
| AC10 | 可按渠道、展示位置、布局形态统计展示率、点击率、关闭率 |
| AC11 | 可对比上线前后 Chrome Web Store 评分数量和评分变化 |
| AC12 | 可监控提示上线后下载完成率、任务取消率、插件卸载量是否异常变化 |

## 10. 发布与灰度

| 阶段 | 范围 | 观察重点 |
| --- | --- | --- |
| 内部验证 | 内部测试包 | UI 是否遮挡、状态是否误触发、链接是否正确 |
| 小流量灰度 | Chrome Web Store 版部分用户 | 展示率、点击率、关闭率、负反馈 |
| 扩大灰度 | Chrome Web Store 版更多用户 | 评分数量变化、卸载压力是否变化 |
| 复盘决策 | Video 插件试点完成后 | 是否沉淀为 ytdlp_mode 通用规则 |

## 11. Facts / Assumptions / Open Questions

### Facts

- Video 插件支持 Popup + Sidebar 双模式，主结构为 `Detected / Downloads`。
- ytdlp_mode 下任务状态包含 `Pending`、`Downloading`、`Completed`、`Failed`、`Canceled`。
- 任务 `Completed` 后进入 Downloaded 分组，并提供 `Open Folder` 等操作。
- 当前 downloaded item 右侧 hover action 已承载文件级操作，不适合新增评价 icon。
- Chrome Web Store 政策禁止通过激励、欺骗或操纵方式影响评分和评论。

### Assumptions

- Chrome Web Store 版本可以识别当前渠道并生成对应评价入口。
- 客户端可以记录本地频控状态。
- Downloaded 分组标题下方可以容纳一个 28-36px 的轻量提示条；空间不足时允许延后展示。
- 评价提示条可复用现有通知 / close 视觉规范，但不使用阻断弹窗。

### Open Questions

1. Chrome Web Store 评价页是否有稳定的 review 深链，还是只能跳转到插件详情页。
2. 14 天冷却期是否需要与其他营销提示共享频控池。
3. Dashboard / Setting 是否需要同步增加常驻评价入口，作为本期还是后续需求。

## 12. 风险与应对

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| 用户认为提示打扰 | 可能增加关闭率或负反馈 | 低频展示、可关闭、不使用弹窗 |
| 被理解为诱导评价 | 可能产生合规风险 | 使用中性文案，不要求好评，不提供奖励 |
| 下载列表空间不足 | 影响 Downloads 可读性 | 使用紧凑形态或延后展示 |
| 评价入口与文件操作混淆 | 用户误操作 | 不放在单条 item hover action 内 |
| 负面体验用户被引导评价 | 差评风险上升 | 仅 Completed 后触发，失败和阻断场景不触发 |

## 13. Handoff

### 给设计

- 输出 Downloaded 分组顶部提示条的标准态和紧凑态。
- 明确 Popup 与 Sidebar 下的高度、间距、关闭按钮和文字按钮样式。
- 不改动单条 downloaded item 的 hover action。

### 给客户端开发

- 在任务进入 `Completed` 后写入评价引导资格状态。
- 在 Downloaded 分组渲染时判断展示条件与频控。
- 接入 Chrome Web Store 评价入口。
- 增加展示、点击、关闭、抑制原因埋点。

### 给测试

- 覆盖 Completed、Failed、Canceled、CoApp 异常、配额阻断、DRM 限制、YouTube Chrome 限制、批量下载、Popup 空间不足、Sidebar 展示、关闭冷却期、点击 Rate 后不再展示等场景。