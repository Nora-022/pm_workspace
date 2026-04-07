# patterns/ui_patterns.md

## 页面模式

### 模式：Detected Header Hint Icon（Fanza）
- 使用场景：下载中禁止新检测时，向用户解释检测暂停原因。
- 布局结构：
  - `* Videos Found` 文案
  - 紧邻右侧 `info` icon
  - icon 触发 tooltip
- 主操作：无（信息提示组件）
- 次操作：点击/悬停查看提示文案
- 交互规则：
  - hover 展示（桌面）
  - click 展示（小窗口触控场景）
  - 点击空白区域关闭
- 文案规则：
  - 使用当前 UI 语言
  - 缺失翻译回退 English (US)
- 可访问性：支持 Tab 聚焦，focus 态可显示提示
- 常见错误示例：
  - icon 仅在下载中才显示，导致用户平时看不到规则
  - tooltip 文案与真实规则不一致（比如仍写“可并行检测”）
