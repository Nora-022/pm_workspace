# 扩展共性规则

## 规则 1：检测模式
- ytdlp 类插件：预分析 + 多 Origin + 检测与下载可并行
- Netflix 类插件：插件轻量页面过滤 + 后台询问 CoApp 支持 / 分析 + 单 Origin + 支持下载与分析并行
- 当前产品线统一以前两种模式为基线，不再把”Downloading 存在时暂停新检测”视为有效默认规则

**非 ytdlp 模式的 URL 变化分析规则：**

1. URL 变化不再让 Detected 主区域进入可见的 `Detecting videos...` / "检测中"中间态。
2. 当前没有视频结果时，主区域默认显示空态（如 `No videos detected` / "暂未检测到视频"），后台静默询问 CoApp。
3. 当前已有视频结果时，继续保留现有视频卡片；CoApp 返回新结果后再自然更新。
4. CoApp 返回不支持、无视频、超时或不回传时：无旧结果保持空态；有旧结果保留旧结果。

**Netflix 模式的拓展变体（M3U8）：**

M3U8 插件在 Netflix 模式基础上，保留更严格的插件侧页面结构预判断：

1. 插件先从网页结构判断当前页面是否为视频页；非视频页按非 ytdlp 新规则保持空态或保留旧结果，不进入 CoApp 分析
2. 通过预判断后，进入标准的 CoApp 分析流程，含 20 秒超时；超时或 CoApp 返回不支持时按空态 / 保留旧结果处理，必要时在插件弹窗内引导前往 StreamFab 客户端

其余逻辑（下载调度、登录中断、配额扣减）与 Netflix 模式一致。

## 规则 2：文档落位
- 通用主干写到 `_common/01_product_brief.md` 到 `_common/07_technical_constraints.md`
- 不能合并进 01-07、但属于全产品线 common 的事实，从 `_common/08_*.md` 开始继续编号；现行规则必须写入 `_common/01+` 编号文件
- `_common/references/` 只放原始调研、外部证据、历史方案和竞品分析，不放现行规则
- 插件差异写到插件自己的 `plugin_differences.md`
- 插件详细规格写到插件自己的 `requirements/`
- 插件共性规则写到 `_common`，不在单插件目录重复维护
- 原始资料写到各插件的 `requirements/`
- 插件目录不使用 `08_`、`09_` 这类 common 编号，避免后续 common 扩展时冲突

## 规则 3：视觉规范边界
- 产品线共用的颜色、字体、圆角、边框、阴影、间距、通用组件尺寸与状态，统一写在 `_common/12_ui_ux_visual_layout_specs.md`
- 产品线共用的界面结构、页面职责、交互模式、通知与阻断逻辑，统一写在 `_common/12_ui_ux_visual_layout_specs.md`
- 产品线共用的页面骨架、布局比例、容器尺寸、关键控件尺寸参考，统一写在 `_common/12_ui_ux_visual_layout_specs.md`
- 各插件自己的 `plugin_differences.md` 只写插件特有的设计原则、页面策略、信息层级、内容表达、差异交互和例外约束
- 插件文档不重复抄写 common 视觉令牌和通用组件规范；如需使用，直接引用共享规范
- 某插件存在视觉例外时，只记录偏离点、适用范围和原因

## 规则 4：流媒体服务名大小写

插件需求文档中，插件名按用途拆成四类处理：

- `{SiteName}` 表示流媒体服务名的原始大小写，用于对外展示和安装程序命名，例如插件产品名、CoApp 安装程序名、License Info 产品名。
- `{service_name}` 表示 snake_case 服务标识，用于 app id，例如 `streamfab_for_browser_fandango_at_home`。
- `{SiteNameMlink}` 表示 mlink 产品名片段：在 `{SiteName}` 基础上用 `_` 连接单词，例如 `Fandango_at_Home`。
- `{sitename}` 表示跳转链接 slug：小写并用 `-` 连接单词，用于产品页 URL、What's New URL、订阅 / 升级付费 URL 中的 slug 或参数，例如 `fandango-at-home`。
- 示例：流媒体服务名为 `Fandango at Home` 时，对外展示写 `StreamFab Fandango at Home Downloader for Browser`，mlink 写 `StreamFab_Fandango_at_Home_Downloader_for_Browser` / `StreamFab_Fandango_at_Home_Coapp`，app id 写 `streamfab_for_browser_fandango_at_home`，跳转链接写 `fandango-at-home-downloader-for-browser.htm` / `pid=fandango-at-home-downloader`。
- 后续从本地 MD 定稿、pid 表格或产品页回填知识库时，必须保持上述规则，不用产品页 URL 的小写 slug 反推展示名大小写。

## 规则 5：阅读顺序
- 先看 `_common/FRAMEWORK.md` 与 `_common/READING_MAP.md`
- 再看 `_common/01_product_brief.md` 到 `_common/07_technical_constraints.md`
- 涉及需求池、版本、上线状态时，再看 `_common/08_backlog.md` 与 `_common/09_version_ledger.md`
- 再看本文件和 `_common/10_detection_modes.md` 到 `_common/16_new_plugin_kickoff_checklist.md`
- 需要对齐通用视觉、交互结构、页面骨架和尺寸参考时，看 `_common/12_ui_ux_visual_layout_specs.md`
- 再进入具体插件目录，优先读取 `plugin_differences.md`
