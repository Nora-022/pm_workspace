# 02 功能架构

## 结构目标
- 延续 StreamFab 浏览器插件的单站点目录结构
- 使用统一的 `00_overview + 01-07 + requirements + references + working_notes` 结构承接产品知识

## 当前模块
- 产品总览：`00_overview.md`
- 正式知识：`01-07`
- 需求工作文档：`requirements/`
- 参考记录：`references/`
- 内部过程文件：`working_notes/`

## 初始化策略
- 目录结构参考 Amazon 插件
- 文档命名、版本记录和需求入口遵循当前 Extension 统一规则
- 飞书文档与本地知识库同步维护

---

## 模块清单与差异（2026-05-19 分发）

事实来源：客户端方案拆解（飞书）、`references/site_research_notes.md`、`requirements/plugin_requirement.md`。

### 与 Netflix 基线的关系

Fandango at Home 插件以 Netflix 浏览器插件为基线，结构上完全复用以下模块，仅在站点差异点上做配置或文案级覆盖：

| 一级模块 | 复用基线 | Fandango at Home 差异点 |
|---|---|---|
| 登录 & 授权 | Netflix | 结构一致；登录流程走 Fandango 账号体系，支持邮箱密码及 Apple ID / Google 单点登录 |
| 用户权益 | Netflix | 结构一致；权益态需区分 Rent（带过期）/ Buy（永久）/ Free-with-Ads |
| 视频分析 | Netflix | Meta 分析下载配置项为 Resolution、Audio Codec、Language、Subtitle；Audio Codec 非独立配置项，是音轨筛选器，切换会联动影响 Language 选项；TV 类 playlist 仅分析第一集 meta，后续剧集分辨率以 `if available` 标注 |
| 视频检测 | Netflix | 结构一致；触发 URL 模式 `athome.fandango.com/content/browse/details/...`；旧域 `vudu.com` 作兼容 |
| 视频下载 | Netflix | 输出能力差异：up to 4K + HDR10 / Dolby Vision + EAC3 5.1 / AAC 2.0 + MP4 / MKV；批量下载、自动 / 定时下载、去广告处理 |
| Dashboard | Netflix | Banner 文案、产品名独立 |
| Dashboard.Setting | Netflix common | 在通用配置项末尾追加 **Video Codec**（H264 / H265 - SDR / HDR10 / Dolby Vision）和 **Audio Codec**（EAC3 / AAC）两项站点差异化配置 |
| 数据上报 | Netflix | 通过 Fandango at Home 插件 id、索引和事件类型区分 |

### Fandango at Home 站点差异模块

- **Meta 分析弹窗**：
  - Movie 由主视频和 Extra（如有）构成，Extra 分两级结构
  - TV 主视频采用 Season > Episode 两级层级
  - TV 类部分剧集（时间久远、画质较差）会触发分辨率兼容提示
- **下载进度展示**：任务卡片标签包含分辨率、视频 codec、音频 codec；信息字段包含速度、进度、剩余时间、分片进度
- **错误归类**：未登录 / 地理限制 / 版权拒绝 / 租期过期 / 硬件 DRM 不足共 5 类，分别处理，不与"分析失败"合并

### 不属于本插件的能力

- SVOD 订阅看全库：Fandango at Home 平台不提供该形态
- 非美区访问：站点和已购内容均地理锁定
- 自家移动 App 离线缓存：本插件不复刻 Fandango at Home App 自身的离线缓存能力
