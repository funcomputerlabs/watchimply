import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  clearHistory as clearHistoryStore,
  getHistory,
  getLater,
  getLikes,
  pushHistory,
  removeHistory as removeHistoryStore,
  toggleLater as toggleLaterStore,
  toggleLike as toggleLikeStore
} from '../utils/storage.js';

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [history, setHistory] = useState(() => getHistory());
  const [later, setLater] = useState(() => getLater());
  const [likes, setLikes] = useState(() => getLikes());

  const remember = useCallback((id) => setHistory(pushHistory(id)), []);
  const removeHistory = useCallback((id) => setHistory(removeHistoryStore(id)), []);
  const clearHistory = useCallback(() => setHistory(clearHistoryStore()), []);
  const toggleLater = useCallback((id) => setLater(toggleLaterStore(id)), []);
  const toggleLike = useCallback((id) => setLikes(toggleLikeStore(id)), []);

  const value = useMemo(
    () => ({
      history,
      later,
      likes,
      remember,
      removeHistory,
      clearHistory,
      toggleLater,
      toggleLike,
      isLater: (id) => later.includes(id),
      isLiked: (id) => likes.includes(id)
    }),
    [history, later, likes, remember, removeHistory, clearHistory, toggleLater, toggleLike]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary debe usarse dentro de LibraryProvider');
  return ctx;
}
