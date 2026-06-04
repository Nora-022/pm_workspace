import type { RuntimeTab } from '../types';

interface PluginTabsProps {
  activeTab: RuntimeTab;
  detectedCount: number;
  onChange: (tab: RuntimeTab) => void;
}

export function PluginTabs({ activeTab, detectedCount, onChange }: PluginTabsProps) {
  return (
    <nav className="plugin-tabs" aria-label="Runtime tabs">
      <button
        className={`plugin-tab ${activeTab === 'detected' ? 'active' : ''}`}
        type="button"
        onClick={() => onChange('detected')}
      >
        Detected
        <span className="detected-count-badge">{detectedCount}</span>
      </button>
      <button
        className={`plugin-tab ${activeTab === 'downloads' ? 'active' : ''}`}
        type="button"
        onClick={() => onChange('downloads')}
      >
        Downloads
      </button>
    </nav>
  );
}
