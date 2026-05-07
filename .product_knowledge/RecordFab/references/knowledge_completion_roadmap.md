# RecordFab Knowledge Completion Roadmap

## 目标
- 把当前“基于公开资料的首版知识库”，补成可直接支持 PRD、UI 方案和评审的产品知识库。

## 完善顺序

### Phase 1：先补业务真相
- 重点文件：
  - `06_business_rules.md`
  - `01_product_brief.md`
- 需要确认：
  - 免费试用是否存在
  - 收费模式是订阅、买断还是混合
  - 授权设备数
  - 登录是否必需
  - 退款、升级、续费逻辑

### Phase 2：再补任务流和页面
- 重点文件：
  - `03_page_structure.md`
  - `04_interaction_details.md`
- 需要确认：
  - 是否有首页 / 最近任务页
  - 录制控制区在侧边、底部还是弹层
  - 录制中是否允许返回浏览器区
  - 完成后有哪些操作

### Phase 3：补录制状态机
- 重点文件：
  - `02_functional_architecture.md`
  - `04_interaction_details.md`
  - `patterns/error_handling.md`
- 需要确认：
  - 是否有排队
  - 是否支持暂停 / 继续
  - 失败后是否可重试
  - 中断后文件如何处理

### Phase 4：补站点和平台差异
- 重点文件：
  - `07_technical_constraints.md`
  - `constraints/platform_diffs.md`
- 需要确认：
  - Mac 是否支持
  - 各站点的速度上限
  - 是否必须前台运行
  - 站点切换时录制限制

### Phase 5：补需求工作文档
- 重点文件：
  - `requirements/derived/recordfab_requirement_draft.md`
  - `requirements/derived/recordfab_ui_requirement_draft.md`
- 目标：
  - 将确定后的信息沉淀成研发和设计可执行文档

## 建议输入来源
1. 产品页和官网价格页
2. 真实产品截图或安装包
3. 录屏演示或用户手册
4. 研发 / 运营 / 商务确认口径
5. 用户反馈和常见问题

## 完成标准
- 业务规则不再大面积出现“待确认”
- 关键页面和状态可画出稳定原型
- 录制主链路可写成完整 PRD
- 当前正式版本事实已分别沉淀到对应专题文件
