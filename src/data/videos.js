/**
 * Catálogo de demostración local.
 *
 * Los IDs apuntan a vídeos públicos de YouTube y se reproducen
 * únicamente mediante el reproductor embebido oficial.
 * Miniaturas: CDN público i.ytimg.com (no es una API privada).
 * Estadísticas y descripciones son datos mock para el modo estático.
 */
export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'music', label: 'Música' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'tech', label: 'Tecnología' },
  { id: 'news', label: 'Noticias' },
  { id: 'education', label: 'Educación' },
  { id: 'entertainment', label: 'Entretenimiento' }
];

export const VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley — Never Gonna Give You Up (Official Video)',
    channel: 'Rick Astley',
    category: 'music',
    views: 1520000000,
    publishedAt: '2009-10-25',
    duration: '3:33',
    description:
      'Vídeo musical oficial. Datos de demostración de Watchimply: las estadísticas son de ejemplo y no se consultan en tiempo real.',
    tags: ['música', 'pop', 'clásico']
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY — GANGNAM STYLE (강남스타일)',
    channel: 'officialpsy',
    category: 'music',
    views: 5100000000,
    publishedAt: '2012-07-15',
    duration: '4:13',
    description: 'Vídeo musical de demostración en el catálogo local de Watchimply.',
    tags: ['música', 'k-pop']
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi — Despacito ft. Daddy Yankee',
    channel: 'Luis Fonsi',
    category: 'music',
    views: 8400000000,
    publishedAt: '2017-01-13',
    duration: '4:42',
    description: 'Éxito global utilizado como ejemplo de la categoría Música.',
    tags: ['música', 'latino']
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Ed Sheeran — Shape of You (Official Video)',
    channel: 'Ed Sheeran',
    category: 'music',
    views: 6300000000,
    publishedAt: '2017-01-30',
    duration: '4:24',
    description: 'Vídeo musical de demostración. Watchimply no almacena ni redistribuye el archivo de vídeo.',
    tags: ['música', 'pop']
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Queen — Bohemian Rhapsody (Official Video)',
    channel: 'Queen Official',
    category: 'music',
    views: 2100000000,
    publishedAt: '2008-08-01',
    duration: '5:59',
    description: 'Clásico del rock en el catálogo de demostración.',
    tags: ['música', 'rock']
  },
  {
    id: 'OPf0YbXqDm0',
    title: 'Mark Ronson — Uptown Funk ft. Bruno Mars',
    channel: 'Mark Ronson',
    category: 'music',
    views: 5100000000,
    publishedAt: '2014-11-19',
    duration: '4:31',
    description: 'Ejemplo de la categoría Música en Watchimply.',
    tags: ['música', 'funk']
  },
  {
    id: 'G7RgN9ijwE4',
    title: 'C418 — Sweden (Minecraft Volume Alpha)',
    channel: 'C418',
    category: 'gaming',
    views: 98000000,
    publishedAt: '2011-03-04',
    duration: '3:35',
    description: 'Banda sonora de Minecraft. Incluido para que la búsqueda «minecraft» devuelva resultados reales del catálogo demo.',
    tags: ['minecraft', 'gaming', 'música']
  },
  {
    id: 'MmB9b5njVbA',
    title: 'Minecraft: Official Trailer',
    channel: 'Minecraft',
    category: 'gaming',
    views: 120000000,
    publishedAt: '2011-11-06',
    duration: '1:08',
    description: 'Tráiler de demostración asociado a Minecraft. Si el ID público cambia, el reproductor oficial de YouTube mostrará el estado correspondiente.',
    tags: ['minecraft', 'gaming', 'tráiler']
  },
  {
    id: 'lP-4nGrpNOs',
    title: 'Minecraft Live — Highlights de demostración',
    channel: 'Minecraft',
    category: 'gaming',
    views: 15400000,
    publishedAt: '2023-10-15',
    duration: '12:04',
    description: 'Entrada de catálogo local sobre Minecraft. Metadatos de ejemplo.',
    tags: ['minecraft', 'gaming']
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Me at the zoo',
    channel: 'jawed',
    category: 'entertainment',
    views: 340000000,
    publishedAt: '2005-04-23',
    duration: '0:19',
    description: 'Uno de los primeros vídeos públicos de YouTube, usado como pieza histórica de demostración.',
    tags: ['entretenimiento', 'historia']
  },
  {
    id: 'LXb3EKWsInQ',
    title: 'Costa Rica in 4K (Drone Footage)',
    channel: 'Jacob + Katie Schwarz',
    category: 'entertainment',
    views: 89000000,
    publishedAt: '2016-08-25',
    duration: '5:10',
    description: 'Metraje aéreo de demostración. Se reproduce con el embed oficial.',
    tags: ['viajes', '4k']
  },
  {
    id: 'aqz-KE-bpKQ',
    title: 'Big Buck Bunny 60fps 4K',
    channel: 'Blender',
    category: 'entertainment',
    views: 21000000,
    publishedAt: '2014-11-10',
    duration: '10:34',
    description: 'Cortometraje de código abierto de Blender, útil como contenido de demostración.',
    tags: ['animación', 'blender']
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'YouTube Developers Live: Embedded Web Player',
    channel: 'Google for Developers',
    category: 'tech',
    views: 2400000,
    publishedAt: '2012-10-24',
    duration: '26:52',
    description: 'Sesión técnica sobre el reproductor embebido oficial. Watchimply usa exactamente ese mecanismo de inserción.',
    tags: ['tecnología', 'youtube', 'api']
  },
  {
    id: 'sX1Y2JMK6g8',
    title: 'Inside the James Webb Space Telescope',
    channel: 'NASA',
    category: 'tech',
    views: 18200000,
    publishedAt: '2022-07-12',
    duration: '8:41',
    description: 'Pieza de divulgación científica en el catálogo de demostración (metadatos mock).',
    tags: ['tecnología', 'espacio', 'nasa']
  },
  {
    id: 'wXhTHyIgQ_U',
    title: 'Introducción al diseño de interfaces modernas',
    channel: 'Pixel Lab',
    category: 'tech',
    views: 920000,
    publishedAt: '2024-02-02',
    duration: '14:22',
    description: 'Entrada de ejemplo de Tecnología. El vídeo se carga solo si el ID público sigue disponible.',
    tags: ['tecnología', 'diseño', 'ui']
  },
  {
    id: 'iG9CE55wbtY',
    title: 'How to speak so that people want to listen',
    channel: 'TED',
    category: 'education',
    views: 41000000,
    publishedAt: '2014-06-27',
    duration: '9:58',
    description: 'Charla TED de demostración en la categoría Educación.',
    tags: ['educación', 'ted', 'comunicación']
  },
  {
    id: '8S0FDjFBj8o',
    title: '10 ways to have a better conversation',
    channel: 'TED',
    category: 'education',
    views: 28000000,
    publishedAt: '2016-03-08',
    duration: '11:45',
    description: 'Otra charla TED incluida en el catálogo local.',
    tags: ['educación', 'ted']
  },
  {
    id: '5MgBikgcWnY',
    title: 'The first 20 hours — how to learn anything',
    channel: 'TED',
    category: 'education',
    views: 39000000,
    publishedAt: '2013-05-10',
    duration: '19:37',
    description: 'Charla sobre aprendizaje acelerado. Datos de vistas de ejemplo.',
    tags: ['educación', 'aprendizaje']
  },
  {
    id: 'hT_nvWreIhg',
    title: 'OneRepublic — Counting Stars (Official Video)',
    channel: 'OneRepublic',
    category: 'music',
    views: 3900000000,
    publishedAt: '2013-05-31',
    duration: '4:44',
    description: 'Vídeo musical de demostración.',
    tags: ['música', 'pop']
  },
  {
    id: 'YQHsXMglC9A',
    title: 'Adele — Hello (Official Music Video)',
    channel: 'Adele',
    category: 'music',
    views: 3200000000,
    publishedAt: '2015-10-22',
    duration: '6:07',
    description: 'Vídeo musical de demostración en Watchimply.',
    tags: ['música', 'pop']
  },
  {
    id: 'e-ORhEE9VVg',
    title: 'Taylor Swift — Blank Space',
    channel: 'Taylor Swift',
    category: 'music',
    views: 3500000000,
    publishedAt: '2014-11-10',
    duration: '4:32',
    description: 'Ejemplo de catálogo musical.',
    tags: ['música', 'pop']
  },
  {
    id: 'CevxZvSJLk8',
    title: 'Katy Perry — Roar (Official)',
    channel: 'Katy Perry',
    category: 'music',
    views: 3700000000,
    publishedAt: '2013-09-05',
    duration: '4:30',
    description: 'Vídeo musical de demostración.',
    tags: ['música', 'pop']
  },
  {
    id: 'PIh2xe4jnpk',
    title: 'Imagine Dragons — Believer',
    channel: 'Imagine Dragons',
    category: 'music',
    views: 2700000000,
    publishedAt: '2017-03-07',
    duration: '3:37',
    description: 'Vídeo musical de demostración.',
    tags: ['música', 'rock']
  },
  {
    id: '2Vv-BfVoq4g',
    title: 'Ed Sheeran — Perfect (Official Music Video)',
    channel: 'Ed Sheeran',
    category: 'music',
    views: 3600000000,
    publishedAt: '2017-11-09',
    duration: '4:39',
    description: 'Segundo título de Ed Sheeran para probar búsqueda por canal.',
    tags: ['música', 'pop']
  },
  {
    id: 'jPjoiXA2tJs',
    title: 'NASA: Artemis briefing (demo catalog)',
    channel: 'NASA',
    category: 'news',
    views: 2100000,
    publishedAt: '2024-01-18',
    duration: '22:11',
    description: 'Entrada de Noticias de demostración. Las cifras son locales y no se actualizan desde un servidor.',
    tags: ['noticias', 'espacio', 'nasa']
  },
  {
    id: 'gCNeDWCI0vo',
    title: 'Resumen semanal de ciencia y tecnología',
    channel: 'North Signal',
    category: 'news',
    views: 640000,
    publishedAt: '2025-11-02',
    duration: '9:18',
    description: 'Noticia de ejemplo del catálogo estático. No hay redaccion en vivo.',
    tags: ['noticias', 'tecnología']
  },
  {
    id: 'IcrbM1l_BoI',
    title: 'Avicii — Wake Me Up (Official Video)',
    channel: 'Avicii',
    category: 'music',
    views: 2300000000,
    publishedAt: '2013-07-29',
    duration: '4:33',
    description: 'Vídeo musical de demostración.',
    tags: ['música', 'electrónica']
  },
  {
    id: 'tgbNymZ7vqY',
    title: 'Nyan Cat [original]',
    channel: 'Nyan Cat',
    category: 'entertainment',
    views: 210000000,
    publishedAt: '2011-04-05',
    duration: '3:37',
    description: 'Meme clásico de entretenimiento en el catálogo local.',
    tags: ['entretenimiento', 'meme']
  },
  {
    id: 'hFZFjoX2cGg',
    title: 'Khan Academy: Introduction to algorithms',
    channel: 'Khan Academy',
    category: 'education',
    views: 4200000,
    publishedAt: '2019-09-12',
    duration: '16:05',
    description: 'Clase de ejemplo para Educación. Los metadatos son de demostración.',
    tags: ['educación', 'algoritmos']
  },
  {
    id: 'n9xhJrPXop4',
    title: 'Unreal Engine 5 — tech demo walkthrough',
    channel: 'Epic Games',
    category: 'gaming',
    views: 31000000,
    publishedAt: '2022-04-05',
    duration: '18:20',
    description: 'Demostración técnica de videojuegos. Categoría Gaming.',
    tags: ['gaming', 'unreal', 'tecnología']
  },
  {
    id: 'oHg5SJYRHA0',
    title: 'Rickroll mirror (demo search control)',
    channel: 'Watchimply Samples',
    category: 'entertainment',
    views: 12000,
    publishedAt: '2020-01-01',
    duration: '3:33',
    description: 'Entrada extra de entretenimiento en el dataset local.',
    tags: ['entretenimiento']
  },
  {
    id: '0KSOMA3QBU0',
    title: 'Katy Perry — Dark Horse (Official)',
    channel: 'Katy Perry',
    category: 'music',
    views: 1700000000,
    publishedAt: '2013-12-20',
    duration: '3:45',
    description: 'Segundo vídeo del mismo canal para filtrar por nombre de canal.',
    tags: ['música', 'pop']
  }
];

export const DEMO_USER = {
  name: 'Watchimply User',
  handle: '@watchimply',
  bio: 'Perfil local de demostración. No hay cuentas reales ni autenticación.'
};

export function getVideoById(id) {
  return VIDEOS.find((video) => video.id === id) || null;
}

export function getRelatedVideos(video, limit = 8) {
  if (!video) return VIDEOS.slice(0, limit);
  const same = VIDEOS.filter((item) => item.id !== video.id && item.category === video.category);
  const rest = VIDEOS.filter((item) => item.id !== video.id && item.category !== video.category);
  return [...same, ...rest].slice(0, limit);
}

export function getTrendingVideos() {
  return [...VIDEOS].sort((a, b) => b.views - a.views).slice(0, 12);
}

export function getRecommendedVideos() {
  return [...VIDEOS].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 12);
}

export function getChannels() {
  const map = new Map();
  VIDEOS.forEach((video) => {
    if (!map.has(video.channel)) {
      map.set(video.channel, { name: video.channel, videos: 0, category: video.category });
    }
    map.get(video.channel).videos += 1;
  });
  return [...map.values()].sort((a, b) => b.videos - a.videos);
}

export function thumbnailUrl(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function embedUrl(id) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}
