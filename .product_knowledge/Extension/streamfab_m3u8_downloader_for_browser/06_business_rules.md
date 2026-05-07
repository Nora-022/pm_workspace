# 06 业务规则（Business Rules）

## 基线说明

M3U8 插件的业务规则与 Netflix 插件完全一致，以下内容直接沿用同一套逻辑，不存在插件级差异。

## 商业方案

- 试用方案：`30-Day Free Trial`，免费，每个服务最多下载 3 个视频
- 付费方案价格以产品页为准（不单独维护价格数字，避免与实际售价脱节）：
  - 主站：https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=652
  - 独立站：https://streamfab.com/streamfab-for-browser.htm?open=655

## 权益口径

- M3U8 Trial：3 次
- M3U8 Premium：每日 100 次上限

## 账号与设备授权

- 沿用产品线通用授权策略

## 配额与限制

- Trial 受额度限制
- Premium 用户存在单日 100 次上限

## 配额扣减机制

- 发起任务时进入预扣减流程
- 成功后确认扣减
- 失败不扣减
- Retry 视当前剩余额度重新判断

## 登录中断后的业务规则

- `Detected` 中已有结果：登出后不允许继续从该区域启动新任务
- `Detected` 为空：直接提示登录
- `Downloading`：允许继续
- `Failed`：禁止重试
- `Downloaded`：正常保留与展示

## 试用与限制弹窗

- Trial 相关弹窗中的下载次数统一为 `3`

## 订阅状态与阻断提示

订阅权益说明（弹窗 / Dashboard）：
- Access to all features
- High speed batch processing
- Lossless video quality
- Professional technical support
- Lossless audio quality
- Free updates within period of validity

## 数据上报

- 插件侧上报逻辑沿用产品线通用方案
- 通过 M3U8 插件 id（`streamfab_for_browser_drm_m3u8`）区分统计对象
