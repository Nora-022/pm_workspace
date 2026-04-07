# 03 页面结构与布局（Page Structure）

## 1. 核心架构设计
- 检测与下载分离：
  - Detected（检测结果页）：瞬时工作区，静态展示当前 URL 上下文中可识别的视频列表。
  - Downloads（下载队列页）：持久任务区，动态管理已发起的全局下载任务。
- 状态独立：Detected 与 Downloads 状态独立，一个视频可同时存在于检测列表与下载队列。
- Origin 为单位：Detected 页面以 Origin（域名）为单位隔离；同 Origin 视频累加展示，跨 Origin 重新检测。

## 2. 页面清单
1. 插件主页（Popup / Sidebar）
2. Detected（检测结果页）
3. Downloads（下载管理页）
4. Dashboard（仪表盘：License Info / Settings）
5. CoApp 引导页（未安装时阻断）
6. Playlist 批量选择弹窗（二级弹窗）

## 3. 顶部公共区域（固定操作区）
Detected 和 Downloads 顶部共享同一布局：

- Logo：产品标识
- Dashboard 入口：跳转仪表盘
- 用户授权信息模块（ytdlp）
  - 试用用户：
    - 头像
    - 邮箱
    - 剩余试用次数
    - 试用标识：`Trial`
    - `Buy Now/Upgrade` 按钮
    - 跳转 Dashboard 按钮
  - 订阅用户：
    - 头像
    - 邮箱
    - 订阅类型：`LeftTime / Annual / Expired / Fab365`
    - 跳转 Dashboard 按钮

## 4. Detected（检测结果页）
此页面用于展示当前网页中可下载的视频资源。

- 视频列表逻辑：
  - 排序：按检测时间倒序（最新在最上）
  - 数量限制：受弹窗高度约束，超出滚动加载
- 视频卡片构成：
  - Checkbox：支持多选，默认全选
  - 缩略图：视频预览图 + 平台图标
  - 核心信息：时长、完整标题、基础规格（分辨率/编码/大小）
- 批量操作：
  - `Select All`
  - 实时计数：`X videos found` / `Selected X (Y GB)`
- 下载配置区域（可展开/收起）：
  - Video 模式：分辨率（4K HDR 到 480p）、视频编码（H.264/H.265）、字幕语言及处理方式
  - Audio 模式：音质、音频编码
  - 会话级暂存：单次会话内暂存，关闭浏览器后清除
- 特殊状态：
  - 检测中：`Detecting videos...`
  - 空状态：`No videos detected` + `Force Refresh`
  - DRM 视频：`Protected Video Content` 并引导桌面端
  - YouTube 限制（Chrome 商店版）：`Video on YouTube` 并提示不可用
  - Playlist：显示剧集 Icon，`Select Episodes` 进入批量选择弹窗

## 5. Downloads（下载管理页）
下载任务管理中枢。

- 页面结构（从上至下）：
  1. Downloading（进行中）
     - 分组标题：如 `Downloading (8)`
     - `Clear All`
     - 任务状态：
       - Downloading：进度、速度（如 `20% | 18 B/s | 150MB/500MB`）
       - Failed：错误原因 + `Retry`
     - `Turbo-Speed` 开关
     - `Total Speed`
  2. Downloaded（已完成）
     - 仅保留最近 20 条
     - 分组标题：如 `Downloaded (4)`
     - `Clear All`
     - 任务项：分辨率、大小、`Open Folder`
- 任务项操作：
  - `Cancel (×)`：取消待下载/下载中任务
  - `Retry`：重试失败任务
  - `Open Folder`：打开本地目录
  - 操作图标默认隐藏，Hover 显示
- 剧集任务分组：
  - 剧集组卡片聚合同剧集任务
  - 头部信息：`Total / Finish / Failed`
  - 支持展开/折叠
  - 单集完成后从 Downloading 移至 Downloaded，并自动创建新分组
- 空状态：
  - `No downloading tasks`
  - `No completed downloads`

## 6. 底部固定区
- 界面样式切换（Popup / Sidebar）
- 外链入口：Official Site / Member Center / Contact Us / What's New

## 7. 页面跳转关系
- 插件主页 -> Dashboard
- 插件主页 -> Detected / Downloads（Tab 切换）
- Detected（Playlist）-> 剧集弹窗
- 任意下载动作 -> CoApp 引导页（CoApp 不可用时）
