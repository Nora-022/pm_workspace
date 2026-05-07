# StreamFab Extension Common UX Patterns

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

- 本文档定义 StreamFab 浏览器插件产品线共用的交互结构、页面职责和关键 UX 规则。
- 与 [streamfab_extension_common_visual_guidelines.md](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/shared_references/streamfab_extension_common_visual_guidelines.md) 配套使用。
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

部分插件需要把视频处理拆成两个阶段：

1. `检测中`
- 页面侧识别内容，并把可分析信息发送给 CoApp 或后端能力层。

2. `分析中`
- 外部能力层开始返回实际分析进度。

规则：

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
