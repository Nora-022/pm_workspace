# 需求文档索引

## 本地工作文档

| 文档 | 文件 | 状态 | 说明 |
|---|---|---|---|
| 客户端方案拆解 | `[StreamFab 浏览器插件] - [{display_name}] - 客户端方案拆解.md` | 待填写 | 站点调研 / 产品页事实提取完成后，由产品或客户端负责人填写 |
| 需求文档 | `plugin_requirement.md` | 待生成 | 用户填完客户端方案拆解后，由 workflow 基于 common 模板创建并回填 |
| UI 需求说明 | `plugin_ui_requirement.md` | 待生成 | 用户填完客户端方案拆解后，由 workflow 基于 common 模板创建并回填 |

## 使用规则

- 新模式下不创建飞书文档，全部工作文档均使用本地 Markdown。
- 初始化完成后，workflow 先做站点调研 / 产品页事实提取。
- 产品页事实提取完成后，再由用户填写客户端方案拆解 MD。
- 用户确认填写完成后，再由 `streamfab-extension-workflow` 读取客户端方案拆解，并生成 / 回填需求文档和 UI 需求说明文档。
