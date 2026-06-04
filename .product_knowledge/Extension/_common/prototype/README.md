# StreamFab Extension Common Prototype

这个目录从单个 `index.html` 转为 `Vite + React + TypeScript` 工程，用于维护插件通用运行时原型。

## 运行

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run test`

## 预览入口

- `/`：Detected 有数据状态
- `/#hover`：Detected hover 状态
- `/#expand`：Detected expand 状态
- `/#downloads`：Downloads 状态
- `/#setting`：Dashboard Setting 页面
- `/#license`：Dashboard License Info 页面

## 规范来源

- `../03_page_structure.md`：Header、Tab Bar、Content Area、Footer，以及 Runtime / Dashboard 的页面结构。
- `../12_ui_ux_visual_layout_specs.md`：颜色、字号、圆角、控件尺寸、Detected / Downloads / Dashboard 的视觉和交互约束。

当前 JPG 截图只作为视觉参考，不能覆盖上面的 Markdown 规范。
