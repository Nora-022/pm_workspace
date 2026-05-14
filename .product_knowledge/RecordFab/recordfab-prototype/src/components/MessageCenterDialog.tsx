import { useEffect, useMemo, useRef } from 'react'
import { Mail } from 'lucide-react'
import { useRecording } from '../stores/recording'

function formatDateYMD(ts: number) {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

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
          <button
            type="button"
            aria-label="close"
            onClick={close}
            className="grid size-8 place-items-center rounded hover:bg-white/5"
          >
            <img src="/figma/icon_close_window.svg" alt="" className="size-4 opacity-70" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-between px-[18px] text-[12px] leading-[18px] text-[#aeb1b6]">
          <div>
            {counts.total} messages / {counts.unread} unread
          </div>
          <button
            type="button"
            onClick={markAll}
            aria-label="Mark All as Read"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 hover:text-[#4162fb] hover:underline"
            style={{ textUnderlineOffset: 2 }}
          >
            <Mail size={16} strokeWidth={1.7} className="text-current" />
            Mark All as Read
          </button>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto overflow-x-hidden px-8 pb-6" style={{ scrollbarGutter: 'stable' }}>
          <div className="space-y-2">
            {messages.map((m) => {
              const unread = !m.read
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => markOne(m.id)}
                  className="h-[76px] w-[560px] rounded-[10px] border border-[#292929] bg-[#242426] px-[14px] text-left hover:bg-[#2a2a2c]"
                >
                  <div className="flex items-center justify-between pt-[18px]">
                    <div className="flex min-w-0 flex-1 items-center gap-[10px]">
                      {unread ? <span aria-label="unread" className="size-1.5 rounded-full bg-[#ff3b30]" /> : null}
                      <div className="min-w-0 truncate text-[14px] font-semibold leading-5 text-[#eee]">{m.title}</div>
                    </div>
                    <div className="ml-3 shrink-0 text-[12px] leading-[18px] text-[#aeb1b6]">
                      {formatDateYMD(m.createdAt)}
                    </div>
                  </div>
                  <div
                    className={`mt-1 truncate text-[12px] leading-[18px] text-[#aeb1b6] ${
                      unread ? 'pl-[16px]' : ''
                    }`}
                  >
                    {m.body}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

