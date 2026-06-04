# Prototype State Matrix

| Area | State | Preview | Expected behavior |
| --- | --- | --- | --- |
| Detected | Data | `/` | 显示 5 个 detected resources、Select All、Found count、Download 按钮。 |
| Detected | Hover | `/#hover` | 第一条资源展示 Settings / Remove hover 操作。 |
| Detected | Expand | `/#expand` | 第一条资源展开 Resolution、Language、Subtitles、本地 Select Episodes 配置。 |
| Detected | Remove | UI interaction | 删除资源后列表数量、badge、Selected 数量同步更新。 |
| Detected | Download selected | UI interaction | 已开始下载的资源移入 Downloads，不继续作为 Detected 主操作项展示。 |
| Downloads | Pending | `/#downloads` | 展示 Pending 任务组。 |
| Downloads | Downloading | `/#downloads` | 展示下载进度、速度和 Turbo-Speed 状态。 |
| Downloads | Completed | `/#downloads` | 展示 Downloaded 任务和一次性 review prompt。 |
| Downloads | Failed | `/#downloads` | 展示失败任务和错误说明。 |
| Downloads | Canceled | `/#downloads` | 展示取消任务。 |
| Dashboard | Setting | `/#setting` | 独立 Dashboard 页面，不放入 Runtime tab 内容区。 |
| Dashboard | License Info | `/#license` | 独立 Dashboard 页面，不放入 Runtime tab 内容区。 |
