# 00 概览

## 产品定位
- 产品名称：StreamFab MyFans Downloader for Browser
- 产品类型：单站点浏览器插件
- 服务标识：`myfans`
- 支持范围：MyFans

## 当前阶段
- 当前目录用于维护 MyFans 浏览器插件的产品知识。
- 初始化已完成，当前阶段进入客户端拆解准备。
- 当前文档重点已转为回填客户端定稿信息。

## 当前拆解目标
- 识别插件主流程：
  - 页面检测
  - 资源识别
  - 下载配置
  - 任务创建
  - 下载执行
- 识别插件主要状态：
  - 未登录
  - 可检测
  - 可下载
  - 下载中
  - 下载完成
  - 下载失败
- 识别插件主要页面：
  - 站点内容页
  - 播放页
  - 插件 Detected
  - 插件 Downloads
  - 账号 / 授权信息区

## 当前已确认方向
- 整体流程大体复用 Netflix 插件流程。
- 当前主要差异集中在：
  - 下载配置参数
  - Dashboard Banner 文案
  - 产品名与安装器资源
  - 应用商店素材

## 关联文档
- `01_product_brief.md`
- `02_functional_architecture.md`
- `03_page_structure.md`
- `04_interaction_details.md`
- `requirements/plugin_requirement.md`
- `requirements/plugin_ui_requirement.md`
