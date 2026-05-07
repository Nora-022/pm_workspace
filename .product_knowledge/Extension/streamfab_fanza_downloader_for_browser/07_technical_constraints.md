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
- 检测与下载可并行，Downloading 不阻断新检测
- Detected 上限 50

## 调度边界
- 批量发起
- 串行执行（并发 1）
- Retry 回队头

## 配置边界
- 下载区域仅 1 项 Video（FANZA 原生画质标签，画质等级或技术规格格式）
- Dashboard Extension 为通用 7 项配置（与基线结构一致，无 FANZA 单独配置项）

## Mlink 下载链接

| 类型 | 平台 | 渠道 | 链接 |
|---|---|---|---|
| 插件包 | — | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fanza_Downloader_for_Browser |
| 插件包 | — | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fanza_Downloader_for_Browser |
| CoApp | Win | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fanza_Coapp |
| CoApp | Win | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fanza_Coapp |
| CoApp | Mac | 主站 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_Fanza_Coapp_for_Mac |
| CoApp | Mac | 独立站 | https://streamfab.com/mlink?p=StreamFab_Fanza_Coapp_for_Mac |
