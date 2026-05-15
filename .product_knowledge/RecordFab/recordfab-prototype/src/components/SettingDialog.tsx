import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { useRecording, type ProxyProtocol, type SettingPage } from '../stores/recording'

const PAGES: { id: SettingPage; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'proxy', label: 'Proxy' },
  { id: 'media-library', label: 'Media Library' },
  { id: 'post-processing', label: 'Post Processing' },
]

const PROTOCOLS: ProxyProtocol[] = ['HTTP', 'HTTPS', 'SOCKS5']

export default function SettingDialog() {
  const open = useRecording((s) => s.settingDialogOpen)
  const activePage = useRecording((s) => s.settingActivePage)
  const setActivePage = useRecording((s) => s.setSettingActivePage)
  const close = useRecording((s) => s.closeSettingDialog)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="setting-dialog-title"
        className="relative flex h-[634px] w-[868px] flex-col overflow-hidden rounded-xl bg-[#202020] shadow-[0_12px_40px_0_rgba(15,16,17,0.2)]"
      >
        <header className="relative h-[54px] shadow-[inset_0_-1px_0_#2a2a2c]">
          <h2 id="setting-dialog-title" className="absolute left-8 top-[17px] text-[14px] leading-5 text-[#eee]">
            Setting
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-8 top-[19px] grid size-4 place-items-center hover:opacity-80"
          >
            <X size={16} className="text-[#aeb1b6]" />
          </button>
        </header>

        <div className="flex flex-1">
          <nav className="w-[200px] shrink-0">
            <div className="h-px bg-[#2a2a2c]" />
            {PAGES.map((p) => {
              const selected = p.id === activePage
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePage(p.id)}
                  className={`flex h-10 w-full items-center justify-between px-6 text-left text-[14px] leading-5 ${
                    selected
                      ? 'bg-[linear-gradient(to_left,rgba(0,115,255,0),rgba(0,115,255,0.08))] text-[#4162fb]'
                      : 'text-[#eee] hover:bg-white/5'
                  }`}
                >
                  <span>{p.label}</span>
                  {selected ? <ChevronRight size={16} className="text-[#4162fb]" /> : <span className="w-4" />}
                </button>
              )
            })}
          </nav>

          <section className="flex-1 px-8 py-6">
            {activePage === 'proxy' ? <ProxyPage /> : <div className="h-full" />}
          </section>
        </div>

        <footer className="flex items-center justify-end gap-2 px-8 pb-8">
          <button
            type="button"
            onClick={close}
            className="h-8 w-[88px] rounded-md bg-[#4162fb] text-[14px] leading-5 text-white hover:bg-[#3a54cf]"
          >
            OK
          </button>
          <button
            type="button"
            onClick={close}
            className="h-8 w-[88px] rounded-md border border-[#7f8186] text-[14px] leading-5 text-[#aeb1b6] hover:bg-white/5"
          >
            Cancel
          </button>
        </footer>
      </article>
    </div>
  )
}

function ProxyPage() {
  const proxyProtocol = useRecording((s) => s.proxyProtocol)
  const proxyHost = useRecording((s) => s.proxyHost)
  const proxyPort = useRecording((s) => s.proxyPort)
  const proxyUsername = useRecording((s) => s.proxyUsername)
  const proxyPassword = useRecording((s) => s.proxyPassword)

  const setProxyProtocol = useRecording((s) => s.setProxyProtocol)
  const setProxyHost = useRecording((s) => s.setProxyHost)
  const setProxyPort = useRecording((s) => s.setProxyPort)
  const setProxyUsername = useRecording((s) => s.setProxyUsername)
  const setProxyPassword = useRecording((s) => s.setProxyPassword)

  return (
    <div className="space-y-6">
      <Field label="Proxy Protocol">
        <div className="relative">
          <select
            aria-label="Proxy Protocol"
            value={proxyProtocol}
            onChange={(e) => setProxyProtocol(e.target.value as ProxyProtocol)}
            className="h-8 w-full appearance-none rounded bg-[#242426] px-3 pr-9 text-[14px] leading-5 text-[#eee] outline-none"
          >
            {PROTOCOLS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3 top-2 text-[#aeb1b6]" />
        </div>
      </Field>

      <div className="grid grid-cols-[1fr_160px] gap-6">
        <Field label="Host">
          <input
            aria-label="Host"
            value={proxyHost}
            onChange={(e) => setProxyHost(e.target.value)}
            className="h-8 w-full rounded bg-[#242426] px-3 text-[14px] leading-5 text-[#eee] outline-none"
          />
        </Field>
        <Field label="Port">
          <input
            aria-label="Port"
            value={proxyPort}
            inputMode="numeric"
            onChange={(e) => setProxyPort(e.target.value)}
            className="h-8 w-full rounded bg-[#242426] px-3 text-[14px] leading-5 text-[#eee] outline-none"
          />
        </Field>
      </div>

      <Field label="Username">
        <input
          aria-label="Username"
          value={proxyUsername}
          onChange={(e) => setProxyUsername(e.target.value)}
          className="h-8 w-full rounded bg-[#242426] px-3 text-[14px] leading-5 text-[#eee] outline-none"
        />
      </Field>

      <Field label="Password">
        <input
          aria-label="Password"
          type="password"
          value={proxyPassword}
          onChange={(e) => setProxyPassword(e.target.value)}
          className="h-8 w-full rounded bg-[#242426] px-3 text-[14px] leading-5 text-[#eee] outline-none"
        />
      </Field>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[14px] leading-5 text-[#aeb1b6]">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  )
}

