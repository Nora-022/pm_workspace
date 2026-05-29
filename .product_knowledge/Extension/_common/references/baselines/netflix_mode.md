# netflix_mode 检测模式基线

> 适用插件：Netflix / Disney+ / U-NEXT / Fandango at Home / Amazon / Hulu / Fanza / OnlyFans / MyFans / TVer / M3U8（变体）/ MPD（变体）
> 检测模式归属表见 [../../READING_MAP.md](../../READING_MAP.md)
> 字段级实现参考：Netflix 插件 `diff_summary.md` + `requirements/`（活样例）
> 关联：[ytdlp_mode.md](ytdlp_mode.md)、[../user_flows.md](../user_flows.md)、[../error_handling.md](../error_handling.md)、[../business_rules.md](../business_rules.md)

---

## 一、模式定义

| 维度 | 取值 |
| --- | --- |
| 核心特征 | 不支持预分析 |
| 分析方式 | 直出分析（CoApp 对当前页 / 单 Origin 分析） |
| 检测与下载关系 | 下载任务与新视频分析可并行 |
| 业务对应 | StreamFab 客户端 VIP 服务 |
| 默认归属 | 新插件 init 阶段默认归 netflix_mode |

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
用户进入视频页
   ↓
CoApp 接收当前页 URL（单 Origin，不做多 Origin 预探测）
   ↓
CoApp 直出分析（无"基础字段先返回 + 后续补全"阶段）
   ↓
meta 完成后一次性回传完整字段集
   ↓
Detected 列表展示视频卡片
```

**列表规则**：

- 无跨 Origin，单站点累计
- Detected 列表上限 `50`
- 同一视频以最终分析结果为准，不拆"基础字段版"与"补全字段版"
- 下载任务进行中仍可继续分析新视频（不阻断检测）

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

详见 [../business_rules.md](../business_rules.md)。基线规则：

- 任务发起时进入**预扣减**流程
- 任务 `Completed` → 扣减确认
- 任务 `Failed` / `Canceled` → 自动返还
- `Retry` 视当前剩余额度重新判断，不重复预占

---

## 八、变体 — M3U8 协议特例

M3U8 插件在标准 netflix_mode 基础上增加一段**插件侧页面结构预判断**：

```
用户进入页面
   ↓
插件先做网页结构判断 ────────→ 非视频页：直接显示不支持，不进 CoApp
   ↓ 通过
进入标准 CoApp 分析流程（含 20 秒超时）
   ↓
超时或 CoApp 返回不支持 → 在插件弹窗内引导前往 StreamFab 客户端
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

通用错误处理见 [../error_handling.md](../error_handling.md)。netflix_mode 下站点专属错误码举例：

- **Error 330**（Netflix）：最近两个月缓存 key 视频对 Trial 用户受限
  - 由 CoApp 判定，固定文案走多语言包
  - 失败不扣次
  - 不再额外弹"最近两个月限制下载"旧阻断弹窗

各插件如有自己的错误码，写入插件 `diff_summary.md` 与 `requirements/`，不在本基线中维护。
