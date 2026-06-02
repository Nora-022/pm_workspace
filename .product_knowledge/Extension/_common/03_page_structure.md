# 03 页面结构（Page Structure）

## 页面清单

| 页面 / 表面 | 职责 |
| --- | --- |
| Popup Runtime UI | 即时任务流：检测、配置、下载、查看任务 |
| Detected | 视频发现和资源级下载配置 |
| Downloads | 下载队列、进度、结果和失败任务管理 |
| Playlist Selector | Season / Episode / 附属内容选择 |
| Dashboard | License Info 和 Setting 的独立管理页 |
| Notification | 下载成功 / 失败的轻量结果反馈 |
| Blocking Modal | 试用、订阅、授权、强决策阻断 |
| CoApp Install Flow | CoApp 安装、更新、卸载、启动等依赖流程 |

## Popup 主结构

运行时界面固定四段：

1. `Header`：用户身份、授权状态、剩余次数、升级入口、Dashboard 入口。
2. `Tab Bar`：固定 `Detected` / `Downloads` 两个 tab。
3. `Content Area`：承载当前 tab 主内容。
4. `Footer`：设置入口、速度或次级状态信息。

## Detected 页面

- 默认展示缩略图、标题、时长、格式或清晰度 tag。
- 点击列表项进入展开态，展示当前视频下载配置。
- 同一时刻只允许一个列表项展开。
- Playlist / 剧集内容提供 `Select Episodes` 入口。
- 文件大小、bitrate 等可变 tag 只有真实值可用时显示。

## Downloads 页面

- 展示 Pending、Downloading、Completed、Failed、Canceled 等任务状态。
- 已开始的任务不继续停留在 Detected 作为主操作对象。
- Playlist 可按 Season 或任务组展示 `Total / Finish / Failed`。

## Dashboard 页面

Dashboard 是独立页面，不是 Popup 折叠区。一级导航固定为：

- `License Info`
- `Setting`

License Info 承载订阅身份、到期信息、权益说明和官网导流。Setting 承载全局配置，并采用实时保存。

## 详细来源

- [12_ui_ux_visual_layout_specs.md](12_ui_ux_visual_layout_specs.md)
