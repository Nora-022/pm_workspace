# 07 技术限制与约束（Technical Constraints）

## 系统与平台
- Windows 10/11
- macOS 当前不支持（提示不可用）

## 分发渠道
- Chrome / Edge / 官网版本
- 三渠道功能一致

## 核心依赖
1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内

## 能力边界
- 仅支持 Fanza 站点
- 支持 Fanza 站点 DRM 下载（产品定义范围内）

## 检测/下载边界
- 无预分析
- 无跨 Origin
- Downloading 存在时暂停新检测
- Detected 上限 50

## 调度边界
- 批量发起
- 串行执行（并发 1）
- Retry 回队头

## 配置边界
- 下载区域仅 5 个 meta 项（Resolution/VideoCodec/AudioCodec/Language/Subtitles）
- Dashboard 为通用设置项（Extension + CoApp）
