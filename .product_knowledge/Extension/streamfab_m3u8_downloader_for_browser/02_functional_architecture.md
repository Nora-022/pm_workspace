# 02 功能架构详解（Functional Architecture）

## 基线说明

M3U8 插件以 Netflix 插件为功能架构基线，以下只记录差异点。与 Netflix 一致的模块不重复展开。

## 功能模块总览

- M3U8 检测与分析（含异步分析前置流程）
- 下载任务处理（插件 + CoApp）
- 下载配置字段联动
- Dashboard 与 Setting 联动
- 权益与授权控制

## 模块规格

### 模块：M3U8 检测与分析（与 Netflix 的差异）

Netflix 检测流程：URL 判断支持 → 直接展示 meta 结果。

M3U8 检测流程：增加"分析中"阶段，判断"是否支持下载"后置于分析完成之后：

**状态流**

1. **检测中**：网页检测到视频线索，插件向 CoApp 发送上下文
2. **分析中**：CoApp 开始分析，通过 `LoadingDialog` 接口回传进度
3. **分析结果**：
   - 支持下载 → 插件展示视频卡片
   - 不支持下载：
     - 插件内已有视频 → toast 提示（3s 自动消失，支持手动关闭）
     - 插件内无视频 → 全局提示
   - 分析失败 → toast 提示（3s 自动消失，支持手动关闭）
     - EN: Analysis Failed. Please retry or contact us for help.
     - ZH: 分析失败，请重试或联系我们获得帮助。

### 模块：下载配置字段

配置项由分析结果驱动，当前已确认字段：

| 配置项 | 说明 |
|---|---|
| Resolution | width × height-bitrate |
| Language | Language + video codec |
| Subtitles | None / English |

### 模块：下载任务状态展示

| 状态 | 展示字段 |
|---|---|
| 待下载 / 下载成功 | 分辨率、音频编码、文件大小 |
| 排队下载 / 下载中 / 下载失败 | 仅分辨率 |

### 模块：Setting

Setting 结构分为 Extension 和 Coapp，配置项顺序：

1. Language
2. Video Format
3. Video Resolution
4. Pre-select Audio Language
5. Audio Channel
6. Pre-select Subtitle Language
7. Subtitle Action

### 模块：权益与授权控制

- Trial：3 次
- Premium：每日 100 次
- 配额扣减机制与登录中断规则见 `06_business_rules.md`

## 核心依赖

1. 已安装 CoApp
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内
