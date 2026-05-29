# Setting 配置项基线（Settings Matrix）

> Dashboard → Settings 中通用 Setting 7 项默认顺序及含义
> 单插件特殊配置项（如 Netflix `Video Codec`、`H264 Profile`）写入插件 `diff_summary.md`
> 关联：[baselines/netflix_mode.md](baselines/netflix_mode.md)、[baselines/ytdlp_mode.md](baselines/ytdlp_mode.md)

---

## 一、通用 7 项默认顺序

| 序 | 配置项 | 含义 |
| --- | --- | --- |
| 1 | `Language` | 插件 UI 语言（28 种） |
| 2 | `Video Format` | 输出容器（如 MP4 / MKV） |
| 3 | `Resolution` | 视频分辨率上限 |
| 4 | `Audio Language` | Pre-select Audio Language |
| 5 | `Audio Channel` | 声道（2.0 / 5.1 等） |
| 6 | `Subtitle Language` | Pre-select Subtitle Language |
| 7 | `Subtitle Action` | 外挂 / 内嵌 / 不下载 |

任何插件的 Setting 列表都从这 7 项开始，按本顺序排列。插件特殊项追加在 7 项之后或合并进对应分组。

---

## 二、通用默认值

| 项 | 默认 |
| --- | --- |
| `Always download the forced subtitle` | 选中 |
| `Pre-select Description Audio if available` | 不选 |
| `Pre-select both 5.1 and 2.0 audios` | 不选 |

---

## 三、Setting 分区结构

Dashboard → Settings 包含三个区：

| 区 | 内容 |
| --- | --- |
| `Extension` | 上述 7 项 + 插件特殊项（与下载配置直接相关） |
| `CoApp` | CoApp 通信与本地行为相关项（输出目录、超时等） |
| `Account` | 账号信息、License Info、订阅入口 |

各插件的 Setting 结构沿用本基线；插件特殊项追加在 `Extension` 末尾。

---

## 四、插件特殊配置项（写入插件 diff_summary.md）

举例（Netflix 在通用 7 项之外有）：

- `Video Codec`（扁平化多 codec 能力）
- `H264 Profile`

其他插件（Amazon / Disney+ / Hulu 等）按其差异另行登记。
