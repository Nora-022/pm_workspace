import { Layers, Settings, X } from 'lucide-react';
import { ThumbnailArt } from '../../components/ThumbnailArt';
import type { DetectedResource } from '../../types';

interface DetectedPanelProps {
  resources: DetectedResource[];
  selectedIds: Set<string>;
  expandedId: string | null;
  hoverPreviewId: string | null;
  onToggleSelected: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onToggleExpanded: (id: string) => void;
  onRemove: (id: string) => void;
  onDownload: () => void;
}

export function DetectedPanel({
  resources,
  selectedIds,
  expandedId,
  hoverPreviewId,
  onToggleSelected,
  onToggleAll,
  onToggleExpanded,
  onRemove,
  onDownload,
}: DetectedPanelProps) {
  const selectedCount = resources.filter((resource) => selectedIds.has(resource.id)).length;
  const allSelected = resources.length > 0 && selectedCount === resources.length;

  return (
    <div className="detected-panel">
      <div className="select-all-row">
        <label className="checkbox-label">
          <input
            className="sf-checkbox"
            type="checkbox"
            checked={allSelected}
            onChange={(event) => onToggleAll(event.target.checked)}
          />
          <span>Select All</span>
        </label>
        <span className="found-count">{resources.length} Videos Found</span>
      </div>

      <div className="video-list">
        {resources.map((resource) => (
          <DetectedCard
            key={resource.id}
            resource={resource}
            checked={selectedIds.has(resource.id)}
            expanded={expandedId === resource.id}
            hoverPreview={hoverPreviewId === resource.id}
            onToggleSelected={onToggleSelected}
            onToggleExpanded={onToggleExpanded}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="bottom-bar">
        <span className="selected-info">
          Selected <strong>{selectedCount}</strong>
        </span>
        <button className="download-all-button" type="button" disabled={selectedCount === 0} onClick={onDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

interface DetectedCardProps {
  resource: DetectedResource;
  checked: boolean;
  expanded: boolean;
  hoverPreview: boolean;
  onToggleSelected: (id: string) => void;
  onToggleExpanded: (id: string) => void;
  onRemove: (id: string) => void;
}

function DetectedCard({
  resource,
  checked,
  expanded,
  hoverPreview,
  onToggleSelected,
  onToggleExpanded,
  onRemove,
}: DetectedCardProps) {
  const tags = [
    resource.resolution,
    resource.codec,
    resource.audio,
    resource.isPlaylist ? `${resource.selectedEpisodes}/${resource.episodeCount}` : `${resource.episodeCount}/1`,
  ].filter(Boolean);

  return (
    <article className={`video-card ${hoverPreview ? 'is-hovered' : ''} ${expanded ? 'is-expanded' : ''}`}>
      <div className="card-main" onClick={() => onToggleExpanded(resource.id)}>
        <input
          className="sf-checkbox detected-checkbox"
          type="checkbox"
          checked={checked}
          onClick={(event) => event.stopPropagation()}
          onChange={() => onToggleSelected(resource.id)}
          aria-label={`Select ${resource.title}`}
        />
        <div className="card-thumb-wrap">
          <ThumbnailArt hue={resource.hue} duration={resource.duration} label={resource.title} />
          {resource.isPlaylist ? (
            <span className="episode-count">
              <Layers size={11} />
              {resource.episodeCount}
            </span>
          ) : null}
        </div>
        <div className="card-body">
          <h3 className="card-title">{resource.title}</h3>
          <div className="detected-meta">
            {tags.map((tag) => (
              <span className="detected-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="card-hover-actions" aria-label="Detected item actions">
          <button
            className="icon-action"
            type="button"
            title="Settings"
            onClick={(event) => {
              event.stopPropagation();
              onToggleExpanded(resource.id);
            }}
          >
            <Settings size={15} />
          </button>
          <button
            className="icon-action"
            type="button"
            title="Remove"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(resource.id);
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {expanded ? (
        <div className="card-expand">
          <div className="expand-inner">
            <label className="form-field">
              <span className="form-label">Resolution</span>
              <select className="form-select" defaultValue={resource.resolutionOptions[0]}>
                {resource.resolutionOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Language</span>
              <select className="form-select" defaultValue={resource.language}>
                {resource.languageOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Subtitles</span>
              <select className="form-select" defaultValue={resource.subtitles}>
                {resource.subtitleOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          {resource.isPlaylist ? (
            <div className="expand-footer">
              <button className="select-episodes-button" type="button">
                Select Episodes
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
