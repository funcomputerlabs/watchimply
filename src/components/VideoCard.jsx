import { Link } from 'react-router-dom';
import { thumbnailUrl } from '../data/videos.js';
import { formatDate, formatViews } from '../utils/format.js';
import { useLibrary } from '../hooks/useLibrary.jsx';

export function VideoCard({ video }) {
  const { toggleLater, toggleLike, isLater, isLiked } = useLibrary();

  return (
    <article>
      <Link to={`/watch/${video.id}`} className="video-card">
        <div className="thumb-wrap">
          <img
            src={thumbnailUrl(video.id)}
            alt={video.title}
            loading="lazy"
            decoding="async"
            width="480"
            height="270"
          />
          <span className="duration">{video.duration}</span>
        </div>
        <div className="card-title">{video.title}</div>
        <div className="card-meta">
          {video.channel}
          <br />
          {formatViews(video.views)} visualizaciones · {formatDate(video.publishedAt)}
        </div>
      </Link>
      <div className="card-actions">
        <button
          type="button"
          className={isLater(video.id) ? 'ghost-btn active' : 'ghost-btn'}
          onClick={() => toggleLater(video.id)}
        >
          {isLater(video.id) ? 'Guardado' : 'Ver más tarde'}
        </button>
        <button
          type="button"
          className={isLiked(video.id) ? 'ghost-btn active' : 'ghost-btn'}
          onClick={() => toggleLike(video.id)}
          aria-pressed={isLiked(video.id)}
        >
          Me gusta
        </button>
      </div>
    </article>
  );
}

export function VideoGrid({ videos }) {
  return (
    <div className="grid">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
