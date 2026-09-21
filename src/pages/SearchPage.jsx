import { useSearchParams } from 'react-router-dom';
import { FilterChips } from '../components/FilterChips.jsx';
import { VideoGrid } from '../components/VideoCard.jsx';
import { EmptyState, ErrorState } from '../components/EmptyState.jsx';
import { SkeletonGrid } from '../components/SkeletonGrid.jsx';
import { LiveBanner } from '../components/LiveBanner.jsx';
import { fetchSearch } from '../data/youtube.js';
import { useAsyncData } from '../hooks/useAsyncData.js';

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const category = params.get('cat') || 'all';
  const { loading, data, error } = useAsyncData(() => fetchSearch(query, category), [query, category]);
  const results = data || [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="kicker">Búsqueda</p>
          <h1>{query ? `Resultados para «${query}»` : 'Buscar en YouTube'}</h1>
          <LiveBanner />
        </div>
      </div>
      <FilterChips
        value={category}
        onChange={(next) => {
          const copy = new URLSearchParams(params);
          if (next === 'all') copy.delete('cat');
          else copy.set('cat', next);
          setParams(copy);
        }}
      />
      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <ErrorState text={error.message} />
      ) : results.length === 0 ? (
        <EmptyState
          title="Sin coincidencias"
          text="Prueba con «minecraft», un canal u otra categoría."
        />
      ) : (
        <VideoGrid videos={results} />
      )}
    </div>
  );
}
