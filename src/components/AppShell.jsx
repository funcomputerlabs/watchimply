import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { TopBar } from './TopBar.jsx';
import { useTheme } from '../hooks/useTheme.js';

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      {menuOpen && (
        <button type="button" className="overlay" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />
      )}
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <div className="workspace">
        <TopBar onMenu={() => setMenuOpen(true)} theme={theme} onToggleTheme={toggle} />
        <main id="contenido">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
