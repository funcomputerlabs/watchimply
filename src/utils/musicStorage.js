const KEY = 'watchimply:music:playlist';

export function loadPlaylist() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePlaylist(tracks) {
  localStorage.setItem(KEY, JSON.stringify(tracks));
}

export function compactTrack(video) {
  return {
    id: video.id,
    title: video.title,
    channel: video.channel,
    duration: video.duration || '',
    category: 'music'
  };
}
