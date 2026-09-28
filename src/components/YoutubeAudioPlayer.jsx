import { useEffect, useRef } from 'react';

let apiPromise;

function loadYoutubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') previous();
      resolve(window.YT);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function YoutubeAudioPlayer({ videoId, onEnded }) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoId) return undefined;
    let cancelled = false;

    loadYoutubeApi().then((YT) => {
      if (cancelled || !hostRef.current) return;
      if (playerRef.current?.loadVideoById) {
        playerRef.current.loadVideoById(videoId);
        return;
      }
      playerRef.current = new YT.Player(hostRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          autoplay: 1,
          origin: window.location.origin
        },
        events: {
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) onEnded?.();
          }
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [videoId, onEnded]);

  useEffect(
    () => () => {
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* player already gone */
      }
      playerRef.current = null;
    },
    []
  );

  if (!videoId) {
    return <div className="music-stage empty">Elige un tema de la playlist</div>;
  }

  return (
    <div className="music-stage">
      <div ref={hostRef} className="music-iframe" />
    </div>
  );
}
