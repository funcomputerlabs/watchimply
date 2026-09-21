import { Link } from 'react-router-dom';
import { EmptyState, ErrorState } from '../components/EmptyState.jsx';
import { SkeletonGrid } from '../components/SkeletonGrid.jsx';
import { fetchTrending } from '../data/youtube.js';
import { useAsyncData } from '../hooks/useAsyncData.js';

export function SubscriptionsPage() {
  const { loading, data, error } = useAsyncData(() => fetchTrending('all'), []);
  const channels = uniqueChannels(data || []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Canales en tendencias</p>
          <h1>Suscripciones</h1>
          <p className="muted">
            No hay cuentas reales. Estos canales salen del feed público mostPopular de YouTube.
          </p>
        </div>
      </div>
      {loading ? (
        <SkeletonGrid count={6} />
      ) : error ? (
        <ErrorState text={error.message} />
      ) : channels.length === 0 ? (
        <EmptyState title="Sin canales" text="No hay datos de YouTube en este momento." />
      ) : (
        <div className="grid">
          {channels.map((channel) => (
            <article key={channel.name} className="stat-box">
              <h2>{channel.name}</h2>
              <p className="muted">{channel.videos} vídeo{channel.videos === 1 ? '' : 's'} en tendencias</p>
              <p>
                <Link to={`/search?q=${encodeURIComponent(channel.name)}`}>Buscar canal</Link>
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function uniqueChannels(videos) {
  const map = new Map();
  videos.forEach((video) => {
    if (!video.channel) return;
    if (!map.has(video.channel)) {
      map.set(video.channel, { name: video.channel, videos: 0 });
    }
    map.get(video.channel).videos += 1;
  });
  return [...map.values()].sort((a, b) => b.videos - a.videos);
}
