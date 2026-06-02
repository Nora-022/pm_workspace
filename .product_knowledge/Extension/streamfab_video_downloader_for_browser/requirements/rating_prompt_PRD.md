# 评价引导提示 需求文档

| 项 | 内容 |
|---|---|
| 功能名称 | 评价引导提示（Rating Prompt） |
| 适用范围 | 全部 StreamFab 浏览器插件（通用能力，各插件复用同一套规则） |
| 提出人 | fab |
| 日期 | 2026-06-02 |
| 状态 | 待评审 |

---

## 1. 背景与目标

StreamFab 浏览器插件已上架 Chrome 应用商店与 Edge Add-ons，商店评分和评价数量直接影响搜索排名与新用户转化，但当前没有任何引导用户评分的入口。

目标：在用户**刚体验到核心价值（首次下载完成）**的时机，以**低打扰**的方式邀请其到对应商店评分，提升评价量，且不影响正常使用体验。

## 2. 功能概述

在 Downloads tab 内容区顶部新增一条评价引导提示。它是**内嵌单行提示条（inline banner）**，不是遮罩弹窗、不阻断操作。用户可点击 `Rate` 跳转到当前浏览器对应的应用商店评分，或点击 `×` 关闭。

## 3. 界面改动

| 截图 | 说明 |
|---|---|
| <img src="images/rating_downloads_full.png" width="300"> | **改动后 Downloads tab 全貌**。评价提示条位于内容区最顶部、`Downloading` 分组之上，固定在 tab 顶部，不随下载列表滚动下沉。其余界面（Header、Tab、Downloading/Downloaded 分组、Turbo-Speed 条、Footer）保持不变。 |
| <img src="images/rating_banner.png" width="300"> | **评价提示条细节**。暖色底单行条，左侧文案，右侧 `Rate` 主按钮 + 关闭 `×`。整体占位为一行高度，文案过长时自动换两行。 |

## 4. 交互规则

### 4.1 触发

- 当用户**首次出现 `Downloaded`（下载完成）任务**后，在 Downloads tab 顶部展示评价提示条。
- 仅在 Downloads tab 内出现，Detected tab 不展示。

### 4.2 频控（关键）

- 全生命周期**最多自然展示一次**，不在每次下载完成后重复出现。
- 用户点击 `Rate` 跳转商店后，提示条消失，且**永久不再出现**。
- 用户点击 `×` 关闭后，**永久不再出现**。
- 上述"已评分 / 已关闭"状态需本地持久化（如 storage 标记），重装或换设备前不再触发。

### 4.3 跳转（双商店自动路由）

单个 `Rate` 按钮，按当前浏览器自动跳转到对应商店详情页：

| 浏览器 | 判定 | 跳转地址 |
|---|---|---|
| Edge | UA 含 `Edg/` | `https://microsoftedge.microsoft.com/addons/detail/bgfbcbkjjndjeamckkakgkiphdhlmbip` |
| Chrome / 其他 Chromium | 默认 | `https://chromewebstore.google.com/detail/streamfab-video-downloade/pmblmkemjdeicgahfkiogdkhjhefhhea?hl=en-US&utm_source=ext_sidebar` |

跳转在新标签页打开。

## 5. 文案

| 元素 | 文案 |
|---|---|
| 提示文案 | `Enjoying StreamFab? A quick rating means a lot and helps us improve.` |
| 主按钮 | `Rate` |
| 关闭 | `×`（hover 提示 `Don't show again`） |

## 6. 边界与不做

- **不挂在下载结果通知上**：结果反馈与营销引导不混在同一表面。
- **不升级为阻断式 Modal**：评分非必须决策，不打断用户。
- **不在按钮上放单颗星**：避免误导用户打一星，评分语义由文案承载。
- Trial 配额紧张时，避免与 Header 的 `Buy Now` 升级压力叠加打扰（可降权或延后，由实现侧把握）。

## 7. 埋点建议

用于评估引导转化，建议至少记录三个事件：

- `rating_prompt_shown`：提示条曝光
- `rating_prompt_clicked`：点击 `Rate`（可带浏览器类型，区分两商店导流）
- `rating_prompt_dismissed`：点击 `×` 关闭

## 8. 验收要点

1. 无下载完成记录时，Downloads tab 顶部不出现评价条。
2. 首次出现 Downloaded 任务后，评价条在 Downloads tab 顶部展示。
3. 点击 `Rate`：Chrome 跳 Chrome 商店、Edge 跳 Edge 商店，新标签打开；提示条消失。
4. 点击 `×`：提示条消失。
5. 第 3、4 步后，再次产生下载完成任务，评价条**不再出现**。
6. 评价条为内嵌条，不遮挡、不阻断其他操作。

---

> 原型参考：同目录 `index.html`（打开后点插件图标 → 切到 Downloads tab）。
