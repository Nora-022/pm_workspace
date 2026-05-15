# Setting Dialog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从顶部菜单打开 Setting 弹窗，实现 0-5139 的外壳与 0-5068 的 Proxy 子页（其余子页先占位，后续可补）。

**Architecture:** 使用 zustand store 管理弹窗 open/active page 与 Proxy 字段值；SettingDialog 负责外壳（title/close/OK/Cancel）与左侧导航；ProxyPage 负责表单内容。

**Tech Stack:** React + TypeScript + TailwindCSS + Zustand + Vitest + Testing Library

---

## File Structure

- Create: `src/components/SettingDialog.tsx`（Setting 弹窗：外壳 + 左导航 + 右内容区）
- Modify: `src/stores/recording.ts`（新增 Setting 状态与 action）
- Modify: `src/components/SettingsMenu.tsx`（新增 Setting 菜单项：打开弹窗）
- Modify: `src/components/WindowTitleBar.tsx`（挂载 SettingDialog）
- Test: `src/components/SettingDialog.test.tsx`

---

### Task 1: Add Setting state to store

**Files:**
- Modify: `src/stores/recording.ts`

- [ ] **Step 1: Add types and state fields**

在 `recording.ts` 增加：

```ts
export type SettingPage = 'general' | 'preferences' | 'proxy' | 'media-library' | 'post-processing'
export type ProxyProtocol = 'HTTP' | 'HTTPS' | 'SOCKS5'
```

并在 `RecordingState` 中加入：

```ts
settingDialogOpen: boolean
settingActivePage: SettingPage
proxyProtocol: ProxyProtocol
proxyHost: string
proxyPort: string
proxyUsername: string
proxyPassword: string

openSettingDialog: (page?: SettingPage) => void
closeSettingDialog: () => void
setSettingActivePage: (page: SettingPage) => void
setProxyProtocol: (value: ProxyProtocol) => void
setProxyHost: (value: string) => void
setProxyPort: (value: string) => void
setProxyUsername: (value: string) => void
setProxyPassword: (value: string) => void
```

- [ ] **Step 2: Initialize defaults**

在 store 初始化对象中加入默认值（默认打开页为 Proxy）：

```ts
settingDialogOpen: false,
settingActivePage: 'proxy',
proxyProtocol: 'HTTP',
proxyHost: '',
proxyPort: '',
proxyUsername: '',
proxyPassword: '',
```

- [ ] **Step 3: Implement actions**

```ts
openSettingDialog: (page) => set({ settingDialogOpen: true, settingActivePage: page ?? 'proxy' }),
closeSettingDialog: () => set({ settingDialogOpen: false }),
setSettingActivePage: (page) => set({ settingActivePage: page }),
setProxyProtocol: (value) => set({ proxyProtocol: value }),
setProxyHost: (value) => set({ proxyHost: value }),
setProxyPort: (value) => set({ proxyPort: value.replace(/[^\d]/g, '') }),
setProxyUsername: (value) => set({ proxyUsername: value }),
setProxyPassword: (value) => set({ proxyPassword: value }),
```

- [ ] **Step 4: Verify TypeScript**

Run: `npm run build`
Expected: exit code 0

---

### Task 2: Implement SettingDialog (0-5139 shell + 0-5068 proxy)

**Files:**
- Create: `src/components/SettingDialog.tsx`
- Test: `src/components/SettingDialog.test.tsx`

- [ ] **Step 1: Create dialog shell (0-5139)**

实现一个 modal（参考 `RecordSettingDialog.tsx`）：

```tsx
<div className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm" />
<article className="relative h-[634px] w-[868px] overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]" />
```

顶栏高度 54 + inset 分隔线：

```tsx
<header className="relative h-[54px] shadow-[inset_0_-1px_0_#2a2a2c]" />
```

标题与关闭按钮（title “Setting”，关闭按钮 icon X 16×16）。

- [ ] **Step 2: Add footer OK/Cancel**

右下 OK / Cancel（88×32、间距 8、距右下约 32）：

```tsx
<footer className="flex items-center justify-end gap-2 px-8 pb-8" />
```

点击 OK/Cancel/右上 X/遮罩层点击均关闭弹窗（先不做保存逻辑）。

- [ ] **Step 3: Add left nav (0-5068)**

左侧导航宽 ~200，条目（h≈40）：
- General
- Preferences
- Proxy（默认选中）
- Media Library
- Post Processing

选中态：蓝渐变底 + `#4162fb` 文字 + 右侧 `ChevronRight`。

- [ ] **Step 4: Implement Proxy page form (0-5068)**

右侧表单字段（labels `#aeb1b6`，控件背景 `#242426`，圆角 4，高 32）：
- Proxy Protocol：下拉（HTTP/HTTPS/SOCKS5）
- Host：输入
- Port：输入（数字）
- Username：输入
- Password：输入（type=password）

字段值读写到 zustand store。

- [ ] **Step 5: Add placeholder pages**

当切换到非 Proxy 页时，右侧内容区渲染一个空占位容器（保持布局不抖动）。

- [ ] **Step 6: Add tests**

创建 `SettingDialog.test.tsx`：

```tsx
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import SettingDialog from './SettingDialog'
import { useRecording } from '../stores/recording'

describe('SettingDialog', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({
      settingDialogOpen: false,
      settingActivePage: 'proxy',
      proxyProtocol: 'HTTP',
      proxyHost: '',
      proxyPort: '',
      proxyUsername: '',
      proxyPassword: '',
    } as any)
  })

  it('renders shell sizing when open', () => {
    useRecording.setState({ settingDialogOpen: true })
    render(<SettingDialog />)
    const dialog = screen.getByRole('dialog', { name: 'Setting' })
    expect(dialog.className).toContain('w-[868px]')
    expect(dialog.className).toContain('h-[634px]')
    expect(screen.getByText('OK')).toBeTruthy()
    expect(screen.getByText('Cancel')).toBeTruthy()
  })

  it('renders proxy fields by default', () => {
    useRecording.setState({ settingDialogOpen: true, settingActivePage: 'proxy' })
    render(<SettingDialog />)
    expect(screen.getByText('Proxy Protocol')).toBeTruthy()
    expect(screen.getByText('Host')).toBeTruthy()
    expect(screen.getByText('Port')).toBeTruthy()
    expect(screen.getByText('Username')).toBeTruthy()
    expect(screen.getByText('Password')).toBeTruthy()
  })
})
```

- [ ] **Step 7: Run tests**

Run: `npm test`
Expected: all pass

---

### Task 3: Wire to Settings menu and title bar

**Files:**
- Modify: `src/components/SettingsMenu.tsx`
- Modify: `src/components/WindowTitleBar.tsx`

- [ ] **Step 1: Add menu item to open Setting**

在 `SettingsMenu.tsx` 引入 store action：

```ts
import { useRecording } from '../stores/recording'
const openSettingDialog = useRecording((s) => s.openSettingDialog)
```

并在菜单中加入：

```tsx
<MenuItem
  onClick={() => {
    onClose()
    openSettingDialog('proxy')
  }}
>
  Setting
</MenuItem>
```

- [ ] **Step 2: Mount SettingDialog**

在 `WindowTitleBar.tsx` 底部（与 AuthorizeDialog / LicenseInfoDialog 同级）渲染：

```tsx
<SettingDialog />
```

- [ ] **Step 3: Run build + tests**

Run: `npm run build`
Expected: exit code 0

Run: `npm test`
Expected: all pass

