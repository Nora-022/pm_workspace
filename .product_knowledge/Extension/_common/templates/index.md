# Templates 索引

> 新插件初始化与差异化文档使用的可复制模板。
> 由 `_common/skills/streamfab-extension-init-skill/` 和 `_common/scripts/scaffold_plugin.py` 在 init / workflow 阶段读取。

## 文件清单

| 模板 | 用途 | 占位符 |
| --- | --- | --- |
| [`plugin_requirement_template.md`](plugin_requirement_template.md) | 主需求文档模板（11 项差异维度，含"价格与权益"、"Dashboard - Banner 文案"等结构） | `{SiteName}` / `{service_name}` / `{SiteNameMlink}` / `{sitename}` / `{BannerContentEN}` / `{BannerContentZH}` |
| [`plugin_ui_requirement_template.md`](plugin_ui_requirement_template.md) | UI 需求文档模板（主要给 UI 设计师出商店配图） | 同上 |
| [`plugin_store_listing_template.md`](plugin_store_listing_template.md) | Chrome / Edge 商店上架文案模板 | 同上 + Search terms 占位 |
| [`plugin_research_template.md`](plugin_research_template.md) | 站点调研笔记模板 | 同上 |

## 占位符替换规则

详见 [`../FRAMEWORK.md § 五·命名规则`](../FRAMEWORK.md#命名规则流媒体服务名大小写)。简表：

| 占位符 | 用途 | 格式 |
| --- | --- | --- |
| `{SiteName}` | 插件产品名、CoApp 安装程序名、License Info | 保留展示名原始大小写（如 `U-NEXT`） |
| `{service_name}` | app id | snake_case（如 `u_next`） |
| `{SiteNameMlink}` | mlink 链接产品名片段 | 展示名单词用 `_` 连接 |
| `{sitename}` | 产品页 URL、What's New、跳转链接 slug | 小写 + 连字符（U-NEXT 例外用 `unext`，无连字符） |

**DRM-MPD 例外**：安装程序名用空格 `DRM MPD`、mlink 用连字符 `DRM-MPD`、app id 用下划线 `drm_mpd`。

## 已废弃模板

- `plugin_client_plan_template.md` — 客户端方案拆解改走飞书副本，本地不再维护。详见 [`../FRAMEWORK.md § 三·H`](../FRAMEWORK.md#h-外部数据源与本地快照)。

## 流程入口

- 新插件 init：调用 `_common/scripts/scaffold_plugin.py`，由 `_common/skills/streamfab-extension-init-skill/` 编排
- 差异回填：由 `_common/skills/streamfab-extension-workflow-skill/` 在用户完成飞书拆解副本后回填到 `requirements/plugin_requirement.md` 与 `requirements/plugin_ui_requirement.md`
