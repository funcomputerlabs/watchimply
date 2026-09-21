import { Link } from 'react-router-dom';
import { VideoGrid } from '../components/VideoCard.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { SkeletonGrid } from '../components/SkeletonGrid.jsx';
import { thumbnailUrl } from '../data/videos.js';
import { fetchByIds } from '../data/youtube.js';
import { useLibrary } from '../hooks/useLibrary.jsx';
import { useAsyncData } from '../hooks/useAsyncData.js';
import { formatDate } from '../utils/format.js';

export function HistoryPage() {
  const { history, removeHistory, clearHistory } = useLibrary();
  const ids = history.map((item) => item.id);
  const { loading, data } = useAsyncData(() => fetchByIds(ids), [ids.join('|')]);
  const byId = new Map((data || []).map((video) => [video.id, video]));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Biblioteca local</p>
          <h1>Historial</h1>
          <p className="muted">Se guarda en este navegador. Los metadatos se hidratan desde YouTube.</p>
        </div>
        {history.length > 0 && (
          <button type="button" className="action-btn" onClick={clearHistory}>
            Limpiar historial
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <EmptyState
          title="Aún no has visto nada"
          text="Abre un vídeo y aparecerá aquí."
          action={<Link to="/">Ir al inicio</Link>}
        />
      ) : loading ? (
        <SkeletonGrid count={4} />
      ) : (
        <div>
          {history.map((item) => {
            const video = byId.get(item.id);
            if (!video) return null;
            return (
              <div key={item.id} className="related-item">
                <Link to={`/watch/${video.id}`} className="thumb-wrap">
                  <img src={thumbnailUrl(video.id)} alt="" loading="lazy" decoding="async" />
                </Link>
                <div>
                  <Link to={`/watch/${video.id}`} className="card-title">
                    {video.title}
                  </Link>
                  <p className="card-meta">
                    {video.channel} · visto {formatDate(item.watchedAt)}
                  </p>
                  <button type="button" className="ghost-btn" onClick={() => removeHistory(item.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function LaterPage() {
  const { later } = useLibrary();
  const { loading, data } = useAsyncData(() => fetchByIds(later), [later.join('|')]);
  const videos = data || [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Biblioteca local</p>
          <h1>Ver más tarde</h1>
          <p className="muted">{later.length} vídeo{later.length === 1 ? '' : 's'} guardados en este dispositivo.</p>
        </div>
      </div>
      {later.length === 0 ? (
        <EmptyState title="Lista vacía" text="Guarda vídeos desde las tarjetas o la ficha de reproducción." />
      ) : loading ? (
        <SkeletonGrid count={4} />
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}

export function LikesPage() {
  const { likes } = useLibrary();
  const { loading, data } = useAsyncData(() => fetchByIds(likes), [likes.join('|')]);
  const videos = data || [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Biblioteca local</p>
          <h1>Me gusta</h1>
          <p className="muted">Lista local; títulos y miniaturas vienen de YouTube.</p>
        </div>
      </div>
      {likes.length === 0 ? (
        <EmptyState title="Sin Me gusta" text="Marca vídeos para construir una lista local. No hace falta cuenta." />
      ) : loading ? (
        <SkeletonGrid count={4} />
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}
