import { isYouTubeLive } from '../data/youtube.js';

export function LiveBanner() {
  if (isYouTubeLive()) {
    return (
      <p className="muted">
        Datos en vivo desde la YouTube Data API v3. La reproducción usa el reproductor embebido oficial.
      </p>
    );
  }
  return (
    <p className="muted" role="status">
      Catálogo local de respaldo. Para tendencias y búsqueda reales, crea una clave de YouTube Data API v3,
      restríngela por HTTP referrer y define <code>VITE_YOUTUBE_API_KEY</code> en el build
      (secreto de GitHub Actions).
    </p>
  );
}
