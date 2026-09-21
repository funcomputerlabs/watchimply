import { useState } from 'react';
import { FilterChips } from '../components/FilterChips.jsx';
import { VideoGrid } from '../components/VideoCard.jsx';
import { SkeletonGrid } from '../components/SkeletonGrid.jsx';
import { EmptyState, ErrorState } from '../components/EmptyState.jsx';
import { LiveBanner } from '../components/LiveBanner.jsx';
import { fetchTrending } from '../data/youtube.js';
import { useAsyncData } from '../hooks/useAsyncData.js';

export function TrendingPage() {
  const [category, setCategory] = useState('all');
  const { loading, data, error } = useAsyncData(() => fetchTrending(category), [category]);
  const videos = data || [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Explorar</p>
          <h1>Tendencias</h1>
          <LiveBanner />
        </div>
      </div>
      <FilterChips value={category} onChange={setCategory} />
      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <ErrorState text={error.message} />
      ) : videos.length === 0 ? (
        <EmptyState title="Nada en tendencias" text="YouTube no devolvió vídeos para este filtro." />
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}
