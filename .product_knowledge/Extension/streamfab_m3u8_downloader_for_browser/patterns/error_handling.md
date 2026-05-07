# 错误处理

## 场景一：页面非视频页（插件判断）

| 项 | 内容 |
|---|---|
| 触发条件 | 插件页面结构判断失败 |
| 展示形式 | 插件弹窗内直接显示不支持 |
| 用户操作 | 无，流程终止 |
| 是否可重试 | 否 |

## 场景二：视频不支持下载 / 分析超时（CoApp 判断）

| 项 | 内容 |
|---|---|
| 触发条件 | CoApp 返回不支持，或 20 秒超时 |
| 展示形式 | 插件弹窗内引导前往 StreamFab 客户端（不触发额外弹窗） |
| 用户操作 | 前往 StreamFab 客户端 |
| 是否可重试 | 否 |

说明：此行为是产品线通用逻辑（Netflix / Disney 等插件遇到不支持内容时同样处理）。

## 场景三：分析失败（流程中断）

| 项 | 内容 |
|---|---|
| 触发条件 | CoApp 分析过程中断，返回失败 |
| 展示形式 | Toast（展示 3s 后自动消失，支持手动关闭） |
| 文案 EN | Analysis Failed. Please retry or contact us for help. |
| 文案 ZH | 分析失败，请重试或联系我们获得帮助。 |
| Contact us | 主站 https://www.dvdfab.cn/contact.htm / 独立站 https://streamfab.com/contact.htm |
| 是否可重试 | 是 |
