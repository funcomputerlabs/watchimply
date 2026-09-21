import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { DEMO_USER } from '../data/videos.js';
import { initials } from '../utils/format.js';

export function TopBar({ onMenu, theme, onToggleTheme }) {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  function onSubmit(event) {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : '/search');
  }

  return (
    <header className="topbar">
      <button type="button" className="icon-btn menu-btn" aria-label="Abrir menú" onClick={onMenu}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <form className="search-form" onSubmit={onSubmit} role="search">
        <label className="sr-only" htmlFor="search-input">
          Buscar vídeos
        </label>
        <input
          id="search-input"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por título, canal o categoría"
          autoComplete="off"
        />
        <button type="submit">Buscar</button>
      </form>
      <button
        type="button"
        className="icon-btn"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
      <Link to="/profile" className="avatar" aria-label="Abrir perfil local">
        {initials(DEMO_USER.name)}
      </Link>
    </header>
  );
}
