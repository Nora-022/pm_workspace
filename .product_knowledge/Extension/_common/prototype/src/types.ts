export type RuntimeTab = 'detected' | 'downloads';

export type DashboardPage = 'setting' | 'license-info';

export type PreviewState =
  | 'detected-default'
  | 'detected-hover'
  | 'detected-expand'
  | 'downloads'
  | 'setting'
  | 'license-info';

export type DownloadStatus =
  | 'pending'
  | 'downloading'
  | 'completed'
  | 'failed'
  | 'canceled';

export interface BrowserVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  age: string;
  duration: string;
  hue: number;
}

export interface DetectedResource {
  id: string;
  title: string;
  site: string;
  duration: string;
  hue: number;
  isPlaylist: boolean;
  episodeCount: number;
  selectedEpisodes: number;
  resolution: string;
  codec: string;
  audio: string;
  language: string;
  subtitles: string;
  bitrate?: string;
  resolutionOptions: string[];
  languageOptions: string[];
  subtitleOptions: string[];
}

export interface DownloadTask {
  id: string;
  title: string;
  status: DownloadStatus;
  progress: number;
  resolution: string;
  format: 'MP4' | 'MKV';
  speed?: string;
  error?: string;
}

export interface PluginShellState {
  activeTab: RuntimeTab;
  expandedId: string | null;
  selectedIds: Set<string>;
  downloadTasks: DownloadTask[];
}
