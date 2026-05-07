# context/design_principles.md

主文档：`../05_design_principles.md`

用途：在做页面、交互、文案评审前快速加载设计原则。

## 快速摘要
1. 框架稳定，模式复用
- Popup 与 Sidebar 共用同一套 `Detected / Downloads` 主结构。

2. 意图优先，异步校验
- 用户点击下载后先创建任务，再在局部反馈技术环境问题。

3. 状态完整，反馈就地
- 检测中、空状态、未登录、CoApp 异常等状态都应有独立承接，不应混在一起。

4. 上下文严格绑定
- `Detected` 列表必须绑定当前页面与当前 Origin，避免跨页面残留错误结果。

5. 视觉识别稳定
- Logo、橙色主操作色、蓝色信息色和双 Tab 框架共同构成产品公共 UI 识别。
