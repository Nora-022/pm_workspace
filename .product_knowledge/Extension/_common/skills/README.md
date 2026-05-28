# StreamFab Extension Skills 总览

## 可视化流程图

[FigJam：StreamFab 插件知识库工作流](https://www.figma.com/board/WKZcu20Nz4AX79kX0efh7C)

## 两个 Skill 的关系

```
用户："创建新插件"
        ↓
streamfab-plugin-init        ← 只负责起盘
  - 创建本地目录和骨架文件
  - 只创建客户端方案拆解 Markdown，不创建飞书文档
  - 输出本地路径和客户端方案拆解文档路径
        ↓ 初始化完成后交接
streamfab-extension-workflow  ← 接管后续所有推进
  - 节点1：确认初始化
  - 节点2：站点调研与产品页事实提取
  - 节点3：产品页事实提取完成后，读取用户填写的客户端方案拆解，生成 / 回填需求文档和 UI 需求说明
  - 节点4：客户端拆解回填
  - 节点4.5：context/patterns/constraints 回填
  - 节点5：缺口检查
  - 节点6：收尾追问
  - 节点7：上线收尾
        ↓
     L5 已上线
```

## Skill 文件

| Skill | 文件 | 触发词 |
|---|---|---|
| streamfab-plugin-init | `streamfab-extension-init-skill/SKILL.md` | 创建新插件、初始化插件 |
| streamfab-extension-workflow | `streamfab-extension-workflow-skill/SKILL.md` | 继续完善知识库、推进插件 |

## 注册位置

两个 skill 已同步到 `~/.claude/skills/`，可通过 `/streamfab-plugin-init` 和 `/streamfab-extension-workflow` 直接调用。

知识库源文件有改动时，手动复制到 `~/.claude/skills/` 对应目录同步。
