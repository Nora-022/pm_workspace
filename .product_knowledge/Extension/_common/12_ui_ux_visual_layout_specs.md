# 12 UI、UX、视觉与布局规范（UI UX Visual Layout Specs）

> 本文件是 `_common` 编号体系下的正式 common 规则正文；`references/` 不再维护本主题的现行规则。

---

## UX Patterns
## Common Additions

### Variable Tag Rules

- Variable tags such as file size should only be shown when the real value is available.
- If a service cannot reliably return file size, the UI should omit the size tag instead of showing placeholder content.
- This rule applies to similar optional tags derived from analysis results.

### Trial Status Rules

- Trial status should default to a stable two-state expression:
  - `Active`: still within the valid trial period
  - `Expired`: no longer valid
- Unless a plugin has a real business exception, later plugins should reuse this wording.

## 文档定位

- 本文档定义 StreamFab 浏览器插件产品线共用的交互结构、页面职责、关键 UX 规则与视觉规范（颜色 / 字体 / 间距，原 visual_guidelines 已并入本文）。
- 本文档重点回答三个问题：
  - 界面分成哪些固定层级。
  - 每种页面各自承担什么职责。
  - 不同状态反馈和阻断行为应该落在哪种界面里。

## 信息分层

本文档按三层组织：

1. `Runtime Task UX`
主弹窗、列表、下载、选择集数等日常任务流。

2. `Global Management UX`
dashboard 中的授权信息和 setting。

3. `Special Feedback And Dependency UX`
通知、阻断式 modal、CoApp 安装流。

## 来源

- 核心流程：Figma `核心流程`，node `0:624`
- Dashboard：Figma `Dashboard`，node `0:4336`
- 通知与弹窗：Figma `界面通知弹窗`，node `14:5823`
- CoApp 安装流：Figma `安装 卸载 启动界面`，node `21:6761`
- 统一文件链接：[Figma 设计稿](https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6)

## Runtime Task UX

### 主框架结构

插件运行时界面遵循固定四段结构：

1. `Header`
显示用户状态、授权状态、剩余下载次数、少量全局入口。

2. `Tab Bar`
在 `Detected` 和 `Downloads` 之间切换。

3. `Content Area`
承载当前 tab 的主列表和主交互。

4. `Footer`
承载设置、速度状态、次级入口。

规则：

- 运行时界面是任务优先，不承载大量全局信息。
- Header 与 Footer 固定，主要变化发生在 Content Area。

### Header

Header 默认承载：

- 用户邮箱或身份信息
- 授权状态，如 `Trial` / `Premium`
- `Downloads left` 计数
- `Buy Now` 等升级入口
- Dashboard 入口 icon

规则：

- Trial 用户应明确看到剩余次数。
- Premium 用户不需要继续展示 trial 型压力信息。
- Dashboard 入口在右上角，作为插件内部独立页面的跳转入口。

### Tab Bar

固定两个 tab：

- `Detected`
- `Downloads`

规则：

- 标签允许带角标，并实时更新数量。
- 选中态必须稳定、明确，避免用户不清楚当前所在页。
- 不增加额外一级 tab，复杂度应控制在二选一。

### Footer

Footer 承载低频但常驻的信息和操作：

- 设置类 icon
- 下载速度或状态提示
- 少量次级入口

规则：

- Footer 不是流程主操作区。
- 主任务操作应留在内容区，而不是压到底栏。

## Detected 列表页

### 默认态

每个列表项默认展示：

- 缩略图
- 标题
- 时长
- 格式或清晰度 tag

规则：

- 标题允许截断，但应保留足够识别度。
- DRM 与非 DRM 插件可根据业务差异显示不同 tag 集合。

### 展开态

点击列表项后进入展开态，展示该视频的下载配置：

- 下载路径
- 分辨率
- 主色调或编码相关选项
- 字幕
- 其他与当前资源绑定的下载参数

规则：

- 同一时刻只允许一个列表项展开。
- 点击其他条目时，当前展开项应收起。
- 展开区本质上是“当前资源的局部配置区”，不是完整设置页。

### 检测与分析阶段

检测 / 分析阶段只在界面上暴露用户能理解的状态；内部可以拆成插件侧过滤、CoApp 支持判断、CoApp 分析，但不要把这些技术阶段全部暴露给用户。

**非 `ytdlp_mode`**：
- URL 变化后默认后台刷新 CoApp 结果，不让主区域进入可见的 `Detecting videos...`。
- 当前没有视频结果时，主区域显示空态（如 `No videos detected` / "暂未检测到视频"）。
- 当前已有视频结果时，保留现有视频卡片，等待新结果回来后自然更新。

**`ytdlp_mode`**：
- 仍可使用 `Detecting videos...` 表达预分析 / 多 Origin 探测过程。

**`分析中`**：
- 外部能力层开始返回实际分析进度。

规则：

- 除 `ytdlp_mode` 外，不再把 URL 变化后的 CoApp 支持判断表现为主区域“检测中”。
- 如果插件存在真实分析阶段，就不应该一直停留在模糊的“检测中”。
- `分析中` 应作为独立状态表达，而不是塞进成功或失败之后再补解释。
- 进度来源优先使用真实接口返回，不做误导性的伪进度。
- 当前全产品线统一支持“检测与下载并行”，下载中的任务不再作为暂停新检测的默认前提。
- 如果历史文档里存在“Downloading 存在时暂停新检测”之类描述，应视为已失效的旧限制，不再作为新插件设计依据。

### 分析失败分流

规则：

- 当当前弹窗内已有其他检测结果时，分析失败可用轻量 toast 提示。
- 当当前弹窗为空时，分析失败可直接回到空状态或“未检测到”状态，不必强行再加一层 toast。
- 失败反馈应明确说明“分析失败”，不要伪装成“站点没有视频”。

### Playlist / 多集内容

如果当前资源是 playlist、多季或多集内容，展开区应额外提供 `Select Episodes` 入口。

规则：

- 入口只在有多层级内容时出现。
- 不要在普通单资源列表里保留空占位。

## Playlist 选集弹窗

### 触发方式

- 从 `Detected` 列表项展开区点击 `Select Episodes` 进入。

### 结构

弹窗内部通常包含：

- 标题
- 关闭入口
- `Select All`
- 已选数量计数
- 分组层级列表，如 `Season / Episode`
- `Confirm`

### UX 规则

- 层级结构来自站点解析结果，允许插件间不同，不强行统一成单一树形结构。
- 如果内容存在自然编号层级，如 `Season / Episode`，默认按自然顺序正排展示。
- `Select All` 与已选数量必须实时联动。
- 每个组可独立展开和收起。
- `Confirm` 的作用是确认当前选择并返回主列表。
- 弹窗高于 popup 内容区，但不跳出插件任务语境。
- 默认只展开第一组，其余组默认收起，避免多层级内容一进入就把弹窗撑满。
- 如果内容中存在 `Main Movie`、`Extras`、`Trailers` 等附属结构，应保持树层级表达，而不是打平成一个普通列表。

### Playlist 首组分析限制

部分插件会只分析 playlist 的第一组或第一集内容。

规则：

- 当首组分析结果不能代表全部后续内容时，优先用非阻断说明进行兼容提示。
- 不因为首组参数不完整就默认阻断整个 playlist 的下载操作。
- 若首组结果不足以支撑精确选项，应允许字段进入 fallback 展示，而不是直接报错。

## Downloads 页

Downloads 页用于查看和管理当前下载任务及其状态。

规则：

- 应与 `Detected` 形成职责分工：前者负责“发现并配置”，后者负责“查看进度和结果”。
- 已开始的任务不应仍然停留在 Detected 里作为主操作对象。
- 状态表达必须清楚区分进行中、成功、失败、等待中、暂停等状态。
- 当下载模式切换为只音频或只字幕时，Downloads 页应优先展示当前模式，不强行保留分辨率等无关字段。
- Playlist 中的主内容和附属内容进入下载队列后，可按独立任务展示，不要求继续保留树层级。

## Global Management UX

### Dashboard 全局定位

- Dashboard 入口位于插件主弹窗右上角菜单 icon。
- 点击后进入插件内部独立页面，不是 popup 内折叠区，也不是一次性弹层。
- Dashboard 承载两个一级模块：
  - `License Info`
  - `Setting`

### Dashboard 与主弹窗的职责边界

- 主弹窗负责即时任务流：发现资源、触发下载、查看下载。
- Dashboard 负责全局信息和全局配置：授权信息、订阅信息、产品入口、长期设置。
- 不把正在执行的任务流程搬进 dashboard。
- 不把全局设置拆散塞进 popup 的局部流程里。

### License Info

License Info 的核心是静态信息浏览和确认，不是高交互页。

承载内容：

- 顶部 banner
- 产品名
- 用户订阅类型
- 订阅状态和到期信息
- 用户可享受的权益信息
- 官网或产品官网导流入口

规则：

- 顶部 banner 可点击并跳转官网。
- 主要任务是“看清楚自己是什么身份、享有哪些权益”，不是反复操作。
- 页面中的主操作应收敛到少量高价值动作，如 `Upgrade`、`Go to Website`。
- 如果授权异常，如即将到期、试用中、未激活，可在局部给出清晰提示和升级入口。

### Setting

Setting 是全局配置页，默认实时保存。

规则：

- 不采用统一的 `Save / Cancel` 页尾提交模式。
- 用户修改后应直接记录，离开页面后下次仍应保留。
- 设置项需要明确区分两种生效方式：
  - `立即生效`
  - `下次下载生效`

示例：

- 立即生效：语言切换
- 下次下载生效：分辨率、格式、字幕、目录

### 实时保存反馈

规则：

- 实时保存不等于无反馈。
- 成功后应给轻量但明确的反馈，如：
  - `Saved`
  - `Applied`
  - `Will apply to future downloads`
- 失败时必须明确告知用户，并允许重试。
- 高风险设置如果保存失败，不应在界面上伪装成成功。

### Dashboard 内部导航

规则：

- `License Info` 和 `Setting` 是一级导航项。
- 左侧导航切换后，右侧主内容整页切换，不将两页串成超长滚动页。
- 当前项必须有稳定选中态。

## Special Feedback And Dependency UX

### 下载结果通知

这类通知是轻量反馈，不是流程容器。

适用场景：

- 试用用户下载成功
- 试用用户下载失败
- 订阅用户下载失败

规则：

- 每次通知只表达一个结果。
- 可直接关闭。
- 不阻断用户继续操作插件。
- 如有 CTA，只保留一个。
- 试用态允许带升级 CTA。
- 订阅态默认不做 upsell，而是聚焦结果说明或排错入口。

### 分析失败 toast

除了下载结果通知，插件还允许存在“分析失败 toast”这类轻量结果反馈。

适用场景：

- 检测已开始，分析阶段返回失败
- 当前弹窗中已有其他检测结果，失败需要被局部提示出来

规则：

- 分析失败 toast 属于轻量反馈，不属于阻断 modal。
- 默认自动消失，可手动关闭。
- 文案应聚焦“分析失败 / 请重试 / 联系支持”，不混入复杂业务判断。

### 阻断式 Modal

阻断式 modal 用在用户必须停下来做决定的节点。

适用场景：

- 试用激活
- 必须确认继续或升级的节点
- 真实权限或前置条件阻断

规则：

- 不用于普通成功、失败、被动提醒。
- 必须至少有一个主动作。
- 在允许的情况下，必须保留安全次路径，如 `Continue` 或关闭。
- 主动作反映业务目标，如 `Upgrade to Premium`。

### 试用弹窗细节

规则：

- 试用弹窗用于说明试用已经激活以及可体验的权益。
- 权益列表不是装饰，而是帮助用户理解试用价值。
- 底部 note 用于澄清免费能力与试用权益的边界。
- 关闭和 `Continue` 默认语义一致，都是低摩擦返回原流程，除非业务明确要求强门槛。
- 不应在每次下载后重复强打断。

### 通知与阻断弹窗的关系

- 通知属于轻反馈层。
- 阻断 modal 属于决策层。
- 两者不能合并成同一类“弹窗”去处理。
- 当结果反馈、营销导流、强制决策混在同一个表面时，体验会变差，必须避免。
- 兼容性提醒如果不影响用户继续操作，优先做常驻说明或字段侧提示，不升级成阻断 modal。

### 评价引导提示

评价引导用于在用户体验到核心价值后，邀请其到应用商店评分。属于轻量常驻提示，不是结果通知，也不是阻断 modal。

位置与形态：

- 位于 Downloads tab 内容区顶部，Downloading 分组之上。
- 内嵌单行条（inline banner），非遮罩弹窗，占位尽量小。

触发与频控：

- 首次出现 Downloaded（下载完成）任务后展示一次。
- 用户点击评分跳转商店后，提示消失且永久不再出现。
- 用户关闭后永久不再出现。
- 不在每次下载后重复出现。

跳转规则：

- 单个 CTA，按当前浏览器自动路由：Chrome 跳 Chrome 应用商店，Edge 跳 Edge Add-ons。

边界：

- 不挂在下载结果通知上，结果反馈与营销导流不混在同一表面。
- 不升级为阻断 modal。
- Trial 配额紧张时避免与 `Buy Now` 升级压力叠加打扰。

### CoApp 安装流

CoApp 安装、卸载、启动相关界面属于依赖安装 UX，不属于日常插件任务流。

常见触发场景：

- CoApp 缺失但当前功能依赖它
- 用户主动安装 CoApp
- 用户进入自定义安装流程
- 安装中
- 安装成功
- 安装失败
- 客户端正在运行，导致无法继续安装或卸载

### CoApp 安装流规则

- `Quick Install` 是默认主路径。
- `Custom` 是次路径，默认收起。
- 流程应尽量线性：进入安装 -> 安装中 -> 成功或失败。
- 每个状态只给一个最清楚的下一步。
- 阻断提醒只在真实前置条件冲突时出现，如客户端仍在运行。
- 问题解决后，应回到安装流，而不是掉回无关页面。

## 全局边界

- Popup 是任务流。
- Dashboard 是全局状态与设置流。
- Notification 是轻量反馈流。
- Blocking Modal 是决策阻断流。
- CoApp Install Flow 是依赖安装流。

这五类表面必须保持边界清晰。后续各插件如有站点差异，只补业务差异，不重写这套全局分工。

---

## Visual Guidelines
## Common Additions

### Variable Tag Visibility

Applicable to:

- file size
- bitrate
- other analysis-dependent tags that are not guaranteed for every service

Rules:

- Only show the tag when the real value is available.
- If the value is unavailable, hide the tag directly.
- Do not fill the space with placeholder values such as `N/A` or `--`.

### Trial Status Text

- Trial status text should prefer a stable state pair such as `Active / Expired`.
- If no plugin-specific business exception exists, later plugins should reuse this wording.

## 文档定位

- 本文档定义 StreamFab 浏览器插件产品线共用的视觉规范。
- 适用于所有插件的运行时界面、桌面页扩展界面，以及少量特殊流程界面。
- 插件自身的业务差异、品牌差异、特例说明，应写入各插件目录下的设计文档，不在这里重复定义。

## 信息分层

本文档按三层组织：

1. `Runtime UI`
用于插件正常使用过程中的界面，如 popup、sidebar、列表、设置控件、状态反馈。

2. `Special Flow`
用于只在特定场景出现的界面，如 dashboard、阻断式 modal、CoApp 安装流。

3. `Assets Archive`
用于静态资产归档，如应用商店配图、logo 资产范式。

## 来源

- 基础视觉规范：Figma `视觉规范`，node `0:16`
- Dashboard：Figma `Dashboard`，node `0:4336`
- 通知与弹窗：Figma `界面通知弹窗`，node `14:5823`
- CoApp 安装流与 logo：Figma `安装 卸载 启动界面`，node `21:6761`
- 应用商店配图：Figma `应用商店配图`，node `0:5774`
- 统一文件链接：[Figma 设计稿](https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6)

## Runtime UI

### 视觉语言总述

- 整体采用浅色、轻量、工具型视觉语言。
- 主背景以白色和浅灰为主，通过描边、留白、轻阴影建立层级，不依赖大面积重色块。
- 主 CTA 使用橙色，辅助强调与信息态使用蓝色。
- 圆角主要收敛在 `8px` 和 `4px` 两档。
- 视觉重心应落在内容和操作上，不做强装饰。

### Color

#### 品牌与辅助色

| Token | Hex | 用途 |
| --- | --- | --- |
| Brand Orange / Normal | `#FA8A04` | 主按钮、关键 CTA |
| Brand Orange / Hover | `#FF9B33` | 主按钮 Hover |
| Brand Orange / Disabled | `#FFBA72` | 主按钮 Disabled |
| Assist Blue / Normal | `#1E9CEB` | 信息态、选中态、辅助交互 |
| Assist Blue / Hover | `#4BB0EF` | 信息态 Hover |
| Assist Blue / Disabled | `#9EDAFF` | 信息态 Disabled |
| Success | `#52C41A` | 成功态 |
| Error | `#F94245` | 失败态 |

#### 中性色

| Token | Hex | 用途 |
| --- | --- | --- |
| Text Base | `#07151E` | 文本与图标基色 |
| Border | `#E5E5E5` | 一般描边 |
| Divider | `#EAEAEA` | 分割线 |
| White | `#FFFFFF` | 主背景 |
| Light Gray | `#F5F5F5` | 浅灰容器底色 |
| Medium Gray | `#CACACA` | 次级辅助层次 |

#### 文本层级

统一使用 `#07151E` 叠加透明度表达层次：

| Token | Opacity | 用途 |
| --- | --- | --- |
| Text / Primary | `100%` | 主标题、正文主信息 |
| Text / Secondary | `80%` | 次级说明 |
| Text / Tertiary | `40%` | 辅助信息、弱提示 |
| Text / Disabled | `20%` | 禁用态 |

### Typography

#### 字体

| 场景 | Font Family | Style |
| --- | --- | --- |
| 英文正文 | `Arial` | `Regular` |
| 英文加粗 | `Arial` | `Bold` |
| 中文正文 | `PingFang SC` | `Regular` |
| 中文加粗 | `PingFang SC` | `Semibold` |
| 页级英文大标题 | `Helvetica Neue` | `Bold` |

#### 字号层级

| 层级 | Size | Line Height | Weight | 用途 |
| --- | --- | --- | --- | --- |
| 辅助文字 | `12` | `14` | Regular | 标签、注释、轻提示 |
| 正文 | `14` | `20` | Regular | 主体信息 |
| 小标题 | `14` | `20` | Bold | 模块名、字段名 |
| 中标题 | `16` | `22` | Regular | 卡片标题 |
| 中标题强调 | `16` | `22` | Bold | 强调标题 |
| 大标题 | `24` | `32` | Bold | 区块标题 |
| 页级标题 | `34` | `40` | Bold | 独立页面标题 |

### Container

#### 圆角

| 类型 | 值 | 场景 |
| --- | --- | --- |
| Main Radius | `8` | 卡片、按钮、容器、弹层 |
| Compact Radius | `4` | Tag、Select、紧凑输入框 |

#### 阴影

| 类型 | 值 | 场景 |
| --- | --- | --- |
| Tips Shadow | `0 2px 4px 0 rgba(7,21,30,0.1)` | 轻提示、浮层 |
| Modal Shadow | `0 4px 10px 2px rgba(7,21,30,0.1)` | Modal、较重弹层 |

#### 容器类型

| 类型 | Fill | Stroke | Radius |
| --- | --- | --- | --- |
| 默认填充容器 | `#F5F5F5` | 无 | `8` |
| 白底描边容器 | `#FFFFFF` | `1px #E5E5E5` | `8` |
| 信息态填充容器 | `rgba(30,156,235,0.08)` | 无 | `8` |
| 信息态描边容器 | `rgba(30,156,235,0.08)` | `1px #1E9CEB` | `8` |

### Button

#### 尺寸

| 规格 | 尺寸 | 字号 | 水平内边距 | 图标 |
| --- | --- | --- | --- | --- |
| Large | `120 x 32px` | `14` | `16` | `16px` |
| Small | `82 x 28px` | `12` | `12` | `16px` |

#### 类型

| 类型 | Fill | Border | Text |
| --- | --- | --- | --- |
| Primary | `#FA8A04` | 无 | 白色 |
| Default | `#FFFFFF` | `1px #E5E5E5` | `#07151E` 80% |
| Blue | `#1E9CEB` | 无 | 白色 |
| Text Button | 无 | 无 | `#07151E` 80% 或 `#1E9CEB` |

规则：

- 图标按钮统一采用 `icon 16px + gap 8px + text`。
- Disabled 使用对应 Disabled 色值，文本使用 `20%` 透明度。
- 运行时界面优先使用小型、克制的按钮，不拉大按钮高度。

### Select / Checkbox / Radio / Tabs

#### Select

| 类型 | 尺寸 | 用途 |
| --- | --- | --- |
| 单选选择器 | `196 x 28px` | 分辨率、字幕、编码等轻量选择 |
| 路径选择器 | `520 x 40px` | 下载路径、目录类字段 |

规则：

- 普通态白底描边，Hover 或 Focus 使用蓝色描边。
- 右侧下拉箭头使用弱化图标，不应过强抢占注意力。
- 下拉面板沿用白底、细描边、轻阴影、`4px` 圆角。

#### Checkbox / Radio

- 图标尺寸统一 `16 x 16px`。
- 与文本间距统一 `8px`。
- 选中态使用橙色，禁用态使用浅灰和弱化文本。

#### Tabs

| 项目 | 值 |
| --- | --- |
| 整体容器 | `472 x 48px` |
| 单项宽度 | `236px` |
| 文本字号 | `16px` |

规则：

- 选中项使用白底，未选中项使用浅灰底。
- 角标允许展示数字或红点。
- 视觉上要清楚区分当前页签，但不过度装饰。

## Special Flow

### Dashboard 页面视觉模式

#### 页面结构

| 区域 | 规格 | 规则 |
| --- | --- | --- |
| 页面宽度 | `1440px` | 桌面页布局，不复用 popup 紧凑壳层 |
| 顶部返回栏 | `1440 x 54px` | 白底、底部分割线、左侧返回入口 |
| 左侧导航 | `280px` 宽 | 独立白底导航列 |
| 主内容区 | `700px` 宽 | banner、License Info、Setting 等核心模块排布区 |
| 页面背景 | `#F5F5F5` | 用浅灰托出白底卡片 |

#### 左侧导航

| 模块 | 规格 | 规则 |
| --- | --- | --- |
| 头像 | `64 x 64px` | 圆形容器 |
| 用户信息 | 头像右侧排列 | 名称强调，邮箱次级 |
| 会员标签 | `60 x 20px` | 复用 common tag 规则 |
| 导航项 | `256 x 48px` | 点击区明确，适合少量一级导航 |
| 导航图标 | `20 x 20px` | 与文本间距 `8px` |
| 底部动作按钮 | `82 x 32px` | 如 `Logout` |

规则：

- 选中项使用白底、`8px` 圆角、细描边。
- Dashboard 侧栏不做复杂层级，仅承载少量一层导航。

#### Banner

| 类型 | 规格 | 规则 |
| --- | --- | --- |
| Light Banner | `700 x 126px` | 左文案右装饰，轻量导流 |
| Dark Banner | `700 x 120px` | 结构一致，仅换主题风格 |
| CTA | `100 x 28px` | 轻量引导，不做超强营销按钮 |

规则：

- Banner 是信息导流卡片，不是大型 hero。
- 右侧装饰图可以有 3D/光斑/图标组合，但不能压过左侧文案可读性。

#### License Info 卡片组

| 模块 | 规格 | 规则 |
| --- | --- | --- |
| 区块标题 | `26-28px` 视觉高 | 页级分组标题 |
| 产品身份卡 | `652 x 88px` | logo + 产品名 + 主动作 |
| 订阅信息卡 | `652 x 108px` | 双列信息，中间分割线 |
| Benefit 小卡 | `322 x 56px` | 两列网格，图标 `24px` |

规则：

- Benefit 卡统一网格，不混用不同高宽。
- 优先白底或极浅灰底，通过描边和留白建立层级。

#### Setting 表单

| 模块 | 规格 | 规则 |
| --- | --- | --- |
| 主设置列 | `520px` 宽 | 同一基线对齐 |
| 输入 / 选择器 | `520 x 40px` | dashboard 环境统一抬高控件高度 |
| 基础字段块 | `68px` 高 | `label + field` |
| 带说明字段块 | `92-96px` 高 | note、checkbox、radio、toggle |

规则：

- label 与字段间距约 `8px`。
- 图标控制在 `16px` 左右。
- 优先纵向排布，避免横向过密。

#### Status Panel

| 模块 | 规格 | 规则 |
| --- | --- | --- |
| 状态面板 | `520 x 70px` | 状态 + 动作的标准容器 |
| 左侧状态图标 | 约 `17.5px` | success / error / loading 切换 |
| 右侧按钮区 | 1-2 个 `32px` 高按钮 | `Install`、`Recheck`、`Update Now` 等 |

规则：

- 成功、失败、加载沿用同一骨架，避免切换时跳动。
- 主操作使用橙色，次操作使用白底次级按钮。

### 下载结果通知

| 元素 | 规格 | 规则 |
| --- | --- | --- |
| 外层尺寸 | `400 x 118px` 到 `400 x 174px` | 高度随是否有 CTA 扩展 |
| 顶栏 | `400 x 40px` | 左标题右关闭 |
| 图标块 | `32 x 32px` | 应用图标叠加状态角标 |
| CTA | `368 x 32px` | 仅在试用态等特定场景展示 |

规则：

- 白底、轻描边、轻阴影，视觉语气接近系统通知。
- 成功和失败结构保持一致，只切换状态角标和文案。
- 试用态可附一个升级 CTA，订阅态默认不带 upsell。

### 分析失败 Toast

| 元素 | 规格 | 规则 |
| --- | --- | --- |
| 形态 | 单行或双行轻量 toast | 用于分析阶段失败等局部反馈 |
| 位置 | 靠近 popup 顶部或当前结果区上方 | 不遮挡主要配置区 |
| 生命周期 | 短暂展示 | 自动消失，允许手动关闭 |

规则：

- 视觉权重应低于阻断 modal，也低于大卡片式通知。
- 可沿用白底、细描边、轻阴影体系，保持与现有通知族一致。
- 若需要关闭入口，关闭 icon 维持小尺寸弱化处理。

### 字段侧备注与兼容提示

部分插件会在配置字段旁加入常驻备注或兼容性说明。

规则：

- 备注信息优先贴近对应字段，不单独弹窗。
- 说明文本使用次级或三级文本层级，不与主字段名争夺视觉重心。
- 当配置因模式或兼容性暂不可用时，优先使用置灰 + 局部备注，而不是直接删除字段。

### 阻断式 Modal

| 元素 | 规格 | 规则 |
| --- | --- | --- |
| Modal 尺寸 | `740 x 390px` | 用于必须停下来做决定的场景 |
| 顶部强调区 | `740 x 128px` | 暖色高亮带，但不是整块重色背景 |
| 主标题 | `32px` 级别 | 强调里程碑事件，如试用已激活 |
| Benefit 列表 | 2 列 | 图标 `20-21px`，保持轻量 |
| 主按钮 | 按钮主体约 `162 x 32px` | 升级、购买等主动作 |
| 次按钮 | `90 x 32px` | `Continue` 等安全返回路径 |

规则：

- 阻断 modal 与通知属于不同中断等级，尺寸和动作层级必须明显不同。
- 关闭入口可用，但不能压过主动作。

### CoApp 安装 / 卸载 / 启动界面

| 元素 | 规格 | 规则 |
| --- | --- | --- |
| 主安装窗口 | 约 `622 x 405px` | 桌面安装器语气，不是插件 popup 语气 |
| 自定义安装窗口 | 约 `622 x 594px` | 向下展开安装选项和路径 |
| 阻断提醒框 | 约 `420 x 210px` | 用于进程占用、前置条件不满足等场景 |
| 主动作按钮 | `180 x 40px` 或 `100 x 32px` | `Quick Install`、`Retry`、`Start` |
| 次动作按钮 | `100 x 32px` | `Cancel`、`Later` 等 |

规则：

- 这类页面是特殊流程页，不混入 popup 或 dashboard 的壳层结构。
- 可复用 common 颜色、字体、按钮系统，但壳层布局更像桌面客户端安装器。

## Assets Archive

### 应用商店静态素材

定位：

- 属于商店上架和展示资产，不属于运行时 UI 规范。
- 在知识库中只需归档其存在和作用，不展开到组件级细节。

范围：

- 商店截图
- 产品总览图
- 功能展示图
- 流程展示图
- 小型 promo 图
- `128 x 128` 插件图标

规则：

- 商店素材可复用产品界面，但不能反向作为运行时交互规范来源。
- 各插件后续如需更新商店素材，应在插件文档中引用对应 Figma frame 或导出资产。

### Logo 范式

#### 插件 Logo

- 每个插件都有自己的纯色 logo。
- 纯色取自目标站点 logo 的主色调。
- 这是所有插件的默认范式，不为单个插件重新发明 logo 逻辑。

#### CoApp Logo

- CoApp logo 以 StreamFab 客户端 logo 为基础。
- 在右下角叠加标准化角标，形成 CoApp 身份。
- 这是跨插件共用范式，而不是单次设计特例。

## 边界说明

- `visual guidelines` 只定义共用视觉基线，不承载插件专属业务内容。
- 运行时 UI、特殊流程、资产归档三类内容必须分开理解，避免混淆。
- 若某个插件存在明确视觉例外，只在插件文档中记录偏离点和原因，不重写本文件。

---

## Layout Specs
## Common Additions

### Variable Tag Layout Tolerance

- Variable tags such as file size may be absent when the data source does not provide them.
- Layout should tolerate direct omission of those tags without reserving a fake placeholder position.

## 文档定位

- 本文档定义 StreamFab 浏览器插件产品线共用的结构尺寸参考。
- 它是 `common visual guidelines` 的补充，强调尺寸、比例、控件规格和页面骨架。
- 当需要新增需求、补充页面、扩展现有功能时，可用本文档快速对齐页面结构和控件尺度。
- 当需要理解视觉语言或交互职责时，分别回看 `common visual guidelines` 和 `common ux patterns`。

## 来源

- 基础视觉规范：Figma `视觉规范`，node `0:16`
- 核心流程：Figma `核心流程`，node `0:624`
- Dashboard：Figma `Dashboard`，node `0:4336`
- 通知与弹窗：Figma `界面通知弹窗`，node `14:5823`
- CoApp 安装流：Figma `安装 卸载 启动界面`，node `21:6761`
- 统一文件链接：[Figma 设计稿](https://www.figma.com/design/71aG2GlU1BF5VDxKTbfSwd/%E3%80%90StreamFab%E3%80%91-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6)

## 一、基础容器

### 1. 插件容器尺寸

| 形态 | 宽 | 高 |
| --- | --- | --- |
| Sidebar 主视图 | `480` | `1006` |
| Popup 紧凑态 | `480` | `600` |
| Popup / Modal 扩展态 | `480` | `640` |

规则：

- 内容区水平内边距默认 `16px`。
- 运行时插件界面的绘制默认从 `480px` 宽壳层展开。

### 2. 常用基础 token

#### 颜色

| Token | Hex |
| --- | --- |
| Brand Orange / Normal | `#FA8A04` |
| Brand Orange / Hover | `#FF9B33` |
| Brand Orange / Disabled | `#FFBA72` |
| Assist Blue / Normal | `#1E9CEB` |
| Assist Blue / Hover | `#4BB0EF` |
| Assist Blue / Disabled | `#9EDAFF` |
| Border | `#E5E5E5` |
| Divider | `#EAEAEA` |
| White | `#FFFFFF` |
| Light Gray | `#F5F5F5` |
| Text Base | `#07151E` |
| Success | `#52C41A` |
| Error | `#F94245` |

#### 字体

| 场景 | Font Family | Style |
| --- | --- | --- |
| 英文正文 | `Arial` | `Regular` |
| 英文加粗 | `Arial` | `Bold` |
| 中文正文 | `PingFang SC` | `Regular` |
| 中文加粗 | `PingFang SC` | `Semibold` |
| 页级英文标题 | `Helvetica Neue` | `Bold` |

#### 字号层级

| 层级 | Size | Line Height | Weight |
| --- | --- | --- | --- |
| 辅助文字 | `12` | `14` | Regular |
| 正文 | `14` | `20` | Regular |
| 小标题 | `14` | `20` | Bold |
| 中标题 | `16` | `22` | Regular / Bold |
| 大标题 | `24` | `32` | Bold |
| 页级标题 | `34` | `40` | Bold |

#### 圆角与阴影

| 类型 | 值 |
| --- | --- |
| Main Radius | `8` |
| Compact Radius | `4` |
| Tips Shadow | `0 2px 4px 0 rgba(7,21,30,0.1)` |
| Modal Shadow | `0 4px 10px 2px rgba(7,21,30,0.1)` |

## 二、常用控件规格

### 1. Button

| 规格 | 尺寸 | 字号 | 水平内边距 | 图标 |
| --- | --- | --- | --- | --- |
| Large | `120 x 32px` | `14` | `16` | `16px` |
| Small | `82 x 28px` | `12` | `12` | `16px` |

#### 按钮类型

| 类型 | Fill | Stroke | Text |
| --- | --- | --- | --- |
| Primary | `#FA8A04` | 无 | 白色 |
| Default | `#FFFFFF` | `1px #E5E5E5` | `#07151E` 80% |
| Blue | `#1E9CEB` | 无 | 白色 |
| Text | 无 | 无 | `#07151E` 80% / `#1E9CEB` |

### 2. Select

| 类型 | 尺寸 | 字号 | 用途 |
| --- | --- | --- | --- |
| 单选选择器 | `196 x 28px` | `12` | 分辨率、字幕等 |
| 路径选择器 | `520 x 40px` | `14` | 下载目录、安装目录等 |

规则：

- 普通态：白底 + `1px #E5E5E5`
- Hover / Focus：白底 + `1px #1E9CEB`
- Disabled：浅灰底 + 弱化文本

### 3. Checkbox / Radio

| 项目 | 值 |
| --- | --- |
| 控件尺寸 | `16 x 16px` |
| 控件与文本间距 | `8px` |

规则：

- Checkbox 为方形，Radio 为圆形。
- 选中态统一使用橙色。

### 4. Tabs

| 项目 | 值 |
| --- | --- |
| 容器尺寸 | `472 x 48px` |
| 单项宽度 | `236px` |
| 字号 | `16px` |
| Badge | 约 `17 x 12px` |

规则：

- 选中项白底，未选中项浅灰底。
- 角标可为红点或数字。

## 三、运行时页面骨架

### 1. Popup 主结构

运行时 popup 采用固定四段结构：

1. Header
2. Tab Bar
3. Content Area
4. Footer

绘制提示：

- Header 与 Footer 固定高度，优先保证内容区可滚动。
- 内容区内的块间距、容器留白统一按 `8px / 12px / 16px` 节奏处理。

### 2. Detected 列表项

默认态要素：

- 左侧缩略图
- 标题
- 时长
- 清晰度 / 格式 tag

展开态要素：

- 路径选择器：`520 x 40px`
- 轻量选择器：`196 x 28px`
- 字段以纵向方式排列
- 多集内容时出现 `Select Episodes`
- 允许出现字段置灰态和字段侧备注
- 当存在真实分析阶段时，结果区上方允许插入单独的状态条或轻量 toast

规则：

- 同一时刻只展开一个列表项。
- 展开区更像“局部下载配置板”，不是完整设置页。

### 3. Playlist 选集弹窗

绘制组成：

- 标题栏
- 关闭按钮
- `Select All`
- 已选数量
- 多层级列表
- Confirm 按钮区

规则：

- 宽度与 popup 对齐。
- 高度自适应内容，超出时内部滚动。
- 使用 Modal Shadow。
- 默认展开第一组，后续组折叠展示。
- 当存在 `Extras`、`Trailers` 等附属组时，仍沿用相同树结构，不额外发明新容器。

### 4. Downloads 页

绘制重点：

- 使用与 Detected 一致的列表骨架，避免心智断裂。
- 额外突出任务状态、进度、失败原因和重试入口。
- 当任务模式为只音频或只字幕时，允许压缩卡片信息，不展示分辨率等无关字段。

### 5. 兼容提示与 fallback

部分插件会在配置区内展示非阻断兼容提示。

绘制建议：

- 提示优先贴在相关字段右侧或下方。
- 不占用整行大卡片，除非文案长度或风险等级确实需要。
- 当分析结果不足以覆盖全部 playlist 内容时，相关选择器允许展示 fallback 固定项列表。

## 四、Dashboard 出图规格

### 1. 页面骨架

| 区域 | 规格 |
| --- | --- |
| 页面宽度 | `1440px` |
| 顶部返回栏 | `1440 x 54px` |
| 左侧导航列 | `280px` |
| 主内容区 | `700px` |
| 页面背景 | `#F5F5F5` |

### 2. 左侧导航

| 模块 | 规格 |
| --- | --- |
| 头像 | `64 x 64px` |
| 会员标签 | `60 x 20px` |
| 导航项 | `256 x 48px` |
| 导航图标 | `20 x 20px` |
| 底部动作按钮 | `82 x 32px` |

### 3. Banner

| 类型 | 规格 |
| --- | --- |
| Light Banner | `700 x 126px` |
| Dark Banner | `700 x 120px` |
| CTA | `100 x 28px` |

### 4. License Info 区

| 模块 | 规格 |
| --- | --- |
| 产品身份卡 | `652 x 88px` |
| 订阅信息卡 | `652 x 108px` |
| Benefit 小卡 | `322 x 56px` |

### 5. Setting 区

| 模块 | 规格 |
| --- | --- |
| 主设置列宽 | `520px` |
| 主输入控件 | `520 x 40px` |
| 基础字段块高 | `68px` |
| 带说明字段块高 | `92-96px` |

### 6. Status Panel

| 模块 | 规格 |
| --- | --- |
| 状态面板 | `520 x 70px` |
| 状态图标 | 约 `17.5px` |
| 动作按钮 | `32px` 高 |

## 五、通知与阻断弹窗规格

### 1. 下载结果通知

| 元素 | 规格 |
| --- | --- |
| 外层尺寸 | `400 x 118px` 到 `400 x 174px` |
| 顶栏 | `400 x 40px` |
| 图标块 | `32 x 32px` |
| CTA | `368 x 32px` |

绘制规则：

- 白底、细描边、轻阴影。
- 顶栏固定，内容区按文本和 CTA 扩展高度。

### 2. 阻断式 Modal

| 元素 | 规格 |
| --- | --- |
| Modal 外层 | `740 x 390px` |
| 顶部强调区 | `740 x 128px` |
| Benefit 图标 | `20-21px` |
| 主按钮主体 | 约 `162 x 32px` |
| 次按钮 | `90 x 32px` |

绘制规则：

- Modal 采用白色主体 + 顶部暖色强调带。
- 不用系统通知壳层去画阻断 modal。

## 六、CoApp 安装流规格

| 页面 | 规格 |
| --- | --- |
| 主安装窗口 | 约 `622 x 405px` |
| 自定义安装窗口 | 约 `622 x 594px` |
| 阻断提醒框 | 约 `420 x 210px` |

绘制规则：

- 以桌面安装器语气绘制，不复用 popup 任务页壳层。
- 大 logo 区、安装进度区、底部动作区是核心骨架。

## 七、Logo 与静态资产补充

### 1. Plugin Logo

- 每个插件的 logo 为纯色版。
- 纯色取自对应站点 logo 主色。

### 2. CoApp Logo

- 以 StreamFab 客户端 logo 为底。
- 右下角加统一角标。

### 3. 应用商店素材

归档类型：

- 商店截图
- 产品总览图
- 功能展示图
- 小型 promo 图
- `128 x 128` 图标

说明：

- 这部分只作为静态素材归档，不作为运行时 UI 的出图来源。

## 八、使用规则

- 出图时先判断当前界面属于哪一类：运行时任务页、dashboard、通知、阻断 modal、CoApp 安装流、商店素材。
- 先套用共用 token，再套用对应骨架尺寸，不要混用不同表面的壳层。
- 如遇插件特例，只在插件文档中补业务差异，不回写 common drawing spec。
