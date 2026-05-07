# 共享参考资料

本目录只存放跨插件复用、但不适合写在根目录索引文件中的共享参考内容。

适合放入：
- 共享术语表
- 新插件启动清单
- 通用调研方法
- 跨插件通用背景说明
- 跨插件共用的视觉规范与设计基线

不应放入：
- 根目录索引信息
- 产品线进度总表
- 插件目录清单
- 与 `index.md` 或 `common_plugin_rules.md` 重复的内容

当前文件示例：
- `streamfab_plugin_glossary.md`
- `new_plugin_kickoff_checklist.md`
- `streamfab_extension_common_visual_guidelines.md`
- `streamfab_extension_common_ux_patterns.md`
- `streamfab_extension_common_layout_specs.md`

## 文件结构
```text
shared_references/
├── README.md                                        ## 当前目录入口，说明共享资料的使用方式
├── common_plugin_rules.md                           ## 插件通用规则，沉淀跨插件共用的产品规则与结构口径
├── streamfab_extension_common_visual_guidelines.md  ## 视觉规范：颜色、字体、圆角、通用组件、dashboard / modal / CoApp 等视觉基线
├── streamfab_extension_common_ux_patterns.md        ## UX 规范：主框架结构、页面职责、列表展开、Dashboard、通知与阻断逻辑等
├── streamfab_extension_common_layout_specs.md       ## 结构尺寸参考：页面骨架、布局比例、容器尺寸、关键控件尺寸
└── ...                                              ## 其它共享术语、清单或参考资料
```
