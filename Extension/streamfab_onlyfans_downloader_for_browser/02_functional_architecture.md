# 02 功能架构详解（Functional Architecture）

## 模块总览（预设）
- Onlyfans 检测与 meta 获取
- 下载任务处理（插件 + CoApp）
- 权益与授权控制

## 检测模块（预设）
- 前置条件：Onlyfans 站点 + 已登录 + 已播放
- 无预分析
- 无跨 Origin
- Downloading 存在时暂停新检测

## 下载模块（预设）
- 批量发起
- 串行执行（并发 1）
- FIFO
- Retry 回队头

## 核心依赖（预设）
1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内
