import {
  ArrowLeft,
  ArrowRight,
  Home,
  Menu,
  MoreHorizontal,
  Puzzle,
  RefreshCw,
  Search,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { browserVideos } from '../mocks/prototypeData';
import { ThumbnailArt } from './ThumbnailArt';

interface BrowserMockProps {
  panelOpen: boolean;
  onTogglePanel: () => void;
  children: ReactNode;
}

export function BrowserMock({ panelOpen, onTogglePanel, children }: BrowserMockProps) {
  return (
    <div className="browser-shell">
      <div className="browser-chrome">
        <div className="browser-tabs">
          <div className="browser-tab">
            <span className="tab-favicon muted" />
            <span className="tab-title">Subscriptions</span>
            <span className="tab-close">x</span>
          </div>
          <div className="browser-tab active">
            <span className="tab-favicon youtube" />
            <span className="tab-title">YouTube</span>
            <span className="tab-close">x</span>
          </div>
          <button className="new-tab-button" type="button" aria-label="New tab">
            +
          </button>
        </div>

        <div className="address-row">
          <button className="browser-icon disabled" type="button" aria-label="Back">
            <ArrowLeft size={16} />
          </button>
          <button className="browser-icon" type="button" aria-label="Forward">
            <ArrowRight size={16} />
          </button>
          <button className="browser-icon" type="button" aria-label="Refresh">
            <RefreshCw size={15} />
          </button>
          <button className="browser-icon" type="button" aria-label="Home">
            <Home size={15} />
          </button>
          <div className="address-input">
            <span className="address-lock">lock</span>
            <span>
              <strong>youtube.com</strong>/feed/subscriptions
            </span>
          </div>
          <button className="browser-icon" type="button" aria-label="Extensions">
            <Puzzle size={17} />
          </button>
          <button
            className={`streamfab-extension-button ${panelOpen ? 'active' : ''}`}
            type="button"
            aria-label="Toggle StreamFab extension"
            onClick={onTogglePanel}
          >
            <span className="streamfab-mark">SF</span>
          </button>
          <button className="browser-icon" type="button" aria-label="Browser menu">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="browser-viewport">
        <main className={`site-page ${panelOpen ? 'panel-open' : ''}`}>
          <header className="site-header">
            <Menu size={21} />
            <div className="youtube-logo">
              <span className="youtube-play" />
              <strong>YouTube</strong>
            </div>
            <div className="site-search">
              <span>music videos 2024</span>
              <Search size={17} />
            </div>
            <div className="site-user">U</div>
          </header>

          <nav className="site-chips" aria-label="Content filters">
            {['All', 'Music', 'Gaming', 'Podcasts', 'Recently uploaded', 'Watched', 'Live'].map(
              (chip, index) => (
                <span className={`site-chip ${index === 0 ? 'active' : ''}`} key={chip}>
                  {chip}
                </span>
              ),
            )}
          </nav>

          <section className="site-grid" aria-label="Mock source page">
            {browserVideos.map((video) => (
              <article className="site-card" key={video.id}>
                <ThumbnailArt hue={video.hue} duration={video.duration} label={video.title} />
                <div className="site-card-body">
                  <span className="channel-avatar" style={{ background: `hsl(${video.hue}, 52%, 45%)` }}>
                    {video.channel[0]}
                  </span>
                  <div>
                    <h2>{video.title}</h2>
                    <p>{video.channel}</p>
                    <p>
                      {video.views} / {video.age}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>

        <aside className={`extension-panel ${panelOpen ? 'open' : ''}`} aria-label="StreamFab extension panel">
          {children}
        </aside>
      </div>
    </div>
  );
}
