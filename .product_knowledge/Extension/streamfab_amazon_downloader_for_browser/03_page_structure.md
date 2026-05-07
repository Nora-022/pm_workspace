# 03 页面结构（Page Structure）

## 引用关系

- 通用视觉规范统一引用 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 通用交互结构统一引用 `shared_references/streamfab_extension_common_ux_patterns.md`
- 通用结构尺寸统一引用 `shared_references/streamfab_extension_common_layout_specs.md`
- 本文档只记录 Amazon 相对 common 的页面结构差异

## Amazon 关键页面

### 1. 运行时插件页面

- Popup
  - `Detected`
  - `Downloads`
- Playlist 选集弹窗
- 下载结果通知
- 分析失败 toast

### 2. 插件内独立页面

- Dashboard
  - `License Info`
  - `Setting`

### 3. 特殊流程页面

- CoApp 安装 / 卸载 / 启动页面

## Amazon 页面差异

### Detected

Amazon 的 Detected 页比 common 多三类结构压力：

1. 分析阶段反馈
- 从简单“检测中”扩展为：
  - `检测中`
  - `分析中`

2. 配置项复杂度
- Movie 和 Playlist 的配置项明显多于 common 基线。

3. Playlist 结构
- 除标准季集结构外，还要容纳：
  - `Main Movie`
  - `Bonus / Extras`
  - `Trailers`

### 配置区结构

Amazon 的配置区要能承载这些字段：

- `Mode`
- `Video Codec`
- `Bitrate Adaption`
- `Resolution`
- `Audio Codec`
- `Language`
- `Subtitle`
- `Subtitle Action`

页面结构要求：

- 允许置灰态展示，不直接删字段。
- 允许字段下方附备注说明。
- `Bitrate Adaption` 右侧需要容纳 playlist 兼容提示。

### Playlist 弹窗

Amazon Playlist 弹窗本身不新增新壳层，但内容结构更复杂：

- 默认只展开第一组
- 后续组折叠
- 允许 Extras / Trailers 与主内容共存

### Downloads

Downloads 页的 Amazon 差异在于任务信息展示：

- `Audio Only / Subtitle Only` 模式下，任务信息不展示分辨率
- 主视频和 Extras 在下载列表中独立展示，不保持树层级

### Dashboard

#### License Info

Amazon 需要替换：

- 顶部 Banner 文案
- 产品名

Banner 文案：

- EN:
  - `Pro-Quality Amazon Downloads, One Click.`
  - `Up to 1080p, MP4/MKV, AAC 2.0/EAC3 5.1 audio, where available.`
- ZH:
  - `专业品质亚马逊下载，一键搞定。`
  - `最高支持1080p分辨率，MP4/MKV格式，AAC 2.0/EAC3 5.1声道音频（如有提供）。`

#### Setting

Amazon 的 Setting 结构不变，但字段集有差异：

- 新增 `Pre-Select Dialogue Boost Audio`
- 去掉 `Amazon Prime Video Region`

### CoApp 页面

CoApp 页面结构沿用 common，但需要替换：

- Amazon 插件 logo
- Amazon CoApp logo
- Amazon 安装目录方案

### 应用商店素材页面

Amazon 商店素材沿用 common 框架，但要替换：

- 浏览器背景截图
- Amazon 站点内容封面
- Amazon 插件 logo
- 第三张商店图里的下载配置示意
- 第四、五张图的部分配图顺序
