import { AlertCircle, CheckCircle2, CircleSlash, Clock, Download, Inbox, Zap } from 'lucide-react';
import type { DownloadStatus, DownloadTask } from '../../types';

interface DownloadsPanelProps {
  tasks: DownloadTask[];
}

const statusIcons: Record<DownloadStatus, typeof Clock> = {
  pending: Clock,
  downloading: Download,
  completed: CheckCircle2,
  failed: AlertCircle,
  canceled: CircleSlash,
};

export function DownloadsPanel({ tasks }: DownloadsPanelProps) {
  const downloading = tasks.filter((task) => task.status !== 'completed');
  const downloaded = tasks.filter((task) => task.status === 'completed');
  const hasCompleted = downloaded.length > 0;

  return (
    <div className="downloads-panel">
      {hasCompleted ? (
        <div className="review-banner">
          <span>Download completed. Enjoying the extension?</span>
          <button type="button">Rate Us</button>
        </div>
      ) : null}

      <section className="download-group">
        <h3 className="download-group-title">Downloading ({downloading.length})</h3>
        <div className="turbo-row">
          <span className="turbo-left">
            <span className="turbo-toggle" />
            Turbo-Speed Off
          </span>
          <span className="turbo-right">
            <Zap size={14} />
            Total Speed {totalSpeed(tasks)}
          </span>
        </div>
        {downloading.length === 0 ? (
          <DownloadEmpty text="No downloading tasks" />
        ) : (
          downloading.map((task) => <DownloadTaskCard key={task.id} task={task} />)
        )}
      </section>

      <section className="download-group">
        <h3 className="download-group-title has-divider">Downloaded ({downloaded.length})</h3>
        {downloaded.length === 0 ? (
          <DownloadEmpty text="No completed downloads" />
        ) : (
          downloaded.map((task) => <DownloadTaskCard key={task.id} task={task} />)
        )}
      </section>
    </div>
  );
}

function DownloadTaskCard({ task }: { task: DownloadTask }) {
  const StatusIcon = statusIcons[task.status];
  return (
    <article className={`download-task status-${task.status}`}>
      <StatusIcon size={18} />
      <div className="download-task-body">
        <div className="download-task-title">{task.title}</div>
        <div className="download-task-meta">
          {task.resolution} / {task.format}
          {task.speed ? ` / ${task.speed}` : ''}
        </div>
        {task.error ? <div className="download-error">{task.error}</div> : null}
        {task.status !== 'completed' ? (
          <div className="progress-track" aria-label={`${task.progress}%`}>
            <span style={{ width: `${task.progress}%` }} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

function DownloadEmpty({ text }: { text: string }) {
  return (
    <div className="download-empty">
      <Inbox size={42} strokeWidth={1.5} />
      <span>{text}</span>
    </div>
  );
}

function totalSpeed(tasks: DownloadTask[]) {
  const active = tasks.find((task) => task.status === 'downloading' && task.speed);
  return active?.speed ?? '0 /s';
}
