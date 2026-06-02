# 16 新插件启动检查清单（New Plugin Kickoff Checklist）

> 本文件是 `_common` 编号体系下的正式 common 规则正文；`references/` 不再维护本主题的现行规则。

---

## 用途
用于新建 StreamFab 浏览器插件项目时的标准启动检查，确保输入、目录、模板和首轮文档齐备。

## 检查项
1. 确认基础输入
- 目标站点 / 服务标识
- 显示名称
- 继承的模板插件
- 是新建目录还是修复已有目录

2. 初始化插件目录
- 创建 `streamfab_<service>_downloader_for_browser`
- 在根目录主索引中登记插件
- 确认 `README.md`、`plugin_differences.md`、`CHANGELOG.md`、`requirements/index.md`、`store_listing.md` 已生成

3. 确认模板基线
- 明确当前使用哪个现有插件作为模板基线
- 在 `plugin_differences.md` 中记录差异摘要和关键事实索引

4. 准备共享输入
- 按需读取 `_common/templates/` 下的模板
- 按需读取 `_common/10_detection_modes.md` 到 `_common/15_glossary.md` 下的正式 common 规则

5. 生成插件本地研究资料
- 在 `<plugin>/requirements/site_research_notes.md` 下创建站点研究文件
- 记录平台定位、内容结构、账号模型、媒体类型、设计影响

6. 生成插件工作文档
- 在 `<plugin>/requirements/` 下创建需求工作文档
- 替换模板占位符，确保写入插件特有事实

7. 下沉已确认结论
- 将稳定插件差异写入 `plugin_differences.md` 与 `requirements/`
- 插件特有差异不要停留在 `_common` 层

8. 最终检查
- 插件目录存在且路径正确
- 根目录主索引已登记
- `requirements/` 已有首轮内容
- 共享文件被引用而不是无意义复制
