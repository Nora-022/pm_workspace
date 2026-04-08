---
name: streamfab-plugin-init
description: 在 `C:\pm-workspace\.product_knowledge` 中初始化或修复一个新的 StreamFab 浏览器插件项目。适用于新站点插件 kickoff，不只创建目录和空文档，还要基于客户端产品页与目标站点调研完成首轮文档完善，包括模板选择、目录创建、研究沉淀、核心 PM 文档回填、需求工作文档首版撰写、模板遗留清理和 `plugins_index.md` 更新。
---

# StreamFab Plugin Init

当用户要开始一个新的 StreamFab 浏览器插件项目时，使用这个 skill。

这个 skill 负责的是“新插件前期信息收集 + 项目初始化 + 首轮文档完善”全流程，不是单纯建一个空目录。

## 适用场景

当用户表达以下意图时触发：
- “我要做新的 xxx 插件”
- “帮我开始建一个新插件”
- “初始化一个新的站点插件”
- “按我们的流程创建新插件项目”
- “在当前 product knowledge 里建一个新插件目录”

以下情况不要用这个 skill：
- 只是讨论要不要做某个插件
- 只是做站点调研
- 只是写 PRD / 需求文档
- 只是评审已有文档
- 只是咨询目录结构，不要求真正创建

如果用户要开始一个新插件，这个 skill 应先收集产品页信息和目标站点信息，等确定性信息沉淀完成后，再进入初始化流程。

## 目标

把用户一句“我要做新的 `<site>` 插件”落成一个可继续工作的 PM 项目起点，结果至少包括：
- 正确命名的新插件目录
- 标准子目录结构
- 初始化后的顶层 PM 文件
- 初始化后的需求工作文档
- 基于现有信息回填后的首版产品结论
- 清理掉模板复制带来的旧需求附件和解析产物
- 更新 `plugins_index.md`
- 从参照客户端产品页中提炼可复用的宣传与边界信息
- 从目标站点中提炼插件设计所需的站点信息与边界信息

## 完成标准

执行完成后，结果不应只是“目录已创建”或“模板已复制”。

至少应满足以下标准：
- `00-07` 文件不是纯空壳，而是已经吸收当前可确认信息
- `requirements/plugin_requirement.md` 不是原始模板，而是已替换站点名并写入首轮差异点
- `requirements/plugin_ui_requirement.md` 不是原始模板，而是已替换站点名并写入首轮 UI 改动方向
- `references/client_product_page_notes.md` 与 `references/site_research_notes.md` 已有可读内容，而不是只有文件名
- 已明确区分“已确认事实”“保守推断”“待确认问题”
- 若信息不足，文档中必须显式列出缺口和下一步，而不是停留在泛化模板

## 默认行为

如果用户说“创建 / 初始化一个新插件”，默认理解为：
- 不只要建目录
- 还要把这个插件先整理到“可以继续做 PRD / UI / 开发沟通”的起点状态

除非用户明确要求“只建空目录”或“只生成骨架”，否则不要在复制模板后停止。

## 工作区前提

主工作区：
- `C:\pm-workspace\.product_knowledge`

初始化前至少读取：
- `C:\pm-workspace\.product_knowledge\README.md`
- `C:\pm-workspace\.product_knowledge\plugins_index.md`

按需读取：
- `C:\pm-workspace\.product_knowledge\common_plugin_rules.md`

共享模板路径：
- `C:\pm-workspace\.product_knowledge\common_templates\plugin_requirement_template.md`
- `C:\pm-workspace\.product_knowledge\common_templates\plugin_ui_requirement_template.md`

## 必要输入

执行前需要拿到这三个值：

1. `service_name`
- 用于目录命名的 snake_case 标识
- 示例：`u_next`

2. `display_name`
- 文档内显示名
- 示例：`U-NEXT`

3. `template_plugin`
- 用作初始化基线的现有插件
- 示例：`streamfab_netflix_downloader_for_browser`

4. `client_product_url`
- 参照客户端产品页 URL
- 用于提取宣传信息、边界能力和定价信息
- 如果用户提供了，就必须使用

5. `target_site_urls`
- 目标站点 URL，一个或多个
- 用于调研站点行为、页面结构、限制条件、账号状态、内容类型等信息
- 如果用户明确希望先调研再初始化，就应主动索取

## 提问规则

尽量少问，只问关键问题。

### 如果 `service_name` 缺失
问一句：
- `你要做哪个站点的插件？`

### 如果 `template_plugin` 缺失
问一句：
- `要基于哪个现有插件模板初始化？例如 video / netflix / disney_plus / onlyfans / fanza`

### 如果 `display_name` 缺失且写法存在歧义
问一句：
- `文档显示名确认用什么写法？例如 U-NEXT / Disney Plus`

### 如果 `client_product_url` 缺失
问一句：
- `把参照客户端产品页链接发我，我先帮你提炼确定性信息。`

### 如果 `target_site_urls` 缺失，且用户希望先做站点调研
问一句：
- `把这个插件对应的目标网站链接发我，可以一个或多个，我先帮你做站点调研。`

### 如果基础值都已经明确
不要追问，直接执行。

总提问轮次尽量控制在 2 到 4 轮以内，并优先把“产品页链接”和“目标站点链接”问全。

## 命名规则

目标目录必须命名为：
- `streamfab_<service_name>_downloader_for_browser`

示例：
- `streamfab_u_next_downloader_for_browser`

## 执行流程

### 第一阶段：收集输入

1. 读取根目录约定
- 读取 `README.md`
- 读取 `plugins_index.md`

2. 确认基础信息
- `service_name`
- `display_name`
- `template_plugin`

3. 索取客户端产品页 URL
- 如果用户未提供，则主动询问
- 目标是先拿到参照客户端产品页，再继续后续步骤

4. 索取目标站点 URL
- 如果用户希望先做站点调研，则主动询问目标站点链接
- 链接可能是一个，也可能是多个

### 第二阶段：沉淀确定性信息

5. 计算目标目录路径
- `C:\pm-workspace\.product_knowledge\streamfab_<service_name>_downloader_for_browser`

6. 判断目录是否已存在
- 不存在：进入 create mode
- 已存在：进入 repair mode

7. 如果目录尚未存在，先创建最小目录骨架以承接研究结果
- 优先使用现有脚本 `scripts/plugin_init.py`
- 如果脚本不存在或不可用，则按模板插件手动复制目录结构
- 至少确保这些目录存在：
  - `requirements/`
  - `context/`
  - `patterns/`
  - `constraints/`
  - `references/`

8. 提炼客户端产品页关键信息
- 重点提取：
  - 支持的最高分辨率
  - 音频信息
  - 售价
  - 可复用在插件中的 slogan
- slogan 需参考以下结构进行整理，而不是机械照抄：
  - `Download DRM M3U8 Videos, Downloaded Simply.`
  - `Save DRM-protected M3U8 streams for offline viewing in up to 1080p with clear AAC audio.`
- 如果页面文案不完整，可以基于页面已知事实做保守改写，但不要编造页面没有给出的强能力

9. 调研目标站点
- 一个或多个 URL 都可以
- 重点关注：
  - 页面结构
  - 内容类型
  - 登录态要求
  - 播放前提
  - 会员/地区/年龄限制
  - 清晰度、字幕、音轨相关线索
  - 页面中能支撑插件设计的明显边界条件

10. 将前期信息落盘
- 客户端产品页信息优先写入：
  - `<plugin>/references/client_product_page_notes.md`
- 目标站点调研信息优先写入：
  - `<plugin>/references/site_research_notes.md`
- 如果存在多个站点，也可以按站点拆分为多个研究文件
- 站点调研文档建议使用固定结构模板，保证后续跨插件可复用

### 第三阶段：正式初始化项目文档

11. 重建顶层核心文件
- 以下文件必须改成“新插件初始化状态”，并尽量吸收前面已确认的信息：
  - `README.md`
  - `00_planning_context.md`
  - `00_decision_log.md`
  - `00_questionnaire_prefill.md`
  - `01_product_brief.md`
  - `02_functional_architecture.md`
  - `03_page_structure.md`
  - `04_interaction_details.md`
  - `05_design_principles.md`
  - `06_business_rules.md`
  - `07_technical_constraints.md`

12. 初始化需求工作文档
- 必须创建或修复：
  - `requirements/index.md`
  - `requirements/plugin_requirement.md`
  - `requirements/plugin_ui_requirement.md`

13. 需求工作文档的来源
- `plugin_requirement.md` 基于共享模板 `plugin_requirement_template.md`
- `plugin_ui_requirement.md` 基于共享模板 `plugin_ui_requirement_template.md`

14. 将前期已确认的信息回填到初始化文档
- 至少把这些信息写入合适位置：
  - 最高分辨率
  - 音频能力
  - 售价
  - 候选 slogan
  - 目标站点调研要点

15. 将这些信息继续写入首版业务文档，而不是只写在 research notes 中
- `01_product_brief.md` 里要形成一句话定位、当前范围、非目标
- `02_functional_architecture.md` 里要形成模块拆分和站点差异焦点
- `03_page_structure.md` 里要形成页面层级和候选检测入口
- `04_interaction_details.md` 里要形成初步交互流与待验证节点
- `05_design_principles.md` 里要形成 UI 方向、品牌替换项、素材依赖
- `06_business_rules.md` 里要形成账号、地域、权益、售卖相关规则草案
- `07_technical_constraints.md` 里要形成技术约束、风控点、待验证事项

### 第四阶段：首版文档完善

16. 完善 `plugin_requirement.md`
- 必须替换模板变量，不允许保留 `{SiteName}` 这类明显未处理占位符
- 必须写入当前已知的产品名、基础跳转信息、模块差异点
- 必须把“已确认”和“待确认”明确区分
- 如果关键字段未知，写 `待确认`，不要留空白表格误导后续使用者

17. 完善 `plugin_ui_requirement.md`
- 必须替换模板变量，不允许保留 `{SiteName}` 这类明显未处理占位符
- 必须写入当前 UI 改动范围、Banner 状态、商店素材方向、安装器资源方向
- 若截图或文案未准备好，要明确标注依赖项和后续动作

18. 保守补齐，而不是虚构补齐
- 没有证据支持的信息不能写成已确认
- 可以基于产品页和站点研究做保守推断，但必须明确标注为“待确认”或“初步判断”
- 文档目标是“首版可工作”，不是“假装已完整”

### 第五阶段：清理与校验

19. 清理模板污染
- 必须清掉模板复制带来的旧插件资料：
  - `requirements/raw/*`
  - `requirements/derived/*`
- 不要在新插件目录里保留旧插件的 PDF、TXT、清洗片段、解析产物

20. 更新根索引
- 在 `plugins_index.md` 中增加新插件条目
- 至少包含：
  - 目录
  - 状态
  - 定位
  - 需求文档入口

21. 执行校验
- 目标目录存在
- 顶层核心文件存在
- 需求文档存在
- `references/client_product_page_notes.md` 存在
- `references/site_research_notes.md` 存在或已有等价站点调研文件
- `requirements/raw/` 为空
- `requirements/derived/` 为空
- `plugins_index.md` 已登记新插件
- `requirements/plugin_requirement.md` 中不再残留 `{SiteName}` 等模板占位符
- `requirements/plugin_ui_requirement.md` 中不再残留 `{SiteName}` 等模板占位符
- `00-07` 里至少已有首轮站点结论或待确认问题，而不是只有标题

## 产品页信息提炼规则

如果用户提供了客户端产品页 URL，必须从中提炼以下信息：
- 最高支持分辨率
- 音频信息
- 售价
- 可复用的插件 slogan

### 分辨率提炼规则
- 优先提取页面明确写出的最高分辨率，例如 `up to 1080p`
- 如果页面出现多个分辨率口径，优先取面向用户宣传的最高稳定支持值
- 不要把推测值写成已确认值

### 音频提炼规则
- 优先提取页面明确写出的音频格式、声道或宣传描述
- 如果页面只写了类似 `clear AAC audio`，就按该口径记录
- 如果没有明确音频信息，不要自行补全编码格式

### 售价提炼规则
- 优先记录页面显式展示的售价
- 如存在促销价与原价，尽量同时记录
- 如果页面有订阅周期，也一并记录

### Slogan 提炼规则
- slogan 不是逐字复制，而是提炼后生成适合插件复用的短宣传语
- 结构参考：
  - `Download DRM M3U8 Videos, Downloaded Simply.`
  - `Save DRM-protected M3U8 streams for offline viewing in up to 1080p with clear AAC audio.`
- 生成时优先保留这些信息维度：
  - 内容类型或协议类型
  - 是否支持 DRM / 受保护内容
  - 离线观看价值
  - 最高分辨率
  - 音频卖点
- 如果页面没有明确支持 DRM、分辨率或音频，不要硬写进 slogan

### 输出格式建议
提炼结果至少包含：
- `最高分辨率：`
- `音频信息：`
- `售价：`
- `候选 slogan 1：`
- `候选 slogan 2：`

### 落盘规则
- 如果当前插件目录已存在，优先把产品页提炼结果写入：
  - `<plugin>/references/client_product_page_notes.md`
- 如果该文件已存在，则以站点或来源页面为单位追加新条目，而不是覆盖旧内容

## 目标站点调研规则

如果用户提供了目标站点 URL，必须先做站点调研，再进入正式初始化文档阶段。

### 调研重点
- 站点首页和主要内容入口
- 登录态与会员态要求
- 播放行为与播放前提
- 内容类型：电影、剧集、成人内容、直播、合集等
- 明显的地区限制、年龄限制、试看限制
- 页面层级和对插件检测有影响的结构特征

### 落盘规则
- 默认写入：
  - `<plugin>/references/site_research_notes.md`
- 如果有多个网站，允许拆分成多个文件
- 站点调研结果应先作为参考事实沉淀，再回填到 `00-07` 和需求文档

### 推荐模板结构
站点调研文档建议至少包含：
- 站点基本信息
- 站点定位与内容范围
- 账号与会员要求
- 播放与检测前提
- 页面结构观察
- 能力与边界线索
- 对插件设计的影响
- 待确认问题

## 核心原则

### 原则 1：结构可以继承，结论不能继承
- 可以复用模板插件的目录结构、文件框架、通用拆分方式
- 不可以把模板插件的业务规则直接当成新插件已确认事实

### 原则 2：初始化不是复制完就结束
- 创建目录后，必须把关键文件改成新插件自己的初始化口径
- 结果必须是“能继续工作”的项目起点，而不是“复制出来的旧插件”

### 原则 2.5：研究结论必须下沉到工作文档
- `references/` 不是终点
- 产品页和站点研究得出的结论，必须继续回填到 `00-07` 和 `requirements/*`
- 如果研究做了但核心工作文档仍是空壳，说明任务没有完成

### 原则 3：模板遗留要明确处理
- 允许保留部分模板目录或通用结构
- 但如果某些文件仍描述模板插件，必须明确标注为“模板基线参考”
- 会污染检索或误导后续写作的旧需求附件必须移除

## Create Mode 规则

适用于目标目录不存在时：
- 创建新目录
- 初始化完整骨架
- 初始化需求文档
- 完成首版内容回填
- 清理模板原始需求和解析产物
- 更新 `plugins_index.md`

## Repair Mode 规则

适用于目标目录已存在时：
- 不要重复创建目录
- 不要盲目覆盖所有文件
- 重点检查和补齐：
  - 缺失的标准文件
  - 缺失的需求工作文档
  - 仍是空壳或未替换模板变量的文档
  - 缺失的研究结论回填
  - 遗留的模板 raw/derived 文件
  - 缺失的 `plugins_index.md` 条目

## 输出要求

执行完成后，回复里要稳定包含：
- 插件路径
- 使用的模板
- 本次是 create mode 还是 repair mode
- 是否更新了 `plugins_index.md`
- 初始化了哪些需求文档
- 是否清理了旧模板 raw/derived 资料
- 当前还保留了哪些模板基线内容，后续需要替换
- 当前哪些文档已经达到“首版可工作”
- 当前还缺哪些外部输入才可继续深化

## 文档质量 Checklist

在结束前，至少逐项自检一次：
- `README.md` 已说明当前初始化状态、基线模板、下一步入口
- `00_planning_context.md` 已写清输入、假设、缺口和后续动作
- `00_decision_log.md` 已记录为什么选这个模板、当前是 create 还是 repair
- `01_product_brief.md` 已有一句话定位、当前范围、非目标
- `02_functional_architecture.md` 已有模块划分和差异关注点
- `03_page_structure.md` 已有页面类型和候选检测入口
- `04_interaction_details.md` 已有初步交互流和待验证节点
- `05_design_principles.md` 已有品牌替换项和素材依赖
- `06_business_rules.md` 已有账号 / 权益 / 地域 / 售卖相关草案
- `07_technical_constraints.md` 已有技术风险、待验证约束、不可假设项
- `plugin_requirement.md` 已把模板变量替换干净
- `plugin_ui_requirement.md` 已把模板变量替换干净
- 任何未知重要字段都写为 `待确认`，而不是空白
- 任何推断性内容都已明确标成“初步判断”或“待确认”

## 推荐输出样式

完成后建议按以下结构回复，避免只说“已初始化”：

- 插件路径：`...`
- 使用模板：`...`
- 模式：`create mode` / `repair mode`
- 已完成：
  - 已创建或修复哪些目录和核心文件
  - 已完成哪些 research notes
  - 已完成哪些首版 requirement / UI requirement 回填
- 已清理：
  - 是否清理 raw / derived
  - 是否移除了旧插件残留资料
- 当前仍待补齐：
  - 客户端产品页
  - 目标站点链接
  - 价格 / 分辨率 / 音频 / banner 文案
  - 其他关键待确认项

## 脚本说明

如果本 skill 使用 `scripts/plugin_init.py`，可按如下方式调用：

```bash
python scripts/plugin_init.py --service fanza --display-name Fanza --template streamfab_onlyfans_downloader_for_browser
```

可选参数：
- `--base-dir`
- `--status`
- `--positioning`

如果脚本不存在或不可用，不要卡住，直接按模板目录手动完成同等初始化。
