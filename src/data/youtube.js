import {
  CATEGORIES,
  VIDEOS,
  getRecommendedVideos,
  getRelatedVideos,
  getTrendingVideos,
  getVideoById as getDemoVideo
} from './videos.js';
import { searchVideos as searchDemo } from '../utils/search.js';

const API = 'https://www.googleapis.com/youtube/v3';
const YT_CATEGORY = {
  music: '10',
  gaming: '20',
  tech: '28',
  news: '25',
  education: '27',
  entertainment: '24'
};

const YT_TO_APP = Object.fromEntries(Object.entries(YT_CATEGORY).map(([k, v]) => [v, k]));

function apiKey() {
  return (import.meta.env.VITE_YOUTUBE_API_KEY || '').trim();
}

export function isYouTubeLive() {
  return Boolean(apiKey());
}

function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.at > 8 * 60 * 1000) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function cacheSet(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* quota */
  }
}

export function parseIsoDuration(iso = '') {
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso);
  if (!match) return '';
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const pad = (n) => String(n).padStart(2, '0');
  return hours ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}

function mapItem(item) {
  const id = typeof item.id === 'string' ? item.id : item.id?.videoId;
  const snippet = item.snippet || {};
  const stats = item.statistics || {};
  const details = item.contentDetails || {};
  return {
    id,
    title: snippet.title || 'Vídeo de YouTube',
    channel: snippet.channelTitle || '',
    category: YT_TO_APP[String(snippet.categoryId)] || 'entertainment',
    views: Number(stats.viewCount || 0),
    publishedAt: snippet.publishedAt || new Date().toISOString(),
    duration: parseIsoDuration(details.duration),
    description: snippet.description || '',
    tags: snippet.tags || []
  };
}

async function youtube(resource, params) {
  const key = apiKey();
  if (!key) {
    const error = new Error('Falta VITE_YOUTUBE_API_KEY');
    error.code = 'NO_KEY';
    throw error;
  }
  const url = new URL(`${API}/${resource}`);
  url.searchParams.set('key', key);
  url.searchParams.set('hl', 'es');
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(name, String(value));
    }
  });
  const res = await fetch(url.toString());
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(body.error?.message || `YouTube API ${res.status}`);
    error.code = 'YT';
    throw error;
  }
  return body;
}

async function hydrate(ids) {
  const unique = [...new Set(ids.filter(Boolean))].slice(0, 50);
  if (!unique.length) return [];
  const cacheKey = `wi:videos:${unique.join(',')}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  const data = await youtube('videos', {
    part: 'snippet,contentDetails,statistics',
    id: unique.join(','),
    maxResults: 50
  });
  const mapped = (data.items || []).map(mapItem);
  cacheSet(cacheKey, mapped);
  return mapped;
}

export async function fetchTrending(category = 'all') {
  if (!isYouTubeLive()) {
    return searchDemo(getTrendingVideos(), '', category);
  }
  const cacheKey = `wi:trend:${category}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  const params = {
    part: 'snippet,contentDetails,statistics',
    chart: 'mostPopular',
    regionCode: 'ES',
    maxResults: 24
  };
  if (category !== 'all' && YT_CATEGORY[category]) {
    params.videoCategoryId = YT_CATEGORY[category];
  }
  const data = await youtube('videos', params);
  const mapped = (data.items || []).map(mapItem);
  cacheSet(cacheKey, mapped);
  return mapped;
}

export async function fetchRecommended(category = 'all') {
  if (!isYouTubeLive()) {
    return searchDemo(getRecommendedVideos(), '', category);
  }
  return fetchSearch(category === 'all' ? 'actualidad' : CATEGORIES.find((c) => c.id === category)?.label || 'vídeos', category);
}

export async function fetchSearch(query, category = 'all') {
  const q = (query || '').trim();
  if (!isYouTubeLive()) {
    return searchDemo(VIDEOS, q, category);
  }
  const cacheKey = `wi:search:${category}:${q.toLowerCase()}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  const params = {
    part: 'snippet',
    type: 'video',
    maxResults: 24,
    q: q || 'vídeos',
    safeSearch: 'moderate'
  };
  if (category !== 'all' && YT_CATEGORY[category]) {
    params.videoCategoryId = YT_CATEGORY[category];
  }
  const data = await youtube('search', params);
  const ids = (data.items || []).map((item) => item.id?.videoId).filter(Boolean);
  const mapped = await hydrate(ids);
  cacheSet(cacheKey, mapped);
  return mapped;
}

export async function fetchVideo(id) {
  if (!id) return null;
  if (!isYouTubeLive()) {
    return getDemoVideo(id) || stubVideo(id);
  }
  try {
    const [video] = await hydrate([id]);
    return video || stubVideo(id);
  } catch {
    return getDemoVideo(id) || stubVideo(id);
  }
}

export async function fetchRelated(video) {
  if (!video) return [];
  if (!isYouTubeLive()) {
    return getRelatedVideos(video);
  }
  const query = (video.title || '').split(/\s+/).slice(0, 5).join(' ');
  const list = await fetchSearch(query, video.category || 'all');
  return list.filter((item) => item.id !== video.id).slice(0, 10);
}

export async function fetchByIds(ids) {
  const list = [...new Set((ids || []).filter(Boolean))];
  if (!list.length) return [];
  if (!isYouTubeLive()) {
    return list.map((id) => getDemoVideo(id) || stubVideo(id));
  }
  try {
    const live = await hydrate(list);
    const byId = new Map(live.map((item) => [item.id, item]));
    return list.map((id) => byId.get(id) || stubVideo(id));
  } catch {
    return list.map((id) => getDemoVideo(id) || stubVideo(id));
  }
}

export function stubVideo(id) {
  return {
    id,
    title: 'Vídeo de YouTube',
    channel: '',
    category: 'entertainment',
    views: 0,
    publishedAt: new Date().toISOString(),
    duration: '',
    description: '',
    tags: []
  };
}

export { CATEGORIES };
