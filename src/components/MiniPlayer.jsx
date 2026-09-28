import { Link } from 'react-router-dom';
import { thumbnailUrl } from '../data/videos.js';
import { useMusic } from '../hooks/useMusic.jsx';

export function MiniPlayer() {
  const { current, next, prev, queue } = useMusic();
  if (!current) return null;

  return (
    <div className="mini-player" role="region" aria-label="Reproductor Watchimply Music">
      <img src={thumbnailUrl(current.id)} alt="" width="56" height="56" />
      <div className="mini-meta">
        <Link to="/music">{current.title}</Link>
        <span className="muted">{current.channel}</span>
      </div>
      <div className="mini-controls">
        <button type="button" className="icon-btn" aria-label="Anterior" onClick={prev}>
          ⏮
        </button>
        <button type="button" className="icon-btn" aria-label="Siguiente" onClick={next} disabled={!queue.length}>
          ⏭
        </button>
        <Link to="/music" className="ghost-btn">
          Abrir Music
        </Link>
      </div>
    </div>
  );
}
