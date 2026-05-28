# StreamFab Extension Common Layout Specs

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
