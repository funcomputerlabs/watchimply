# WATCHIMPLY

**Watchimply — YouTube, simplificado.**

Cliente web independiente para descubrir y ver contenido de YouTube con una interfaz limpia, rápida y pensada como aplicación de escritorio. Es un proyecto **frontend estático** listo para GitHub Pages.

WATCHIMPLY **no pertenece a YouTube ni a Google**. No copia el branding oficial. Los vídeos se muestran únicamente con el [reproductor embebido oficial](https://developers.google.com/youtube/iframe_api_reference). El catálogo en vivo usa la [YouTube Data API v3](https://developers.google.com/youtube/v3).

## Características

- Tendencias reales (`videos.list?chart=mostPopular`)
- Búsqueda real (`search.list`) por título, canal y categoría
- Reproductor embebido oficial (`youtube-nocookie`)
- Historial, Ver más tarde y Me gusta en `localStorage`
- Perfil ficticio local (sin autenticación)
- Tema oscuro por defecto y tema claro
- PWA: `manifest.json`, service worker e iconos
- Hash routing compatible con GitHub Pages (`/watchimply/` o raíz)

## Tecnologías

- HTML5, CSS3 y JavaScript
- React 18 + Vite 5
- React Router (`HashRouter`)
- YouTube Data API v3 (clave de cliente restringida por HTTP referrer)
- Sin backend propio, sin Supabase y sin Firebase

## Cómo ejecutar en local

Requisitos: Node.js 18 o superior (solo para desarrollo y build).

```bash
npm install
cp .env.example .env
```

En Google Cloud: habilita **YouTube Data API v3**, crea una clave de API y restríngela por HTTP referrer a `http://localhost:5173/*` y a tu dominio de Pages.

```
VITE_YOUTUBE_API_KEY=tu_clave
```

```bash
npm run dev
```

Sin clave, la app usa el catálogo local de `src/data/videos.js`.

## Cómo hacer build

```bash
npm run build
npm run preview
```

## Publicar en GitHub Pages

1. Sube el código a `main`.
2. **Settings → Secrets and variables → Actions**: secreto `VITE_YOUTUBE_API_KEY`.
3. **Settings → Pages → Source: GitHub Actions**.
4. El workflow usa `BASE_PATH: /NOMBRE-DEL-REPO/`.

Sitio esperado: `https://funcomputerlabs.github.io/watchimply/`

## Estructura

- `src/data/youtube.js` — cliente oficial de YouTube Data API v3
- `src/data/videos.js` — catálogo de respaldo
- `.github/workflows/deploy.yml` — build y Pages

## Limitaciones

- En un sitio estático la clave de API **queda en el JavaScript**. Restríngela por referrer; no uses una clave de servidor.
- No hay comentarios ni login de Google.
- Historial y listas son locales.
- No hay descarga ni omisión de anuncios.

## Licencia y marca

Proyecto independiente. YouTube es marca de Google LLC.
