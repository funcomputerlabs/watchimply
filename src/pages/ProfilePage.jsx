import { Link } from 'react-router-dom';
import { DEMO_USER } from '../data/videos.js';
import { useLibrary } from '../hooks/useLibrary.jsx';
import { initials } from '../utils/format.js';

export function ProfilePage() {
  const { history, later, likes } = useLibrary();

  return (
    <div className="page">
      <section className="profile-card">
        <div className="profile-avatar" aria-hidden="true">
          {initials(DEMO_USER.name)}
        </div>
        <div>
          <p className="kicker">Perfil local</p>
          <h1>{DEMO_USER.name}</h1>
          <p className="muted">{DEMO_USER.handle} · {DEMO_USER.bio}</p>
        </div>
      </section>
      <div className="stats-row">
        <Stat to="/history" label="Vídeos vistos" value={history.length} />
        <Stat to="/later" label="Guardados" value={later.length} />
        <Stat to="/likes" label="Me gusta" value={likes.length} />
      </div>
    </div>
  );
}

function Stat({ to, label, value }) {
  return (
    <Link to={to} className="stat-box">
      <div className="kicker">{label}</div>
      <h2>{value}</h2>
    </Link>
  );
}
