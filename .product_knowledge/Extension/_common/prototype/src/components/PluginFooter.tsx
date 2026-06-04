import { Headphones, Home, Mail, PanelRight, Settings, UserCircle } from 'lucide-react';

interface PluginFooterProps {
  onHome: () => void;
  onSettings: () => void;
  onLicense: () => void;
}

export function PluginFooter({ onHome, onSettings, onLicense }: PluginFooterProps) {
  return (
    <footer className="plugin-footer">
      <button className="footer-icon" type="button" aria-label="Toggle layout">
        <PanelRight size={18} />
      </button>
      <div className="footer-nav">
        <button className="footer-icon" type="button" aria-label="Home" onClick={onHome}>
          <Home size={18} />
        </button>
        <button className="footer-icon" type="button" aria-label="License Info" onClick={onLicense}>
          <UserCircle size={18} />
        </button>
        <button className="footer-icon" type="button" aria-label="Setting" onClick={onSettings}>
          <Settings size={18} />
        </button>
        <button className="footer-icon" type="button" aria-label="Support">
          <Headphones size={18} />
        </button>
        <button className="footer-icon" type="button" aria-label="Contact">
          <Mail size={18} />
        </button>
      </div>
    </footer>
  );
}
