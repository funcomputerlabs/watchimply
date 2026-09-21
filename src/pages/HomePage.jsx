import { useState } from 'react';
import { FilterChips } from '../components/FilterChips.jsx';
import { VideoGrid } from '../components/VideoCard.jsx';
import { SkeletonGrid } from '../components/SkeletonGrid.jsx';
import { EmptyState, ErrorState } from '../components/EmptyState.jsx';
import { LiveBanner } from '../components/LiveBanner.jsx';
import { fetchRecommended, fetchTrending } from '../data/youtube.js';
import { useAsyncData } from '../hooks/useAsyncData.js';

export function HomePage() {
  const [category, setCategory] = useState('all');
  const recommended = useAsyncData(() => fetchRecommended(category), [category]);
  const trending = useAsyncData(() => fetchTrending(category), [category]);
  const loading = recommended.loading || trending.loading;
  const error = recommended.error || trending.error;
  const rec = recommended.data || [];
  const trend = trending.data || [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Inicio</p>
          <h1>Recomendados para ti</h1>
          <LiveBanner />
        </div>
      </div>
      <FilterChips value={category} onChange={setCategory} />
      {loading ? (
        <SkeletonGrid count={8} />
      ) : error ? (
        <ErrorState text={error.message} />
      ) : rec.length === 0 && trend.length === 0 ? (
        <EmptyState title="Sin resultados" text="Prueba otra categoría." />
      ) : (
        <>
          <section className="section">
            <div className="section-title">
              <h2>Recomendados</h2>
              <span className="muted">{rec.length} vídeos</span>
            </div>
            <VideoGrid videos={rec} />
          </section>
          <section className="section">
            <div className="section-title">
              <h2>Tendencias</h2>
              <span className="muted">mostPopular · región ES</span>
            </div>
            <VideoGrid videos={trend} />
          </section>
        </>
      )}
      <p className="legal">
        WATCHIMPLY es un proyecto independiente. No pertenece a YouTube ni a Google. Los vídeos se insertan con el reproductor oficial y no se descargan.
      </p>
    </div>
  );
}
