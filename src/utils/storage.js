const KEYS = {
  history: 'watchimply:history',
  later: 'watchimply:later',
  likes: 'watchimply:likes',
  theme: 'watchimply:theme'
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getTheme() {
  try {
    return localStorage.getItem(KEYS.theme) || 'dark';
  } catch {
    return 'dark';
  }
}

export function setTheme(theme) {
  localStorage.setItem(KEYS.theme, theme);
}

export function getHistory() {
  return read(KEYS.history, []);
}

export function pushHistory(videoId) {
  const now = new Date().toISOString();
  const next = [
    { id: videoId, watchedAt: now },
    ...getHistory().filter((item) => item.id !== videoId)
  ].slice(0, 80);
  write(KEYS.history, next);
  return next;
}

export function removeHistory(videoId) {
  const next = getHistory().filter((item) => item.id !== videoId);
  write(KEYS.history, next);
  return next;
}

export function clearHistory() {
  write(KEYS.history, []);
  return [];
}

export function getLater() {
  return read(KEYS.later, []);
}

export function toggleLater(videoId) {
  const current = getLater();
  const exists = current.includes(videoId);
  const next = exists ? current.filter((id) => id !== videoId) : [videoId, ...current];
  write(KEYS.later, next);
  return next;
}

export function getLikes() {
  return read(KEYS.likes, []);
}

export function toggleLike(videoId) {
  const current = getLikes();
  const exists = current.includes(videoId);
  const next = exists ? current.filter((id) => id !== videoId) : [videoId, ...current];
  write(KEYS.likes, next);
  return next;
}
