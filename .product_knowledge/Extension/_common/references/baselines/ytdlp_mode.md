# ytdlp_mode 检测模式基线

> 适用插件：Video（通用 yt-dlp 下载器）
> 检测模式归属表见 [../../READING_MAP.md](../../READING_MAP.md)
> 字段级实现参考：Video 插件 `diff_summary.md` + `requirements/`（活样例）
> 关联：[netflix_mode.md](netflix_mode.md)、[../user_flows.md](../user_flows.md)、[../error_handling.md](../error_handling.md)、[../business_rules.md](../business_rules.md)

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
