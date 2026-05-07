# StreamFab Extension Skills 总览

## 可视化流程图

[FigJam：StreamFab 插件知识库工作流](https://www.figma.com/board/WKZcu20Nz4AX79kX0efh7C)

## 两个 Skill 的关系

```
用户："创建新插件"
        ↓
streamfab-plugin-init        ← 只负责起盘
  - 创建本地目录和骨架文件
  - 创建3份飞书模板文档
  - 输出路径和链接
        ↓ 初始化完成后交接
streamfab-extension-workflow  ← 接管后续所有推进
  - 节点1：确认初始化，拉取飞书需求文档
  - 节点2：产品页事实提取
  - 节点3：飞书定稿同步
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
