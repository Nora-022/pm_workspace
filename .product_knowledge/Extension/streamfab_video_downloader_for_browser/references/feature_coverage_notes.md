# feature_coverage_notes.md

用途：汇总 ytdlp 插件当前已确认的核心能力范围，作为产品资料与内容维护时的参考基线。

## 已确认能力
- 多站点视频检测
- 预分析流程
- 按 Origin 组织检测结果
- 批量发起下载
- 最大并发 5
- 下载队列管理
- Trial 与 Premium 权益区分
- 商业级阻断弹窗
- 下载完成通知

## 关键体验特征
- 插件支持两种展示方式：
  - Popup
  - Sidebar
- 检测与下载可并行查看。
- `Detected` 与 `Downloads` 状态独立。
- 任务失败可重试且不重复扣减配额。
- 技术异常优先在任务卡片内反馈。

## Figma 设计稿补充确认
- 一级框架固定为：
  - `Detected`
  - `Downloads`
- 设计稿已明确出现：
  - 视频下载设置弹窗
  - Playlist / 剧集选择弹窗
  - 顶部用户信息模块
  - 空状态
  - 未登录
  - 未安装 CoApp
  - CoApp 有更新
  - 权限 / 配额不足弹窗
  - 新增内容加载中

## 设计稿可见的配置维度
- `Format`
- `Video Codec`
- `Audio Codec`
- `Subtitle`

## 不在当前能力范围内
- DRM 下载
- Chrome 商店版 YouTube 下载
- 插件端设备解绑
- 插件端退款处理
