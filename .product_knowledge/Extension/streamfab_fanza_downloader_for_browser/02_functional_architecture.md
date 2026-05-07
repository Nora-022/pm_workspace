# 02 功能架构详解（Functional Architecture）

## 功能模块总览
- Fanza 检测与 meta 获取
- 下载任务处理（插件 + CoApp）
- 权益与授权控制

## 模块规格

### 模块：Fanza 检测与 meta 获取
- 前置条件：Fanza 站点 + 已登录 + 已播放
- 无预分析：meta 完成后一次性展示
- 无跨 Origin
- Detected 列表上限 50
- 支持检测与下载并行，Downloading 任务不阻断新检测

### 模块：下载任务处理
- 下载配置：1 项 Video（FANZA 原生画质标签，如 `4K (2160p60)`、`高画質(576p)`）
- 批量发起
- 串行处理（并发 1）
- 队列 FIFO
- Retry 回队头
- 进度/状态由 CoApp 回传

### 模块：权益与授权控制
- Trial 3 次
- Premium 每日 100
- 最近两个月缓存 key 视频：Trial 受限（Error 330）

## 元数据保存

下载完成后自动保存：title / season / episode / cast / poster，方便接入 Plex / Kodi / PlayerFab 等媒体库。

## 核心依赖
1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内
