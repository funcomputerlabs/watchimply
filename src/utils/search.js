import { CATEGORIES } from '../data/videos.js';

export function normalizeQuery(value) {
  return (value || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function searchVideos(videos, query, category = 'all') {
  const needle = normalizeQuery(query);
  const cat = category && category !== 'all' ? category : null;

  return videos.filter((video) => {
    if (cat && video.category !== cat) return false;
    if (!needle) return true;

    const haystack = normalizeQuery(
      [video.title, video.channel, video.category, video.description, ...(video.tags || [])].join(' ')
    );

    const categoryLabel = CATEGORIES.find((item) => item.id === video.category)?.label || '';
    return haystack.includes(needle) || normalizeQuery(categoryLabel).includes(needle);
  });
}
