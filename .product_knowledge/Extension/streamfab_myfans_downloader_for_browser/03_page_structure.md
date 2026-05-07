# 03 页面结构（Page Structure）

## 当前归档范围
- 本文件用于维护 MyFans 站内页面结构及插件接入点。

## 页面类型
- 站点内容页
- 站点播放页
- 插件主页（Popup / Sidebar）
- Detected
- Downloads
- 用户授权信息区
- 设置 / Dashboard

## 当前客户端拆解重点
- MyFans 的主要内容入口在哪些页面出现
- 检测是在内容页触发还是播放页触发
- 插件展示的是单资源还是列表资源
- 下载前配置是在主面板完成还是弹窗完成
- 下载结果在 Downloads 中如何分组和呈现

## 产品页已确认的页面线索
- 存在 `MyFans` 专属模块入口。
- 使用流程中明确包含：
  - MyFans 账号登录
  - 搜索目标视频
  - 播放目标视频
  - 下载配置
  - Queue 入列
- 用户评价区明确提到个人中心中的：
  - `Saved`
  - `Purchased`

## 客户端拆解已确认的页面线索
- 存在分析视频界面。
- 存在 Meta 分析结果弹窗。
- 存在 Downloading 界面。
- 存在 Setting 界面。
- Downloading 界面展示：
  - 标签：`Resolution`、`Video Codec`
  - 信息：`speed`、`progress`、`size`

## 归档原则
- 先按真实页面归类。
- 不把站点页面、插件页面、客户端页面混在一起描述。
