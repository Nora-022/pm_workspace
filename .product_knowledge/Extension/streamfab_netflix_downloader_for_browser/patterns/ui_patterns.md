# patterns/ui_patterns.md

## 页面模式

### 模式：Detected Header Hint Icon（Netflix）
- 使用场景：需要向用户说明“下载与分析可并行”这一能力时。
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
  - 文案必须与当前并行规则一致，不能继续表达“下载中暂停检测”
- 可访问性：支持 Tab 聚焦，focus 态可显示提示
- 常见错误示例：
  - icon 仅在下载中才显示，导致用户平时看不到规则
  - tooltip 文案仍沿用旧规则，误写成“下载中暂停检测”
