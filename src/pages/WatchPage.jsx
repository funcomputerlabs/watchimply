import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES } from '../data/videos.js';
import { embedUrl, thumbnailUrl } from '../data/videos.js';
import { fetchRelated, fetchVideo } from '../data/youtube.js';
import { categoryLabel, formatDate, formatViews } from '../utils/format.js';
import { useLibrary } from '../hooks/useLibrary.jsx';
import { ErrorState } from '../components/EmptyState.jsx';
import { SkeletonGrid } from '../components/SkeletonGrid.jsx';

export function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { remember, toggleLater, toggleLike, isLater, isLiked } = useLibrary();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchVideo(id)
      .then(async (item) => {
        if (cancelled) return;
        if (!item) {
          setError(new Error('No se encontró este vídeo.'));
          setLoading(false);
          return;
        }
        setVideo(item);
        remember(item.id);
        const next = await fetchRelated(item);
        if (!cancelled) {
          setRelated(next);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id, remember]);

  if (loading) {
    return (
      <div className="page">
        <SkeletonGrid count={4} />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="page">
        <ErrorState text={error?.message || 'No se pudo abrir el vídeo.'} />
        <p>
          <Link to="/">Volver al inicio</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="watch-layout">
        <section>
          <div className="player-frame">
            <iframe
              src={embedUrl(video.id)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <h1 className="watch-title">{video.title}</h1>
          <div className="watch-stats">
            <span>{video.channel}</span>
            <span>{formatViews(video.views)} visualizaciones</span>
            <span>{formatDate(video.publishedAt)}</span>
            <span>{categoryLabel(video.category, CATEGORIES)}</span>
          </div>
          <div className="watch-actions">
            <button type="button" className="action-btn primary" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button type="button" className="action-btn" onClick={() => toggleLater(video.id)}>
              {isLater(video.id) ? 'Quitar de Ver más tarde' : 'Ver más tarde'}
            </button>
            <button type="button" className="action-btn" onClick={() => toggleLike(video.id)} aria-pressed={isLiked(video.id)}>
              {isLiked(video.id) ? 'Quitar Me gusta' : 'Me gusta'}
            </button>
          </div>
          <div className="description">{video.description}</div>
        </section>
        <aside>
          <h2>Relacionados</h2>
          {related.map((item) => (
            <Link key={item.id} to={`/watch/${item.id}`} className="related-item">
              <div className="thumb-wrap">
                <img src={thumbnailUrl(item.id)} alt="" loading="lazy" decoding="async" />
                <span className="duration">{item.duration}</span>
              </div>
              <div>
                <div className="card-title">{item.title}</div>
                <div className="card-meta">
                  {item.channel}
                  <br />
                  {formatViews(item.views)} · {formatDate(item.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
