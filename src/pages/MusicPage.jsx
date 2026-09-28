import { useMemo, useState } from 'react';
import { thumbnailUrl } from '../data/videos.js';
import { fetchMusic } from '../data/youtube.js';
import { useAsyncData } from '../hooks/useAsyncData.js';
import { useMusic } from '../hooks/useMusic.jsx';
import { YoutubeAudioPlayer } from '../components/YoutubeAudioPlayer.jsx';
import { SkeletonGrid } from '../components/SkeletonGrid.jsx';
import { EmptyState, ErrorState } from '../components/EmptyState.jsx';

export function MusicPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const catalog = useAsyncData(() => fetchMusic(submitted), [submitted]);
  const {
    queue,
    current,
    index,
    shuffle,
    repeat,
    playTrack,
    addToQueue,
    removeFromQueue,
    clearQueue,
    next,
    prev,
    setIndex,
    toggleShuffle,
    toggleRepeat
  } = useMusic();

  const tracks = catalog.data || [];
  const remaining = useMemo(
    () => queue.filter((_, i) => i !== index),
    [queue, index]
  );

  return (
    <div className="page music-page">
      <div className="page-header">
        <div>
          <p className="kicker">Watchimply Music</p>
          <h1>Tu radio de vídeos musicales</h1>
          <p className="muted">Catálogo musical de YouTube con playlist, cola y reproducción continua.</p>
        </div>
      </div>

      <form
        className="search-form music-search"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(query.trim());
        }}
        role="search"
      >
        <label className="sr-only" htmlFor="music-search">
          Buscar música
        </label>
        <input
          id="music-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busca canciones, artistas o álbumes"
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="music-layout">
        <section className="music-now">
          <YoutubeAudioPlayer videoId={current?.id} onEnded={next} />
          {current ? (
            <>
              <h2>{current.title}</h2>
              <p className="muted">
                {current.channel} {current.duration ? `· ${current.duration}` : ''}
              </p>
            </>
          ) : (
            <p className="muted">Selecciona un tema para empezar a escuchar.</p>
          )}
          <div className="music-controls">
            <button type="button" className="action-btn" onClick={prev} aria-label="Anterior">
              Anterior
            </button>
            <button type="button" className="action-btn primary" onClick={next}>
              Siguiente
            </button>
            <button type="button" className={shuffle ? 'ghost-btn active' : 'ghost-btn'} onClick={toggleShuffle}>
              Aleatorio
            </button>
            <button type="button" className={repeat ? 'ghost-btn active' : 'ghost-btn'} onClick={toggleRepeat}>
              Repetir
            </button>
          </div>
        </section>

        <aside className="music-queue" aria-label="Playlist">
          <div className="section-title">
            <h2>Playlist</h2>
            {queue.length > 0 && (
              <button type="button" className="ghost-btn" onClick={clearQueue}>
                Vaciar
              </button>
            )}
          </div>
          {queue.length === 0 ? (
            <EmptyState title="Playlist vacía" text="Añade canciones del catálogo." />
          ) : (
            <ol className="track-list">
              {queue.map((track, i) => (
                <li key={`${track.id}-${i}`} className={i === index ? 'track active' : 'track'}>
                  <button type="button" className="track-main" onClick={() => setIndex(i)}>
                    <img src={thumbnailUrl(track.id)} alt="" />
                    <span>
                      <strong>{track.title}</strong>
                      <em>{track.channel}</em>
                    </span>
                  </button>
                  <button type="button" className="ghost-btn" onClick={() => removeFromQueue(track.id)} aria-label="Quitar">
                    Quitar
                  </button>
                </li>
              ))}
            </ol>
          )}
          {remaining.length > 0 && <p className="muted">{remaining.length} en cola</p>}
        </aside>
      </div>

      <section className="section">
        <div className="section-title">
          <h2>{submitted ? `Resultados de «${submitted}»` : 'Tendencias musicales'}</h2>
        </div>
        {catalog.loading ? (
          <SkeletonGrid count={8} />
        ) : catalog.error ? (
          <ErrorState text={catalog.error.message} />
        ) : tracks.length === 0 ? (
          <EmptyState title="Sin canciones" text="Prueba otra búsqueda musical." />
        ) : (
          <div className="grid">
            {tracks.map((video) => (
              <article key={video.id} className="music-card">
                <button type="button" className="video-card" onClick={() => playTrack(video, tracks)}>
                  <div className="thumb-wrap">
                    <img src={thumbnailUrl(video.id)} alt="" loading="lazy" />
                    <span className="duration">{video.duration}</span>
                  </div>
                  <div className="card-title">{video.title}</div>
                  <div className="card-meta">{video.channel}</div>
                </button>
                <div className="card-actions">
                  <button type="button" className="ghost-btn" onClick={() => playTrack(video, queue)}>
                    Reproducir
                  </button>
                  <button type="button" className="ghost-btn" onClick={() => addToQueue(video)}>
                    Añadir a playlist
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
