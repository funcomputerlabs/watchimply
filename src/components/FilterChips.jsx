import { CATEGORIES } from '../data/videos.js';

export function FilterChips({ value, onChange }) {
  return (
    <div className="chips" role="tablist" aria-label="Filtros de categoría">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={value === category.id}
          className={value === category.id ? 'chip active' : 'chip'}
          onClick={() => onChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
