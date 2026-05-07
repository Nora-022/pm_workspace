# Sources

## Official
1. RecordFab official homepage
- URL: `https://recordfab.dvdfab.cn/`
- Used for:
  - 产品定位
  - 页面展示价格
  - 支持场景
  - 720p / 1080p
  - 1x-5x 录制速度
  - 集成浏览器
  - 使用步骤
  - FAQ 中已确认的可配置参数
  - Windows 系统要求

## Internal PDFs
2. RecordFab-产品知识介绍.pdf
- Path: `C:\Users\fab\Downloads\RecordFab-产品知识介绍.pdf`
- Used for:
  - 产品背景
  - 用户群体
  - 内部技术说明
  - MP4 / MKV 输出格式
  - 试用策略
  - 与 StreamFab 协同关系

3. RecordFab-产品宣讲会.pdf
- Path: `C:\Users\fab\Downloads\RecordFab-产品宣讲会.pdf`
- Used for:
  - 版本号 `V1.0.0.0`
  - `Home` / `My Files` 页面结构
  - 手动录制交互
  - 常见问题与客服视角问题定位
  - 首版与后续版本规划
  - 最小化到后台录制的测试结论

## Operational Data
4. RecordFab-支持网站列表（多维表格）
- URL: `https://i6a1sqw3p2.feishu.cn/wiki/LRjwwwIHZi7OyCkXCUocTBCAn0c`
- Used for:
  - 站点支持状态（展示/隐藏/待确认）
  - 录制成功率
  - 站点更新机制说明
- 维护说明：见 `references/site_support_list.md`

## Internal Technical Docs（飞书内部文档）

5. RecordFab 录制模式 接口文档
- URL: `https://i6a1sqw3p2.feishu.cn/wiki/A1F4wDxyxivlLnk006KcMfKAnJf`
- Used for:
  - IRecorder 核心接口定义
  - 录制状态机（ERecordStatus）
  - Meta 检测流程（ERecordMetaStatus）
  - 流拦截 + Remux 技术方案
  - 并行录制架构限制

6. RecordFab 5倍速调研
- URL: `https://i6a1sqw3p2.feishu.cn/wiki/QuZjw8al0iQwT0kJCWdcFnqanf4`
- Used for:
  - 5x 速率问题根因（同步编码阻塞）
  - 竞品 CleverGet 技术方案（Qt6 + CEF137）
  - 研发迭代计划（CEF138 升级、FFmpeg 升级、异步编码重构）

7. RecordFab CPU编码和硬件编码对比
- URL: `https://i6a1sqw3p2.feishu.cn/wiki/VlN6wVDIOiAOpvksHCDc8cfInEh`
- Used for:
  - 三组编码模式 CPU/GPU 占用对比数据
  - 硬件编码解决 5x 卡顿的实测结论
  - 测试环境：U-NEXT 1080p / RTX 4060 Ti

8. RecordFab 判断结束技术文档
- URL: `https://i6a1sqw3p2.feishu.cn/wiki/VrpKdLD39owYGAxzMn6cdUaEnHf`
- Used for:
  - 三种结束检测方法（URL 变更、时长吻合、无数据超时）
  - 200s 防广告阈值设计
  - Disney+ 无总时长边界情况
  - 短视频循环不自动结束边界情况

## Extraction Notes
- 本知识库优先采用官方公开页中的明确表述。
- 公开页未明确说明的商业和授权细节，统一保留为待确认。
