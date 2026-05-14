# Message Center Dialog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在标题栏新增“消息中心”入口（带未读角标），点击打开 Message Center 弹窗；支持 Mark All as Read，关闭交互与现有 Dialog 一致。

**Architecture:** 使用现有 zustand `useRecording` 作为单一状态源：存储 `messages`、`messageCenterDialogOpen` 及操作方法；WindowTitleBar 只负责触发打开/显示角标；MessageCenterDialog 负责展示与交互（Mark All、单条点击置已读、ESC/外点关闭）。

**Tech Stack:** React + TypeScript + Zustand + Tailwind（className）+ Vitest + Testing Library

---

## Files & Responsibilities

- Create: `src/components/MessageCenterDialog.tsx`
  - 负责弹窗 UI、交互（ESC/外点关闭、Mark All、点击单条置已读）
- Modify: `src/stores/recording.ts`
  - 新增 message types、mock 数据、弹窗 open/close、读/未读状态操作
- Modify: `src/components/WindowTitleBar.tsx`
  - 新增消息中心 icon + badge；点击触发 `openMessageCenterDialog`
- Modify: `src/components/Layout.tsx`
  - 常驻渲染 `<MessageCenterDialog />`（与 HistoryDialog 方式一致）
- Modify: `src/components/WindowTitleBar.test.tsx`
  - 增加消息中心按钮/角标/点击打开的测试
- Create: `src/components/MessageCenterDialog.test.tsx`
  - 覆盖弹窗渲染、Mark All as Read、未读红点消失与对齐的关键行为

---

### Task 1: Extend Recording Store (messages + dialog state)

**Files:**
- Modify: `src/stores/recording.ts`

- [ ] **Step 1: Add message types**

在 `BrowserHistoryItem` 等 type 定义附近新增：

```ts
export type MessageCenterItem = {
  id: string
  title: string
  body: string
  dateYmd: string
  read: boolean
}
```

- [ ] **Step 2: Add state fields and actions**

在 `RecordingState` 里新增字段/方法（与 historyDialogOpen 等同级）：

```ts
messageCenterDialogOpen: boolean
messages: MessageCenterItem[]

openMessageCenterDialog: () => void
closeMessageCenterDialog: () => void
markAllMessagesRead: () => void
markMessageRead: (id: string) => void
```

- [ ] **Step 3: Add mock data**

在 `INITIAL_*` 常量区新增（参考截图：12 messages / 2 unread）：

```ts
const INITIAL_MESSAGES: MessageCenterItem[] = Array.from({ length: 12 }).map((_, idx) => ({
  id: `m-${idx + 1}`,
  title: 'Easter Specials Surprise! Save up to $220!',
  body: 'Easter Specials Surprise! Save up to $220 on All-In-One products! Act now! Online...',
  dateYmd: '2025-03-05',
  read: idx >= 2,
}))
```

- [ ] **Step 4: Implement actions in create() initializer**

在 `useRecording = create<RecordingState>((set, get) => ({ ... }))` 的初始值里加入：

```ts
messageCenterDialogOpen: false,
messages: INITIAL_MESSAGES,

openMessageCenterDialog: () => set({ messageCenterDialogOpen: true }),
closeMessageCenterDialog: () => set({ messageCenterDialogOpen: false }),
markAllMessagesRead: () =>
  set((s) => ({ messages: s.messages.map((m) => ({ ...m, read: true })) })),
markMessageRead: (id: string) =>
  set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, read: true } : m)) })),
```

- [ ] **Step 5: Verify typecheck**

Run: `npm run build`
Expected: exit code 0

- [ ] **Step 6: Commit**

```bash
git add src/stores/recording.ts
git commit -m "feat: add message center state to store"
```

---

### Task 2: Implement MessageCenterDialog component

**Files:**
- Create: `src/components/MessageCenterDialog.tsx`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Create dialog skeleton following HistoryDialog patterns**

Create `src/components/MessageCenterDialog.tsx`:

```tsx
import { useEffect, useMemo, useRef } from 'react'
import { Mail } from 'lucide-react'
import { useRecording } from '../stores/recording'

export default function MessageCenterDialog() {
  const open = useRecording((s) => s.messageCenterDialogOpen)
  const close = useRecording((s) => s.closeMessageCenterDialog)
  const messages = useRecording((s) => s.messages)
  const markAll = useRecording((s) => s.markAllMessagesRead)
  const markOne = useRecording((s) => s.markMessageRead)

  const ref = useRef<HTMLDivElement>(null)

  const counts = useMemo(() => {
    const total = messages.length
    const unread = messages.reduce((acc, m) => acc + (m.read ? 0 : 1), 0)
    return { total, unread }
  }, [messages])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  const onBackdrop = useMemo(
    () => (e: React.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    },
    [close],
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/40" onMouseDown={onBackdrop}>
      <div
        ref={ref}
        className="relative flex flex-col overflow-hidden rounded-[12px] bg-[#202020] shadow-[0_24px_72px_rgba(0,0,0,0.65)]"
        style={{ width: 624, height: 634 }}
      >
        <div className="flex items-center justify-between px-[18px] pt-4">
          <div className="text-[14px] font-semibold leading-5 text-[#eee]">Message Center</div>
          <button type="button" aria-label="close" onClick={close} className="grid size-8 place-items-center rounded hover:bg-white/5">
            <img src="/figma/icon_close_window.svg" alt="" className="size-4 opacity-70" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-between px-[18px] text-[12px] leading-[18px] text-[#aeb1b6]">
          <div>{counts.total} messages / {counts.unread} unread</div>
          <button
            type="button"
            onClick={markAll}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 hover:text-[#4162fb] hover:underline"
            style={{ textUnderlineOffset: 2 }}
          >
            <Mail size={16} strokeWidth={1.7} />
            Mark All as Read
          </button>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto overflow-x-hidden px-8 pb-6" style={{ scrollbarGutter: 'stable' }}>
          <div className="space-y-2">
            {messages.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => markOne(m.id)}
                className="h-[76px] w-[560px] rounded-[10px] border border-[rgba(255,255,255,0.03)] bg-white/[0.02] px-[14px] text-left hover:bg-[#2a2a2c]"
              >
                <div className="flex items-center justify-between pt-[18px]">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    {!m.read ? <span aria-label="unread" className="size-1.5 rounded-full bg-[#ff3b30]" /> : null}
                    <div className="min-w-0 truncate text-[14px] font-semibold leading-5 text-[#eee]">{m.title}</div>
                  </div>
                  <div className="ml-3 shrink-0 text-[12px] leading-[18px] text-[#aeb1b6]">{m.dateYmd}</div>
                </div>
                <div className={`mt-1 truncate text-[12px] leading-[18px] text-[#aeb1b6] ${m.read ? '' : 'pl-[14px]'}`}>
                  {m.body}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Render dialog from Layout**

Modify `src/components/Layout.tsx` to import and render it alongside other dialogs:

```tsx
import MessageCenterDialog from './MessageCenterDialog'
```

and in JSX near `<HistoryDialog />`:

```tsx
<MessageCenterDialog />
```

- [ ] **Step 3: Run unit tests**

Run: `npm test`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/MessageCenterDialog.tsx src/components/Layout.tsx
git commit -m "feat: add message center dialog"
```

---

### Task 3: Wire WindowTitleBar icon to open dialog (with unread badge)

**Files:**
- Modify: `src/components/WindowTitleBar.tsx`

- [ ] **Step 1: Add icon + badge derived from store**

Update imports:

```ts
import { Clock, Mail, Menu, Minus, Shirt, Square, X } from 'lucide-react'
```

Add store selectors:

```ts
const openMessageCenter = useRecording((s) => s.openMessageCenterDialog)
const unreadCount = useRecording((s) => s.messages.filter((m) => !m.read).length)
const unreadBadge = unreadCount > 99 ? '99+' : unreadCount > 0 ? String(unreadCount) : undefined
```

Add button near History button:

```tsx
<TitleActionButton label="messages" badge={unreadBadge} onClick={openMessageCenter}>
  <Mail size={16} strokeWidth={1.7} className="text-[#6f757d]" />
</TitleActionButton>
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: exit code 0

- [ ] **Step 3: Commit**

```bash
git add src/components/WindowTitleBar.tsx
git commit -m "feat: add message center entry in title bar"
```

---

### Task 4: Tests for message center wiring & behavior

**Files:**
- Modify: `src/components/WindowTitleBar.test.tsx`
- Create: `src/components/MessageCenterDialog.test.tsx`

- [ ] **Step 1: Update WindowTitleBar test reset state**

Extend `afterEach` reset to include messages/dialog open:

```ts
useRecording.setState({
  messageCenterDialogOpen: false,
  messages: [],
  // ...existing resets
})
```

- [ ] **Step 2: Add WindowTitleBar message icon test**

Append test:

```ts
import userEvent from '@testing-library/user-event'

it('opens message center dialog via title bar icon', async () => {
  useRecording.setState({
    messageCenterDialogOpen: false,
    messages: [
      { id: 'm1', title: 't', body: 'b', dateYmd: '2025-03-05', read: false },
      { id: 'm2', title: 't', body: 'b', dateYmd: '2025-03-05', read: true },
    ],
  })

  render(<WindowTitleBar />)
  const btn = screen.getByLabelText('messages')
  expect(screen.getByText('1')).toBeTruthy()
  await userEvent.click(btn)
  expect(useRecording.getState().messageCenterDialogOpen).toBe(true)
})
```

Note: 如果 `@testing-library/user-event` 未在依赖中，改用 `btn.click()` 并用 `expect(...)` 断言即可。

- [ ] **Step 3: Add MessageCenterDialog behavior test**

Create `src/components/MessageCenterDialog.test.tsx`:

```tsx
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import MessageCenterDialog from './MessageCenterDialog'
import { useRecording } from '../stores/recording'

describe('MessageCenterDialog', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({ messageCenterDialogOpen: false, messages: [] })
  })

  it('renders unread dot and hides it after mark all as read', () => {
    useRecording.setState({
      messageCenterDialogOpen: true,
      messages: [
        { id: 'm1', title: 'T1', body: 'B1', dateYmd: '2025-03-05', read: false },
        { id: 'm2', title: 'T2', body: 'B2', dateYmd: '2025-03-05', read: true },
      ],
    })

    render(<MessageCenterDialog />)

    expect(screen.getAllByLabelText('unread').length).toBe(1)

    const markAll = screen.getByRole('button', { name: 'Mark All as Read' })
    markAll.click()

    expect(useRecording.getState().messages.every((m) => m.read)).toBe(true)
  })
})
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/WindowTitleBar.test.tsx src/components/MessageCenterDialog.test.tsx
git commit -m "test: cover message center open and mark-all behavior"
```

---

## Verification Checklist

- [ ] Open Home 或任一 Site 页面，标题栏出现消息中心 icon + 未读角标
- [ ] 点击 icon 打开弹窗；点击遮罩/ESC/右上角 X 关闭
- [ ] 未读消息红点在标题行；已读后红点消失，标题与正文左对齐
- [ ] hover 消息卡片背景为 `#2A2A2C`
- [ ] “Mark All as Read” hover 变蓝 `#4162fb` + underline

## Final Commands

```bash
npm test
npm run build
```

