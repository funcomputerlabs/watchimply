const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

export function formatViews(count) {
  if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1).replace('.0', '')} mil M`;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace('.0', '')} M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace('.0', '')} mil`;
  return String(count);
}

export function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const diff = date.getTime() - Date.now();
  const minutes = Math.round(diff / 60000);
  const hours = Math.round(diff / 3600000);
  const days = Math.round(diff / 86400000);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  if (Math.abs(days) < 31) return rtf.format(days, 'day');
  if (Math.abs(months) < 12) return rtf.format(months, 'month');
  return rtf.format(years, 'year');
}

export function categoryLabel(id, categories) {
  return categories.find((item) => item.id === id)?.label || id;
}

export function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
