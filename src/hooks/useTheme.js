import { useCallback, useEffect, useState } from 'react';
import { getTheme, setTheme as persistTheme } from '../utils/storage.js';

export function useTheme() {
  const [theme, setThemeState] = useState(() => getTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    persistTheme(theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f6fb' : '#0b0d12');
  }, [theme]);

  const toggle = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
