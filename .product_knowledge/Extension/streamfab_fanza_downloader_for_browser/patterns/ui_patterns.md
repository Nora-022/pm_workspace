# patterns/ui_patterns.md

## 模式：Detected Header Hint Icon（Fanza）

- 使用场景：`* Videos Found` 右侧常驻提示 icon，向用户说明当前检测状态或限制信息
- 布局结构：
  - `* Videos Found` 文案
  - 紧邻右侧 `info` icon（常驻，不仅在下载中显示）
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
  - 不再使用"下载中暂停检测"的旧提示文案（Fanza 支持检测与下载并行）
- 可访问性：支持 Tab 聚焦，focus 态可显示提示

## 模式：顶部用户授权信息模块（Fanza）

- 展示核心：邮箱 + 剩余下载次数
- 试用态：邮箱 / `Trial` 标识 / 剩余试用次数 / `Buy Now` 按钮 / Dashboard icon
- 订阅态：邮箱 / 订阅方案（LeftTime / Annual / Fab365）/ 当日剩余次数 / Dashboard icon
- 差异说明：Fanza 不展示头像，与 ytdlp 顶部模块结构不同

## 模式：前置条件引导态（Detected 空态）

- 触发条件：非 Fanza 站点 / 未登录 / 未播放视频
- 展示：针对不同状态展示对应引导文案
- 用户下一步：按引导操作后插件自动恢复检测
