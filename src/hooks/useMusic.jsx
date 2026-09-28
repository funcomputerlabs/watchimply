import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { compactTrack, loadPlaylist, savePlaylist } from '../utils/musicStorage.js';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [queue, setQueue] = useState(() => loadPlaylist());
  const [index, setIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const current = queue[index] || null;

  const persist = useCallback((nextQueue) => {
    savePlaylist(nextQueue);
  }, []);

  const playTrack = useCallback(
    (video, list) => {
      setQueue((prev) => {
        const source = (list || prev).map(compactTrack);
        const exists = source.findIndex((item) => item.id === video.id);
        const next = exists >= 0 ? source : [...source, compactTrack(video)];
        const nextIndex = next.findIndex((item) => item.id === video.id);
        setIndex(Math.max(0, nextIndex));
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const addToQueue = useCallback(
    (video) => {
      setQueue((prev) => {
        if (prev.some((item) => item.id === video.id)) return prev;
        const next = [...prev, compactTrack(video)];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeFromQueue = useCallback(
    (id) => {
      setQueue((prev) => {
        const next = prev.filter((item) => item.id !== id);
        setIndex((i) => Math.min(i, Math.max(0, next.length - 1)));
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const clearQueue = useCallback(() => {
    setQueue([]);
    setIndex(0);
    persist([]);
  }, [persist]);

  const next = useCallback(() => {
    setIndex((i) => {
      if (!queue.length) return 0;
      if (shuffle) return Math.floor(Math.random() * queue.length);
      if (i + 1 < queue.length) return i + 1;
      return repeat ? 0 : i;
    });
  }, [queue.length, shuffle, repeat]);

  const prev = useCallback(() => {
    setIndex((i) => {
      if (!queue.length) return 0;
      return i > 0 ? i - 1 : repeat ? queue.length - 1 : 0;
    });
  }, [queue.length, repeat]);

  const value = useMemo(
    () => ({
      queue,
      index,
      current,
      shuffle,
      repeat,
      playTrack,
      addToQueue,
      removeFromQueue,
      clearQueue,
      next,
      prev,
      setIndex,
      toggleShuffle: () => setShuffle((v) => !v),
      toggleRepeat: () => setRepeat((v) => !v)
    }),
    [queue, index, current, shuffle, repeat, playTrack, addToQueue, removeFromQueue, clearQueue, next, prev]
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic debe usarse dentro de MusicProvider');
  return ctx;
}
