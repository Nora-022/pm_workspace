# Error Handling

## 原则
1. 错误必须说明原因
2. 错误必须说明下一步动作
3. 能局部提示就不要全局打断

## 典型错误场景

### 未检测到视频
- 建议文案：
  - `No recordable video detected on this page.`
- 建议动作：
  - 检查是否已经开始播放
  - 刷新页面后重试

### 当前站点不支持高速
- 建议文案：
  - `High-speed recording is not available for this website.`
- 建议动作：
  - 自动降级到 1x

### 保存失败
- 建议文案：
  - `Failed to save the recording to local storage.`
- 建议动作：
  - 检查磁盘空间
  - 检查输出目录权限

### 录制失败
- 建议文案：
  - `Recording failed. Please replay the video and start recording again.`
- 建议动作：
  - 返回视频播放页
  - 重新播放目标内容
  - 重新发起录制
- 说明：
  - 当前版本不支持一键重试
