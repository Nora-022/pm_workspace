# ytdlp_mode 检测模式基线

> 适用插件：Video（通用 yt-dlp 下载器）
> 关联：[netflix_mode.md](netflix_mode.md)、[../user_flows.md](../user_flows.md)

## 一、模式定义

- **核心特征**：支持预分析
- **分析方式**：预分析（多 Origin 预探测）+ CoApp 分析
- **并行能力**：检测与下载可并行
- **多站点**：基于 yt-dlp 支持的站点池

## 二、检测 / 下载流程

（后续从 Video 插件文档抽取填充）

## 三、与 netflix_mode 的核心区别

| 维度 | netflix_mode | ytdlp_mode |
| --- | --- | --- |
| 预分析 | ❌ | ✅ |
| Origin | 单 Origin | 多 Origin 探测 |
| 内容覆盖 | 单站点 / 单协议（M3U8 / MPD 含多站点） | yt-dlp 站点池 |
| 业务对应 | VIP 服务 | 通用下载器 |
