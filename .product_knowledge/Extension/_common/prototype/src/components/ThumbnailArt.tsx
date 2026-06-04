import type { CSSProperties } from 'react';

interface ThumbnailArtProps {
  hue: number;
  duration?: string;
  label?: string;
}

export function ThumbnailArt({ hue, duration, label }: ThumbnailArtProps) {
  const style = {
    '--thumb-hue': hue,
    '--thumb-hue-next': (hue + 42) % 360,
  } as CSSProperties;

  return (
    <div className="thumb-art" style={style} aria-label={label}>
      <div className="thumb-play" />
      {duration ? <span className="thumb-duration">{duration}</span> : null}
    </div>
  );
}
