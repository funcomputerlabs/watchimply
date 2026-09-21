import { NavLink } from 'react-router-dom';
import { Logo } from './Logo.jsx';

const LINKS = [
  { to: '/', label: 'Inicio', icon: HomeIcon },
  { to: '/trending', label: 'Tendencias', icon: TrendIcon },
  { to: '/subscriptions', label: 'Suscripciones', icon: SubIcon },
  { to: '/history', label: 'Historial', icon: HistoryIcon },
  { to: '/later', label: 'Ver más tarde', icon: LaterIcon },
  { to: '/likes', label: 'Me gusta', icon: LikeIcon }
];

export function Sidebar({ open, onNavigate }) {
  return (
    <aside className={open ? 'sidebar open' : 'sidebar'} aria-label="Navegación principal">
      <NavLink to="/" onClick={onNavigate} aria-label="Ir al inicio">
        <Logo />
      </NavLink>
      <nav className="nav-list">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={onNavigate}
          >
            <link.icon />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <p className="sidebar-foot">
        Proyecto independiente. No está afiliado a YouTube ni a Google. El contenido se muestra con el reproductor embebido oficial.
      </p>
    </aside>
  );
}

function HomeIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 11 12 4l8 7v9H4z" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 17 10 11l4 4 6-8" />
    </svg>
  );
}

function SubIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 3h8" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 12a8 8 0 1 0 2-5.3" />
      <path d="M4 4v5h5M12 8v5l3 2" />
    </svg>
  );
}

function LaterIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 11v9H4v-9zm3 9h7.2a2 2 0 0 0 1.9-1.4l1.7-5.2A2 2 0 0 0 18.9 11H14V7a2 2 0 0 0-2-2h-.4L7 11" />
    </svg>
  );
}
