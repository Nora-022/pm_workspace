# [StreamFab 浏览器插件] - [U_NEXT] - 需求文档

## 全局变量
替换完成后请删除本模块。

| 变量 | 用途 | 当前值 |
|---|---|---|
| {SiteName} | 对应服务名称 | U_NEXT |
| {BannerContentZH} | Dashboard-License Info 页面顶部 banner 文案 | 待补充 |
| {BannerContentEN} | Dashboard-License Info 页面顶部 banner 文案 | 待补充 |

- 原型链接：
- 需求地址：
- 初始化说明：本文件基于 `common_templates/plugin_requirement_template.md` 创建。

## 文档更新记录

| 版本 | 日期 | 修改人 | 修改说明 |
|---|---|---|---|
| v0.1 | 2026-03-19 | Codex | 初始化 U-NEXT 需求文档模板 |

## 1. 产品信息

### 1.1 安装程序信息

| 信息 | 说明 |
|---|---|
| 插件产品名 | StreamFab U-NEXT Downloader for Browser |
| CoApp 安装程序名 | StreamFab U-NEXT Coapp |
| app_id | streamfab_for_browser |
| client id - 主站插件（发布） | 待补充 |
| client id - 主站 CoApp Win x64 | 待补充 |
| client id - 主站 CoApp Mac | 待补充 |
| client id - 独立站插件（发布） | 待补充 |
| client id - 独立站 CoApp Win x64 | 待补充 |
| client id - 独立站 CoApp Mac | 待补充 |
| option id - Win | 待补充 |
| option id - Mac | 待补充 |

### 1.2 Mlink 链接

| 渠道 | 类型 | 链接 |
|---|---|---|
| 主站 | 插件包 | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U_NEXT_Downloader_for_Browser |
| 独立站 | 插件包 | https://streamfab.com/mlink?p=StreamFab_U_NEXT_Downloader_for_Browser |
| 主站 | CoApp Win | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U_NEXT_Coapp |
| 独立站 | CoApp Win | https://streamfab.com/mlink?p=StreamFab_U_NEXT_Coapp |
| 主站 | CoApp Mac | https://www.dvdfab.cn/mlink/download.php?g=StreamFab_U_NEXT_Coapp_for_Mac |
| 独立站 | CoApp Mac | https://streamfab.com/mlink?p=StreamFab_U_NEXT_Coapp_for_Mac |

## 2. 相关文档

- 【SF 插件】Common 逻辑规范
- UI 需求说明文档
- 目标站点调研文档

## 3. 当前待补充项

| 一级模块 | 待补充内容 |
|---|---|
| 登录&授权 | U-NEXT 登录态、会员态、试用态 |
| 用户权益 | Trial / Premium / 日上限 |
| 视频分析 | 检测前置条件、meta 字段 |
| 下载配置项 | 清晰度、音轨、字幕、容器 |
| 视频检测 | 触发时机、检测列表、跨页面策略 |
| 视频下载 | 队列、并发、重试、失败码 |
| Dashboard | Banner 文案、产品名、跳转链接 |
| Setting | U-NEXT 差异化配置项 |

## 4. 备注

- 当前文件为初始化骨架，不代表需求已定版。
- Netflix 模板中的业务结论需按 U-NEXT 实际情况逐项确认后再迁移。
