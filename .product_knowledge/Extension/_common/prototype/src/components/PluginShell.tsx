import type { ReactNode } from 'react';
import type { RuntimeTab } from '../types';
import { PluginFooter } from './PluginFooter';
import { PluginHeader } from './PluginHeader';
import { PluginTabs } from './PluginTabs';

interface PluginShellProps {
  activeTab: RuntimeTab;
  detectedCount: number;
  onTabChange: (tab: RuntimeTab) => void;
  onHome: () => void;
  onSettings: () => void;
  onLicense: () => void;
  children: ReactNode;
}

export function PluginShell({
  activeTab,
  detectedCount,
  onTabChange,
  onHome,
  onSettings,
  onLicense,
  children,
}: PluginShellProps) {
  return (
    <div className="plugin-shell">
      <PluginHeader onDashboard={onSettings} />
      <PluginTabs activeTab={activeTab} detectedCount={detectedCount} onChange={onTabChange} />
      <section className="panel-content">{children}</section>
      <PluginFooter onHome={onHome} onSettings={onSettings} onLicense={onLicense} />
    </div>
  );
}
