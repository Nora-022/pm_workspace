# 02 功能架构详解（Functional Architecture）

## 模块总览
- OnlyFans 内容检测与 meta 获取
- 下载任务处理（插件 + CoApp）
- 定时 / 自动下载调度
- 权益与授权控制

## 检测与分析模块
- 打开视频 → 自动分析 URL，无需手动触发
- 不弹出分析弹窗，分析结果直接展示在插件内
- 分析速度快（UGC 内容 meta 信息相对较少）
- 支持 Message videos 和 DRM video
- 无跨 Origin
- 检测与下载并行：Downloading 任务存在时仍允许发起新检测
- 无预分析（预设）

## 下载模块
- 批量发起
- 串行执行（并发 1）（预设）
- FIFO（预设）
- Retry 回队头（预设）
- 下载中展示：分辨率标签、codec 标签、速度、进度、文件大小（不展示剩余时间）
- 元数据保存（title / season / episode / cast / poster）
- 去广告处理（含广告内容导出时自动去除）

## 定时 / 自动下载模块
- 支持按天自动下载新内容
- 支持按周自动下载新内容

## 核心依赖
1. 已安装 CoApp（StreamFab OnlyFans Coapp）
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内
