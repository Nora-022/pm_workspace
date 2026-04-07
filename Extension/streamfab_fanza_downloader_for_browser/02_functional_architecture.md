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
- 存在 Downloading 任务时暂停新检测

### 模块：下载任务处理
- 批量发起
- 串行处理（并发 1）
- 队列 FIFO
- Retry 回队头
- 进度/状态由 CoApp 回传

### 模块：权益与授权控制
- Trial 3 次
- Premium 每日 100
- 最近两个月缓存 key 视频：Trial 受限（Error 330）

## 核心依赖
1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内
