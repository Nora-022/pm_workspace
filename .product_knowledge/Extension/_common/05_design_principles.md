# 05 设计原则（Design Principles）

## 设计定位

StreamFab 浏览器插件是工具型产品。界面应以任务效率、状态可读性和稳定组件为优先，不做营销式大面积装饰。

## 核心原则

1. **任务优先**：Popup 聚焦检测、配置、下载、查看任务；Dashboard 才承载全局信息和设置。
2. **边界清晰**：Popup、Dashboard、Notification、Blocking Modal、CoApp Install Flow 是五类不同表面，不能混用。
3. **真实反馈**：检测、分析、下载、保存、错误都要表达真实状态，不显示伪进度或占位 tag。
4. **轻量一致**：通用颜色、字体、圆角、描边、阴影和组件尺寸复用统一基线。
5. **差异最小化**：插件只记录偏离 common 的业务和视觉差异，不重复抄写 common 规范。

## 视觉基线

- 浅色、轻量、工具型视觉语言。
- 主背景白色和浅灰为主。
- 主 CTA 使用 Brand Orange `#FA8A04`。
- 信息态和选中态使用 Assist Blue `#1E9CEB`。
- 圆角主要使用 `8px` 和 `4px`。
- 字体：英文 Arial / Helvetica Neue，中文 PingFang SC。

## 组件规范

- Header、Tab Bar、Content Area、Footer 结构稳定。
- Button、Select、Checkbox、Radio、Tabs 使用 common 尺寸和状态。
- 可变 tag 只有真实值存在时显示，不使用 `N/A` 或 `--`。
- Blocking Modal 只用于真实阻断，不用于普通成功或失败反馈。

## 详细来源

- [12_ui_ux_visual_layout_specs.md](12_ui_ux_visual_layout_specs.md)
