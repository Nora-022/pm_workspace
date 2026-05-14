# Icon Hover Tooltips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为指定的 icon 在 hover 时显示正确的提示文案（Previous/Next/Refresh、Minimize/Maximize/Exit、Close）。

**Architecture:** 使用浏览器原生 tooltip（`title` 属性）展示 hover 提示；同时同步 `aria-label`，确保无障碍标签与 tooltip 文案一致。

**Tech Stack:** React + TypeScript + TailwindCSS + Vitest + Testing Library

---

## Files To Change

- Modify: [BrowserToolbar.tsx](file:///c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/BrowserToolbar.tsx)
- Modify: [HomePage.tsx](file:///c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/pages/HomePage.tsx)
- Modify: [WindowTitleBar.tsx](file:///c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/WindowTitleBar.tsx)
- Modify: [RecordingTabStrip.tsx](file:///c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/RecordingTabStrip.tsx)
- Modify: [HomePage.test.tsx](file:///c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/pages/HomePage.test.tsx)
- Create: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/BrowserToolbar.test.tsx`
- Create: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/WindowTitleBar.test.tsx`
- Create: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/RecordingTabStrip.test.tsx`

---

### Task 1: BrowserToolbar（三个导航 icon）

**Files:**
- Modify: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/BrowserToolbar.tsx`
- Create: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/BrowserToolbar.test.tsx`

- [ ] **Step 1: 写失败测试（tooltip 文案）**

```tsx
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import BrowserToolbar from './BrowserToolbar'

describe('BrowserToolbar', () => {
  it('sets title and aria-label for navigation icons', () => {
    render(<BrowserToolbar url="https://example.com" supported={false} />)

    const previous = screen.getByLabelText('Previous')
    const next = screen.getByLabelText('Next')
    const refresh = screen.getByLabelText('Refresh')

    expect(previous.getAttribute('title')).toBe('Previous')
    expect(next.getAttribute('title')).toBe('Next')
    expect(refresh.getAttribute('title')).toBe('Refresh')
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

Run (PowerShell, in `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype`):

```bash
npm test
```

Expected: FAIL（找不到 `aria-label="Previous"` 或 `title` 不存在）

- [ ] **Step 3: 最小实现：给三个按钮同步 aria-label + title**

目标文案（左到右）：`Previous` / `Next` / `Refresh`

示例改法：

```tsx
<button aria-label="Previous" title="Previous" ...>
  <ArrowLeft size={16} />
</button>
<button aria-label="Next" title="Next" ...>
  <ArrowRight size={16} />
</button>
<button aria-label="Refresh" title="Refresh" ...>
  <RotateCw size={16} />
</button>
```

- [ ] **Step 4: 运行测试确认通过**

```bash
npm test
```

Expected: PASS

---

### Task 2: HomePage AddressBar（三个导航 icon）

**Files:**
- Modify: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/pages/HomePage.tsx`
- Modify: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/pages/HomePage.test.tsx`

- [ ] **Step 1: 写失败测试（AddressBar tooltip 文案）**

在 `HomePage.test.tsx` 里新增用例（保持现有结构）：

```tsx
it('sets title and aria-label for address bar navigation icons', () => {
  useRecording.setState({ openTabs: [{ id: 'home', label: 'Home', iconHome: true }], activeTabId: 'home' })
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )

  const previous = screen.getByLabelText('Previous')
  const next = screen.getByLabelText('Next')
  const refresh = screen.getByLabelText('Refresh')

  expect(previous.getAttribute('title')).toBe('Previous')
  expect(next.getAttribute('title')).toBe('Next')
  expect(refresh.getAttribute('title')).toBe('Refresh')
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm test
```

Expected: FAIL（目前 aria-label 为 `back/forward/refresh` 且没有 title）

- [ ] **Step 3: 最小实现：AddressBar 三个按钮同步 aria-label + title**

将：
- `aria-label="back"` → `aria-label="Previous"` + `title="Previous"`
- `aria-label="forward"` → `aria-label="Next"` + `title="Next"`
- `aria-label="refresh"` → `aria-label="Refresh"` + `title="Refresh"`

- [ ] **Step 4: 运行测试确认通过**

```bash
npm test
```

Expected: PASS

---

### Task 3: WindowTitleBar（右上角窗口控制 icon）

**Files:**
- Modify: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/WindowTitleBar.tsx`
- Create: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/WindowTitleBar.test.tsx`

- [ ] **Step 1: 写失败测试（只有窗口控制按钮有 title）**

```tsx
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import WindowTitleBar from './WindowTitleBar'
import { useRecording } from '../stores/recording'

describe('WindowTitleBar', () => {
  it('sets title for window control icons only', () => {
    useRecording.setState({
      browserHistory: [],
      authorizeDialogOpen: false,
      licenseInfoDialogOpen: false,
    })

    render(<WindowTitleBar />)

    const minimize = screen.getByLabelText('Minimize')
    const maximize = screen.getByLabelText('Maximize')
    const exit = screen.getByLabelText('Exit')

    expect(minimize.getAttribute('title')).toBe('Minimize')
    expect(maximize.getAttribute('title')).toBe('Maximize')
    expect(exit.getAttribute('title')).toBe('Exit')

    const history = screen.getByLabelText('history')
    const theme = screen.getByLabelText('theme')
    const menu = screen.getByLabelText('menu')

    expect(history.getAttribute('title')).toBe(null)
    expect(theme.getAttribute('title')).toBe(null)
    expect(menu.getAttribute('title')).toBe(null)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm test
```

Expected: FAIL（目前没有 title；且 aria-label 为小写 minimize/maximize/close）

- [ ] **Step 3: 最小实现：只对 3 个按钮提供 title，并把 aria-label 改为指定文案**

实现方式：
1) 扩展 `TitleActionButton`，新增可选 `title?: string`，将其透传到 DOM：

```tsx
function TitleActionButton({ label, title, ... }: { label: string; title?: string; ... }) {
  return (
    <button aria-label={label} title={title} ...>
      ...
    </button>
  )
}
```

2) 仅对窗口控制三个按钮传入 `title`，并把 `label` 改成目标文案：

```tsx
<TitleActionButton label="Minimize" title="Minimize">...</TitleActionButton>
<TitleActionButton label="Maximize" title="Maximize">...</TitleActionButton>
<TitleActionButton label="Exit" title="Exit">...</TitleActionButton>
```

保持 `history/theme/menu` 的 `label` 不变，且不传 `title`。

- [ ] **Step 4: 运行测试确认通过**

```bash
npm test
```

Expected: PASS

---

### Task 4: RecordingTabStrip（tab 关闭 icon）

**Files:**
- Modify: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/RecordingTabStrip.tsx`
- Create: `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype/src/components/RecordingTabStrip.test.tsx`

- [ ] **Step 1: 写失败测试（Close tooltip 文案）**

```tsx
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import RecordingTabStrip from './RecordingTabStrip'

describe('RecordingTabStrip', () => {
  it('sets title and aria-label for the tab close icon', () => {
    render(
      <RecordingTabStrip
        tabs={[
          { id: 'home', label: 'Home', iconHome: true },
          { id: 't1', label: 'Netflix', iconSrc: '/figma/tab_icon_netflix.svg' },
        ]}
        activeTabId="t1"
        onSelect={() => {}}
        onCloseTab={() => {}}
      />
    )

    fireEvent.mouseEnter(screen.getByRole('button', { name: /netflix/i }))

    const close = screen.getByLabelText('Close')
    expect(close.getAttribute('title')).toBe('Close')
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npm test
```

Expected: FAIL（目前 aria-label 为 `close tab` 且没有 title）

- [ ] **Step 3: 最小实现：Close icon 同步 aria-label + title**

将 close icon 的交互元素改为：

```tsx
<span role="button" aria-label="Close" title="Close" ...>
  ...
</span>
```

- [ ] **Step 4: 运行测试确认通过**

```bash
npm test
```

Expected: PASS

---

### Task 5: 回归校验（lint + build）

**Files:**
- None

- [ ] **Step 1: 运行 lint**

Run (in `c:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/RecordFab/recordfab-prototype`):

```bash
npm run lint
```

Expected: exit code 0

- [ ] **Step 2: 运行 build**

```bash
npm run build
```

Expected: exit code 0

