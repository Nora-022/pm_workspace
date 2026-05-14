# 扩展共性规则

## 规则 1：检测模式
- ytdlp 类插件：预分析 + 多 Origin + 检测与下载可并行
- Netflix 类插件：直出分析 + 单 Origin + 支持下载与分析并行
- 当前产品线统一以前两种模式为基线，不再把”Downloading 存在时暂停新检测”视为有效默认规则

**Netflix 模式的拓展变体（M3U8）：**

M3U8 插件在 Netflix 模式基础上，增加了一段插件侧页面结构预判断：

1. 插件先从网页结构判断当前页面是否为视频页；非视频页直接显示不支持，不进入 CoApp 分析
2. 通过预判断后，进入标准的 CoApp 分析流程，含 20 秒超时；超时或 CoApp 返回不支持，在插件弹窗内引导前往 StreamFab 客户端

其余逻辑（下载调度、登录中断、配额扣减）与 Netflix 模式一致。

## 规则 2：文档落位
- 插件差异写到插件自己的 `04_interaction_details.md` 和 `06_business_rules.md`
- 插件共性规则写到本文件
- 原始资料写到各插件的 `requirements/`

## 规则 3：视觉规范边界
- 产品线共用的颜色、字体、圆角、边框、阴影、间距、通用组件尺寸与状态，统一写在 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 产品线共用的界面结构、页面职责、交互模式、通知与阻断逻辑，统一写在 `shared_references/streamfab_extension_common_ux_patterns.md`
- 产品线共用的页面骨架、布局比例、容器尺寸、关键控件尺寸参考，统一写在 `shared_references/streamfab_extension_common_layout_specs.md`
- 各插件自己的 `05_design_principles.md` 只写插件特有的设计原则、页面策略、信息层级、内容表达、差异交互和例外约束
- 插件文档不重复抄写 common 视觉令牌和通用组件规范；如需使用，直接引用共享规范
- 某插件存在视觉例外时，只记录偏离点、适用范围和原因

## 规则 4：流媒体服务名大小写

插件需求文档中，插件名大小写按「流媒体服务名」字段拆成两类处理：

- `{SiteName}` 表示流媒体服务名的原始大小写，用于对外展示和安装程序命名，包括插件产品名、CoApp 安装程序名、mlink 链接中的服务名片段。
- `{sitename}` 表示小写服务标识，用于系统标识和跳转链接，包括 app id、产品页 URL、What's New URL、订阅 / 升级付费 URL 中的 slug 或参数。
- 示例：流媒体服务名为 `FANZA` 时，对外展示 / mlink 写 `StreamFab_FANZA_Downloader_for_Browser`、`StreamFab_FANZA_Coapp`；app id 和跳转链接写 `streamfab_for_browser_fanza`、`fanza-downloader-for-browser.htm`、`pid=fanza-downloader`。
- 后续从飞书定稿、pid 表格或产品页回填知识库时，必须保持上述规则，不用产品页 URL 的小写 slug 反推展示名大小写。

## 规则 5：阅读顺序
- 先看 `index.md`
- 再看本文件
- 需要对齐通用视觉时，再看 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 需要对齐通用交互结构时，再看 `shared_references/streamfab_extension_common_ux_patterns.md`
- 需要确认页面骨架和尺寸参考时，再看 `shared_references/streamfab_extension_common_layout_specs.md`
- 再进入具体插件目录
