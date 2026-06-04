# [StreamFab 浏览器插件] - [需求文档] - 商店评价引导需求

## 文档信息

| 项目 | 内容 |
| --- | --- |
| 文档类型 | 需求文档 |
| 需求模式 | B：独立功能 |
| 试点插件 | StreamFab Video Downloader for Browser |
| 适用渠道 | Chrome Web Store 版本、Microsoft Edge Add-ons 版本、主站离线包、独立站离线包 |
| 当前版本 | v0.2 |
| 日期 | 2026-06-03 |
| 目标读者 | 产品、设计、客户端开发、测试 |

## 1. 业务背景与目标

Chrome 插件矩阵分析显示，当前多个插件存在评分资产不足的问题。Video 插件是通用多站点下载器，也是 ytdlp_mode 的基线样例，已上线且具备较明确的用户规模基础。本期评价引导先在 Video 插件的 4 个分发渠道中试点：Chrome Web Store 版本、Microsoft Edge Add-ons 版本、主站离线包、独立站离线包，不全量铺到所有插件。

Video 插件的核心价值链路是：用户检测到可下载视频，发起下载，并在 Downloads / Downloaded 区域看到任务成功完成。评价引导必须放在用户完成核心价值闭环之后，而不是安装后、检测后或下载开始时。

### 1.1 目标用户

已通过 Chrome Web Store、Microsoft Edge Add-ons、主站离线包或独立站离线包安装 StreamFab Video Downloader for Browser，并在包含评价引导功能的新版本中至少完成一次有效下载的用户。

### 1.2 业务目标

1. 提升 Chrome Web Store 与 Microsoft Edge Add-ons 的有效评分与评论数量；主站离线包和独立站离线包统一引导到 Chrome Web Store 评价入口。
2. 在不打断下载任务流的前提下，引导已经完成核心价值体验的用户进行评价。
3. 验证“下载完成后评价引导”是否适合作为浏览器插件产品线的通用口碑建设机制。

## 2. 现状锚定

| 文档 | 关联内容 |
| --- | --- |
| <a href="https://doc-viewer.specm8.work/s/dga9nnue" target="_blank" rel="noopener noreferrer nofollow">Chrome 插件矩阵分析</a> | 插件评分资产现状与试点优先级 |
| `Extension/README.md` | 浏览器扩展产品线支持 Chrome 和 Edge，采用浏览器扩展 + CoApp 本地服务架构 |
| `Extension/streamfab_video_downloader_for_browser/README.md` | Video 插件支持 Popup + Sidebar 双模式 |
| `Extension/streamfab_video_downloader_for_browser/diff_summary.md` | Video 是 ytdlp_mode 活样例，主结构为 Detected / Downloads |
| `Extension/_common/references/baselines/ytdlp_mode.md` | 任务状态包含 Pending、Downloading、Completed、Failed、Canceled；Completed 后进入 Downloaded 分组 |
| `Extension/_common/references/user_flows.md` | 下载成功后进入 Completed / Downloaded，并给出下载完成反馈 |
| `Extension/_common/references/ux_patterns.md` | Downloads 页负责查看和管理下载任务，状态反馈应清楚区分成功、失败和等待 |

### 2.1 既有界面约束

Downloaded 列表右侧 hover action 已承载文件级操作：`Open Folder` 和关闭 / 删除。评价入口不得进入单条 downloaded item 右侧，避免用户把插件级评价理解成文件级操作。

## 3. 需求概述

用户首次完成有效下载后，在 Downloads 区域顶部展示一次标准态评价提示条。提示条固定展示在 `Downloads` tab 下方、`Downloading` 分组上方。

该提示条属于插件级反馈入口。它不改变 downloaded item 结构，不占用 item 右侧 hover action，不影响 `Open Folder` 和关闭 / 删除操作。点击 `Rate Us` 后，客户端按当前安装渠道打开对应商店的官方评价入口。

### 3.1 界面示意

<!-- colwidth:50.06%,49.94% -->
| 原型 / 截图 | 说明 |
| --- | --- |
| ![rating_downloads_full.png](https://doc-img.dvdfab.me/assets/2026/06/img/1780471904447-50fa14c8f3f5.png) | 在 `Downloads` tab 下方、`Downloading` 分组上方 |

### 3.2 展示规则

<!-- colwidth:11.47%,88.53% -->
| 项目 | 规则 |
| --- | --- |
| 展示形态 | 仅使用标准态提示条 |
| 高度 | 32-36px（建议，以设计稿为准） |
| 文案 | 标准态文案，单行展示；宽度不足时文本省略 |
| 操作 | `Rate Us` / `Close` |
| 空间处理 | 不切换到其他位置，不改为行内 icon，不改为弹窗；列表内容向下顺延，由现有滚动容器承接 |

## 4. 流程与状态

本需求涉及下载完成后的提示展示、用户点击、关闭和抑制分支，因此需要明确主流程和异常流程。

```
flowchart TD
  A["用户发起下载"] --> B["任务进入 Downloads"]
  B --> C{"任务结果"}
  C -->|"Completed"| D["进入 Downloaded 分组"]
  C -->|"Failed / Canceled / Blocked"| X["不触发评价引导"]
  D --> E{"是否满足评价引导条件"}
  E -->|"是"| F["Downloads tab 下方展示标准态评价提示条"]
  E -->|"否"| G["不展示"]
  F --> H{"用户操作"}
  H -->|"Rate Us"| I["打开当前渠道对应评价入口并记录已点击"]
  H -->|"Close"| J["关闭提示并记录本次活动已展示"]
  H -->|"无操作关闭插件"| K["保持已展示状态，本次活动不再展示"]
```

## 5. 详细规则

### 5.1 触发条件

评价引导必须同时满足以下条件：

| 条件 | 规则 |
| --- | --- |
| 功能版本 | 当前版本包含评价引导功能 |
| 分发渠道 | Chrome Web Store 版本、Microsoft Edge Add-ons 版本、主站离线包或独立站离线包 |
| 评价链接 | 当前分发渠道已配置对应评价入口链接 |
| 下载结果 | 用户成功完成一次下载，任务进入 `Completed`，文件写入成功且校验通过 |
| 评价活动状态 | 当前评价活动尚未展示过评价引导 |
| 用户点击状态 | 用户未点击过评价入口 |
| 展示位置 | 用户当前可见或进入 `Downloaded` 分组 |

### 5.1.1 触发时机

用户升级到包含评价引导功能的新版本后，首次成功下载完成时展示评价引导。

### 5.1.2 存量用户处理

由于历史版本中不存在评价引导功能，所有升级到新版本的老用户均可参与本次评价引导。

存量用户触发逻辑：

1. 用户从旧版本升级到包含评价引导功能的新版本。
2. 用户完成一次成功下载。
3. 系统展示评价引导。

无需额外判断：

- 历史下载次数。
- 使用时长。
- 安装时间。

新装用户与升级用户统一按照“包含评价引导功能版本中的首次成功下载”进行触发。

### 5.2 频控规则

本次评价引导采用“一次性触达”策略。每位用户在当前评价活动内最多展示一次；不做 3 天冷却，不进行重复提醒，不根据后续下载次数再次触发。这样可以降低打扰，避免下载完成后反复出现评价提示。

| 用户操作 | 后续规则 |
| --- | --- |
| 提示条完成展示 | 记录当前评价活动已展示；后续不再因成功下载重复展示 |
| 点击 `Rate Us` | 打开当前渠道对应评价入口，记录用户已点击评价入口；后续不再展示 |
| 点击 `Close` | 关闭评价引导，记录当前评价活动已展示；后续不再展示 |
| 无操作关闭插件 | 保持当前评价活动已展示状态；后续不再展示 |
| 完成批量下载 | 只计为 1 次成功体验，不按文件数量重复触发 |

### 5.2.1 用户操作逻辑

本需求只定义用户操作后的业务结果，不限定客户端本地存储字段名。

Rate Us

用户点击 `Rate Us` 后：

1. 跳转当前渠道对应评价入口。
2. 记录用户已点击评价入口。
3. 后续不再展示评价引导。

Close

用户点击 `Close` 后：

1. 关闭评价引导。
2. 标记本次评价活动已展示。
3. 后续不再展示评价引导。

### 5.3 文案

Chrome 与 Edge 主文案一致，仅 tooltip 中的商店名称按渠道区分。

| 渠道 | 文案 | 按钮 | Tooltip |
| --- | --- | --- | --- |
| Chrome Web Store/主站离线包/独立站离线包 | `Download completed. Enjoying the Extension?` | `Rate Us` / `Close` | `Rate StreamFab Video Downloader on Chrome Web Store` |
| Microsoft Edge Add-ons | `Download completed. Enjoying the Extension?` | `Rate Us` / `Close` | `Rate StreamFab Video Downloader on Microsoft Edge Add-ons` |

### 5.5 评价链接

评价入口按当前安装渠道打开对应官方商店链接。

<!-- colwidth:22.94%,38.23%,38.83% -->
| 渠道 | 官方链接 | 要求 |
| --- | --- | --- |
| Chrome Web Store/主站离线包/独立站离线包 | <a href="https://chromewebstore.google.com/detail/streamfab-video-downloade/pmblmkemjdeicgahfkiogdkhjhefhhea/reviews?hl=en-US&amp;utm_source=ext_sidebar" target="_blank" rel="noopener noreferrer nofollow">StreamFab Video Downloader</a> | 打开 Chrome Web Store 评价页 |
| Microsoft Edge Add-ons | <a href="https://microsoftedge.microsoft.com/addons/detail/streamfab-video-downloade/bgfbcbkjjndjeamckkakgkiphdhlmbip" target="_blank" rel="noopener noreferrer nofollow">StreamFab Video Downloader - Microsoft Edge Add-ons</a> | 打开 Microsoft Edge Add-ons 详情页；edge 无直达评价链接 |

### 5.6 影响范围

| 模块 | 影响 |
| --- | --- |
| Detected | 无影响，不新增入口 |
| Downloads / Downloading | 无影响，不在下载中任务上展示 |
| Downloaded | 新增分组级标准态提示条，不修改单条 item hover action |
| Popup | 固定在 `Downloads` tab 下方、`Downloading` 分组上方展示标准态提示条；宽度不足时文案单行省略 |
| Sidebar | 固定在 `Downloads` tab 下方、`Downloading` 分组上方展示标准态提示条 |

## 6. 数据上报

只定义需要关注的上报信息，不限定埋点事件名、字段名或参数结构。具体上报参数由研发结合现有数据规范补充到下表空白列中。

| 关注信息 | 说明 | 上报参数（研发填写） |
| --- | --- | --- |
| 各分发渠道的评价提示触发与展示情况 | 需区分 Chrome Web Store、Microsoft Edge Add-ons、主站离线包、独立站离线包，统计实际展示次数和用户点击情况 |  |
| `Rate Us` 点击情况 | 需按渠道统计用户点击 `Rate Us` 的次数和点击率，用于判断评价入口转化 |  |
| `Close` 点击情况 | 需按渠道统计用户点击 `Close` 的次数和关闭率，用于判断打扰程度 |  |
| 满足成功下载但未展示的情况 | 需记录未展示原因，例如本次评价活动已展示过、用户已点击过评价入口、当前版本不包含评价功能、评价链接缺失等 |  |

## 7. 验收标准

### 7.1 功能验收

| 编号 | 验收标准 |
| --- | --- |
| AC01 | Chrome Web Store、Microsoft Edge Add-ons、主站离线包、独立站离线包用户升级或安装包含评价引导功能的版本后，首次成功下载完成时可看到标准态评价提示条 |
| AC02 | 提示条展示在 `Downloads` tab 下方、`Downloading` 分组上方 |
| AC03 | 下载失败、取消、配额阻断、CoApp 异常、DRM 限制、Chrome 商店版 YouTube 限制场景不展示评价提示 |
| AC04 | 单条 downloaded item 的 hover action 保持为 `Open Folder` 和关闭 / 删除，不新增评价 icon |
| AC05 | Chrome Web Store 版本点击 `Rate Us` 后打开 Chrome Web Store 评价页，并记录用户已点击评价入口 |
| AC06 | Microsoft Edge Add-ons 版本点击 `Rate Us` 后打开 Microsoft Edge Add-ons 详情页，并记录用户已点击评价入口 |
| AC07 | 主站离线包和独立站离线包点击 `Rate Us` 后打开 Chrome Web Store 评价页，并记录用户已点击评价入口 |
| AC08 | 点击 `Close` 后关闭提示并记录当前评价活动已展示，当前评价活动后续不再展示 |
| AC09 | 用户已展示过评价引导或已点击过评价入口时，成功下载后不再展示评价引导 |
| AC10 | 历史下载次数、使用时长、安装时间不参与本次触发判断；存量用户升级后按新版本首次成功下载触发 |
| AC11 | 批量下载只触发一次评价资格，不按文件数量重复展示 |
| AC12 | Popup 宽度不足时仍在 `Downloads` tab 下方、`Downloading` 分组上方展示标准态提示条，文案单行省略；不得切换位置、改为其他形态或改为弹窗 |

### 7.2 数据验收

| 编号 | 验收标准 |
| --- | --- |
| AC13 | 评价提示的展示、`Rate Us` 点击、`Close` 点击、未展示原因均有上报 |
| AC14 | 可按分发渠道统计提示触发 / 展示次数、`Rate Us` 点击次数、`Close` 点击次数与未展示原因 |
| AC15 | 可对比上线前后 Chrome Web Store 与 Microsoft Edge Add-ons 评分数量和评分变化 |
| AC16 | 可监控提示上线后下载完成率、任务取消率、插件卸载量是否异常变化 |

## 8. Facts / Assumptions / Open Questions

### Facts

- Video 插件支持 Popup + Sidebar 双模式，主结构为 `Detected / Downloads`。
- ytdlp_mode 下任务状态包含 `Pending`、`Downloading`、`Completed`、`Failed`、`Canceled`。
- 任务 `Completed` 后进入 Downloaded 分组，并提供 `Open Folder` 等操作。
- 当前 downloaded item 右侧 hover action 已承载文件级操作，不适合新增评价 icon。
- 本期评价引导覆盖 Chrome Web Store、Microsoft Edge Add-ons、主站离线包、独立站离线包 4 个分发渠道。
- Chrome 与 Edge 的官方评价 / 详情链接已补充。
- 主站离线包和独立站离线包统一引导到 Chrome Web Store 评价入口。
- 历史版本中不存在评价引导功能，升级到包含评价引导功能的新版本后，老用户可按新版本首次成功下载触发。

### Assumptions

- 客户端可以识别当前安装渠道，并按渠道读取对应评价入口。
- 客户端可以记录本次评价活动是否已展示、用户是否已点击评价入口等本地频控状态，具体存储方式由研发确定。
- `Downloads` tab 下方、`Downloading` 分组上方可以容纳一个 32-36px 的标准态轻量提示条；宽度不足时文案单行省略，位置不变。
- 评价提示条可复用现有通知 / close 视觉规范，但不使用阻断弹窗。

### Open Questions

无阻断本期交付的问题。

非阻断后续项：如后续产品线建立新的评价活动，可重新定义活动边界和频控范围；不影响本期一次性触达策略上线。

## 9. Handoff

### 给 user-story-generator

- Epic：下载成功后的商店评价引导。
- 模块边界：仅影响 Downloads / Downloaded 展示层、评价引导本地频控、4 个分发渠道的评价链接跳转和关键行为上报。
- 核心价值：在用户完成下载价值闭环后，以低打扰方式补充商店评分资产。

### 给 bdd-spec-analyzer

- 主状态：未具备资格、具备资格、已展示不再触达、已点击 Rate Us 不再触达。
- 异常流：失败 / 取消 / CoApp 异常 / 配额阻断 / DRM / Chrome 商店版 YouTube 限制 / 批量任务部分完成。
- AC 编号：使用本文件 `7. 验收标准` 中 AC01-AC16。

### 给 api-spec-writer

- 本地频控：需要支持“本次评价活动已展示”和“用户已点击评价入口”两类状态；具体存储方式由研发确定。
- 数据上报：需要覆盖提示触发 / 展示、`Rate Us` 点击、`Close` 点击、未展示原因，并支持按分发渠道统计；具体上报参数由研发填写。
- 渠道链接配置：Chrome Web Store / 主站离线包 / 独立站离线包使用 Chrome Web Store 评价页链接，Microsoft Edge Add-ons 使用 Edge 详情页链接。