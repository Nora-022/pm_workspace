# netflix_mode 检测模式基线

> 适用插件：Netflix、Disney+、U-NEXT、Fandango at Home、M3U8（变体）、MPD（变体）、Amazon、Hulu、Fanza、OnlyFans、MyFans、TVer
> 字段级实现参考：Netflix 插件 00-07（活样例）
> 关联：[ytdlp_mode.md](ytdlp_mode.md)、[../user_flows.md](../user_flows.md)、[../error_handling.md](../error_handling.md)

## 一、模式定义

- **核心特征**：不支持预分析
- **分析方式**：直出分析（CoApp 直接对当前页 / 单 Origin 分析）
- **并行能力**：下载与分析可并行
- **对应业务**：StreamFab 客户端 VIP 服务

## 二、检测 / 下载流程

（后续从 Netflix 00-07 抽取填充）

## 三、变体 — M3U8 协议特例

M3U8 在标准 netflix_mode 基础上，插件侧增加一段"页面结构预判断"：

1. 先从网页结构判断当前页面是否为视频页；非视频页直接显示不支持，不进入 CoApp 分析
2. 通过预判断后，进入标准 CoApp 分析流程（含 20 秒超时）
3. 超时或 CoApp 返回不支持时，在插件弹窗内引导前往 StreamFab 客户端

其余逻辑（下载调度、登录中断、配额扣减）与 netflix_mode 一致。

## 四、变体 — MPD 协议特例

（后续填充）
