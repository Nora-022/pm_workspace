# 03 页面结构与布局（Page Structure）

## 引用关系

- 通用视觉规范统一引用 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 通用交互结构统一引用 `shared_references/streamfab_extension_common_ux_patterns.md`
- 通用结构尺寸统一引用 `shared_references/streamfab_extension_common_layout_specs.md`
- 本文档只记录 Netflix 相对 common 的页面结构差异

## 页面清单
1. 运行时插件页面
2. Playlist / Season 选集弹窗
3. Dashboard（License Info / Settings）
4. 通知与试用类弹窗
5. CoApp 引导与更新页面

## 主界面布局（全局）
- 结构：顶部固定区（用户授权信息模块） + Tab 内容区（Detected/Downloads） + 底部固定区
- Tab：Detected / Downloads

## 顶部固定区：用户授权信息模块（Netflix）

- 试用用户：
  - 邮箱
  - 剩余下载次数
  - 账号状态：`Trial`
  - `Buy Now` 按钮
  - Dashboard 跳转 icon
- 订阅用户：
  - 邮箱
  - 当日下载次数
  - 账号订阅方案：`LeftTime / Annual / Fab365`
  - Dashboard 跳转 icon

## Detected

- 仅展示 Netflix 检测结果
- 前置引导态：非 Netflix / 未登录 / 未播放
- 无跨 Origin，单站点累计，列表上限 50
- 支持下载进行中继续分析新视频

### 配置区结构

Netflix 的 Detected 展开区相对 common 的主要差异是字段集更完整：

- `Video Codec`
- `Resolution`
- `Audio Codec`
- `Language`
- `Subtitles`

字段层面说明：

- `Video Codec` 需要承载扁平化 codec 能力组合
- `Language`、`Subtitles` 支持多选
- 历史截图中出现过的较少字段版本不作为当前规则

### `* Videos Found` 说明文案

- 如页面保留说明提示，应表达“下载进行中仍可继续分析新视频”
- 不再沿用旧的“下载中暂停检测”文案

## 剧集选择弹窗

- Season 层级（Season -> Episode）
- 默认选中 `Season 1 / Episode 1`
- Episode 仅展示时长，不展示文件大小

说明：

- 即使只有一季，也保留 season 层级表达
- Playlist 下载任务进入 Downloads 后按 Season 维度拆分展示

## Downloads

- Downloading / Downloaded
- 串行执行（并发 1）

Netflix 的 Downloads 页差异：

- Playlist 下载结果以 `Season` 为单位展示任务
- 已在下载中的 playlist 不做额外视觉标记覆盖
- 重复发起时只做界面跳转，不更新既有任务卡片

## Dashboard

- License Info + Settings（Extension + CoApp）

### License Info

Netflix 需要替换：

- 顶部 Banner 文案
- 产品名
- Benefits of Paid Version 文案

当前产品名统一为：

- `StreamFab Netflix Downloader for Browser`

### Setting

Netflix 的 Setting 结构不变，但 `Extension` 字段明显多于 common：

- `Language`
- `Video Format`
- `Video Codec`
- `H264 Profile`
- `Video Resolution`
- `Audio Codec`
- `Pre-select Audio Language`
- `Audio Channel`
- `Pre-select Subtitle Language`
- `Subtitle Action`

其中默认值约束包括：

- `Always download the forced subtitle` 默认选中
- `Pre-select Description Audio if available` 默认不选
- `Pre-select both 5.1 and 2.0 audios` 默认不选
