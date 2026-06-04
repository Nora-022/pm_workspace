import { ArrowLeft, CheckCircle2, FolderOpen, Settings, ShieldCheck, UserCircle } from 'lucide-react';
import type { DashboardPage } from '../../types';

interface DashboardPagesProps {
  page: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
  onBack: () => void;
}

export function DashboardPages({ page, onPageChange, onBack }: DashboardPagesProps) {
  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <button className="back-button" type="button" onClick={onBack} aria-label="Back to runtime">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="dashboard-kicker">Dashboard</span>
          <h1>{page === 'setting' ? 'Setting' : 'License Info'}</h1>
        </div>
      </header>

      <nav className="dashboard-nav" aria-label="Dashboard pages">
        <button
          className={page === 'setting' ? 'active' : ''}
          type="button"
          onClick={() => onPageChange('setting')}
        >
          <Settings size={16} />
          Setting
        </button>
        <button
          className={page === 'license-info' ? 'active' : ''}
          type="button"
          onClick={() => onPageChange('license-info')}
        >
          <UserCircle size={16} />
          License Info
        </button>
      </nav>

      <main className="dashboard-content">
        {page === 'setting' ? <SettingPage /> : <LicenseInfoPage />}
      </main>
    </div>
  );
}

function SettingPage() {
  return (
    <div className="settings-page">
      <section className="settings-section">
        <h2>Download</h2>
        <label className="path-field">
          <span>Save to</span>
          <div>
            <input value="D:\\StreamFab\\Downloads" readOnly />
            <button type="button" aria-label="Choose folder">
              <FolderOpen size={17} />
            </button>
          </div>
        </label>
        <div className="settings-grid">
          <label>
            <span>Format</span>
            <select defaultValue="MP4">
              <option>MP4</option>
              <option>MKV</option>
            </select>
          </label>
          <label>
            <span>Video codec</span>
            <select defaultValue="H.264">
              <option>H.264</option>
              <option>H.265</option>
            </select>
          </label>
          <label>
            <span>Audio</span>
            <select defaultValue="AAC 2.0">
              <option>AAC 2.0</option>
              <option>EAC3 5.1</option>
            </select>
          </label>
          <label>
            <span>Subtitle</span>
            <select defaultValue="Remux">
              <option>Remux</option>
              <option>SRT</option>
            </select>
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>Behavior</h2>
        <label className="switch-row">
          <span>Analyze new videos while downloads are running</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="switch-row">
          <span>Show completion review prompt once</span>
          <input type="checkbox" defaultChecked />
        </label>
      </section>
    </div>
  );
}

function LicenseInfoPage() {
  return (
    <div className="license-page">
      <section className="license-summary">
        <ShieldCheck size={24} />
        <div>
          <span>Current account</span>
          <strong>weiqiongbing@gmail.com</strong>
          <p>Trial license / Download Left: 0/3</p>
        </div>
      </section>

      <section className="license-table" aria-label="License details">
        {[
          ['Product', 'StreamFab Video Downloader for Browser'],
          ['License', 'Trial'],
          ['Status', 'Active'],
          ['Available downloads', '0 of 3'],
          ['Supported browser', 'Chrome / Edge'],
        ].map(([label, value]) => (
          <div className="license-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <div className="license-callout">
        <CheckCircle2 size={18} />
        <span>License information is shown as prototype data only.</span>
      </div>
    </div>
  );
}
