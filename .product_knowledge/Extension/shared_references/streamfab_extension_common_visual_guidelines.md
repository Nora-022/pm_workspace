# StreamFab Extension Common Visual Guidelines

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
