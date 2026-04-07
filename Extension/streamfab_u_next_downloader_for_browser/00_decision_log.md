# 00 决策记录（Decision Log）

> 仅记录已经定版的 U-NEXT 产品决策。模板继承内容不算定版。

## 已定决策
1. 命名规范
- 目录名使用 `streamfab_u_next_downloader_for_browser`
- 服务标识使用 `u_next`
- 对外显示名使用 `U-NEXT`

2. 初始化方式
- 当前项目基于 `streamfab_netflix_downloader_for_browser` 模板建立
- Netflix 模板仅作为单站点插件预设参考，不代表 U-NEXT 已确认规则

## 待补决策
1. 检测模型
- 是否预分析
- 是否跨页面累计
- 检测上限

2. 下载模型
- 批量下载能力
- 并发策略
- 重试策略

3. 账号与会话中断
- 未登录 / 退出登录 / 订阅失效下的任务处理规则

4. 权益与限制
- Trial 次数
- Premium 上限
- DRM / 新片限制 / 错误码策略

5. 配置项边界
- 下载区由哪些 meta 驱动
- Setting 中哪些项需要 U-NEXT 差异化
