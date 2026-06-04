import { LayoutDashboard } from 'lucide-react';

interface PluginHeaderProps {
  onDashboard: () => void;
}

export function PluginHeader({ onDashboard }: PluginHeaderProps) {
  return (
    <header className="plugin-header">
      <div className="plugin-top-row">
        <a className="plugin-logo" href="#detected" aria-label="StreamFab home">
          <span className="plugin-logo-icon">SF</span>
          <span className="plugin-logo-text">
            Stream<em>Fab</em>
          </span>
        </a>
        <button className="dashboard-button" type="button" aria-label="Open dashboard" onClick={onDashboard}>
          <LayoutDashboard size={20} />
        </button>
      </div>

      <div className="user-info-row">
        <span className="user-avatar">N</span>
        <div className="user-text">
          <div>
            <span className="user-email">weiqiongbing@gmail.com</span>
            <span className="user-separator">/</span>
            <span className="user-trial">Trial</span>
          </div>
          <div className="downloads-left">Download Left: 0/3</div>
        </div>
        <button className="buy-now-button" type="button">
          Buy Now
        </button>
      </div>
    </header>
  );
}
