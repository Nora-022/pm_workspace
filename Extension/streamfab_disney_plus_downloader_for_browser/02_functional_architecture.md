# 02 功能架构详解（Functional Architecture）

## 模块总览
- Disney 检测与 meta 获取
- 下载任务处理（插件 + CoApp）
- 权益与授权控制

## 检测模块
- 前置条件：Disney Plus 站点 + 已登录 + 已播放
- 无预分析，meta 完成后一次性展示
- 无跨 Origin
- Detected 列表上限 50
- Downloading 存在时暂停新检测

## 下载模块
- 批量发起
- 串行执行（并发 1）
- FIFO
- Retry 回队头
- 进度/状态由 CoApp 回传

## 权益模块
- Trial 3 次
- Premium 每日 100

## 核心依赖
1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内
