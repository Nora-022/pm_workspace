# My Files Tag Pill Size Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 调整 My Files 页面已录制视频条目里的 tag pill，高度为 20px、宽度自适应，tag 之间间距为 8px。

**Architecture:** 仅修改 `TagPill` 的 Tailwind class，使用固定高度 `h-5` 并移除会影响高度的纵向 padding；保持 tag 行 `gap-2`（8px）不变。

**Tech Stack:** React + TailwindCSS（utility classes in TSX）+ Vite + Vitest

---

### Task 1: 更新 TagPill 的尺寸样式

**Files:**
- Modify: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/pages/FilesPage.tsx`

- [ ] **Step 1: 修改 TagPill 的 className 为高度 20px（h-5）**

将 `TagPill` 改为：

```tsx
function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-5 items-center whitespace-nowrap rounded-[12px] border border-[rgba(250,138,3,0.3)] px-2.5 text-[12px] leading-[18px] text-[#fa8a03]">
      {children}
    </span>
  )
}
```

- [ ] **Step 2: 确认 tag 行间距为 8px**

确认 tag 行仍为：

```tsx
<div className="mt-2 flex flex-wrap gap-2">
```

### Task 2: 验证

**Files:**
- Test: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/pages/FilesPage.test.tsx`

- [ ] **Step 1: 安装依赖（若未安装）**

Run (cwd: `.../recordfab-prototype`):

```bash
npm ci
```

Expected: 依赖安装成功，无 error。

- [ ] **Step 2: 运行单测**

Run (cwd: `.../recordfab-prototype`):

```bash
npm test
```

Expected: PASS。

- [ ] **Step 3: 本地启动并目视确认 My Files 的 tag 高度与间距**

Run (cwd: `.../recordfab-prototype`):

```bash
npm run dev
```

Expected: 打开 My Files 页面后，tag pill 高度为 20px，tag 之间间距为 8px。

