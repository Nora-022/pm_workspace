# 03 页面结构（Page Structure）

## 引用关系

- 通用视觉规范统一引用 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 通用交互结构统一引用 `shared_references/streamfab_extension_common_ux_patterns.md`
- 通用结构尺寸统一引用 `shared_references/streamfab_extension_common_layout_specs.md`
- 本文档只记录 Disney Plus 相对 common 的页面结构差异

## Disney 关键页面

### 1. 运行时插件页面

- Popup
  - `Detected`
  - `Downloads`
- Playlist 选集弹窗
- 下载结果通知

### 2. 插件内独立页面

- Dashboard
  - `License Info`
  - `Setting`

### 3. 特殊流程页面

- CoApp 安装 / 卸载 / 启动页面

## Disney 页面差异

### Detected

Disney 的 Detected 页相对 common 主要差异：

- 无预分析
- meta 完成后一次性展示
- 下载任务存在时仍允许继续检测新内容
- `Detected` 列表上限 `50`

### 配置区结构

Disney 配置区字段不新增新大类，但编码与音频能力更复杂：

- `Video Codec`
- `Resolution`
- `Audio Codec`
- `Language`
- `Subtitle`

字段层面差异：

- `Video Codec` 需要承载 `H264 / H265-SDR / HDR10 / Dolby Vision`
- “文件大小”标签可能不存在，缺失时直接不展示

### Playlist 弹窗

Disney 的 Playlist 弹窗差异明显：

- 新增 `Extras` 层级
- 形成三级结构压力

结构方向：

- `Main Movie`
- `Extras`
  - `extra item`

说明：

- 该层级当前保留，不在知识库里先行压平

### Downloads

Disney 的 Downloads 页差异：

- 主视频与 Extras 独立展示
- 不与主视频成组
- 若无法获取文件大小，进度区域允许用 `Segment` 替代文件体积信息

### Dashboard

#### License Info

Disney 需要替换：

- 顶部 Banner 文案
- 产品名
- Trial Status 字段表达

当前文档内存在文案冲突：

- 需求文档版本：
  - `Pro-Quality Disney Plus Downloads, One Click.`
  - `up to 1080p, MP4/MKV, multi-track where available.`
- UI 需求说明版本：
  - `Cinema Quality. One Click.`
  - `The simplest way to enjoy Disney Plus in 4K & Dolby Atmos.`

当前处理：

- 先记录冲突，不在插件知识库中擅自统一成单一口径
- 后续需由产品确认最终 banner 文案

#### Setting

Disney Setting 结构不变，但字段集有差异：

- `Video Codec` 选项调整
- 去掉 `H264 Profile`
- `Audio Codec` 改为 `Atmos / EAC3 / AAC`
- `Pre-select Subtitle Language` 增加 `None`

### CoApp 页面

CoApp 页面结构沿用 common，但需要替换：

- Disney Plus 插件 logo
- Disney Plus CoApp logo
- Disney Plus 安装目录方案

### 应用商店素材页面

Disney 商店素材沿用 common 框架，但要替换：

- Disney Plus 官网背景图
- Disney Plus 内容封面
- Disney Plus 插件 logo
- 商店图里的文案与配置展示
