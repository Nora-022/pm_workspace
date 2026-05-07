# 07 技术限制与约束（Technical Constraints）

## 系统与平台
- 当前需求资料覆盖 `Windows / macOS` 资源与分发信息
- 具体上线能力以实际发布版本为准

## 分发渠道
- Chrome / Edge / 官网版本
- 三渠道功能一致

## 核心依赖
1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内

## 能力边界
- 仅支持 Netflix 站点
- 支持 Netflix 站点 DRM 下载（产品定义范围内）

## 检测/下载边界
- 无预分析
- 无跨 Origin
- 支持下载任务进行时继续分析新视频
- Detected 上限 50

## 调度边界
- 批量发起
- 串行执行（并发 1）
- Retry 回队头

## 配置边界
- 下载配置以完整字段集为准：
  - `Video Codec`
  - `Resolution`
  - `Audio Codec`
  - `Language`
  - `Subtitles`
- `Video Codec` 需要支持：
  - `H264 - High Profile`
  - `H264 - Main Profile`
  - `H265 - HDR10`
  - `H265 - Dolby Vision`
  - `VP9`
  - `AV1`
- `Language`、`Subtitles` 需要支持多选
- Dashboard Setting 结构沿用 common，但 Netflix 的 `Extension` 字段需要完整保留

## Playlist 结构边界

- Season 层级必须存在
- Episode 仅展示时长，不展示文件大小

## 不应默认假设

- 不默认截图区域较少时就意味着字段能力更少
- 不默认存在预分析阶段
- 不默认 playlist 可以省略 season 层级
