# 03 页面结构与布局（Page Structure）

## 页面清单
1. 插件主页（Popup / Sidebar）
2. 用户授权信息模块（顶部固定区）
3. Detected（Disney Plus 检测结果页）
4. Downloads（下载管理页）
5. Dashboard（License Info / Settings）
6. CoApp 引导页
7. 剧集选择弹窗（Season / Episode）

## 顶部用户授权信息模块
- 试用：邮箱 + 剩余下载次数 + Trial + Buy Now + Dashboard icon
- 订阅：邮箱 + 当日下载次数 + 订阅方案（LeftTime/Annual/Fab365）+ Dashboard icon

## Detected
- 前置引导：非 Disney Plus / 未登录 / 未播放
- 无跨 Origin，单站点累计，列表上限 50
- Downloading 存在时暂停新检测

## 剧集弹窗
- Season 层级（Season -> Episode）
- 默认 S1E1
- Episode 仅展示时长，不展示文件大小

## Downloads
- Downloading / Downloaded
- 串行执行（并发 1）

## Dashboard
- License Info + Settings（Extension + CoApp）
