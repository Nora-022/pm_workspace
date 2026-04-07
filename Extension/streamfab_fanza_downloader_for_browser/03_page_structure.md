# 03 页面结构与布局（Page Structure）

## 页面清单
1. 插件主页（Popup / Sidebar）
2. 用户授权信息模块（顶部固定区）
3. Detected（Fanza 检测结果页）
4. Downloads（下载管理页）
5. Dashboard（License Info / Settings）
6. CoApp 引导页
7. 剧集选择弹窗（Season / Episode）

## 主界面布局（全局）
- 结构：顶部固定区（用户授权信息模块） + Tab 内容区（Detected/Downloads） + 底部固定区。
- Tab：Detected / Downloads。

## 顶部固定区：用户授权信息模块（Fanza）
- 试用用户：
  - 邮箱
  - 剩余下载次数
  - 账号状态：`Trial`
  - `Buy Now` 按钮
  - Dashboard 跳转 icon
- 订阅用户：
  - 邮箱
  - 当日下载次数
  - 账号订阅方案：`LeftTime / Annual / Fab365`
  - Dashboard 跳转 icon

## Detected
- 仅展示 Fanza 检测结果
- 前置引导态：非 Fanza / 未登录 / 未播放
- 无跨 Origin，单站点累计，列表上限 50
- 有 Downloading 时暂停新检测

### `* Videos Found` 提示 icon
- 位置：`* Videos Found` 右侧
- 文案：
  - EN: `Video detection runs only when no downloading tasks exist to ensure stability.`
  - ZH: `视频检测仅在没有下载中任务时运行，以确保系统稳定性。`

## 剧集选择弹窗
- Season 层级（Season -> Episode）
- 默认 S1E1
- Episode 仅展示时长，不展示文件大小

## Downloads
- Downloading / Downloaded
- 串行执行（并发 1）

## Dashboard
- License Info + Settings（Extension + CoApp）
