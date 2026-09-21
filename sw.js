/* Watchimply service worker — cache of static app shell for GitHub Pages. */
const CACHE_NAME = 'watchimply-v1';

function appBase() {
  const path = self.location.pathname;
  return path.replace(/sw\.js$/i, '');
}

self.addEventListener('install', (event) => {
  const base = appBase();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        base,
        `${base}index.html`,
        `${base}manifest.json`
      ]).catch(() => undefined)
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const networked = fetch(request)
        .then((response) => {
          if (response && response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached || caches.match(`${appBase()}index.html`));

      return cached || networked;
    })
  );
});
