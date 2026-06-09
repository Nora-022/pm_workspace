# 10 检测模式基线（Detection Modes）

> 本文件是 `_common` 编号体系下的正式 common 规则正文；`references/` 不再维护本主题的现行规则。

---

## netflix_mode
> 适用插件：Netflix / Disney+ / U-NEXT / Fandango at Home / Amazon / Hulu / Fanza / OnlyFans / MyFans / TVer / M3U8（变体）/ MPD（变体）
> 检测模式归属表见 [../../READING_MAP.md](../../READING_MAP.md)
> 字段级实现参考：Netflix 插件 `plugin_differences.md` + `requirements/`（活样例）
> 关联：[ytdlp_mode](#ytdlp_mode)、[11_user_flows_and_error_handling.md](11_user_flows_and_error_handling.md)、[06_business_rules.md](06_business_rules.md)

---

## 一、模式定义

| 维度 | 取值 |
| --- | --- |
| 核心特征 | 不支持 ytdlp 式预分析；URL 变化后由插件后台刷新当前页分析结果 |
| 分析方式 | 插件先做轻量页面过滤；疑似有效页面再让 CoApp 判断支持并直出分析（单 Origin） |
| 检测与下载关系 | 下载任务与新视频分析可并行 |
| 业务对应 | StreamFab 客户端 VIP 服务 |
| 默认归属 | 新插件 init 阶段默认归 netflix_mode |

**2026-06-08 变更记录**：

- 除 `ytdlp_mode` 外，所有插件默认采用新的 URL 变化分析流程。
- URL 变化不再让 Detected 主区域进入可见的 `Detecting videos...` / "检测中"中间态。
- 插件后台静默询问 CoApp 当前页是否支持 / 是否有视频；CoApp 返回新结果后再刷新 Detected 列表。
- 当前没有视频结果时，Detected 主区域默认显示空态（如 `No videos detected` / "暂未检测到视频"）。
- 当前已有视频结果时，继续保留现有视频卡片；后台等待最新页面结果返回，返回后自然更新。
- CoApp 返回不支持、无视频、超时或不回传时：无旧结果则保持空态；有旧结果则保留旧结果，不打断用户操作。
- 旧的"URL 一变化即显示检测中，再等待 CoApp 返回支持 / 不支持"流程保留为历史记录，不再作为默认交互规则。

---

## 二、前置条件

下列任一条件不满足时，Detected 区域应给出明确引导态，不进入半可用流程：

1. 用户在目标站点（如 `netflix.com`、`disneyplus.com`）
2. 已登录站点账号
3. 已播放或正在浏览视频页

非目标站点 / 未登录 / 未播放：在 Detected 区域展示前置引导态，引导用户登录或前往视频页。

---

## 三、检测流程

```
用户进入页面 / URL 变化
   ↓
插件做轻量页面过滤（站点、登录、播放状态、明显非视频页）
   ↓
明显非视频页 / 明显无视频页
   ├─ 无旧结果：Detected 保持空态（流程结束）
   └─ 有旧结果：保留现有视频卡片（流程结束）

疑似视频页或插件无法判断
   ↓
插件后台询问 CoApp 是否支持当前页 / 是否有视频（单 Origin，不做多 Origin 预探测）
   ↓
CoApp 支持并完成直出分析（无"基础字段先返回 + 后续补全"阶段）
   ↓
meta 完成后一次性回传完整字段集，Detected 列表刷新视频卡片
```

**列表规则**：

- 无跨 Origin，单站点累计
- Detected 列表上限 `50`
- 同一视频以最终分析结果为准，不拆"基础字段版"与"补全字段版"
- 下载任务进行中仍可继续分析新视频（不阻断检测）
- URL 变化后的 CoApp 判断属于后台刷新，不占用主区域显示 `Detecting videos...`
- CoApp 返回不支持、无视频、超时或不回传时，不把已有视频卡片强制清空

**历史流程记录（2026-06-08 前默认口径）**：

```
URL 变化
   ↓
Detected 主区域显示 Detecting videos...
   ↓
插件将当前 URL 发给 CoApp
   ↓
CoApp 判断支持 / 不支持并返回
   ↓
支持则进入分析流程，不支持则显示不支持
```

该流程容易让 home / search / account 等非视频页频繁触发 CoApp，并在 CoApp 不回传时造成长期 loading。现行规则改为后台刷新 + 稳定空态 / 保留旧结果。

**Codec 切换重新分析**（适用于支持多 codec 的站点，如 Netflix）：

- 切换 `Video Codec` 时需重新请求 CoApp
- 切换过程中展示独立加载态
- 若切换中用户跳到新视频，旧视频本次切换应取消，回退到最近稳定结果

---

## 四、下载调度

| 维度 | 规则 |
| --- | --- |
| 发起方式 | 批量发起 |
| 并发数 | `1`（串行执行） |
| 队列 | FIFO |
| Retry | 回队头 |
| 进度回传 | CoApp 上报百分比 / 速度 / 剩余时间 |
| 任务粒度 | 单视频按视频；Playlist 按 `Season` 维度进入 Downloads |

**重复任务**：

- 已在下载中的 playlist 任务不做额外覆盖标记
- 重复发起同类任务时跳转到 Downloads，不覆盖既有任务卡片

---

## 五、任务状态机

```
[新任务] → Pending → Downloading → Completed
                ↓         ↓
              Cancel    Failed → Retry → Pending
```

| 状态 | 说明 | 可操作 |
| --- | --- | --- |
| Pending | 等待槽位 / 环境检查 | Cancel |
| Downloading | 正在传输（占用唯一并发槽） | Cancel |
| Completed | 文件写入成功，归档到 Downloaded | Open Folder |
| Failed | 阻断性错误（网络 / IO / 权限 / 逻辑 / 超时） | Retry |
| Canceled | 用户主动取消 | — |

`Retry` 重置为 `Pending`，按 FIFO 重新排队。

---

## 六、登录中断规则

用户在使用过程中退出登录或登录态失效时，按下列规则处理（不一刀切清空所有任务）：

| 区域 | 行为 |
| --- | --- |
| 检测 | 停止检测 |
| Detected 列表 | 清空（已检测结果不允许重新发起新任务） |
| Downloading | 已在执行的任务继续 |
| Pending | 不启动新任务 |
| Failed | 禁止重试，引导重新登录 |
| Downloaded | 保留历史记录 |

---

## 七、配额扣减

详见 [06_business_rules.md](06_business_rules.md)。基线规则：

- 任务发起时进入**预扣减**流程
- 任务 `Completed` → 扣减确认
- 任务 `Failed` / `Canceled` → 自动返还
- `Retry` 视当前剩余额度重新判断，不重复预占

---

## 八、变体 — M3U8 协议特例

M3U8 插件曾在标准 netflix_mode 基础上单独增加**插件侧页面结构预判断**。2026-06-08 起，页面过滤与后台 CoApp 刷新已成为所有非 `ytdlp_mode` 插件的默认规则；M3U8 仍保留更严格的页面结构判断与 20 秒 CoApp 分析超时。

```
用户进入页面
   ↓
插件先做网页结构判断 ────────→ 非视频页：按新规则保持空态或保留旧结果，不进 CoApp
   ↓ 通过
进入标准 CoApp 分析流程（含 20 秒超时）
   ↓
超时或 CoApp 返回不支持 → 无旧结果保持空态；有旧结果保留旧结果；必要时在插件弹窗内引导前往 StreamFab 客户端
   ↓ 正常
回到标准 netflix_mode 检测 / 下载流程
```

其余逻辑（下载调度、登录中断、配额扣减、状态机）与 netflix_mode 一致。

---

## 九、变体 — MPD 协议特例

MPD（MPEG-DASH manifest）插件覆盖跨站点的 MPD 协议视频。

- 协议层：MPD manifest 解析、DRM key 处理由 CoApp 完成
- 内容范围：1080p MP4 / MKV（DRM 边界由站点策略决定）
- License Info 文案：以"MPD 协议下载"为口径，不绑定具体站点
- 其余逻辑与 netflix_mode 一致

---

## 十、错误处理（站点专属错误码示例）

通用错误处理见 [11_user_flows_and_error_handling.md](11_user_flows_and_error_handling.md)。netflix_mode 下站点专属错误码举例：

- **Error 330**（Netflix）：最近两个月缓存 key 视频对 Trial 用户受限
  - 由 CoApp 判定，固定文案走多语言包
  - 失败不扣次
  - 不再额外弹"最近两个月限制下载"旧阻断弹窗

各插件如有自己的错误码，写入插件 `plugin_differences.md` 与 `requirements/`，不在本基线中维护。

---

## ytdlp_mode
> 适用插件：Video（通用 yt-dlp 下载器）
> 检测模式归属表见 [../../READING_MAP.md](../../READING_MAP.md)
> 字段级实现参考：Video 插件 `plugin_differences.md` + `requirements/`（活样例）
> 关联：[netflix_mode](#netflix_mode)、[11_user_flows_and_error_handling.md](11_user_flows_and_error_handling.md)、[06_business_rules.md](06_business_rules.md)

---

## 一、模式定义

| 维度 | 取值 |
| --- | --- |
| 核心特征 | 支持预分析 |
| 分析方式 | 预分析（多 Origin 预探测）+ CoApp 分析 |
| 检测与下载关系 | 检测与下载可并行 |
| 站点池 | 基于开源 `yt-dlp` 支持的站点 |
| 业务对应 | 通用下载器（非 VIP 服务） |

---

## 二、检测流程

```
打开插件（Popup / Sidebar）
   ↓
插件对当前页执行 yt-dlp 解析（多 Origin 探测）
   ↓
预分析返回基础元数据（标题 / 缩略图 / 时长）
   ↓
Detected 区域展示视频卡片
   ↓
用户点击展开 / Download → CoApp 补全完整字段（Format / Codec / Audio / Subtitle）
```

**列表规则**：

- **Origin 为单位**：Detected 页以 Origin（域名）为单位隔离；同 Origin 视频累加，跨 Origin 重新检测
- 排序：按检测时间倒序（最新在最上）
- 数量限制：受面板高度约束，超出滚动加载
- Detected 与 Downloads 状态独立（同一视频可同时存在于两边）

**Detected 状态机**（异常分支多于 netflix_mode）：

| 状态 | 表现 |
| --- | --- |
| 检测中 | `Detecting videos...` 动画 |
| 新增内容加载中 | 在现有结果基础上继续补充，不打断浏览 |
| 空状态 | `No videos detected` + `Force Refresh` |
| 未登录 | 引导登录 |
| 未安装 CoApp | 引导安装 |
| CoApp 有更新 | 提示更新 |
| 已装 CoApp 但未检测到 | 提示检查页面 |
| DRM 视频 | `Protected Video Content`，引导桌面客户端 |
| YouTube 限制（Chrome 商店版） | `Video on YouTube`，引导 Edge / 官网 |
| Playlist | 显示剧集 Icon，`Select Episodes` 进入批量弹窗 |

---

## 三、下载调度

| 维度 | 规则 |
| --- | --- |
| 并发数 | `5`（超过进入 Pending 队列） |
| 队列策略 | 超过 5 自动 Pending，不报错 |
| Turbo-Speed | 付费权益，订阅用户默认可用；本身不产生独立扣点 |
| 历史记录 | Downloaded 页最多保留最近 `20` 条；超出移除旧记录（磁盘文件保留） |

---

## 四、阻断校验三阶段

ytdlp_mode 下点击 `Download` 后的校验链路：

### 阶段一 · 权益与配额校验（**阻断**，同步）

校验项：
- 登录与授权状态有效
- 试用用户剩余次数 > 0（非 Always Free 场景）
- 订阅用户未过期，且当日剩余额度 > 0

失败处理：
- 试用次数耗尽 → `Free Trial Completed`，引导升级
- 订阅过期 → `Subscription Expired`，引导续费
- 订阅当日额度用尽 → `You've reached today's download limit (100). Downloads will be available again tomorrow.` 按钮 `Got it`

失败结果：流程终止，不创建任务，停留 Detected 页。

### 阶段二 · 配额预占（与任务创建同步）

- 创建任务时预占 1 个配额（Reserve）
- 任务 `Completed` → 永久扣减
- 任务 `Failed` / `Canceled` → 自动返还
- `Retry` 不重复预占

### 阶段三 · 环境检查（**非阻断**，异步）

- CoApp 连接 → 未连接：`Failed` + `Error: CoApp not connected` + `Retry`
- 目标磁盘空间 → 不足：`Failed` + `Error: Insufficient disk space` + `Retry`

---

## 五、任务状态机

```
[新任务] → Pending → Downloading → Completed
                ↓         ↓
              Cancel    Failed → Retry → Pending
```

| 状态 | 触发条件 | 资源 | 展示 |
| --- | --- | --- | --- |
| Pending | 并发数 ≥ 5 或环境检查未完成 | 不占槽 | `Waiting in queue...` |
| Downloading | 槽位可用 + 环境检查通过 | 占 1 槽 | 进度条 / 百分比 / 速度 / 剩余时间 |
| Completed | 文件写入成功且校验通过 | 释放槽 | 移到 Downloaded 分组 + `Open Folder` + 系统通知 |
| Failed | 网络 / IO / 权限 / 逻辑 / 超时 | 释放槽 | 红色错误码 + `Retry` |
| Canceled | 用户主动 | 释放槽 | — |

任务创建后初始状态 `Pending`，新任务插入 Downloads 顶部，Downloads Tab 气泡数 +1。

---

## 六、Always Free 路径（仅官网版 / Edge 商店版）

ytdlp_mode 独有的免配额路径：

- 条件：YouTube `< 720p` 且关闭 Turbo
- 扣点：`0 cost`
- 即使 Trial 点数为 0，该能力仍可使用

**Chrome 商店版例外**：不支持任何 YouTube 下载（政策限制），在 YouTube 页面显示 `Video on YouTube` 限制提示，引导 Edge 或官网版本。

---

## 七、渠道差异矩阵

| 渠道 | YouTube 下载 | 更新方式 |
| --- | --- | --- |
| 官网版（独立网站包） | ✅ 完整功能 | 手动下载安装 |
| Chrome Web Store 版 | ❌（政策限制） | 商店自动更新 |
| Edge Add-ons 版 | ✅ 完整功能 | 商店自动更新 |

非 YouTube 下载在三个渠道一致：按通用规则执行。

---

## 八、Trial 扣减规则（ytdlp_mode 特有）

- 非 YouTube 下载：扣 `1` 点
- YouTube ≥ 720p 或纯音频：扣 `1` 点
- Always Free 路径（仅官网 / Edge）：`0` 点

权益总量：

- Trial：最多 `5` 次（注：netflix_mode 是 3 次）
- Premium：总量无限，每日上限 `100` 次

---

## 九、展示模式

插件支持两种展示方式，共享同一套主框架（`Detected` + `Downloads`）：

| 模式 | 适用场景 |
| --- | --- |
| Popup | 快速查看与发起下载 |
| Sidebar | 持续查看检测结果与下载队列 |

切换前后保持相同核心结构，不改变功能入口；用户无需重新理解 `Detected / Downloads` 逻辑。

---

## 十、与 netflix_mode 的核心区别

| 维度 | netflix_mode | ytdlp_mode |
| --- | --- | --- |
| 预分析 | ❌ | ✅ |
| Origin | 单 Origin | 多 Origin 探测 |
| 内容覆盖 | 单站点 / 单协议（M3U8 / MPD 含多站点） | yt-dlp 站点池 |
| 业务对应 | VIP 服务 | 通用下载器 |
| 并发上限 | `1`（串行） | `5` |
| Detected 上限 | `50`（单站点累计） | 受面板高度约束（多 Origin 隔离） |
| Trial 配额 | `3` 次 | `5` 次 |
| Premium 日上限 | `100` | `100` |
| Always Free 路径 | ❌ | ✅（YouTube < 720p + 关 Turbo） |
| DRM 下载 | ✅（站点支持范围内） | ❌（统一引导客户端） |
| 历史记录上限 | 不限 | `20` 条 |
| Turbo-Speed 开关 | ❌ | ✅ |
